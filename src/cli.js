#!/usr/bin/env node
const {
    mdLinks,
 } = require('./index.js');

const chalk = require('chalk');
const figlet = require('figlet');
const {
    basicStats,
    getStats,
} = require ('./stats.js');

//mostrar banner con un mensaje formado por caracteres
const msn = msn => {
    console.log(chalk.bold.cyan(figlet.textSync(msn, {
        font: 'Star Wars',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    })));
}
// IIFE-Immediately invoked function expression
(async () => {
    msn('Md-Links');
})();

const matriz = process.argv;
const path = matriz[2];
const validate = matriz.includes("--validate");
const stats = matriz.includes("--stats"); 
const help = matriz.includes("--help");

const cli = (path, options) => {
    const {validate, stats} = options

    if (validate && stats){
        return mdLinks(path, {validate: true})
        .then((result) => {
            
            console.table(`Total: ${getStats(result).total}`)
            console.table(`Unique: ${getStats(result).unique}`)
            console.table(`Broken: ${getStats(result).broken}`)
        })

    } if(validate) {
        return mdLinks(path, {validate: true})
        .then((result) => {
            console.table(result)
        })
        .catch(console.error)

    } if (stats){
        return mdLinks(path, {validate: false})
        .then((result) => {
            console.table(`Total: ${basicStats(result).total}`)
            console.table(`Unique: ${basicStats(result).unique}`)
        })
        
    } if (help){
            console.log(chalk.bold.magenta(`
            -------------------------------------------HELP-----------------------------------------
            | --validate         | 'Valida el estado del link'                                     |
            | --stats            | 'Muestra las estadísticas de los links'                         |
            | --stats --validate | 'Realiza la validación y muestra las estadística de los links'  |
            ----------------------------------------------------------------------------------------
            `));

    }else {
        return mdLinks (path, {validate: false})
        .then((result) => {
            console.table(result)
        })
        .catch(console.error)
    }
}

cli(path, {validate: validate, stats, help});
