#!/usr/bin/env python3
"""
Parse Claude Code JSONL session log.
Extract: user input → model → assistant output
Filter out: progress, system, file-history-snapshot, tool_result noise
"""

import json
import sys
from pathlib import Path
from datetime import datetime


def parse_session(jsonl_path: str, output_format: str = "markdown") -> str:
    path = Path(jsonl_path)
    if not path.exists():
        print(f"File not found: {jsonl_path}", file=sys.stderr)
        sys.exit(1)

    events = []
    for line in path.read_text().splitlines():
        if line.strip():
            events.append(json.loads(line))

    # Only keep user (non-tool_result) and assistant events
    conversation = []
    for e in events:
        t = e.get("type")

        if t == "user":
            msg = e.get("message", {})
            content = msg.get("content", "")

            # Filter out tool_result messages (these are internal plumbing)
            if isinstance(content, list):
                # Check if it's purely tool_result
                has_real_content = any(
                    block.get("type") not in ("tool_result",)
                    for block in content
                    if isinstance(block, dict)
                )
                if not has_real_content:
                    continue
                # Extract text blocks only
                text_parts = []
                for block in content:
                    if isinstance(block, dict) and block.get("type") == "text":
                        text_parts.append(block["text"])
                    elif isinstance(block, str):
                        text_parts.append(block)
                if not text_parts:
                    continue
                content = "\n".join(text_parts)

            conversation.append({
                "role": "user",
                "content": content,
                "timestamp": e.get("timestamp", ""),
            })

        elif t == "assistant":
            msg = e.get("message", {})
            model = msg.get("model", "unknown")
            usage = msg.get("usage", {})
            input_tokens = usage.get("input_tokens", 0)
            output_tokens = usage.get("output_tokens", 0)

            blocks = msg.get("content", [])
            text_parts = []
            tool_calls = []

            for block in blocks:
                bt = block.get("type")
                if bt == "text":
                    text_parts.append(block["text"])
                elif bt == "tool_use":
                    tool_info = {
                        "name": block.get("name", "?"),
                        "description": block.get("input", {}).get("description", ""),
                    }
                    tool_calls.append(tool_info)
                # Skip: thinking (internal), tool_result

            # Skip empty assistant turns (e.g., only thinking block)
            if not text_parts and not tool_calls:
                continue

            conversation.append({
                "role": "assistant",
                "model": model,
                "input_tokens": input_tokens,
                "output_tokens": output_tokens,
                "text": "\n".join(text_parts) if text_parts else None,
                "tool_calls": tool_calls if tool_calls else None,
                "timestamp": e.get("timestamp", ""),
            })

    # Deduplicate: same requestId can produce multiple JSONL lines (streaming)
    # Merge consecutive assistant entries with same timestamp prefix
    merged = []
    for entry in conversation:
        if (
            merged
            and entry["role"] == "assistant"
            and merged[-1]["role"] == "assistant"
            and entry.get("timestamp", "")[:19] == merged[-1].get("timestamp", "")[:19]
        ):
            prev = merged[-1]
            if entry.get("text"):
                prev["text"] = (prev.get("text") or "") + "\n" + entry["text"]
            if entry.get("tool_calls"):
                prev["tool_calls"] = (prev.get("tool_calls") or []) + entry["tool_calls"]
            # Keep the higher token count
            prev["output_tokens"] = max(prev["output_tokens"], entry["output_tokens"])
        else:
            merged.append(entry)

    return format_output(merged, output_format)


def format_output(conversation: list, fmt: str) -> str:
    if fmt == "json":
        return json.dumps(conversation, ensure_ascii=False, indent=2)

    # Markdown format
    lines = ["# Session Conversation Log\n"]

    for i, entry in enumerate(conversation):
        ts = entry.get("timestamp", "")
        ts_short = ts[:19].replace("T", " ") if ts else "?"

        if entry["role"] == "user":
            lines.append(f"## 🧑 User ({ts_short})")
            lines.append("")
            lines.append(entry["content"])
            lines.append("")

        elif entry["role"] == "assistant":
            model = entry.get("model", "?")
            in_t = entry.get("input_tokens", 0)
            out_t = entry.get("output_tokens", 0)
            lines.append(f"## 🤖 Assistant ({ts_short}) — `{model}` | in={in_t} out={out_t}")
            lines.append("")

            if entry.get("text"):
                lines.append(entry["text"])
                lines.append("")

            if entry.get("tool_calls"):
                for tc in entry["tool_calls"]:
                    desc = f' — {tc["description"]}' if tc["description"] else ""
                    lines.append(f"**Tool:** `{tc['name']}`{desc}")
                lines.append("")

        lines.append("---\n")

    return "\n".join(lines)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python parse-session.py <path-to.jsonl> [markdown|json]", file=sys.stderr)
        sys.exit(1)

    jsonl_path = sys.argv[1]
    fmt = sys.argv[2] if len(sys.argv) > 2 else "markdown"
    print(parse_session(jsonl_path, fmt))
