# latest commit
LATEST_COMMIT=$(git rev-parse HEAD)

# latest commit where /w was changed
WEB_COMMIT=$(git log -1 --format=format:%H --full-diff w)

# latest commit where /b was changed
API_COMMIT=$(git log -1 --format=format:%H --full-diff b)

if [ $LATEST_COMMIT = $WEB_COMMIT ];
    then
        echo "files in w has changed"
        ./build_w.sh
elif [ $LATEST_COMMIT = $API_COMMIT ];
    then
        echo "files in b has changed"
        ./build_b.sh
else
     echo "no folders of relevance has changed"
     exit 0;
fi
