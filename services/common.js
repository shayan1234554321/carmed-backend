const randtoken = require('rand-token');

module.exports.getRandomKey = function(){
    return randtoken.generate(16);
}