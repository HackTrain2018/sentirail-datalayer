import axios from "axios";
const Sentiment = require("sentiment");
const Twitter = require("twitter");

interface Tweet {
  text: string;
  id_str: string;
  user: {
    screen_name: string;
  }
}

interface Responses {
  [key: string]: { matches: RegExp, responses: string[] };
}

// const tw = require("./tweet.json");
const responses: Responses = require("./responses");
const sentiment = new Sentiment();

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

function answer(status: string, inReplyToStatusId?: number | string) {
  const reply = inReplyToStatusId
    ? { in_reply_to_status_id: inReplyToStatusId, auto_populate_reply_metadata: true }
    : {};

  client.post("statuses/update", { status, ...reply }, (_error: any, tweet: Tweet, _response: any) => {
    console.log(`Created tweet: ${tweetUrl(tweet)}`);
  });
}

// answer("Sorry, let me understand your issue more", tw.id_str);

function search() {
  client.get("search/tweets", { q: "@MichalZalecki" }, function(_error: any, tweets: { statuses: Tweet[] }, _response: any) {
    tweets.statuses.forEach((tweet) => {
      console.log(`Previous tweet: ${tweetUrl(tweet)}`)
    });
  });
}

search();

/*
 * Streaming
 */

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomElement(arr: any[]) {
  return arr[random(0, arr.length - 1)];
}


function tweetUrl(tweet: Tweet) {
  return `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
}

function getMatchingResponse(keywords: string[]) {
  const result = Object.values(responses).find(({ matches }) => {
    return !!(keywords.find(k => !!k.match(matches)));
  });

  return result ? randomElement(result.responses) : null;
}

async function getTweetKeywords(tweet: Tweet) {
  const url = `https://westeurope.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases`;
  const headers = { "Ocp-Apim-Subscription-Key": process.env.OCP_APIM_SUBSCRIPTION_KEY };
  const res = await axios.post<{ documents: { id: string, keyPhrases: string[] }[] }>(
    url,
    { documents: [{ id: tweet.id_str, text: tweet.text }] },
    { headers }
  );

  return res.data.documents[0].keyPhrases;
}

async function getTweetSentiment(tweet: Tweet) {
  return sentiment.analyze(tweet.text).comparative;
}

// getTweetSentiment(tw);

async function handleIncomingTweet(tweet: Tweet) {
  const keywords = await getTweetKeywords(tweet);
  const response = await getTweetSentiment(tweet) < 0
    ? getMatchingResponse(keywords)
    : "Thank you! We're glad that you enjoy traveling with Eurostar!";

  if (response) {
    answer(response, tweet.id_str);
  }
}

// handleIncomingTweet(tw);

function stream() {
  client.stream("statuses/filter", { track: "@MichalZalecki" }, function(stream: any) {
    stream.on("data", function(tweet: Tweet) {
      console.log(`Incoming tweet: ${tweetUrl(tweet)}`);

      handleIncomingTweet(tweet);
    });

    stream.on("error", function(error: Error) {
      console.log(error);
    });
  });
}

stream();
