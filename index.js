import dotenv from 'dotenv';
dotenv.config();

import { writeFileSync } from 'fs';
import { spawn } from 'child_process';
import { sample } from 'lodash';
import { join } from 'path';
import { CronJob } from 'cron';

import collector from './lib/collector';
import downloader from './lib/downloader';
import writer from './lib/writer';
import Tweeter from './lib/tweeter';

import quotes from './data/quotes.json';

const t = new Tweeter({
  consumer_key: process.env['CONSUMER_KEY'],
  consumer_secret: process.env['CONSUMER_SECRET'],
  access_token: process.env['ACCESS_TOKEN'],
  access_token_secret: process.env['ACCESS_TOKEN_SECRET']
});

function buildMedia() {
  return new Promise((resolve, reject) => {
    const combinator = spawn('./combinator.sh');

    combinator.on('close', code => {
      if (code !== 0) return reject('Error building final Media');
      return resolve(code);
    });
  });
}

async function generateTweet() {
  try {
    const gifResponse = await collector();
    const gifURL = gifResponse.data.data.images.original.url;

    const gifBuffer = await downloader(gifURL);

    writeFileSync('./tmp/out.gif', gifBuffer.data);

    const q = quotes.filter(q => q.quote.length < 200);

    const chosenQuote = sample(q);

    const quote = await writer(chosenQuote);

    writeFileSync('./tmp/quote.png', quote);

    await buildMedia();

    const tweetID = await t.tweetVideo(
      chosenQuote.quote,
      join(__dirname, 'tmp/result.mp4')
    );

    process.stdout.write(`
      done!
      Text: ${chosenQuote.quote}do
      Link: https://twitter.com/${
        process.env['BOT_TWITTER_USER']
      }/status/${tweetID}\n
      `);
  } catch (e) {
    console.error(e);
  }
}

new CronJob('0 0 */4 * * *', generateTweet, null, true, 'Europe/Madrid');

generateTweet();