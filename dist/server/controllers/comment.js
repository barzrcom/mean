"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var comment_1 = require("../models/comment");
var base_1 = require("./base");
var CommentCtrl = /** @class */ (function (_super) {
    tslib_1.__extends(CommentCtrl, _super);
    function CommentCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = comment_1.default;
        return _this;
    }
    return CommentCtrl;
}(base_1.default));
exports.default = CommentCtrl;
//# sourceMappingURL=comment.js.map