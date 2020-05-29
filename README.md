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
    "_id": "5ecfdcaf7b104449144232bc",
    "user_type": 3,
    "full_name": "admin1",
    "user_name": "admin1",
    "color": "#FFFFFF"
  }
}
```

---

### Users

_Get user information depending on session permissions_

**URL** : `/api/users`

**Query** :
`user_id` (optional, to get only one user)
`tag_id` (optional, to get only users with this tag_id)

**Method** : `GET`

**Headers** : `sessiontoken`

### Success Response

**Code** : `200 OK`

**Body Response**

```json
[
  {
    "tags": [
      {
        "_id": "5ed01c9e29bbc45bbc8c7272",
        "tag_name": "tag1"
      },
      {
        "_id": "5ed0112dfbb5ec6350e65d7b",
        "tag_name": "tag2"
      }
    ],
    "_id": "5ecf4990d0671348f4460134",
    "full_name": "fname1",
    "user_name": "username1",
    "user_type": 1,
    "color": "#FFFFFF"
  }
]
```

---

**URL** : `/api/users/myinfo`

**Method** : `GET`

**Headers** : `sessiontoken`

### Success Response

**Code** : `200 OK`

**Body Response**

```json
{
  "_id": "5ecfd7fbd855ac523c29128b",
  "full_name": "superuser",
  "user_name": "superuser",
  "user_type": 4,
  "color": "#000000",
  "tags": []
}
```

---

**URL** : `/api/users`

**Method** : `POST`

**Headers** : `sessiontoken`

**Body** :

```json
{
  "full_name": "fname2",
  "password": "nicepass",
  "user_name": "username2",
  "user_type": 1,
  "color": "#FFFFFF",
  "tags": [
    {
      "_id": "5ed01c9e29bbc45bbc8c7272",
      "tag_name": "tag1"
    }
  ]
}
```

### Success Response

**Code** : `200 OK`

**Body Response**

```json
{
  "_id": "5ed0aff1e8ad142860310b5f",
  "full_name": "fname2",
  "user_name": "username2",
  "user_type": 1,
  "color": "#FFFFFF",
  "tags": ["5ed01c9e29bbc45bbc8c7272"]
}
```

---

**URL** : `/api/users`

**Method** : `PATCH`

**Headers** : `sessiontoken`

**Body** :

```json
{
  "_id": "5ed0b726c9526351943a64fd",
  "full_name": "fname22",
  "user_name": "username2",
  "user_type": 1,
  "color": "#FFFFFF",
  "tags": ["5ed01c9e29bbc45bbc8c7272"]
}
```

### Success Response

**Code** : `200 OK`

**Body Response**

```json
{
  "_id": "5ed0b726c9526351943a64fd",
  "full_name": "fname22",
  "user_name": "username2",
  "user_type": 1,
  "color": "#FFFFFF",
  "tags": ["5ed01c9e29bbc45bbc8c7272"]
}
```

---

**URL** : `/api/users`

**Method** : `DELETE`

**Headers** : `sessiontoken`

**Body** :

```json
{
  "user_id": "5ed0b6aec9526351943a64fc"
}
```

### Success Response

**Code** : `200 OK`

**Body Response**

```json
{
  "_id": "5ed0b6aec9526351943a64fc",
  "full_name": "fname2",
  "user_name": "username2",
  "user_type": 1,
  "color": "#FFFFFF",
  "tags": ["5ed01c9e29bbc45bbc8c7272"]
}
```

---

### Tags

_Get tags information depending on session permissions_

**URL** : `/api/tags`

**Query** :
`tag_id` (optional, to get only users with this tag_id)

**Method** : `GET`

**Headers** : `sessiontoken`

### Success Response

**Code** : `200 OK`

**Body Response**

```json
[
  {
    "_id": "5ed0112dfbb5ec6350e65d7b",
    "tag_name": "tag2"
  },
  {
    "_id": "5ed01c9e29bbc45bbc8c7272",
    "tag_name": "tag1"
  }
]
```

---

**URL** : `/api/tags`

**Method** : `POST`

**Headers** : `sessiontoken`

**Body** :

```json
{
  "tag_name": "tag4"
}
```

### Success Response

**Code** : `200 OK`

**Body Response**

```json
{
  "_id": "5ed0c03b21fd1e48c438d9d8",
  "tag_name": "tag4"
}
```

---

**URL** : `/api/tags`

**Method** : `PATCH`

**Headers** : `sessiontoken`

**Body** :

```json
{
  "_id": "5ed06f0bf877164bc4187865",
  "tag_name": "tag3.1"
}
```

### Success Response

**Code** : `200 OK`

**Body Response**

```json
{
  "_id": "5ed06f0bf877164bc4187865",
  "tag_name": "tag3"
}
```

---

**URL** : `/api/tags`

**Method** : `DELETE`

**Headers** : `sessiontoken`

**Body** :

```json
{
  "_id": "5ed0c03b21fd1e48c438d9d8"
}
```

### Success Response

**Code** : `200 OK`

**Body Response**

```json
{
  "_id": "5ed0c03b21fd1e48c438d9d8",
  "tag_name": "tag4"
}
```

---

---

### Data

_Get data information depending on session permissions_

**URL** : `/api/data`

**Query** :
`user_id` (optional, to get data only from that user)
`tag_id` (optional, to get only users with this tag_id)

**Method** : `GET`

**Headers** : `sessiontoken`

### Success Response

**Code** : `200 OK`

**Body Response**

```json
[
  {
    "_id": "5ed0e690a80cdc4aa4c016c5",
    "user_id": "5ed0e690a80cdc4aa4c016c4",
    "date": "2020-01-01T11:40:16.932Z",
    "income": 457,
    "expense": 591
  }
]
```

---

**URL** : `/api/data`

**Method** : `DELETE`

**Headers** : `sessiontoken`

**Body** :

```json
{
  "id_": "5ed0c0ab21dva48c438d9d8"(optional)
}
```

### Success Response

**Code** : `200 OK`

**Body Response**

```json
{
  "status": "ok"
}
```

---

---

**URL** : `/api/data/all` (only superuser)

**Method** : `DELETE`

**Headers** : `sessiontoken`

### Success Response

**Code** : `200 OK`

**Body Response**

```json
{
  "status": "ok"
}
```

### Error Response

**Code** : `400`

**Body Response**

```json
{
  "status": "nok"
}
```

---

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

### Not Acceptable

**Condition** : Error on missing parameters or some invalid input formats

**Code** : `406 NOT ACCEPTABLE`
