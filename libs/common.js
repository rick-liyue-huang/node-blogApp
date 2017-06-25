
const crypto = require('crypto');

module.exports = {

	MD5_suffix: 'haskdhj4jkwH4JKH4JKT4hfjhfHJ4H40jkhf0sdklsdjklsdje4s9ds',

	md5: function(str) {

		let obj = crypto.createHash('md5');

		obj.update(str);

		return obj.digest('hex');
	}
};