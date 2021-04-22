// Import the file system module (acceso al sistema de archivo) 
const fs = require('fs');
// Import path (módulo que contiene utilidades para trabajar con rutas de fichero).
const path = require('path');
//Import axios
const axios = require('axios');

// Demostrar si es una ruta válida
const fileExists = (route) => fs.existsSync(route);

// Demostrar si la ruta es absoluta
    // ruta relativa
const roadAbsolute2 = (route) => path.isAbsolute(route);

    //convertir de ruta relativa a absoluta
const roadResolve= (route) => path.resolve(route);

    // ruta absoluta
const roadAbsolute = (route) => path.isAbsolute(route);

// Demostrar si es un archivo
     // Es un directorio
 const isFile2 = (route) => fs.lstatSync(route).isFile();

      // leer el directorio (retorna un array de archivos)
  const readDirectory = (route) => fs.readdirSync(route);

     // Es un archivo            
 const isFile = (route) => fs.lstatSync(route).isFile();

 // Demostrar si es un archivo md
     //Es un archivo md
 const isFileMd = (route) => path.extname(route) === '.md';

//guardar ruta del archivo md en un array.
const filePaths = (route) => {
  let arrayFiles = [];
  if (isFile(route)) {
    arrayFiles.push(route);
  } else{
    readDirectory(route).forEach((file) => {
      const fullPath = path.join(route, file);
      const recursiveFunction = filePaths(fullPath);
      arrayFiles = arrayFiles.concat(recursiveFunction);
      
    });
  }
  
  const mdFile = arrayFiles.filter((type) => path.extname (type) === '.md');
  return mdFile;   
};
//console.log('arrayPathMdFile:', filePaths(pathAbsolute));

//Leer el archivo y demostrar si tiene links
 const readFile = (route) => fs.readFileSync(route, {encoding:'utf8', flag:'r'});

// Almacenar los links en un array
// almacene valores file, href y text
const mdFileLinks = (theLinks) => {
  const linksArray = [];
  const routeResolve = roadResolve(theLinks);
  filePaths(routeResolve).forEach((file) => {
    const regularExpression = /\[(.*)\]\(((?!#).+)\)/gi;
    const carpeta = readFile(file).match(regularExpression);
      if (carpeta !== null) {     
      
      // console.log('verlink', readFile(file).match(regularExpression), file);
      const fileLinks = readFile(file).match(regularExpression).map((x) => x.split('](')[1].slice(0, -1));
      const filetext = readFile(file).match(regularExpression).map((x) => x.split('](')[0].slice(1));
          fileLinks.forEach((link, i) => {
          linksArray.push({
            href: link,
            text: filetext[i],
            file,
          });
        });
    }
  });
    return linksArray;
};

// Crear función que valide los links. Realiza petición HTTP y retorna un array de cinco propiedades (href, text, file, status, ok or fail).

  const validateTheLinks = (theLink) => {
  const allLinks = theLink.map((element) => (axios.get(element.href)
    .then((result) => {
      
      return {
        ...element,
        status: result.status,
        statusText: 'Ok',
      };
    })     
  
    .catch(() => ({
      ...element,
      status: 404,
      statusText: 'Fail',
    
    }))
    
  ));
  return Promise.all(allLinks);
  
};

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
    readDirectory,
    filePaths,
    mdFileLinks,
    validateTheLinks
  };
