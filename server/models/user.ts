import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
import Comment from './comment';

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  role: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

// Before saving the user, hash the password
userSchema.pre('save', function(next) {
  const user = this;
  user.role = 'user';
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

// Auto populate comments
userSchema.pre('findOne', function(next) {
  this.populate('comments');
  next();
});

userSchema.statics.getRolesCount = function (callback) {
  return new Promise((resolve, reject) => {
    this.aggregate({"$group" : {
      _id : '$role', 
      count : {$sum : 1 }
    }
  }).exec((err, results) => {
        if (err) {
            return reject(err);
        }
        return resolve({ results });
    });
  });
}

// Delete all comments by user
userSchema.pre('remove', function(next) {
  Comment.remove({ user: this._id }, next);
});

const User = mongoose.model('User', userSchema);

export default User;
