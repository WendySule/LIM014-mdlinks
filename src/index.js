const api = require('./api.js');

const mdLinks = (route, options = {validate: false}) => new Promise((resolve, reject) => {

    if (options.validate === true) {
        resolve(api.validateTheLinks(api.mdFileLinks(route)));
    }
    
    if (options.validate === false) {
        if(api.fileExists(route)) {
            if (!api.roadAbsolute(route)) {
                resolve(api.roadResolve(route));
            }
        }
        if (api.roadResolve(route)) {
            if (api.filePaths(route)) {
                resolve (api.mdFileLinks(route));
            }
        }
    } else {
        reject ("Esta ruta no existe");
    }
});

//se exporta la función
module.exports = {    
    mdLinks,
};