# Final shop website project
## To run project type npm start if there are missing packages type npm install or install them manually:-
this is my final website project using mongoose package and ejs for rendring after using (mysql2,sequelize ,mongodb) and with added properties of **sessions and cookies , authentication and secured routes**
## After running the project:-
### The website is at localhost:3000
### Sign up then you can add products which their data + the user's data are both stored in mongoDB so adjust the url at the app.js file line 10 
### Then log in to start your session
### You can logout to destroy your session

## Available features
### 1 -add and remove products
### 2-add and remove objects to and from cart
### 3-preview previous orders
### 4-Only the user who added a product can delete or edit it (Advanced Authentication)
### 5-CSRF Token protection added 
### 6-Protected Routes
### 7-It was planned to add to the checkout page payment methods using stripe but I preferred to separate it to another project

## The SQL commands file is for mysql so ignore it

# Used packages:
###    "bcryptjs": "^2.4.3",
###    "body-parser": "^1.19.1",
###    "connect-mongodb-session": "^3.1.1",
###    "csurf": "^1.11.0",
###    "ejs": "^3.1.6",
###    "express": "^4.17.2",
###    "express-session": "^1.17.2",
###    "mongodb": "^4.3.0",
###    "mongoose": "^6.1.6",
###    "multer": "^1.4.4",
###    "nodemon": "^2.0.15",
###    "uuid": "^8.3.2
