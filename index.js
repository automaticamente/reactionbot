import dotenv from 'dotenv';
dotenv.config();

import { writeFileSync } from 'fs';
import { spawn } from 'child_process';
import { sample } from 'lodash';

import collector from './lib/collector';
import downloader from './lib/downloader';
import writer from './lib/writer';

import quotes from './data/quotes.json';

function buildMedia() {
  return new Promise((resolve, reject) => {
    const combinator = spawn('./combinator.sh');

    combinator.on('close', code => {
      if (code !== 0) return reject('Error building final Media');
      return resolve(code);
    });
  });
}

(async function() {
  try {
    const gifResponse = await collector();
    const gifURL = gifResponse.data.data.images.original.url;

    const gifBuffer = await downloader(gifURL);

    writeFileSync('./tmp/out.gif', gifBuffer.data);

    const q = quotes.filter(q => q.quote.length < 150);

    console.log(q.length);

    const quote = await writer(
      sample(q)
    );

    writeFileSync('./tmp/quote.png', quote);

    await buildMedia();

    console.log('Lets tweet that shite');
  } catch (e) {
    console.error(e);
  }
})();
