import { Options, WError, Info } from '@jdpnielsen/contextual-error';

export type HttpErrorResponse = {
	statusCode: number,
	error: string,
	message?: string,
	info?: Info,
};

export class HttpError extends WError {
	public readonly name: string = 'HttpError';
	public readonly statusCode: number;
	private response: HttpErrorResponse;

	constructor(statusCode: number, error: string, message?: string, publicInfo?: Info, cause?: Error, options?: Options) {
		super(message || error, cause, options);

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
}

export default HttpError;
