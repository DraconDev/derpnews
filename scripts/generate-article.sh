#!/bin/bash

# Get the directory of the script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Load environment variables if .env file exists
if [ -f "$DIR/../.env" ]; then
    export $(cat "$DIR/../.env" | grep -v '^#' | xargs)
fi

# Use the secret from env or default
CRON_SECRET=${CRON_SECRET:-"your-secret-key"}

# Make the API call to generate an article
curl -X POST https://derpnews.com/api/cron/generate \
    -H "Content-Type: application/json" \
    -d "{\"secret\": \"$CRON_SECRET\"}"
