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
