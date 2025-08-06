#!/bin/bash
cd /home/kavia/workspace/code-generation/event-organizer-pro-65/event_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

