#!/bin/bash

MAPFISH_SERVICE="/usr/bin/mapfish"

# test if mapfish server is already started
$MAPFISH_SERVICE status >/dev/null 2>&1
if [ $? -eq 1 ]
then
    # start mapfish as a daemon
    $MAPFISH_SERVICE start
    if [ $? -eq 1 ]
    then
        echo "Error when starting MapFish server. Abort..."
        exit 1
    fi
fi

TIMEOUT=0
SERVER_STARTED=
while [ -z $SERVER_STARTED ]
do
    # wait a moment to let paster start
    sleep 1
    TIMEOUT=$((TIMEOUT+1))
    wget -O - http://localhost:5000 >/dev/null 2>&1
    if [ $? -eq 0 ]
    then
        SERVER_STARTED=1
    fi
    if [ $TIMEOUT -eq 30 ]
    then
        "Error: MapFish server starting timeout. Give up!"
        exit 1
    fi
done

sensible-browser http://localhost:5000

exit 0
