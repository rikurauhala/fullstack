#!/bin/bash

clear
sudo docker compose -f docker-compose.yml up --build --remove-orphans
