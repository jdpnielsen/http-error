/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import test from 'ava';
import { HttpError } from './http-error';
import CError from '@jdpnielsen/contextual-error';

/*
 * Remove full paths and relative line numbers from stack traces so that we can
 * compare against "known-good" output.
 */
function cleanStack(stacktxt: string) {
	const re = new RegExp(/\/.*\/.*spec\.ts:\d+:\d+/, 'gm');
	stacktxt = stacktxt.replace(re, '(dummy filename)');
	return stacktxt;
}

Error.stackTraceLimit = 20;
/*
 * Save the generic parts of all stack traces so we can avoid hardcoding
 * Node-specific implementation details in our testing of stack traces.
 * The stack trace limit has to be large enough to capture all of Node's frames,
 * which are more than the default (10 frames) in Node v6.x.
 */
function helperStack(message: string, name = 'HttpError') {
	const nodestack = new Error().stack!.split('\n').slice(2).join('\n');

	return [
		`${name}: ${message}`,
		cleanStack(nodestack),
	].join('\n');
}

test('should act like a regular error', t => {
	const expect = { statusCode: 418, error: 'I\'m a teapot', message: 'expected a coffepot' };
	const err = new HttpError(expect.statusCode, expect.error, expect.message);

	t.is(err.name, 'HttpError', 'has expected name');
	t.is(err.message, expect.message, 'has expected message');
	t.is(cleanStack(err.stack!), helperStack(expect.message), 'has expected stack');
	t.throws(() => { throw err; }, { is: err }, 'is throwable');
});

test('should build an http friendly error', t => {
	const expect = { statusCode: 418, error: 'I\'m a teapot', message: 'expected a coffepot' };
	const teapotError = new HttpError(expect.statusCode, expect.error, expect.message);

	t.deepEqual(teapotError.message, expect.message, 'builds correct message');
	t.deepEqual(teapotError.toJSON(), expect, 'builds correct json object');
	t.throws(() => { throw teapotError; }, { instanceOf: HttpError });
});

test('should accept an Error as cause', t => {
	const parentError = new Error('ParentError');
	const childError = new HttpError(500, 'Internal Server Error', 'ChildError', undefined, parentError);

	t.is(childError.message, `ChildError`, 'builds correct message');
	t.is((childError as any).cause, parentError, 'has expected cause');
});

test('should accept a CError as cause', t => {
	const parentError = new CError('ParentError');
	const childError = new HttpError(500, 'Internal Server Error', 'ChildError', undefined, parentError);

	t.is(childError.message, `ChildError`, 'builds correct message');
	t.is((childError as any).cause, parentError, 'has expected cause');
});

test('should accept an options object', t => {
	const uncausedErr = new CError('uncausedErr', undefined, { info: { text: '_uncausedErr_', fromUncaused: true }, name: 'UncausedError' });
	const causedErr = new HttpError(500, 'Internal Server Error', 'causedErr', undefined, uncausedErr, { info: { text: '_causedErr_', fromCaused: true }, name: 'CausedError' });

	t.is(uncausedErr.name, `UncausedError`, 'sets correct name');
	t.is(causedErr.name, `CausedError`, 'sets correct name');

	t.is(uncausedErr.message, `uncausedErr`, 'builds correct message');
	t.is(causedErr.message, `causedErr`, 'builds correct message');

	t.is((uncausedErr as any).cause, undefined, 'does not have a cause');
	t.is((causedErr as any).cause, uncausedErr, 'has expected cause');

	t.deepEqual(uncausedErr.info, { text: '_uncausedErr_', fromUncaused: true }, 'has expected info');
	t.deepEqual(causedErr.info, { text: '_causedErr_', fromCaused: true }, 'has expected info');
});

test('should stringify correctly', t => {
	const parentError = new CError('ParentError');
	const childError = new HttpError(500, 'Internal Server Error', 'ChildError', undefined, parentError, { info: { foo: 'bar' } });

	t.is(childError.toString(), 'HttpError: ChildError');
});

test('should JSON.stringify correctly', t => {
	const parentError = new CError('ParentError');
	const childError = new HttpError(500, 'Internal Server Error', 'ChildError', { bar: 'baz' }, parentError, { info: { foo: 'bar' } });

	t.is(JSON.stringify(childError), '{"statusCode":500,"error":"Internal Server Error","message":"ChildError","info":{"bar":"baz"}}');
});

