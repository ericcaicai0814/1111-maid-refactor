#!/usr/bin/env bash
# session-end-parse.sh — SessionEnd hook
# Parse session JSONL into readable markdown conversation log
# Semantic naming via Claude Haiku API (fallback: heuristic)
# Auto-updates README.md with new entry
# Input: stdin JSON with { session_id, transcript_path, cwd }

INPUT=$(cat)
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // ""')
TRANSCRIPT=$(echo "$INPUT" | jq -r '.transcript_path // ""')

if [ -z "$TRANSCRIPT" ] || [ ! -f "$TRANSCRIPT" ]; then
  exit 0
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"
OUT_DIR="$PROJECT_DIR/.claude/session-logs"
README="$OUT_DIR/README.md"
mkdir -p "$OUT_DIR"

# --- Determine next sequence number ---
NEXT_SEQ=$(ls "$OUT_DIR"/*.md 2>/dev/null \
  | xargs -I{} basename {} \
  | grep -oE '^[0-9]+' \
  | sort -n \
  | tail -1)
NEXT_SEQ=$(( ${NEXT_SEQ:-0} + 1 ))
SEQ_PAD=$(printf "%02d" "$NEXT_SEQ")

# --- Determine semantic name ---
# Priority: custom-title (via /title) > Claude Haiku API > heuristic
CUSTOM_TITLE=$(python3 -c "
import json
for line in open('$TRANSCRIPT'):
    obj = json.loads(line)
    if obj.get('type') == 'custom-title' and obj.get('customTitle'):
        print(obj['customTitle'])
        break
" 2>/dev/null)

UV_PATH="${HOME}/.langflow/uv/uv"

if [ -n "$CUSTOM_TITLE" ]; then
  SLUG=$(echo "$CUSTOM_TITLE" | tr ' /' '--' | tr -cd '[:alnum:]-_')
elif [ -x "$UV_PATH" ]; then
  SLUG=$("$UV_PATH" run --with anthropic python3 "$SCRIPT_DIR/generate-session-name.py" "$TRANSCRIPT" 2>/dev/null)
else
  SLUG=$(python3 "$SCRIPT_DIR/generate-session-name.py" "$TRANSCRIPT" 2>/dev/null)
fi

SLUG="${SLUG:-session}"
FILENAME="${SEQ_PAD}-${SLUG}"
OUT_FILE="$OUT_DIR/${FILENAME}.md"

# --- Parse session ---
python3 "$SCRIPT_DIR/parse-session.py" "$TRANSCRIPT" markdown > "$OUT_FILE" 2>/dev/null

if [ ! -s "$OUT_FILE" ]; then
  rm -f "$OUT_FILE"
  exit 0
fi

# --- Extract one-line description for README ---
DESCRIPTION=$(python3 -c "
import json
for line in open('$TRANSCRIPT'):
    obj = json.loads(line)
    if obj.get('type') != 'user':
        continue
    content = obj.get('message', {}).get('content', '')
    if isinstance(content, list):
        texts = [b.get('text','') for b in content if isinstance(b,dict) and b.get('type')=='text']
        content = ' '.join(texts)
    if isinstance(content, str) and content.strip():
        first_line = content.strip().split('\n')[0][:60]
        print(first_line)
        break
" 2>/dev/null)
DESCRIPTION="${DESCRIPTION:-Session log}"

# --- Update README.md ---
if [ -f "$README" ]; then
  if ! grep -qF "$FILENAME" "$README"; then
    # Insert before "## 產生方式" section, or append to end
    if grep -q '^## 產生方式' "$README"; then
      sed -i '' "/^## 產生方式/i\\
| \`${FILENAME}.md\` | ${DESCRIPTION} |\\
" "$README"
    else
      echo "| \`${FILENAME}.md\` | ${DESCRIPTION} |" >> "$README"
    fi
  fi
fi

exit 0
