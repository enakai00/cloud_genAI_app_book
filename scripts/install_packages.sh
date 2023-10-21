#!/bin/bash

sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
  | sudo gpg --yes --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] \
https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" \
  | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update
sudo apt-get install --upgrade -y nodejs git jq postgresql-client 
NUM_PACKAGES=$(apt list --installed \
  | grep -E "(^nodejs/|^git/|^jq/|^postgresql-client/)" | wc -l)
if [[ $NUM_PACKAGES == 4 ]]; then
  echo "Succeeded."
fi
