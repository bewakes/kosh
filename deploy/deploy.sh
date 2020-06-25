#!/bin/bash

secret=$WEBHOOK_SECRET

curl -X POST -H 'Content-Type: application/json' -d "{\"token\": \"$secret\"}" $WEBHOOK_URL/kosh
