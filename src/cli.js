#!/usr/bin/env node

const {
    mdLinks,
 } = require('./index.js');

const {
    basicStats,
    getStats,
} = require ('./stats.js');

const matriz = process.argv;
const path = matriz[2];
const validate = matriz.includes("--validate");
const stats = matriz.includes("--stats"); 

const cli = (path, options) => {
    const {validate, stats} = options

    if (validate && stats){
        return mdLinks(path, {validate: true})
        .then((result) => {
            
            console.log(getStats(result));
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
    }else {
        return mdLinks (path, {validate: false})
        .then((result) => {
            console.table(result)
        })
        .catch(console.error)
    }
}

cli(path, {validate: validate, stats});
