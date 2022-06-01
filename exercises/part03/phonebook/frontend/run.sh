#!/bin/bash

echo "Starting..."

npx json-server --port 3001 --watch db.json &
npm start
