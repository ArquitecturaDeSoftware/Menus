#!/bin/sh
db-migrate up --config src/config/db-migrate.json -e prod
exec "$@"
