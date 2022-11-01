export type ErrorResponse = {
  detail: string;
  instance: string;
  status: number;
  title: string;
  type: string;
};

export const isErrorResponse = (res: any): res is ErrorResponse => {
  return (
    res.detail !== undefined &&
    res.instance !== undefined &&
    res.status !== undefined &&
    res.title !== undefined
  );
};
