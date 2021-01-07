# contact-api-with-mongo

## Installing Contact

To install Contact, follow these steps:

Linux and macOS and Windows:
```
git clone git@github.com:herenacreative/contact-api-with-mongo.git
start the sever :
* open file in folder (cd name folder)
* run this command npm install and npm start to start the server.
* Make sure there are no other processes that use port 8082 
* Open postman create http://localhost:8082/api/v1/contact 
* Run app with api testing
 ** Get - http://localhost:8082/api/v1/contact
 ** GetSearchOrPagination - Get - http://localhost:8082/api/v1/contact?page=0&limit=10&search=sin
 ** GetById - Get - http://localhost:8082/api/v1/contact/5ff6c11809276a3d6bd765e5
 ** Post - http://localhost:8082/api/v1/contact
 ** Put - http://localhost:8082/api/v1/contact/5ff6c11809276a3d6bd765e5
 ** Delete - http://localhost:8082/api/v1/contact/5ff6c11809276a3d6bd765e5