"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var base_1 = require("./base");
var invoice_1 = require("../models/invoice");
var tessarect = require("./ocr/tessarect");
var logger_1 = require("../helpers/logger");
var fs = require('fs');
var InvoiceCtrl = /** @class */ (function (_super) {
    tslib_1.__extends(InvoiceCtrl, _super);
    function InvoiceCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = invoice_1.default;
        _this.saveInvoice = function (req, res) {
            console.log(req.body.username);
            var mkdirp = require('mkdirp');
            var base64Data = req.body.image.replace(/^data:image\/png;base64,/, '');
            var folderPath = 'server/assets/invoices/' + req.body.username;
            if (fs.existsSync(folderPath) === false) {
                mkdirp(folderPath, function (err) {
                    console.log(err);
                });
            }
            var imagePath = folderPath + '/' + req.body.imageName;
            fs.writeFile(imagePath, base64Data, 'base64', function (err) {
                if (err != null) {
                    logger_1.logger.error(err);
                    return err.status(400);
                }
                tessarect.all.textFromImage(imagePath, req.body.lang);
                // logger.info('Image as text: ' + textStr);
                return res.status(200);
            });
        };
        return _this;
    }
    return InvoiceCtrl;
}(base_1.default));
exports.default = InvoiceCtrl;
//# sourceMappingURL=invoice.js.map