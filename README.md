# OAUTH2NETANGULARTSECM5
An example of Token Bearer Authentication using Web Api 2.2, OAUTH 2.o and Angular 1.5.5 in Typescript Transpiled ECM5 for Current cross browser compatibility.

To register a new user just use Postman for example and issue the following payload in the body of the POST request at

https://localhost:44370/api/account/register       (Note https is handled in IISEXPRESS)

{
  "userName": "diegomary",
  "password": "password",
  "confirmPassword": "password",
  "notes":"This is a very good user and he is going to buy a lot of things",
  "firstName":"Diego",
  "lastName" :"Burlando",
  "email":"diego@dmm888.com",
  "phoneNumber":"0039010508076"
}


Then we can get a token using the application frontend and lastly we can access the protected resource with the token obtained
The request for the token is a POST request:

https://localhost:44370/token
The content-type is application/x-www-form-urlencoded and the three field of data are:
grant_type  = password
username 
password


Once gotten the token the protected resource can be accessed: at https://localhost:44370/api/flowers  using a GET call

and using the following headers:

Accept:application/json
Content Type: application/json
Authorization: Bearer sv7audtKusxWEza26F3BFOFf4ut7bCU3VS7HhoTevalJZhepZT765Q7ddYxtLXVNb9NaBQHbWBeEuzyzsIqSfw9VLAqJKrOvaHRAMHBfaJ4oxix06KcPmB_aujiyR1d-9zzieQ-_9XY_hYnZJKOLW52GQu-beUBq_Y6gs6vTAxE10jnwCoGhsrlzw7BqdmN_Fz1wsp0vDdlsCFtLRGBuhX2M29GSMG40mAu-7ontnS4






