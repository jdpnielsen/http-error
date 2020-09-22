import { Options, WError, Info } from '@jdpnielsen/contextual-error';

export type HttpErrorResponse = {
	statusCode: number,
	error: string,
	message?: string,
	info?: Info,
};

export const HTTPERROR_SYMBOL = Symbol.for('http-error/httperror');

export class HttpError extends WError {
	public readonly name: string = 'HttpError';
	public readonly statusCode: number;
	private response: HttpErrorResponse;

	constructor(statusCode: number, error: string, message?: string, publicInfo?: Info, cause?: Error, options?: Options) {
		super(message || error, cause, options);
		Object.defineProperty(this, HTTPERROR_SYMBOL, { value: true });

		if (options?.name) {
			this.name = options.name;
		}

		this.statusCode = statusCode;
		this.response = {
			statusCode: this.statusCode,
			error: error,
		};

		if (message) {
			this.response.message = message;
		}

		if (publicInfo) {
			this.response.info = publicInfo;
		}
	}

	public toJSON(): HttpErrorResponse {
		return this.response;
	}

	public static isHttpError(obj: unknown): boolean {
		return (obj as { [HTTPERROR_SYMBOL]?: boolean })?.[HTTPERROR_SYMBOL] != null;
	}
}

export default HttpError;
