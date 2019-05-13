"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var user_1 = require("./user");
var commentSchema = new mongoose.Schema({
    date: Date,
    title: String,
    message: String,
    rate: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
// After saving the comment, add ref to user
commentSchema.post('save', function (next) {
    var comment = this;
    // add id to user
    user_1.default.findOneAndUpdate({ _id: comment.user }, { $push: { comments: comment } }, function (err) {
        if (err) {
            return console.error(err);
        }
    });
});
// Auto populate user
commentSchema.pre('find', function (next) {
    this.populate('user');
    next();
});
commentSchema.pre('remove', function (next) {
    user_1.default.update({ _id: this.user }, { $pull: { comments: this._id } }, { multi: true });
    next();
});
var Comment = mongoose.model('Comment', commentSchema);
exports.default = Comment;
//# sourceMappingURL=comment.js.map