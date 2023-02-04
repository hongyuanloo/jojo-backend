// return "stringify" error
export function getErrorMessage(error: unknown) {
  let errMessage: string;
  if (error instanceof Error) errMessage = error.message; //return { error: error.message };
  errMessage = String(error);
  return { error: errMessage };
}
