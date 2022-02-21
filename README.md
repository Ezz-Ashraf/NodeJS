
# social network website project
## using RESTapi 
### the project is divided into two parts
#### 1-RESTapi(which is considered as the backend )
#### 2-social network (which is frontend)
### -Run both projects using npm start
### -Type npm install in command prompt if it doesn't run(both)
### -Signup first to create a user in the database
### -If you are not using windows OS code will need modification in order to save and load images (remove the replace statements from app.js and feed controller)
### -The frontend project is just a ReactJS template I use (it wasn't coded by me) but I adjusted some URLs and JSON objects in fetch functions
### -I used Nodemon package for live reloading so npm start typically matches nodemon app.js in the RESTapi project
### -I used mongoose package in order to store requests in mongoDB(Kindly attach your mongoDB database link instead of mine at line 7 in Restapi/app.js) 
### -I used cors package to avoid cors errors for(PUT,DELETE) requests


## available features in the project:
### 1-You can (create- view(single post or multiple posts) - edit -delete -upload images- use paginations) all using JSON 
### 2-Storing data in mongoDB and manipulate with it
### 3-Using pagination we can divide objects to multiple pages (2 objects per page)
### 4-The images are encrypted using uuidv4 package and stored in images folder
### 5-Authentication with JsonWebToken 
### 6-View and update user status

# Notes
## Note that the frontend is running on localhost:3000 and the backend on localhost:8080 so they are on different servers as in real-life applications
