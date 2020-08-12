const fs = require('fs');
const { notFound } = require('../');

const file = './junk-file.txt';

fs.readFile(file, (err) => {
	throw notFound('file not found', { cause: err, publicInfo: { file } });
});
