import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import UserCtrl from './controllers/user';
import CommentCtrl from './controllers/comment';
import Comment from './models/comment';
import User from './models/user';

let checkToken = (req, res, next) => {
  
  let token = req.headers.authorization;
  
  if (!token) {
    res.send(401);
    return;
  }
  
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      res.send(401);
      return;
    } else {
      //check if user on the db
      User.findOne({ _id: decoded.user._id }, (err, item) => {
        if (err || item == null) { 
          res.send(401);
          return;
         } else {
          req.decoded = decoded;
          next();
         }
      }); 
    }
  });
};

let adminGuard = (req, res, next) => {
  if (req.decoded.user.role === "admin") {
    return next();
  }
  res.send(401);
}

let loginGuard = (req, res, next) => {
  if (req.decoded.user.role) {
    return next();
  }
  res.send(401);
}

let selfUser = (req, res, next) => {
  console.log("self:", req.params.id)
  if (req.params.id === req.decoded.user._id || req.decoded.user.role === "admin") {
    return next();
  }
  res.send(401);
}

let selfComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id }, (err, comment) => {
    if (err || comment == null) { 
      return res.send(401);
    }
    if (comment.user == req.decoded.user._id || req.decoded.user.role === "admin") {
      return next();
    }
    return res.send(401);
  });
}

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();
  const commentCtrl = new CommentCtrl();

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/user').post(userCtrl.insert);
  router.route('/users').all(checkToken).all(adminGuard).get(userCtrl.getAll);
  router.route('/users/roles_count').all(checkToken).all(adminGuard).get(userCtrl.rolesCount);
  router.route('/user/:id').all(checkToken).all(selfUser).get(userCtrl.get);
  router.route('/user/:id').all(checkToken).all(selfUser).put(userCtrl.update);
  router.route('/user/:id').all(checkToken).all(adminGuard).delete(userCtrl.delete);

  // Comment
  router.route('/comment').all(checkToken).all(loginGuard).post(commentCtrl.insert);
  router.route('/comment/:id').all(checkToken).all(selfComment).get(commentCtrl.get);
  router.route('/comment/:id').all(checkToken).all(selfComment).put(commentCtrl.update);
  router.route('/comment/:id').all(checkToken).all(selfComment).delete(commentCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
