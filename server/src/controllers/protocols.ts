export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<B> {
  params?: {
    id: string;
  };
  header?: string;
  body?: B;
}
