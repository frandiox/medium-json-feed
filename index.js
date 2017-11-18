const https = require('https');

const fail = (status, error, reject, callback) => {
  const result = { status, error };
  callback instanceof Function && callback(result, result);
  reject(result);
};

module.exports = (endpoint, callback) => {
  const url = `https://medium.com${endpoint}${endpoint.indexOf('?') === -1  ? '?' : '&' }format=json`;

  return new Promise((resolve, reject) => https.get(url, res => {
    if (callback && callback.write instanceof Function) {
      return res.pipe(callback);
    }

    res.statusCode === 200 || fail(res.statusCode, res.statusMessage, reject, callback);

    let data = '';

    res.on('data', chunk => (data += chunk));

    res.on('end', () => {
      try {
        data = data.substr(data.indexOf('{'));
        data = JSON.parse(data);

        const posts =  data
          && data.payload
          && data.payload.references
          && data.payload.references.Post
          && Object.values(data.payload.references.Post);

        if (posts) {
          const result = { status: 200, response: posts };
          callback instanceof Function && callback(result);
          resolve(result);
        } else {
          fail(404, 'Resource not found on Medium.', reject, callback);
        }

      } catch (error) {
        fail(500, error.message, reject, callback);
      }
    });
  }).on('error', error => fail(500, error.message, reject, callback)));
};
