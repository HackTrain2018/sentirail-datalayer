module.exports = {
  refund: {
    matches: /refund/,
    responses: [
      "Hi there, we are very sorry to hear your journey was delayed recently. Standard compensation for delays between 60-119 minutes is an e-voucher or refund of 25% the face value cost of the affected leg; this is correct under the policy and as outlined within Conditions of Carriage.",
      "Hello, here's the link to claim compensation. You will see that there is a link for a voucher or for a partial refund; https://compensation.eurostar.com/",
      "Good evening. In order to claim as a cash refund, please visit https://compensation.eurostar.com/. Kind regards."
    ]
  },

  wifi: {
    matches: /wifi/,
    responses: [
      "Hi, we are sorry to hear your having problems with our WiFi. We are aware of the lack of signal in some parts of our routes and are currently exploring alternative solutions. Sorry for the inconvenience.",
      "Hi, please accept our apologies for the problems with the wifi. We are actively working on the issues.",
      "Hi, we have intermittent issues with the wifi. Please accept our apologies. We are actively working on solutions.",
      "Hello, we're very sorry for the difficulties you've had connecting to our WiFi. We're aware of some technical issues affecting this, in addition to areas of poor signal en route, both of which our engineers are working to resolve as soon as possible.",
      "Hello, we're sorry for the absence of WiFi on board. We're aware of some technical issues affecting our Wifi connectivity, and we're working closely with our engineers and network providers to resolve these as well as areas of poor network coverage en route.",
      "Hello, we are very sorry that the Wifi is not working. We are currently working on improving this."
    ]
  },

  cold: {
    matches: /cold/,
    responses: [
      "Hello, we're sorry to hear you're finding your carriage a little cold. Please do speak to our colleagues on board, they'll be able to take a look for you.",
      "Hi, I am sorry to hear that you are feeling cold. Please head down to the catering carriage and they will contact the train manager for you to look into this.",
      "Hi, We are sorry to hear that its a bit colder then you expected. If you speak to a member of staff they might be able to help you out"
    ]
  },

  aircon: {
    matches: /aircon|air con|air condition/,
    responses: [
      "Hi, you'll need to speak to the train manager, they should be able to turn down the Aircon.",
      "There is not aircon issue signalled for your train, we advise that you speak to your Train Manager on their way through the train. They may be able to adjust the levels for you.",
      "We are sorry to hear the air conditioning is making you uncomfortable. If you would please mention this to a member of staff on the train, they may be able to adjust this."
    ]
  },

  delay: {
    matches: /delay/,
    responses: [
      "We do apologise for the delay and disruption to your journey today.",
      "Hi John, we're very sorry about the recent delays due to cancelled trains and apologise for the inconvenience caused.",
      "Hello, we're sorry for the delays today caused by operational problems, we will update you as soon as we can.",
      "We apologise for the delay to your journey today",
      "Delays are never welcome - and can be for any duration and for a variety of reasons. Every effort is made to mitigate the effects where possible."
    ]
  },

  toilet: {
    matches: /toilet/,
    responses: [
      "Hello, we're concerned to hear this - whereabouts are the toilets in question, so we can ensure this is addressed ASAP?",
      "It would seem that the toilets are out of order. Have you tried a little further down the train in a different carriage? We apologise for the inconvenience.",
      "You will find other toilets on the coaches either side. If you've not already, please do mention to onboard staff so we can close facility and redirect customers. We will also pass on. Thank you."
    ]
  }
};
