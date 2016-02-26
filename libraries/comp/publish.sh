#!/bin/bash

function publish_comp {
    cd $1
    pwd
    git checkout master
    git pull
    npm i
    grunt publish
    cd ..
}

#publish_comp "chart"
#publish_comp "consoleprinter"
#publish_comp "mqttpubclient"
#publish_comp "mqttsubclient"
#publish_comp "msgsender"
#publish_comp "nodered"
publish_comp "ticker"
publish_comp "websiteviewer"
publish_comp "wsmsgbroker"
