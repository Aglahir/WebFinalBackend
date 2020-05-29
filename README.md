# Backend - User data manager

_User data management and visualization web backend_

## Features 🚀

- Scalable design

- Security Middleware: cors, sessiontokens

- Security in controller: user permission levels, sanitization, data filtering

- In pattern Model-View-Controller this backend is easy to implement different Models

## API Reference 📋

### Login

_Login with user information and return token_

**URL** : `/api/login`

**Method** : `POST`

**Headers** : None

**Body**

```json
{
  "user_name": "[user_name]",
  "password": "[password]"
}
```

### Success Response

**Code** : `200 OK`

**Body Response**

```json
{
  "sessiontoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWVjZmRjYWY3YjEwNDQ0OTE0NDIzMmJjIiwiaWF0IjoxNTkwNzI5MjY0LCJleHAiOjE1OTA4MTU2NjR9.OglQ26U3DhLWTX9ER1nSyYZ5XSyaW9mG8EWhmOX4qd8",
  "user": {
    "user_id": "5ecfdcaf7b104449144232bc",
    "user_type": 3,
    "full_name": "admin1",
    "user_name": "admin1",
    "color": "#FFFFFF"
  }
}
```

### Users

_Get user information depending on session permissions_

**URL** : `/api/users`

**Method** : `GET`

**Headers** : sessiontoken

**Body**

```json
[

{

"tags": [

{

"_id": "5ed01c9e29bbc45bbc8c7272",

"tag_name": "tag1",

"tag_id": "5ed01c9e29bbc45bbc8c7272",

"id": "5ed01c9e29bbc45bbc8c7272"

},

{

"_id": "5ed0112dfbb5ec6350e65d7b",

"tag_name": "tag2",

"tag_id": "5ed0112dfbb5ec6350e65d7b",

"id": "5ed0112dfbb5ec6350e65d7b"

}

],

"_id": "5ecf4990d0671348f4460134",

"full_name": "fname1",

"user_name": "username1",

"user_type": 1,

"color": "#FFFFFF",

"user_id": "5ecf4990d0671348f4460134",

"id": "5ecf4990d0671348f4460134"

},
```

### Success Response

**Code** : `200 OK`

**Body Response**

```json
[
  {
    "tags": [
      {
        "_id": "5ed01c9e29bbc45bbc8c7272",
        "tag_name": "tag1",
        "tag_id": "5ed01c9e29bbc45bbc8c7272",
        "id": "5ed01c9e29bbc45bbc8c7272"
      }
    ],
    "_id": "5ecf4990d0671348f4460134",
    "full_name": "fname1",
    "user_name": "username1",
    "user_type": 1,
    "color": "#FFFFFF",
    "user_id": "5ecf4990d0671348f4460134",
    "id": "5ecf4990d0671348f4460134"
  }
]
```

## Other responses for all endpoints

### No Results Response

**Condition** : If model promise is resolved but content is missing

**Code** : `204 NO CONTENT`

### Bad Request

**Condition** : General error for missing data or connection problems

**Code** : `400 BAD REQUEST`

### Unauthorized

**Condition** : Session permissions are not enough to execute the api call

**Code** : `401 UNAUTHORIZED`
