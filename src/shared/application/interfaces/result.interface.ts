export default interface Result<T> {
  traceId: string;
  payload: {
    data: Partial<T> | Partial<T>[] | string;
    total?: number;
  };
}
