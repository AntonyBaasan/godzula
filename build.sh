set -e

# latest commit
LATEST_COMMIT=$(git rev-parse HEAD)

# latest commit where /w was changed
WEB_COMMIT=$(git log -1 --format=format:%H --full-diff web/)

# latest commit where /b was changed
API_COMMIT=$(git log -1 --format=format:%H --full-diff api/)

CWD=$(pwd)

echo $LATEST_COMMIT
echo $WEB_COMMIT
echo $API_COMMIT

echo 'starting... '

if [ -z $WEB_COMMIT ]
    then
        echo "no change inside 'web' directory"
elif [ $LATEST_COMMIT = $WEB_COMMIT ] \
        && echo "files in 'web' has changed" \
        && cd "$CWD/web" \
        && npm install && npm run test && npm run build
    then
    echo "web done."
else
    exit 1
fi

if [ -z $API_COMMIT ]
    then
        echo "no change inside 'api' directory"
elif [ $LATEST_COMMIT = $API_COMMIT ]
        echo "files in 'api' has changed" \
        && cd "$CWD/api" \
        && ./build.sh
    then
    echo "api done."
else
    exit 1
fi
exit 0
