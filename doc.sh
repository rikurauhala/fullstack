#!/bin/bash

#
# This script is used for opening the documentation
# files in Visual Studio Code without having to look
# for them in the file explorer sidebar. I tend to edit
# these files quite often and would prefer to not to
# clutter the editor tabs with tons of open files at
# the same time.
#  
# So, just to make my life little bit easier. :)
#

# Define colors
COLOR="\e[32m"
ENDCOLOR="\e[0m"

# Clear the terminal
clear

# Save working directory to a variable
DIR=`pwd`

# Print working directory
echo -e "${COLOR}> ${DIR}${ENDCOLOR}"
echo ""

# Open the hour tracking document
code documentation/hours.md

# Open README.md
code README.md

# Open part13 documentation
code exercises/part13/README.md

# List the contents of the directory
ls -l --color=always
echo ""

# Display Git status
echo -e "${COLOR}> Git status${ENDCOLOR}"
git status
