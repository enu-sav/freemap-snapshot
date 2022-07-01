# Freemap Snapshot

Server for creating map snapshots

## Installation

1. Install NodeJS 14 or above
1. In this directory run `npm i`

## Running

1. In this directory run `PORT=8080 node .`

## HTTP REST API

Request:

- Method: POST
- Path: /
- Content-Type: application/json
- Body: JSON object with properties:
  - `url` - URL of the page to snapshot, for example https://www.freemap.sk/?map=13/48.622667/20.884063&layers=X&osm-relation=2384692
  - `viewport` - object with [viewport properties](https://puppeteer.github.io/puppeteer/docs/puppeteer.viewport)
  - `screenshot` - optional object with [screenshot properties](https://puppeteer.github.io/puppeteer/docs/puppeteer.screenshotoptions), default `{ type: "jpeg", quality: 90 }`
  - `searchResultStyle` - optional object with [style of the search result](https://leafletjs.com/reference.html#path-option)

Response:

- image
