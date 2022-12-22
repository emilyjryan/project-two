# Sunset Searcher

## PROJECT IDEA
Evening sky predictor, with time of sunset, current weather, and potentially any good stars to see if the sky is clear

## PROJECT DESCRIPTION
I want to create an app that tells you sunset time, moonphase, and weather, all based on a specific location. Users can then favorite that location to return to it to see what the evening will be like in the future.

## CHOICE OF API:
1. https://sunrise-sunset.org/api
    - gives sunrise, sunset, twilight, day length
    - ?free unlimited API calls "within reason"
    - uses latitude/longitude for location
2. https://openweathermap.org/api/geocoding-api
    - gives lat/long for a city
3. https://openweathermap.org/api
    - gives weather for a specific location and day/time
4. 

## ERDS:
(See ERD.drawio)

## RESTFUL ROUTING CHART
GET == / == Read homepage
GET == /sunset == Get sunset data from API and display for user
POST == /users/new == Create new user
GET == /users/:userId/ Read user's profile and info
PUT == /users/:userId == Update user's password
DELETE == /users/:userId == Delete user's account
GET == /users/:userId/faves == Read a user's saved locations
GET == /users/:userId/faves/:favId == Read details on specific fav
POST == /users/:userId/faves/:favId == Create a new fav
DELETE == /users/:userId/faves:favId == Delete a fav

## WIREFRAMES
![wireframes from Miro](./whiteboard.png "Wireframes")

## USER STORIES
Users want to create an account to be able to save searches
Users want to search for data on the sunset for a given day and location
Users want to be able to update or change their email or password

## GOALS

### MVP Goals:
- User can sign up for account using email and password
- User can change password or update email address
- User can search city name and date and be returned data on the sunset
- User can save their searches in "favorites" for future use

### Stretch Goals:
- Incorporate ability for user to upload pictures of sunset to a fav
- Add ability to comment on other user's favorites


