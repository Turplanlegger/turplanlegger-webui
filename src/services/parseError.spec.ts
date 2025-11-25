import { parseError } from './parseError';
import { expect, test } from 'vitest';

test('parseError handles text', () => {
  const unknownError = 'Some random error';
  expect(parseError(unknownError).title).toBe('Unknown error');
});

test('parseError handles object', () => {
  const unknownError = '{random: object}';
  expect(parseError(unknownError).title).toBe('Unknown error');
});

test('parseError handles ApiProblem', () => {
  const apiProblem = {
    type: 'problemType',
    status: 418,
    title: "I'm a teapot",
    detail: 'Server refuses to brew coffee because it is, permanently, a teapot.',
    instance: 'teapot#1'
  };
  const error = JSON.stringify(apiProblem);

  const parsed = parseError(error);
  expect(parsed.type).toBe(apiProblem.type);
  expect(parsed.status).toBe(apiProblem.status);
  expect(parsed.title).toBe(apiProblem.title);
  expect(parsed.detail).toBe(apiProblem.detail);
  expect(parsed.instance).toBe(apiProblem.instance);
});
