import HttpError from './http-error';
import { Info } from '@jdpnielsen/contextual-error';

export function badRequest(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(400, 'Bad Request', message, input?.publicInfo, {
		name: 'BadRequestError',
		constructorOpt: badRequest,
		info: input?.info,
		cause: input?.cause,
	});
}

export function unauthorized(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(401, 'Unauthorized', message, input?.publicInfo, {
		name: 'unauthorizedError',
		constructorOpt: unauthorized,
		info: input?.info,
		cause: input?.cause,
	});
}

export function paymentRequired(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(402, 'Payment Required', message, input?.publicInfo, {
		name: 'PaymentRequiredError',
		constructorOpt: paymentRequired,
		info: input?.info,
		cause: input?.cause,
	});
}

export function forbidden(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(403, 'Forbidden', message, input?.publicInfo, {
		name: 'ForbiddenError',
		constructorOpt: forbidden,
		info: input?.info,
		cause: input?.cause,
	});
}

export function notFound(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(404, 'Not Found', message, input?.publicInfo, {
		name: 'NotFoundError',
		constructorOpt: notFound,
		info: input?.info,
		cause: input?.cause,
	});
}

export function methodNotAllowed(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(405, 'Method Not Allowed', message, input?.publicInfo, {
		name: 'MethodNotAllowedError',
		constructorOpt: methodNotAllowed,
		info: input?.info,
		cause: input?.cause,
	});
}

export function notAcceptable(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(406, 'Not Acceptable', message, input?.publicInfo, {
		name: 'NotAcceptableError',
		constructorOpt: notAcceptable,
		info: input?.info,
		cause: input?.cause,
	});
}

export function proxyAuthRequired(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(407, 'Proxy Authentication Required', message, input?.publicInfo, {
		name: 'ProxyAuthRequiredError',
		constructorOpt: proxyAuthRequired,
		info: input?.info,
		cause: input?.cause,
	});
}

export function clientTimeout(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(408, 'Request Time-out', message, input?.publicInfo, {
		name: 'ClientTimeoutError',
		constructorOpt: clientTimeout,
		info: input?.info,
		cause: input?.cause,
	});
}

export function conflict(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(409, 'Conflict', message, input?.publicInfo, {
		name: 'ConflictError',
		constructorOpt: conflict,
		info: input?.info,
		cause: input?.cause,
	});
}

export function resourceGone(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(410, 'Gone', message, input?.publicInfo, {
		name: 'ResourceGoneError',
		constructorOpt: resourceGone,
		info: input?.info,
		cause: input?.cause,
	});
}

export function lengthRequired(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(411, 'Length Required', message, input?.publicInfo, {
		name: 'LengthRequiredError',
		constructorOpt: lengthRequired,
		info: input?.info,
		cause: input?.cause,
	});
}

export function preconditionFailed(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(412, 'Precondition Failed', message, input?.publicInfo, {
		name: 'PreconditionFailedError',
		constructorOpt: preconditionFailed,
		info: input?.info,
		cause: input?.cause,
	});
}

export function entityTooLarge(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(413, 'Request Entity Too Large', message, input?.publicInfo, {
		name: 'EntityTooLargeError',
		constructorOpt: entityTooLarge,
		info: input?.info,
		cause: input?.cause,
	});
}

export function uriTooLong(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(414, 'Request-URI Too Large', message, input?.publicInfo, {
		name: 'UriTooLongError',
		constructorOpt: uriTooLong,
		info: input?.info,
		cause: input?.cause,
	});
}

export function unsupportedMediaType(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(415, 'Unsupported Media Type', message, input?.publicInfo, {
		name: 'UnsupportedMediaTypeError',
		constructorOpt: unsupportedMediaType,
		info: input?.info,
		cause: input?.cause,
	});
}

export function rangeNotSatisfiable(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(416, 'Requested Range Not Satisfiable', message, input?.publicInfo, {
		name: 'RangeNotSatisfiableError',
		constructorOpt: rangeNotSatisfiable,
		info: input?.info,
		cause: input?.cause,
	});
}

export function expectationFailed(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(417, 'Expectation Failed', message, input?.publicInfo, {
		name: 'ExpectationFailedError',
		constructorOpt: expectationFailed,
		info: input?.info,
		cause: input?.cause,
	});
}

export function teapot(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(418, 'I\'m a teapot', message, input?.publicInfo, {
		name: 'TeapotError',
		constructorOpt: teapot,
		info: input?.info,
		cause: input?.cause,
	});
}

export function badData(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(422, 'Unprocessable Entity', message, input?.publicInfo, {
		name: 'BadDataError',
		constructorOpt: badData,
		info: input?.info,
		cause: input?.cause,
	});
}

export function locked(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(423, 'Locked', message, input?.publicInfo, {
		name: 'LockedError',
		constructorOpt: locked,
		info: input?.info,
		cause: input?.cause,
	});
}

export function failedDependency(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(424, 'Failed Dependency', message, input?.publicInfo, {
		name: 'FailedDependencyError',
		constructorOpt: failedDependency,
		info: input?.info,
		cause: input?.cause,
	});
}

export function tooEarly(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(425, 'Too Early', message, input?.publicInfo, {
		name: 'TooEarlyError',
		constructorOpt: tooEarly,
		info: input?.info,
		cause: input?.cause,
	});
}

export function preconditionRequired(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(428, 'Precondition Required', message, input?.publicInfo, {
		name: 'PreconditionRequiredError',
		constructorOpt: preconditionRequired,
		info: input?.info,
		cause: input?.cause,
	});
}

export function tooManyRequests(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(429, 'Too Many Requests', message, input?.publicInfo, {
		name: 'TooManyRequestsError',
		constructorOpt: tooManyRequests,
		info: input?.info,
		cause: input?.cause,
	});
}

export function illegal(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(451, 'Unavailable For Legal Reasons', message, input?.publicInfo, {
		name: 'IllegalError',
		constructorOpt: illegal,
		info: input?.info,
		cause: input?.cause,
	});
}

// 5xx Server Errors
export function serverError(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(500, 'Internal Server Error', message, input?.publicInfo, {
		name: 'InternalError',
		constructorOpt: internal,
		info: input?.info,
		cause: input?.cause,
	});
}

export function internal(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(500, 'Internal Server Error', message, input?.publicInfo, {
		name: 'InternalError',
		constructorOpt: internal,
		info: input?.info,
		cause: input?.cause,
	});
}

export function notImplemented(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(501, 'Not Implemented', message, input?.publicInfo, {
		name: 'NotImplementedError',
		constructorOpt: notImplemented,
		info: input?.info,
		cause: input?.cause,
	});
}

export function badGateway(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(502, 'Bad Gateway', message, input?.publicInfo, {
		name: 'BadGatewayError',
		constructorOpt: badGateway,
		info: input?.info,
		cause: input?.cause,
	});
}

export function serverUnavailable(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(503, 'Service Unavailable', message, input?.publicInfo, {
		name: 'ServerUnavailableError',
		constructorOpt: serverUnavailable,
		info: input?.info,
		cause: input?.cause,
	});
}

export function gatewayTimeout(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(504, 'Gateway Time-out', message, input?.publicInfo, {
		name: 'GatewayTimeoutError',
		constructorOpt: gatewayTimeout,
		info: input?.info,
		cause: input?.cause,
	});
}
