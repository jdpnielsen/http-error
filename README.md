# Http Error: rich http errors

[![Build Status](https://travis-ci.org/jdpnielsen/http-error.svg?branch=master)](https://travis-ci.org/jdpnielsen/http-error)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

The Http Error module is an extension of [Contextual Error](https://github.com/jdpnielsen/contextual-error), inspired by Hapi's [Boom](git@github.com:hapijs/boom.git).
The module allows wrapping of errors in a safe way, and delegate the handling to a centralized errorhandler without loosing important context.

# Quick start

First, install the package:

    npm install @jdpnielsen/http-error

You can use the built in factory functions to wrap downstream errors:

```typescript
import { notFound } from '@jdpnielsen/http-error';

server.get('/:id', {}, async function getIndex(request, response) {
  let document;

  try {
    document = await fsPromises.readFile(join(__dirname, './index.html'));
  } catch(error) {
    if (error.code === 'ENOENT') {
      throw notFound('Index file not found', { cause: error, publicInfo: { file: './index.html' } })
    } else {
      throw serverError('Something went wrong while reading index file', { cause: error })
    }
  }

  /* ... */
});
```

if the thrown error is logged the result should be something like:

```sh
HttpError [NotFoundError]: Index file not found
    at getIndex (/home/folder/request.js:12:10) {
  info: {},
  shortMessage: 'Index file not found',
  cause: [Error: ENOENT: no such file or directory, open '/home/folder/index.html'] {
    errno: -2,
    code: 'ENOENT',
    syscall: 'open',
    path: '/home/folder/index.html'
  },
  statusCode: 404,
  response: {
    statusCode: 404,
    error: 'Not Found',
    message: 'Index file not found',
    info: { file: './index.html' }
  }
}
```

Assuming some kind of errorhandler is mounted, which stringifies the error, the http response should be:

```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Index file not found",
  "info": { "file": "./index.html" }
}
```
# Factory function api

```typescript
type FactoryFunction = (message?: string, { cause?: Error, publicInfo?: Object, info?: Object }) => HttpError;
```

| Param name | Type   | Meaning                                        |
|------------|--------|----------------------------------------------- |
| message    | string | Error message                                  |
| cause      | Error  | Downstream error. Will not show up in response |
| publicInfo | object | Info which should be included in response.     |
| info       | object | Info which should be included for debugging. Will not be included in response. |


## Available factory functions

| export | statusCode | message |
|--------|------------|---------|
| badRequest | 400 | Bad Request |
| unauthorized | 401 | Unauthorized |
| paymentRequired | 402 | Payment Required |
| forbidden | 403 | Forbidden |
| notFound | 404 | Not Found |
| methodNotAllowed | 405 | Method Not Allowed |
| notAcceptable | 406 | Not Acceptable |
| proxyAuthRequired | 407 | Proxy Authentication Required |
| clientTimeout | 408 | Request Time-out |
| conflict | 409 | Conflict |
| resourceGone | 410 | Gone |
| lengthRequired | 411 | Length Required |
| preconditionFailed | 412 | Precondition Failed |
| entityTooLarge | 413 | Request Entity Too Large |
| uriTooLong | 414 | Request-URI Too Large |
| unsupportedMediaType | 415 | Unsupported Media Type |
| rangeNotSatisfiable | 416 | Requested Range Not Satisfiable |
| expectationFailed | 417 | Expectation Failed |
| teapot | 418 | I\'m a teapot |
| badData | 422 | Unprocessable Entity |
| locked | 423 | Locked |
| failedDependency | 424 | Failed Dependency |
| tooEarly | 425 | Too Early |
| preconditionRequired | 428 | Precondition Required |
| tooManyRequests | 429 | Too Many Requests |
| illegal | 451 | Unavailable For Legal Reasons |
| serverError | 500 | Internal Server Error |
| internal | 500 | Internal Server Error |
| notImplemented | 501 | Not Implemented |
| badGateway | 502 | Bad Gateway |
| serverUnavailable | 503 | Service Unavailable |
| gatewayTimeout | 504 | Gateway Time-out |

## Custom HttpErrors

The HttpError Base class is available and can either be extended or used to create new factory functions:

```typescript
import HttpError from '@jdpnielsen/http-error';
import { Info } from '@jdpnielsen/contextual-error';

export function custom(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(500, 'Custom', message, input?.publicInfo, input?.cause, {
		name: 'customError',
		constructorOpt: custom,
		info: input?.info,
	});
}
```
