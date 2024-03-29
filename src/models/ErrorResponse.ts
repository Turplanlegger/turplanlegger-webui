export type ErrorResponse = {
  detail: string;
  instance: string;
  status: number;
  title: string;
  type: string;
};

export const isErrorResponse = (res: unknown): res is ErrorResponse => {
  const parsed = res as ErrorResponse;
  return (
    parsed.detail !== undefined &&
    parsed.instance !== undefined &&
    parsed.status !== undefined &&
    parsed.title !== undefined
  );
};

export const isErrorResponseWithResponseCode = (
  res: unknown,
  codes: number[]
): res is ErrorResponse => {
  return isErrorResponse(res) && codes.some((code) => code === res.status);
};
