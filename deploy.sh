#!/bin/bash
cd /var/www/debby-hub
git fetch origin
git reset --hard origin/main
echo "Deploy concluido em $(date)" >> /var/log/debby-deploy.log
