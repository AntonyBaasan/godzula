# latest commit
LATEST_COMMIT=$(git rev-parse HEAD)

# latest commit where /w was changed
WEB_COMMIT=$(git log -1 --format=format:%H --full-diff w/)

# latest commit where /b was changed
API_COMMIT=$(git log -1 --format=format:%H --full-diff b/)

if [ $LATEST_COMMIT = $WEB_COMMIT ];
    then
        echo "files in w has changed"
        ./deploy_w.sh
fi

if [ $LATEST_COMMIT = $API_COMMIT ];
    then
        echo "files in b has changed"
        ./deploy_b.sh
fi
