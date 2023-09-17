const path = require('path');

function goIndex(req, res) {
    const filePath = path.join(__dirname, '../../client/index.html')
    res.sendFile(filePath);
}

module.exports = { goIndex };