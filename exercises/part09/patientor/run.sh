#!/bin/bash

# Clear the terminal
clear

# Launch backend
echo "Starting backend..."
cd backend
gnome-terminal -- npm run dev
echo "Backend started"

# Launch frontend
echo "Starting frontend..."
cd ../frontend
npm start
echo "Frontend started"
