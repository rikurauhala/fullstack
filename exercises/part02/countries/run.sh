#!/bin/bash

echo "Exporting API key..."
export $(cat .env)
echo "API key exported!"

echo "Starting..."
npm start
