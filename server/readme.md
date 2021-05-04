# Routes

## Admin user

- User credentials
  {
  "email": "email@admin.com",
  "password": "password"
  }
- For authentication to admin routes add the following header
  x-auth-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY5ZDk4MjM5OGJlMTJlOTAzYTg5YWEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTc1NDk3MjN9.1X6fx9CrTHnOEP2ieqx6azXZsfS8FPmzGLfYjKSJ2lE (jwt token)

## Base url : https://nateg-wasalni.herokuapp.com

## routes

### Trips

@route GET /api/v1/trip/search?origin=tunis&destination=sousse&depart_date=2021-04-06&type_of_transport=train (depart_date is optional)
@desc Get trip
@access public

@route GET api/v1/trip
@desc Get trips
@access admin

@route POST api/v1/trip
@desc Add trip
@access admin
@request body : {
"price": 145,
"station": ["station_id", "station_id"],
"depart_date": "2021-04-07 15:34",
"arrival_date" : "2021-04-07 16:34",
"distance": 456,
"type_of_transport": "train"(bus)
}

@route PATCH api/v1/trip/update/:id
@desc update trip
@access admin
@request body :{
"price": 145,
"depart_date": "2021-04-07 15:34",
"arrival_date" : "2021-04-07 16:34"
}

@route DELETE api/v1/trip/delete
@desc delete a trip
@access admin

@route GET api/v1/trip
@desc Get trip by id
@access admin
@request body :{
"trip_list": [
station_ids
]
}

## Working example

https://nateg-wasalni.herokuapp.com/api/v1/trip/search?origin=tunis&destination=sousse&depart_date=2021-04-06&type_of_transport=train
