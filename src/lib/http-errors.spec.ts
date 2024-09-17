import test, { ExecutionContext } from 'ava';
import { badRequest, internal, unauthorized, paymentRequired, forbidden, notFound, methodNotAllowed, notAcceptable, proxyAuthRequired, clientTimeout, conflict, resourceGone, lengthRequired, preconditionFailed, entityTooLarge, uriTooLong, unsupportedMediaType, rangeNotSatisfiable, expectationFailed, teapot, badData, locked, failedDependency, tooEarly, preconditionRequired, tooManyRequests, illegal, notImplemented, badGateway, serverUnavailable, gatewayTimeout, serverError } from './http-errors';
import { HttpError, HttpErrorResponse } from './http-error';
import { CError } from '@jdpnielsen/contextual-error';

const factories = [
	{ factory: badRequest, statusCode: 400, name: 'BadRequestError', errorMessage: 'Bad Request' },
	{ factory: unauthorized, statusCode: 401, name: 'unauthorizedError', errorMessage: 'Unauthorized' },
	{ factory: paymentRequired, statusCode: 402, name: 'PaymentRequiredError', errorMessage: 'Payment Required' },
	{ factory: forbidden, statusCode: 403, name: 'ForbiddenError', errorMessage: 'Forbidden' },
	{ factory: notFound, statusCode: 404, name: 'NotFoundError', errorMessage: 'Not Found' },
	{ factory: methodNotAllowed, statusCode: 405, name: 'MethodNotAllowedError', errorMessage: 'Method Not Allowed' },
	{ factory: notAcceptable, statusCode: 406, name: 'NotAcceptableError', errorMessage: 'Not Acceptable' },
	{ factory: proxyAuthRequired, statusCode: 407, name: 'ProxyAuthRequiredError', errorMessage: 'Proxy Authentication Required' },
	{ factory: clientTimeout, statusCode: 408, name: 'ClientTimeoutError', errorMessage: 'Request Time-out' },
	{ factory: conflict, statusCode: 409, name: 'ConflictError', errorMessage: 'Conflict' },
	{ factory: resourceGone, statusCode: 410, name: 'ResourceGoneError', errorMessage: 'Gone' },
	{ factory: lengthRequired, statusCode: 411, name: 'LengthRequiredError', errorMessage: 'Length Required' },
	{ factory: preconditionFailed, statusCode: 412, name: 'PreconditionFailedError', errorMessage: 'Precondition Failed' },
	{ factory: entityTooLarge, statusCode: 413, name: 'EntityTooLargeError', errorMessage: 'Request Entity Too Large' },
	{ factory: uriTooLong, statusCode: 414, name: 'UriTooLongError', errorMessage: 'Request-URI Too Large' },
	{ factory: unsupportedMediaType, statusCode: 415, name: 'UnsupportedMediaTypeError', errorMessage: 'Unsupported Media Type' },
	{ factory: rangeNotSatisfiable, statusCode: 416, name: 'RangeNotSatisfiableError', errorMessage: 'Requested Range Not Satisfiable' },
	{ factory: expectationFailed, statusCode: 417, name: 'ExpectationFailedError', errorMessage: 'Expectation Failed' },
	{ factory: teapot, statusCode: 418, name: 'TeapotError', errorMessage: 'I\'m a teapot' },
	{ factory: badData, statusCode: 422, name: 'BadDataError', errorMessage: 'Unprocessable Entity' },
	{ factory: locked, statusCode: 423, name: 'LockedError', errorMessage: 'Locked' },
	{ factory: failedDependency, statusCode: 424, name: 'FailedDependencyError', errorMessage: 'Failed Dependency' },
	{ factory: tooEarly, statusCode: 425, name: 'TooEarlyError', errorMessage: 'Too Early' },
	{ factory: preconditionRequired, statusCode: 428, name: 'PreconditionRequiredError', errorMessage: 'Precondition Required' },
	{ factory: tooManyRequests, statusCode: 429, name: 'TooManyRequestsError', errorMessage: 'Too Many Requests' },
	{ factory: illegal, statusCode: 451, name: 'IllegalError', errorMessage: 'Unavailable For Legal Reasons' },
	{ factory: serverError, statusCode: 500, name: 'InternalError', errorMessage: 'Internal Server Error' },
	{ factory: internal, statusCode: 500, name: 'InternalError', errorMessage: 'Internal Server Error' },
	{ factory: notImplemented, statusCode: 501, name: 'NotImplementedError', errorMessage: 'Not Implemented' },
	{ factory: badGateway, statusCode: 502, name: 'BadGatewayError', errorMessage: 'Bad Gateway' },
	{ factory: serverUnavailable, statusCode: 503, name: 'ServerUnavailableError', errorMessage: 'Service Unavailable' },
	{ factory: gatewayTimeout, statusCode: 504, name: 'GatewayTimeoutError', errorMessage: 'Gateway Time-out' },
];

function titleBuilder(providedTitle = '', input: typeof factories[number]) {
	return `[${input.factory.name}] ${providedTitle}`;
}

function buildsResponseMacro(t: ExecutionContext, input: typeof factories[number], expected: HttpErrorResponse) {
	const error = input.factory();
	t.deepEqual(error.toJSON(), expected);
}
buildsResponseMacro.title = titleBuilder;

function publicInfoMacro(t: ExecutionContext, input: typeof factories[number] & { info: Record<string, string>, message: string }, expected: HttpErrorResponse) {
	const error = input.factory(input.message, {
		publicInfo: input.info,
	});
	t.deepEqual(error.toJSON(), expected);
}
publicInfoMacro.title = titleBuilder;

function stringifyMacro(t: ExecutionContext, input: typeof factories[number], expected: string) {
	const error = input.factory();
	t.deepEqual(error.toString(), expected);
}
stringifyMacro.title = titleBuilder;

function causeMacro(t: ExecutionContext, input: typeof factories[number] & { cause: Error }, expected: Error) {
	const error = input.factory(input.errorMessage, {
		cause: input.cause,
	});
	t.deepEqual(HttpError.getCause(error), expected);
}
causeMacro.title = titleBuilder;

function isHttpErrorMacro(t: ExecutionContext, input: typeof factories[number]) {
	const error = input.factory(input.errorMessage);
	t.is(CError.isCError(error), true);
	t.is(HttpError.isHttpError(error), true);
}
isHttpErrorMacro.title = titleBuilder;

for (const error of factories) {
	test('should build expected response', buildsResponseMacro, error, { statusCode: error.statusCode, error: error.errorMessage });
	test('should stringify correctly', stringifyMacro, error, `${error.name}: ${error.errorMessage}`);
	test('should handle public info', publicInfoMacro, Object.assign({ info: { foo: 'bar' }, message: 'testing' }, error), { statusCode: error.statusCode, error: error.errorMessage, message: 'testing', info: { foo: 'bar' } });
	const err = new Error('testing');
	test('should handle cause', causeMacro, Object.assign({ cause: err }, error), err);
	test('should be a HttpError', isHttpErrorMacro, error);
}
