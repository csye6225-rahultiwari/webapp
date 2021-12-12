#!/bin/bash
cp /home/ubuntu/.env /home/ubuntu/webapp
cd ~/aws-codedeploy

sudo chmod -R 777 /home/ubuntu/webapp

#navigate into our working directory where we have all our github files
cd /home/ubuntu/webapp || exit

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
npm install nodemon
pm2 startOrReload ecosystem.config.js
#start our node app in the background
# npm start > app.out.log 2> app.err.log < /dev/null &