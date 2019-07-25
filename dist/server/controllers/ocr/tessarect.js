"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tesseract = require('node-tesseract');
var config = {
    lang: 'eng',
    oem: 1,
    psm: 3
};
var options = {
    // Use the english and german languages
    l: 'eng+heb'
};
exports.all = {
    textFromImage: function (path, lang) {
        console.log(path);
        // logger.info('Start handling tessarect image conversion to text');
        tesseract.process(path, options, function (err, text) {
            if (err) {
                return console.log('An error occured: ', err);
            }
            console.log('Recognized text:');
            // the text variable contains the recognized text
            console.log(text);
        });
    }
};
//# sourceMappingURL=tessarect.js.map