test('should have a static .isCError method which returns true when given a CError', t => {
	const regularError = new Error('regularError');
	const cError = new CError('cError');
	const httpError = new HttpError(500, 'httpError');

	t.is(CError.isCError(null), false, 'handles null');
	t.is(CError.isCError(regularError), false, 'handles Error');
	t.is(CError.isCError(cError), true, 'handles CError');
	t.is(CError.isCError(httpError), true, 'handles httpError');
});

test('should have a static .cause which returns the expected cause', t => {
	const parentError = new Error('ParentError');
	const childError = new HttpError(500, 'Internal Server Error', 'ChildError', undefined, parentError);

	t.is(HttpError.cause(parentError), null, 'handles regular errors');
	t.is(HttpError.cause(childError), parentError, 'returns cause');
});

test('should have a static .info which returns the info object', t => {
	const parentError = new Error('ParentError');
	const childError = new CError('ChildError', parentError, { info: { foo: 'bar' } });
	const grandChildError = new HttpError(500, 'Internal Server Error', 'GrandChildError', undefined, childError, { info: { bar: 'baz' } });

	t.deepEqual(HttpError.info(parentError), {}, 'handles regular errors');
	t.deepEqual(HttpError.info(childError), { foo: 'bar' }, 'returns info');
	t.deepEqual(HttpError.info(grandChildError), { foo: 'bar', bar: 'baz' }, 'returns merged info objects');
});

test('should have a static .fullStack which returns the combined stack trace', t => {
	const parentError = new Error('ParentError');
	const childError = new CError('ChildError', parentError, { info: { foo: 'bar' } });
	const grandChildError = new HttpError(500, 'Internal Server Error', 'GrandChildError', undefined, childError, { info: { bar: 'baz' } });

	const expectedParentStack = helperStack('ParentError', 'Error');
	const expectedChildStack = helperStack('ChildError: ParentError', 'CError') + '\ncaused by: ' + expectedParentStack;
	const expectedGrandChildStack = helperStack('GrandChildError', 'HttpError') + '\ncaused by: ' + expectedChildStack;

	t.is(cleanStack(HttpError.fullStack(parentError)), expectedParentStack, 'builds parentError stack');
	t.is(cleanStack(HttpError.fullStack(childError)), expectedChildStack, 'builds childError stack');
	t.is(cleanStack(HttpError.fullStack(grandChildError)), expectedGrandChildStack, 'builds grandChildError stack');
});

test('should have a static .findCauseByName', t => {
	const parentError = new Error('ParentError');
	const childError = new CError('ChildError', parentError);
	const grandChildError = new CError('GrandChildError', childError, { name: 'CustomErrorName' });
	const finalError = new HttpError(500, 'Internal Server Error', 'finalError', undefined, grandChildError);

	t.is(HttpError.findCauseByName(grandChildError, 'Error'), parentError, 'finds regular Error');
	t.is(HttpError.findCauseByName(grandChildError, 'CError'), childError, 'finds CError');
	t.is(HttpError.findCauseByName(grandChildError, 'CustomErrorName'), grandChildError, 'finds CustomError');
	t.is(HttpError.findCauseByName(finalError, 'HttpError'), finalError, 'finds HttpError');
	t.is(HttpError.findCauseByName(grandChildError, 'NoName'), null, 'does not find NoName');
});

test('should have a static .hasCauseWithName', t => {
	const parentError = new Error('ParentError');
	const childError = new CError('ChildError', parentError);
	const grandChildError = new CError('GrandChildError', childError, { name: 'CustomErrorName' });
	const finalError = new HttpError(500, 'Internal Server Error', 'finalError', undefined, grandChildError);

	t.is(HttpError.hasCauseWithName(grandChildError, 'Error'), true, 'finds regular Error');
	t.is(HttpError.hasCauseWithName(grandChildError, 'CError'), true, 'finds CError');
	t.is(HttpError.hasCauseWithName(grandChildError, 'CustomErrorName'), true, 'finds CustomError');
	t.is(HttpError.hasCauseWithName(finalError, 'HttpError'), true, 'finds HttpError');
	t.is(HttpError.hasCauseWithName(grandChildError, 'NoName'), false, 'does not find NoName');
});
