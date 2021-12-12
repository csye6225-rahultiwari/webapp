#!/bin/bash
cp /home/ubuntu/.env /home/ubuntu/webapp
cd ~/aws-codedeploy
pm2 startOrReload ecosystem.config.js