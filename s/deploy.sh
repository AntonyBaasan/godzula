./mvnw package
cd godzula
heroku deploy:jar target/*.war --app godzula