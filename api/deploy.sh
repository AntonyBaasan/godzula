#!/usr/bin/env bash

heroku plugins:install java
heroku deploy:jar target/*.war --app api-godzula