import * as BlipSdk from "blip-sdk";
import WebSocketTransport from "lime-transport-websocket";
import * as axios from "axios";

let Lime = require("lime-js");

// Put your identifier and access key here
let IDENTIFIER = "testetakeblip3";
let ACCESS_KEY = "RXpXOXhseXJMaENjMkpvS0I5bHY=";
let messageCarousel = [];

// Create a client instance passing the identifier and accessKey of your chatbot
let client = new BlipSdk.ClientBuilder()
    .withIdentifier(IDENTIFIER)
    .withAccessKey(ACCESS_KEY)
    .withTransportFactory(() => new WebSocketTransport())
    .build();

const api = axios.create({
    baseURL: " http://2c0eaa4682a8.ngrok.io/repos",
});

// Connect with server asynchronously
// Connection will occurr via websocket on 8081 port.
client
    .connect() // This method return a 'promise'.
    .then(function(session) {
        // Connection success. Now is possible send and receive envelopes from server. */
    })
    .catch(function(err) {
        /* Connection failed. */
    });


client.addMessageReceiver(
    (m) => m.type != "application/vnd.lime.chatstate+json",
    function(message) {
        messageCarousel[message.from] = {
            id: Lime.Guid(),
            type: "application/vnd.lime.collection+json",
            to: message.from,
            content: {
                itemType: "application/vnd.lime.document-select+json",
                items: [],
            },
        };
        api.get().then((response) => {
            const repos = response.data
            for (const key in repos) {
                generateJsonCarousel(
                    message.from,
                    repos[key]["name"],
                    repos[key]["owner"]["avatar_url"],
                    repos[key]["description"]
                );
            }
            console.log("enviando carrosel");
            sendCarousel(message.from);
        });
    }
);

function generateJsonCarousel(from, Name, Uri, description) {
    messageCarousel[from].content.items.push({
        header: {
            type: "application/vnd.lime.media-link+json",
            value: {
                title: Name,
                type: "image/jpeg",
                uri: Uri,
                text: description,
            },
        },
    });
    return messageCarousel[from];
}

function sendCarousel(from) {
    setTimeout(function() {
        client.sendMessage({
            id: Lime.Guid(),
            to: from,
            type: "text/plain",
            content: "Repositorios",
        });
        client.sendMessage(messageCarousel[from]);
    }, 2000);
}