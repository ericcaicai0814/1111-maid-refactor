#!/usr/bin/env python3
"""
Generate a semantic kebab-case name from a JSONL session using Claude Haiku.
Usage: python3 generate-session-name.py <path-to.jsonl>
Output: kebab-case slug (e.g. "html-reverse-engineering-react-feasibility")

Requires: ANTHROPIC_API_KEY env var
Fallback: if API call fails, produces a heuristic slug from the first user message.
"""

import json
import os
import re
import sys
from pathlib import Path


def extract_first_user_message(jsonl_path: str) -> str:
    """Extract the first meaningful user text from a JSONL session."""
    path = Path(jsonl_path)
    if not path.exists():
        return ""

    for line in path.read_text().splitlines():
        if not line.strip():
            continue
        e = json.loads(line)
        if e.get("type") != "user":
            continue

        content = e.get("message", {}).get("content", "")
        if isinstance(content, list):
            texts = [
                b.get("text", "")
                for b in content
                if isinstance(b, dict) and b.get("type") == "text"
            ]
            content = " ".join(texts)

        if isinstance(content, str) and content.strip():
            return content.strip()

    return ""


def generate_name_via_api(text: str) -> str | None:
    """Call Claude Haiku to generate a semantic slug."""
    try:
        import anthropic
    except ImportError:
        return None

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return None

    # Truncate to ~500 chars to minimize cost
    snippet = text[:500]

    try:
        client = anthropic.Anthropic(api_key=api_key)
        response = client.messages.create(
            model="claude-haiku-4-5",
            max_tokens=60,
            messages=[{
                "role": "user",
                "content": (
                    "Based on the following session's first message, generate a short "
                    "descriptive kebab-case slug (3-5 English words, lowercase, hyphens). "
                    "The slug should capture the main task/topic. "
                    "Output ONLY the slug, nothing else.\n\n"
                    f"Message:\n{snippet}"
                ),
            }],
        )
        slug = ""
        for block in response.content:
            if block.type == "text":
                slug = block.text.strip()
                break

        # Sanitize: keep only lowercase alphanumeric and hyphens
        slug = re.sub(r"[^a-z0-9\-]", "", slug.lower())
        slug = re.sub(r"-+", "-", slug).strip("-")

        if slug and 3 <= len(slug) <= 60:
            return slug
    except Exception:
        pass

    return None


def heuristic_slug(text: str) -> str:
    """Fallback: extract keywords heuristically."""
    # Strip noise
    cleaned = re.sub(r"<system-reminder>[\s\S]*?</system-reminder>", " ", text)
    cleaned = re.sub(r"```[\s\S]*?```", " ", cleaned)
    cleaned = re.sub(r"https?://\S+", " ", cleaned)
    cleaned = re.sub(r"/Users/\S+", " ", cleaned)
    cleaned = re.sub(r"^Implement the following plan:\s*", "", cleaned, flags=re.MULTILINE)
    cleaned = cleaned[:200]

    tokens = []
    for match in re.finditer(r"[a-zA-Z][a-zA-Z0-9]{2,}", cleaned):
        token = match.group().lower()
        if token not in {
            "the", "and", "for", "with", "from", "that", "this", "have", "has",
            "implement", "following", "plan", "context", "please", "use", "using",
        }:
            tokens.append(token)

    slug = "-".join(tokens[:5]) if tokens else "session"
    return slug[:50].rstrip("-")


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 generate-session-name.py <path-to.jsonl>", file=sys.stderr)
        sys.exit(1)

    jsonl_path = sys.argv[1]
    text = extract_first_user_message(jsonl_path)

    if not text:
        print("session")
        return

    # Try API first, fall back to heuristic
    slug = generate_name_via_api(text)
    if not slug:
        slug = heuristic_slug(text)

    print(slug)


if __name__ == "__main__":
    main()
