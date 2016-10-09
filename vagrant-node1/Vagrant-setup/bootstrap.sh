#!/bin/bash -e

# GUEST IP
GUEST_IP=192.168.121.122

# Hosts files
HOSTS=/etc/hosts

# Node version duh
NODE_VER=5.x


# TODO: change the print usage text
###########################################################
# Changes below this line are probably not necessary
###########################################################
print_db_usage () {
  echo "NODE1 for PUBSUB test has been setup"
  echo "  Host: $GUEST_IP  [ node1.qhacemos ]"
  echo "  Guest IP: $GUEST_IP"
  echo "    added:   \"node1.qhacemos   $GUEST_IP\"   to /etc/hosts"
  echo ""
  echo "  NodeJS v:$NODE_VER"
  echo ""
  echo ""
}

export DEBIAN_FRONTEND=noninteractive

PROVISIONED_ON=/etc/vm_provision_on_timestamp
if [ -f "$PROVISIONED_ON" ]
then
  echo "VM was already provisioned at: $(cat $PROVISIONED_ON)"
  echo "To run system updates manually login via 'vagrant ssh' and run 'apt-get update && apt-get upgrade'"
  echo ""
  print_db_usage
  exit
fi

chown vagrant /etc/hosts
echo "$GUEST_IP   node1.qhacemos" >> /etc/hosts

# update / upgrade
apt-get update
#apt-get -y upgrade #too slow - instead, keep the virtual box up-to-date

# get gyp dependency for binary versions (faster)
apt-get -y install build-essential
apt-get -y install python
#apt-get install python-setuptools
apt-get -y install gyp

# install node
#apt-get -y install curl
curl -sL "https://deb.nodesource.com/setup_$NODE_VER" | sudo -E bash -
sudo apt-get install -y nodejs

#Install node-inspector package for debugging
npm install -g node-inspector

# install git
sudo apt-get -y install git

# Tag the provision time:
date > "$PROVISIONED_ON"

echo "Successfully created NODE1 virtual machine to test PubSub"
echo ""
print_db_usage
