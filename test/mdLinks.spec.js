const path =require('path');
const route = require('../src/api.js');
const axios = require('axios');

jest.mock('axios');

const pathAbsolute = path.resolve('./checkDirectory');
const pathFile = './checkDirectory/dataFile.js';
const pathMd = path.resolve('./checkDirectory/checkReadme.md');
const mdNoLinks = path.resolve('./checkDirectory/checkFile.md');

const arrFileMd = [    
    'C:\\Users\\Wendy\\Desktop\\LIM014-mdlinks\\checkDirectory\\checkFile.md',
    'C:\\Users\\Wendy\\Desktop\\LIM014-mdlinks\\checkDirectory\\checkReadme.md',
];

const arrContainLinks = [
    {
     href: 'https://es.wikipedia.org/wiki/Markdown',
     text: 'Markdown',
     file: pathMd,
   },
   {
     href: 'https://github.com/markedjs/marked',
     text: 'marked',
     file: pathMd,
   },
    {
     href: 'https://github.com/workshopper/learnyounode',
     text: 'learnyounode',
     file: pathMd,
   },
   {
    href: '-',
    text: 'instagram',
    file: pathMd,
  },
  {
    href: 'th/tps://ww.googwle.co',
    text: 'google',
    file: pathMd,
  },
];

//Para validar la ruta
describe('Función para validar ruta', () => {
    
    it('Debería ser una función', () => {
        expect(typeof route.fileExists).toBe('function');
    });
    it('Debería retornar true si la ruta es válida', () => {
        expect(route.fileExists('./checkDirectory')).toBe(true);
    });
    it('Debería retornar false si la ruta no es válida', () => {
        expect(route.fileExists('./checkDirectorx')).toBe(false);
    });
});

//Validar Y Obtener ruta absoluta
describe('Función para demostrar la ruta absoluta', () => {
    it('Debería ser una función', () => {
        expect(typeof route.roadAbsolute).toBe('function');
    });
    it('Debería retornar true si la ruta es absoluta', () => {
        expect(route.roadAbsolute(pathAbsolute)).toBe(true);
    });
    it('Debería retornar false si la ruta no es absoluta', () => {
        expect(route.roadAbsolute('./checkDirectory')).toBe(false);
    });
});

//Convertir a absoluta 
describe('Función para convertir una ruta relativa a absoluta', () => {
    it('Debería ser una función', () => {
        expect(typeof route.roadResolve).toBe('function');
    });
    it('Debería retornar una ruta absoluta al ingresar una ruta absoluta', () => {
        expect(route.roadResolve(pathAbsolute)).toBe(pathAbsolute);
    });
    it('Debería retornar una ruta absoluta al ingresar una ruta relativa', () => {
        expect(route.roadResolve('./checkDirectory')).toBe(pathAbsolute);
    });
});

//verificar si es un archivo
describe('Función para demostrar si es un archivo', () => {
    it('Debería ser una función', () => {
        expect(typeof route.isFile).toBe('function');
    });
    it('Debería retornar true si la ruta es un archivo', () => {
        expect(route.isFile(pathFile)).toBe(true);
    });
    it('Debería retornar false si la ruta es un archivo', () => {
        expect(route.isFile(pathAbsolute)).toBe(false);
    });
});

//Verificar si es un archivo de extensión MD
describe('Demostrar si es un archivo md', () => {
    it('Debería ser una función', () => {
        expect(typeof route.isFileMd).toBe('function');
    });
    it('Debería retornar true si es un archivo md', () => {
        expect(route.isFileMd(pathMd)).toBe(true);
    });
    it('Debería retornar false si no es un archivo md', () => {
        expect(route.isFileMd(pathFile)).toBe(false);
    });
});

//Obtener file md de una ruta dada
describe('Obtener ruta del archivo md', () => {
    it('Debería ser una función', () => {
        expect(typeof route.filePaths).toBe('function');
    });
    it('Debería devolver un array vacío si no contiene un archivo md', () => {
        expect(route.filePaths(pathFile)).toEqual([]);
    });
    it('Debería guardar la ruta del archivo md en un array', () => {
        expect(route.filePaths(pathAbsolute)).toEqual(arrFileMd);
    });    
});

//obtener links de un archivo md
describe('Obtener los links de un archivo md', () => {
    it('Debería ser una función', () => {
        expect(typeof route.mdFileLinks).toBe('function');
    });
    it('Debería devolver un array vacío si el archivo md no contiene links', () => {
        expect(route.mdFileLinks(mdNoLinks)).toEqual([]);
    });
    it('Debería obtener un array vacío si el archivo md contiene links', () => {
        expect(route.mdFileLinks(pathMd)).toEqual(arrContainLinks);
    });    
});

//Demostrar la validación fail de links
describe('Obtener los links de un archivo md', () => {
    it('Debería ser una función', () => {
        expect(typeof route.mdFileLinks).toBe('function');
    });
    it('Debería devolver un array vacío si el archivo md no contiene links', () => {
        expect(route.mdFileLinks(mdNoLinks)).toEqual([]);
    });
    it('Debería obtener un array vacío si el archivo md contiene links', () => {
        expect(route.mdFileLinks(pathMd)).toEqual(arrContainLinks);
    });    
});

//Demostrar la validación ok de links
describe('Validación de links', () => {
    it('Debería ser una función', () => {
        expect(typeof route.validateTheLinks).toBe('function');
    });
    it('Debería devolver un array con 5 propiedades, status ok', () => {
            const pathLinks = [
                {
                href: 'https://es.wikipedia.org/wiki/Markdown',
                text: 'Markdown',
                file: 'C:\\Users\\Wendy\\Desktop\\LIM014-mdlinks\\checkDirectory\\checkReadme.md'
            } 
        ]
            const pathOutput = [
            {
                href: 'https://es.wikipedia.org/wiki/Markdown',
                text: 'Markdown',
                file: 'C:\\Users\\Wendy\\Desktop\\LIM014-mdlinks\\checkDirectory\\checkReadme.md',
                status: 200,
                statusText: 'Ok',
            }
        ]
            const axiosResolve = {
                status: 200,
                statusText: 'Ok'
            }
            
            axios.get.mockResolvedValue(axiosResolve)
                return route.validateTheLinks(pathLinks).then((data) => { expect(data).toEqual(pathOutput)
                }); 
    })
});

//Demostrar la validación fail de links
describe('Validación de links', () => {
    it('Debería ser una función', () => {
        expect(typeof route.validateTheLinks).toBe('function');
    });
    it('Debería devolver un array con 5 propiedades, status fail', () => {
            const pathLinks2 = [
                {
                href: 'th/tps://ww.googwle.co',
                text: 'google',
                file: 'C:\\Users\\Wendy\\Desktop\\LIM014-mdlinks\\checkDirectory\\checkReadme.md'
            } 
        ]
            const pathOutput2 = [
            {
                href: 'th/tps://ww.googwle.co',
                text: 'google',
                file: 'C:\\Users\\Wendy\\Desktop\\LIM014-mdlinks\\checkDirectory\\checkReadme.md',
                status: 404,
                statusText: 'Fail',
            }
        ]
            const axiosResolve2 = {
                status: 404,
                statusText: 'Fail'
            }
            
            axios.get.mockRejectedValue(axiosResolve2)
                return route.validateTheLinks(pathLinks2).then((data) => { expect(data).toEqual(pathOutput2)
                }); 
    })
});