const https = require('https');
const queryString = require('querystring');
const WebSocket = require('ws');
const config = require('../config/config');
const { assets: cryptos, allowedAppIds } = require('../utils/Constants');

let mockedAll = require('../mocks/all.json');
const { randomIntFromInterval } = require('../utils/Constants');

let socketInterval;

async function WebsocketServer(expressServer) {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: '/websockets',
  });

  expressServer.on('upgrade', (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit('connection', websocket, request);
    });
  });

  websocketServer.on('connection', (websocketConnection, connectionRequest) => {
    const [, params] =
      (connectionRequest &&
        connectionRequest.url &&
        connectionRequest.url.split('?')) ||
      [];
    const connectionParams = queryString.parse(params);
    if (
      !connectionParams.appId ||
      !allowedAppIds.includes(connectionParams.appId)
    ) {
      websocketConnection.send('Not allowed');
      return websocketConnection.close();
    }

    websocketConnection.on('close', () => {
      console.log('Client disconnected');
      clearInterval(socketInterval);
    });

    socketInterval = setInterval(() => {
      mockedAll[0].metrics.market_data.price_usd = randomIntFromInterval(
        19000,
        20000
      );
      mockedAll[0].metrics.market_data.percent_change_usd_last_1_hour = randomIntFromInterval(
        -5,
        5
      );
      mockedAll[0].metrics.market_data.percent_change_usd_last_24_hours = randomIntFromInterval(
        -10,
        10
      );
      mockedAll[1].metrics.market_data.price_usd = randomIntFromInterval(
        1500,
        2500
      );
      mockedAll[1].metrics.market_data.percent_change_usd_last_1_hour = randomIntFromInterval(
        -5,
        5
      );
      mockedAll[1].metrics.market_data.percent_change_usd_last_24_hours = randomIntFromInterval(
        -10,
        10
      );
      mockedAll[2].metrics.market_data.price_usd = randomIntFromInterval(0, 2);
      mockedAll[2].metrics.market_data.percent_change_usd_last_1_hour = randomIntFromInterval(
        -5,
        5
      );
      mockedAll[2].metrics.market_data.percent_change_usd_last_24_hours = randomIntFromInterval(
        -10,
        10
      );
      websocketConnection.send(JSON.stringify(mockedAll));
      /*
      https
        .request(
          {
            host: config.messariApiUrl
              .replace('https://', '')
              .replace('/api/v1', ''),
            path: `/api/v1/assets?fields=${cryptos.defaultFields.join(',')}`,
            headers: { 'x-messari-api-key': config.messariApiKey },
          },
          (response) => {
            let str = '';
            response.on('data', (chunk) => (str += chunk));
            response.on('end', () => {
              const strJson = JSON.parse(str);
              let filteredCryptos = [];
              if (strJson.data) {
                filteredCryptos =
                  strJson.data.filter((item) =>
                    Object.values(cryptos.required).includes(item.slug)
                  ) || [];
              }
              websocketConnection.send(JSON.stringify(filteredCryptos));
            });
          }
        )
        .end();
        */
    }, 3000);
  });

  return websocketServer;
}

module.exports = WebsocketServer;
