const request = require('request');
const cheerio = require('cheerio');

const user = 'async-devil';
const url = `https://github.com/users/${user}/contributions`;
let contributions;

request(url, (error, response, body) => {
  if (!error) {
    const $ = cheerio.load(body);
    contributions = $('g').find('rect').toString();
    contributions = contributions.split('</rect>');
    const contributionsFiltered = [];
    for (let i = 0; i < contributions.length; i += 1) {
      if (contributions[i].search('data-count="0"') !== -1) {
        contributionsFiltered.push(contributions[i].replace(/<.*?var\(/gm, ""));
      }
    }
    console.log(contributions[0].replace(/<.*?var\(/gm, "").replace(/(")/gm, "").replace(/(\))/gm, "").replace(/(=)/gm, ""));
  } else {
    throw new Error(error);
  }
});
