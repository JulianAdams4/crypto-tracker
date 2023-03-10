const axios = require('axios');
const https = require('https');
const ApiException = require('./exception');
const config = require('../../config/config');
const pick = require('../../utils/pick');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

class ApiConnection {
  constructor() {
    this.apiKey = config.messariApiKey;
    this.baseUrl = config.messariApiUrl;
    this.METHOD = {
      GET: 'get',
      POST: 'post',
      PUT: 'put',
      DELETE: 'delete',
    };
  }

  async call({ headers, params }, endpoint, method = 'get') {
    try {
      const reqHeaders = {
        ...pick(headers, ['Accept']),
        'x-messari-api-key': this.apiKey,
      };
      const restResponse = await axios[method](this.baseUrl + endpoint, {
        headers: reqHeaders,
        httpsAgent,
        params,
      });
      if (restResponse.status !== 200) {
        throw new ApiException(restResponse.status, 0, {});
      }
      return restResponse;
    } catch (error) {
      console.log('Error: ', error);
      throw new ApiException(500, 0, error);
    }
  }
}

const singleInstance = new ApiConnection();

module.exports = singleInstance;
