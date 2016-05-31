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


