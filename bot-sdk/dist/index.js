"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var BlipSdk = _interopRequireWildcard(require("blip-sdk"));

var _limeTransportWebsocket = _interopRequireDefault(require("lime-transport-websocket"));

var axios = _interopRequireWildcard(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Lime = require("lime-js"); // Put your identifier and access key here


var IDENTIFIER = "testetakeblip3";
var ACCESS_KEY = "RXpXOXhseXJMaENjMkpvS0I5bHY=";
var messageCarousel = []; // Create a client instance passing the identifier and accessKey of your chatbot

var client = new BlipSdk.ClientBuilder().withIdentifier(IDENTIFIER).withAccessKey(ACCESS_KEY).withTransportFactory(function () {
  return new _limeTransportWebsocket["default"]();
}).build();
var api = axios.create({
  baseURL: " http://2c0eaa4682a8.ngrok.io/repos"
}); // Connect with server asynchronously
// Connection will occurr via websocket on 8081 port.

client.connect() // This method return a 'promise'.
.then(function (session) {// Connection success. Now is possible send and receive envelopes from server. */
})["catch"](function (err) {
  /* Connection failed. */
});
client.addMessageReceiver(function (m) {
  return m.type != "application/vnd.lime.chatstate+json";
}, function (message) {
  messageCarousel[message.from] = {
    id: Lime.Guid(),
    type: "application/vnd.lime.collection+json",
    to: message.from,
    content: {
      itemType: "application/vnd.lime.document-select+json",
      items: []
    }
  };
  api.get().then(function (response) {
    var repos = response.data;

    for (var key in repos) {
      generateJsonCarousel(message.from, repos[key]["name"], repos[key]["owner"]["avatar_url"], repos[key]["description"]);
    }

    console.log("enviando carrosel");
    sendCarousel(message.from);
  });
});

function generateJsonCarousel(from, Name, Uri, description) {
  messageCarousel[from].content.items.push({
    header: {
      type: "application/vnd.lime.media-link+json",
      value: {
        title: Name,
        type: "image/jpeg",
        uri: Uri,
        text: description
      }
    }
  });
  return messageCarousel[from];
}

function sendCarousel(from) {
  setTimeout(function () {
    client.sendMessage({
      id: Lime.Guid(),
      to: from,
      type: "text/plain",
      content: "Repositorios"
    });
    client.sendMessage(messageCarousel[from]);
  }, 2000);
}