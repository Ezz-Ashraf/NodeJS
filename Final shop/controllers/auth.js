const User = require('../models/user');
const bcrypt = require('bcryptjs');
exports.getLoginPage = (req, res, next) => {
//const loggedIn =req.get('Cookie').split(';')[2].trim().split('=')[1];
  console.log(req.session);
    res.render('auth/login', {
      pageTitle:'Login Page',
      path: '/login',
      isAuthenticated:req.session.loggedIn
    });
  };
  exports.postLoginPage = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email})
    .then(user =>{
      if(!user)
      {
        return res.redirect('/login');
      }
      bcrypt.compare(password,user.Upassword).then(doMatch =>{
        if(doMatch) {
        req.session.loggedIn=true;
        req.session.user=user;
      return  req.session.save(err=>{
          console.log(err);
          res.redirect('/');
        });
      }
        else {
          res.redirect('/login');
        }
        });
      }).catch(err => console.log(err));
//res.setHeader('Set-Cookie','loggedIn=true');
    };

    exports.postLogout = (req, res, next) => {
    req.session.destroy((err)=> {
      console.log(err);
      res.redirect('/');
    });
  };
  exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      isAuthenticated: false
    });
  };

  exports.postSignup = (req, res, next) => {
    name = req.body.username;
    email = req.body.email;
    password = req.body.password;
    confirmPassword = req.body.confirmPassword;
    User.findOne({email: email}).then(userDoc => { //check if the email is repeated
      if(userDoc || password != confirmPassword)
      {
        return res.redirect('/signup');
    }

  return    bcrypt.hash(password,12).then(hashedPassword => {
        const user = new User({
          name:name,
          email:email,
          Upassword:hashedPassword,
          cart:{
            items: []
          }
        });
        return user.save();
      }) }).then(result => res.redirect('/login')).catch(err => console.log(err));
  };
