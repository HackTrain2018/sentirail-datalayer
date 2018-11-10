const Twitter = require("twitter");

interface Tweet {
  text: string;
}

const tw = require("./tweet.json");

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

function answer(status: string, inReplyToStatusId?: number) {
  const reply = inReplyToStatusId
    ? { in_reply_to_status_id: inReplyToStatusId, auto_populate_reply_metadata: true }
    : {};

  client.post("statuses/update", { status, ...reply }, (_error: any, tweet: Tweet, _response: any) => {
    console.log(tweet);
  });
}

// answer("Sorry, let me understand your issue more", tw.id_str);

function search() {
  client.get("search/tweets", { q: "@MichalZalecki" }, function(_error: any, tweets: { statuses: Tweet[] }, _response: any) {
    tweets.statuses.forEach(tweet => console.log(tweet.text));
  });
}

// search();

function stream() {
  client.stream("statuses/filter", { track: "@MichalZalecki" }, function(stream: any) {
    stream.on("data", function(tweet: Tweet) {
      console.log(tweet);
    });

    stream.on("error", function(error: Error) {
      console.log(error);
    });
  });
}

// stream();
