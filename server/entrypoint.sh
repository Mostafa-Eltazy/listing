#!/bin/sh

set -eux

export STARTED_AT=$(date +%s)

# run migrations
npm run db:migrate:deploy

# run application
npm run start:dev