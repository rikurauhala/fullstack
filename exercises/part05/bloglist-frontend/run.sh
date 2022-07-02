#!/bin/bash

# Clear the terminal
clear

# Launch backend
echo "Starting backend..."
cd ../bloglist-backend
npm run dev &
echo "Backend started"

# Launch frontend
echo "Starting frontend..."
cd ../bloglist-frontend
npm start
echo "Frontend started"
