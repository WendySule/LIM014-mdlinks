//Contabiliza links: Total, Unique
const basicStats = (linksOutput) => {
    const totalLinkStats = linksOutput.length;
    const uniqueLinkStats = [...new Set(linksOutput.map((allLinks) => allLinks.href))].length;
    return { total: totalLinkStats, unique: uniqueLinkStats };
};

//contabiliza links: Total, Unique and Broken
//SET: objeto set permite almacenar valores únicos de cualquier tipo
const getStats = (linksOutput) => { 
    const totalLinkStats = linksOutput.length;
    const uniqueLinkStats = [...new Set(linksOutput.map((allLinks) => allLinks.href))].length;
    const brokenLinkStats = linksOutput.filter((element) => element.statusText === 'Fail').length;
    return { total: totalLinkStats, unique: uniqueLinkStats, broken: brokenLinkStats};  
    
};

module.exports = {
    basicStats,
    getStats
};