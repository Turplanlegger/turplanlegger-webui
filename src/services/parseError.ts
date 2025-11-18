export interface ApiProblem {
  title?: string;
  detail?: string;
  status?: number;
  type?: string;
  instance?: string;
}

export function parseError(error: string): ApiProblem {
  try {
    const problem = JSON.parse(error);
    if (isApiProblem(problem)) {
      return problem;
    }
  } catch {
    // Ignored
  }

  // Fallback if error is not ApiProblem
  return {
    title: 'Unknown error',
    detail: error
  };
}

export function isApiProblem(o: unknown): o is ApiProblem {
  const casted = o as ApiProblem;
  return casted.status !== undefined && casted.title !== undefined;
}
