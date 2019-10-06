# latest commit
LATEST_COMMIT=$(git rev-parse HEAD)

# latest commit where /w was changed
WEB_COMMIT=$(git log -1 --format=format:%H --full-diff web/)

# latest commit where /b was changed
API_COMMIT=$(git log -1 --format=format:%H --full-diff api/)

CWD=$(pwd)

if [ -z $WEB_COMMIT ]
    then
        echo "no change inside 'web' directory"
elif [ $LATEST_COMMIT = $WEB_COMMIT ];
    then
        echo "files in 'web' has changed"
        cd "$CWD/web"
        npm i -g firebase-tools
        firebase deploy --token $FIREBASE_TOKEN
fi

if [ -z $API_COMMIT ]
    then
        echo "no change inside 'api' directory"
if [ $LATEST_COMMIT = $API_COMMIT ];
    then
        echo "files in 'api' has changed"
        cd "$CWD/api"
        ./deploy.sh
fi
