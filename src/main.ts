/* eslint-disable no-console */
const request = require('request');
const cheerio = require('cheerio');
import schemes from './colorSchemes'

const user = 'async-devil';
const url = `https://github.com/users/${user}/contributions`;

let contributions:string[];
const contributionsFiltered:Object[] = [];

type Data = {
  color: string,
  contributions: string,
  date: string,
}

function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName]; //& Thanks to official docs
}

const filter = (array:string) => {
  const colorMatch = (string:string) => {
    const scheme = "default";
    const selectedScheme = getProperty(schemes, scheme)
    
    if (string.search('-L1-') !== -1) return selectedScheme.colorL1;
    if (string.search('-L2-') !== -1) return selectedScheme.colorL2;
    if (string.search('-L3-') !== -1) return selectedScheme.colorL3; //^ Don't know if this is a bad code or not
    if (string.search('-L4-') !== -1) return selectedScheme.colorL4; //TODO: Make it more beautiful or smth
    if (string.search('day-bg') !== -1) return selectedScheme.colorBg;

    return selectedScheme.colorErr;
  };
  const buffer = array
    .replace(/<.*?var\(/gm, '')
    .replace(/(")/gm, '') //^ This look gross, I dunno how to make it smaller
    .replace(/(\))/gm, '') //TODO: Make it simpler
    .replace(/data.*?=/gm, '')
    .replace(/(>)/, '')
    .split(' ');

  const filtered:Data = {
    color: colorMatch(buffer[0]),
    contributions: buffer[1],
    date: buffer[2],
  };

  return filtered;
};

request(url, (error:any, response:any, body:any) => {
  if (!error) {
    const $ = cheerio.load(body);

    contributions = $('g').find('rect').toString().split('</rect>');

    for (let i = 0; i < contributions.length; i += 1) {
      contributionsFiltered.push(filter(contributions[i])); 
    }

    console.log(contributionsFiltered[369]);
  } else {
    throw new Error(error);
  }
});

export {contributionsFiltered as default};