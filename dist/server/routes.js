"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var jwt = require("jsonwebtoken");
var user_1 = require("./controllers/user");
var comment_1 = require("./controllers/comment");
var comment_2 = require("./models/comment");
var user_2 = require("./models/user");
var checkToken = function (req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        res.send(401);
        return;
    }
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
        if (err) {
            res.send(401);
            return;
        }
        else {
            //check if user on the db
            user_2.default.findOne({ _id: decoded.user._id }, function (err, item) {
                if (err || item == null) {
                    res.send(401);
                    return;
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    });
};
var adminGuard = function (req, res, next) {
    if (req.decoded.user.role === "admin") {
        return next();
    }
    res.send(401);
};
var loginGuard = function (req, res, next) {
    if (req.decoded.user.role) {
        return next();
    }
    res.send(401);
};
var selfUser = function (req, res, next) {
    console.log("self:", req.params.id);
    if (req.params.id === req.decoded.user._id || req.decoded.user.role === "admin") {
        return next();
    }
    res.send(401);
};
var selfComment = function (req, res, next) {
    comment_2.default.findOne({ _id: req.params.id }, function (err, comment) {
        if (err || comment == null) {
            return res.send(401);
        }
        if (comment.user == req.decoded.user._id || req.decoded.user.role === "admin") {
            return next();
        }
        return res.send(401);
    });
};
function setRoutes(app) {
    var router = express.Router();
    var userCtrl = new user_1.default();
    var commentCtrl = new comment_1.default();
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
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map