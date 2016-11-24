# quehacemos
Our first co-op app


#Api integration prototyping
The intention for this branch is to rapid prototype interaction with external
apis.

We connect to
* Facebook
* Eventbrite
* Meetup

##Facebook
We shall investigate the following interations.
* Requests to the graph api using an access token generated for our app.
* Requests to the graph api using an access token generated for a user account.
* Request to graph api using page access tokens.

It seems that the flow to scrape events from a user is:
Obtain user access token ==> Request user events ==> Request user pages (GET {user-id}/accounts)
==> Request page events using page access token (one per page)

´´JSON
{
  "data": [
    {
      "category": "Product/service",
      "name": "Sample Page",
      "access_token": "{access-token}",
      "id": "1234567890",
      "perms": [
        "ADMINISTER",
        "EDIT_PROFILE",
        "CREATE_CONTENT",
        "MODERATE_CONTENT",
        "CREATE_ADS",
        "BASIC_ADMIN"
      ]
    },
}
´´
##Meetup
We can use a rest client to send request to meetup API (api.meetup.com) using the api-key as parameter in the url e.g https://api.meetup.com/Padres-Solteros/events?&sign=true&photo-host=public&page=20&key=a683897869356c4b811644c56a6  or we can use a custom package, this package has all the posible request to the API
https://github.com/jkutianski/meetup-api. I built two controller with each one of the options to get all the events of the Padres-Solteros group. Also a i built a controller for get all the events related to the user
