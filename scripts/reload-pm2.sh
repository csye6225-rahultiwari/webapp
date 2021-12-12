#!/bin/bash
cd ~/aws-codedeploy || exit
pm2 startOrReload ecosystem.config.js