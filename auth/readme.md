docker image name: rupamswain1/auth

##APIS

#SignuP

```
/users/signup/

body:
{
    "email":"abcqras.com",
    "password":1
}


```

Error Message Srtucture:
{
"error": [
{
"message": "Please provide a valid Email",
"field": "email"
},
{
"message": "Please provide a valid password with length between 4 to 11",
"field": "password"
}
]
}
