import HttpError from './http-error';
import { Info } from '@jdpnielsen/contextual-error';

export function badRequest(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(400, 'Bad Request', message, input?.publicInfo, input?.cause, {
		name: 'BadRequestError',
		constructorOpt: badRequest,
		info: input?.info,
	});
}

export function unauthorized(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(401, 'Unauthorized', message, input?.publicInfo, input?.cause, {
		name: 'unauthorizedError',
		constructorOpt: unauthorized,
		info: input?.info,
	});
}

export function paymentRequired(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(402, 'Payment Required', message, input?.publicInfo, input?.cause, {
		name: 'PaymentRequiredError',
		constructorOpt: paymentRequired,
		info: input?.info,
	});
}

export function forbidden(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(403, 'Forbidden', message, input?.publicInfo, input?.cause, {
		name: 'ForbiddenError',
		constructorOpt: forbidden,
		info: input?.info,
	});
}

export function notFound(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(404, 'Not Found', message, input?.publicInfo, input?.cause, {
		name: 'NotFoundError',
		constructorOpt: notFound,
		info: input?.info,
	});
}

export function methodNotAllowed(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(405, 'Method Not Allowed', message, input?.publicInfo, input?.cause, {
		name: 'MethodNotAllowedError',
		constructorOpt: methodNotAllowed,
		info: input?.info,
	});
}

export function notAcceptable(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(406, 'Not Acceptable', message, input?.publicInfo, input?.cause, {
		name: 'NotAcceptableError',
		constructorOpt: notAcceptable,
		info: input?.info,
	});
}

export function proxyAuthRequired(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(407, 'Proxy Authentication Required', message, input?.publicInfo, input?.cause, {
		name: 'ProxyAuthRequiredError',
		constructorOpt: proxyAuthRequired,
		info: input?.info,
	});
}

export function clientTimeout(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(408, 'Request Time-out', message, input?.publicInfo, input?.cause, {
		name: 'ClientTimeoutError',
		constructorOpt: clientTimeout,
		info: input?.info,
	});
}

export function conflict(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(409, 'Conflict', message, input?.publicInfo, input?.cause, {
		name: 'ConflictError',
		constructorOpt: conflict,
		info: input?.info,
	});
}

export function resourceGone(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(410, 'Gone', message, input?.publicInfo, input?.cause, {
		name: 'ResourceGoneError',
		constructorOpt: resourceGone,
		info: input?.info,
	});
}

export function lengthRequired(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(411, 'Length Required', message, input?.publicInfo, input?.cause, {
		name: 'LengthRequiredError',
		constructorOpt: lengthRequired,
		info: input?.info,
	});
}

export function preconditionFailed(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(412, 'Precondition Failed', message, input?.publicInfo, input?.cause, {
		name: 'PreconditionFailedError',
		constructorOpt: preconditionFailed,
		info: input?.info,
	});
}

export function entityTooLarge(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(413, 'Request Entity Too Large', message, input?.publicInfo, input?.cause, {
		name: 'EntityTooLargeError',
		constructorOpt: entityTooLarge,
		info: input?.info,
	});
}

export function uriTooLong(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(414, 'Request-URI Too Large', message, input?.publicInfo, input?.cause, {
		name: 'UriTooLongError',
		constructorOpt: uriTooLong,
		info: input?.info,
	});
}

export function unsupportedMediaType(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(415, 'Unsupported Media Type', message, input?.publicInfo, input?.cause, {
		name: 'UnsupportedMediaTypeError',
		constructorOpt: unsupportedMediaType,
		info: input?.info,
	});
}

export function rangeNotSatisfiable(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(416, 'Requested Range Not Satisfiable', message, input?.publicInfo, input?.cause, {
		name: 'RangeNotSatisfiableError',
		constructorOpt: rangeNotSatisfiable,
		info: input?.info,
	});
}

export function expectationFailed(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(417, 'Expectation Failed', message, input?.publicInfo, input?.cause, {
		name: 'ExpectationFailedError',
		constructorOpt: expectationFailed,
		info: input?.info,
	});
}

export function teapot(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(418, 'I\'m a teapot', message, input?.publicInfo, input?.cause, {
		name: 'TeapotError',
		constructorOpt: teapot,
		info: input?.info,
	});
}

export function badData(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(422, 'Unprocessable Entity', message, input?.publicInfo, input?.cause, {
		name: 'BadDataError',
		constructorOpt: badData,
		info: input?.info,
	});
}

export function locked(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(423, 'Locked', message, input?.publicInfo, input?.cause, {
		name: 'LockedError',
		constructorOpt: locked,
		info: input?.info,
	});
}

export function failedDependency(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(424, 'Failed Dependency', message, input?.publicInfo, input?.cause, {
		name: 'FailedDependencyError',
		constructorOpt: failedDependency,
		info: input?.info,
	});
}

export function tooEarly(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(425, 'Too Early', message, input?.publicInfo, input?.cause, {
		name: 'TooEarlyError',
		constructorOpt: tooEarly,
		info: input?.info,
	});
}

export function preconditionRequired(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(428, 'Precondition Required', message, input?.publicInfo, input?.cause, {
		name: 'PreconditionRequiredError',
		constructorOpt: preconditionRequired,
		info: input?.info,
	});
}

export function tooManyRequests(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(429, 'Too Many Requests', message, input?.publicInfo, input?.cause, {
		name: 'TooManyRequestsError',
		constructorOpt: tooManyRequests,
		info: input?.info,
	});
}

export function illegal(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(451, 'Unavailable For Legal Reasons', message, input?.publicInfo, input?.cause, {
		name: 'IllegalError',
		constructorOpt: illegal,
		info: input?.info,
	});
}

// 5xx Server Errors
export function serverError(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(500, 'Internal Server Error', message, input?.publicInfo, input?.cause, {
		name: 'InternalError',
		constructorOpt: internal,
		info: input?.info,
	});
}

export function internal(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(500, 'Internal Server Error', message, input?.publicInfo, input?.cause, {
		name: 'InternalError',
		constructorOpt: internal,
		info: input?.info,
	});
}

export function notImplemented(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(501, 'Not Implemented', message, input?.publicInfo, input?.cause, {
		name: 'NotImplementedError',
		constructorOpt: notImplemented,
		info: input?.info,
	});
}

export function badGateway(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(502, 'Bad Gateway', message, input?.publicInfo, input?.cause, {
		name: 'BadGatewayError',
		constructorOpt: badGateway,
		info: input?.info,
	});
}

export function serverUnavailable(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(503, 'Service Unavailable', message, input?.publicInfo, input?.cause, {
		name: 'ServerUnavailableError',
		constructorOpt: serverUnavailable,
		info: input?.info,
	});
}

export function gatewayTimeout(message?: string, input?: { cause?: Error, info?: Info, publicInfo?: Info }): HttpError {
	return new HttpError(504, 'Gateway Time-out', message, input?.publicInfo, input?.cause, {
		name: 'GatewayTimeoutError',
		constructorOpt: gatewayTimeout,
		info: input?.info,
	});
}
