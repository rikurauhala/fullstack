#!/bin/bash

#
# This script is made for copying the backend
# files from the previous part of the course.
# Useful if I have to make changes to the backend
# code or if I have to use another machine.
#
# To run:
# chmod +x get_backend.sh
# ./get_backend.sh
#

# Define colors
COLOR="\e[31m"
ENDCOLOR="\e[0m"

# Clear the terminal
clear

# Make sure the dotfiles are copied too
shopt -s dotglob

# Clear the backend directory
if [ -d bloglist-backend ]; then
  rm -rf bloglist-backend
fi

# (Re-)create the backend directory
mkdir bloglist-backend

# Copy the contents of the backend from the part04 directory
cp -r ../part04/bloglist-backend/* bloglist-backend

# Print a relevant message to indicate successful operation
echo "Backend copied!"

# Move into the backend directory
cd bloglist-backend

# Reinstall dependencies
if [ -d node_modules ]; then
  rm -rf node_modules
  echo "Installing dependencies!"
  npm install
fi

# Clear the terminal
clear

# Let the user know what is going on
echo "Dependencies installed!"

# Remind to add secrets to make the backend work
if [ ! -f .env ]; then
  # Create the missing .env
  touch .env

  # Add environment variables without values
  echo "MONGODB_URI=" >> .env
  echo "SECRET=" >> .env
  echo "TEST_MONGODB_URI=" >> .env
  echo "PORT=" >> .env

  # Print a reminder
  echo -e "${COLOR}Remember to add environment variables!${ENDCOLOR}"
fi

# Print a message to indicate succesfull execution of the script
echo "Done!"
