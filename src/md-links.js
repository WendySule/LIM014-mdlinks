
const path = require('path');
const {roadResolve} = require('./main.js');

const apiMdlinks = (route, option) => {
    const pathNormalize = path.normalize(route);
    return roadResolve (pathNormalize);    
};

module.exports = {
    //se exporta la función
    apiMdlinks,

};