#!/bin/bash

secret=$WEBHOOK_SECRET

echo WEBHOOK URL: $WEBHOOK_URL

curl -X POST -H 'Content-Type: application/json' -d '{"token": "$secret"}' $WEBHOOK_URL/kosh
