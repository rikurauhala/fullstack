#!/bin/bash

# Clear the terminal
clear

# Launch backend
echo "Starting backend in test mode..."
cd ../bloglist-backend
gnome-terminal -- npm run start:test
echo "Backend started"

# Launch frontend
echo "Starting frontend..."
cd ../bloglist-frontend
gnome-terminal -- npm start
echo "Frontend started"

# Launch Cypress
npm run cypress:open
