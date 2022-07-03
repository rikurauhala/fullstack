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

# Clear the terminal
clear

# Print working directory
pwd

# Open the hour tracking document
code hours.md

# Open README.md
code README.md

# Open part 5 documentation
code exercises/part05/README.md

# List the contents of the directory
ls -l --color=always

# Display Git status
git status
