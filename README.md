# Medium JSON Feed

> Get [Medium](https://medium.com/) latest articles in JSON format

Medium's public API is quite limited and it is not possible to fetch data from browsers due to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issue. Use this package in your server to get JSON article list from Medium or fork and deploy this minimum server to Heroku or another PaaS.

## Installation

```
npm install medium-json-feed --save
```

## Usage

Gets the user/publication name and an optional callback or stream. Returns a promise.

```typescript
mediumJSONFeed(endpoint: string, callback?: Function | Stream): Promise
```

Simple example:

```javascript
const mediumJSONFeed = require('medium-json-feed');

// Usernames start with '@'
mediumJSONFeed('@my-user-name')
  .then(data => ...)
  .catch(data => ...);

// Publication names without '@'
mediumJSONFeed('my-publication-name', data => ...);

// Medium's top page (trending posts)
mediumJSONFeed().then(data => ...);
```

Other endpoint examples are `@user-name/latest`, `publication-name/latest` or `publication-name/trending`.

The `data` response contains:

* `data.status`: HTTP status code (**number**).
* `data.error`: Error message if exists (**string**).
* `data.response`: List of found articles (**Array**). The format is the one returned by Medium. Inspect `data.response[...].content` and `data.response[...].virtuals` for useful information.

To get the full raw response given by Medium, provide a stream:

```javascript
// Raw stream pipe to stdout
mediumJSONFeed('@my-user-name', process.stdout);

// Raw stream pipe to server's response
mediumJSONFeed('@my-user-name', response);
```

***Note**: the raw output will likely contain random chacters at the beginning of the string that break JSON format.*

For a full example, see `server.js` file.

## Live demo (hopefully)

See [The Web Tub's trending articles](https://medium-json-feed.herokuapp.com/the-web-tub/trending) or [Mikeal Roger's latest articles](https://medium-json-feed.herokuapp.com/@mikeal/latest).

## Deploying to Heroku

1. Clone this repo.
2. Create a new app in your [Heroku](https://heroku.com) account.
3. Choose GitHub deploy and select your fork.
4. Set environment variables `PORT` and `ORIGIN` (for `Access-Control-Allow-Origin` header).
5. Hit 'deploy'.
