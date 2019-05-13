"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var comment_1 = require("./comment");
var userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: String,
    role: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});
// Before saving the user, hash the password
userSchema.pre('save', function (next) {
    var user = this;
    user.role = 'user';
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};
// Omit the password when returning a user
userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password;
        return ret;
    }
});
// Auto populate comments
userSchema.pre('findOne', function (next) {
    this.populate('comments');
    next();
});
userSchema.statics.getRolesCount = function (callback) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.aggregate({ "$group": {
                _id: '$role',
                count: { $sum: 1 }
            }
        }).exec(function (err, results) {
            if (err) {
                return reject(err);
            }
            return resolve({ results: results });
        });
    });
};
// Delete all comments by user
userSchema.pre('remove', function (next) {
    comment_1.default.remove({ user: this._id }, next);
});
var User = mongoose.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map