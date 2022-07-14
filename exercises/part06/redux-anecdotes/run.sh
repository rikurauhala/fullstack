#!/bin/bash

echo "Starting the server..."
gnome-terminal -- npm run server &

echo "Starting..."
npm start
