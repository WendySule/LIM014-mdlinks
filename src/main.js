// Import the file system module (acceso al sistema de archivo) 
const fs = require('fs');
// Import path (módulo que contiene utilidades para trabajar con rutas de fichero).
const path = require('path');
//rutas 
const pathAbsolute = 'C:\\Users\\Wendy\\Desktop\\LIM014-mdlinks\\checkDirectory\\checkReadme.md';

const pathRelative = './checkReadme.md';

const pathDirectory = 'checkDirectory'

// Demostrar si es una ruta válida
const fileExists = (route) => fs.existsSync(route);
console.log('fileExists?:', fileExists(pathAbsolute));

// Demostrar si la ruta es absoluta
    // ruta relativa
const roadAbsolute2 = (route) => path.isAbsolute(route);
console.log('isAbsolute?:', roadAbsolute2(pathRelative));

    //convertir de ruta relativa a absoluta
const roadResolve= (route) => path.resolve(route);
console.log('resolve:', roadResolve(pathRelative));

    // ruta absoluta
const roadAbsolute = (route) => path.isAbsolute(route);
console.log('isAbsolute?:', roadAbsolute(pathAbsolute));

// Demostrar si es un archivo
     // Es un directorio
 const isFile2 = (route) => fs.lstatSync(route).isFile();
 console.log( 'isFile?:', isFile2(pathDirectory) );

     // Es un archivo            
 const isFile = (route) => fs.lstatSync(route).isFile();
 console.log( 'isFile?:', isFile(pathAbsolute));

 // Demostrar si es un archivo md
     //Es un archivo md
 const isFileMd = (route) => path.extname(route) === '.md';
 console.log('isFileMd?:', isFileMd(pathRelative));

 //Leer el archivo y demostrar si tiene links
 const readFile = (route) => fs.readFileSync(route, {encoding:'utf8', flag:'r'});
  console.log('readFile:', readFile(pathAbsolute));

 //Búsqueda de links
 const findLinks = (textFile) => {
     //construcción de expresiones regulares
     const container = readFile(textFile);
     const regularExpression = /https?:\/\/[a-zA-Z\.\/=]+/g
     const theLink = container.match(regularExpression);
     return theLink;
 };
console.log('linksFound:', findLinks(pathAbsolute));

//   exportar funciones
  module.exports = {
    fileExists,
    roadAbsolute,
    roadAbsolute2,
    roadResolve,
    isFile,
    isFile2,
    isFileMd,
    readFile,
    findLinks
  }
