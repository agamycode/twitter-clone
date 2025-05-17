import { HttpClient } from '@/features/api/http-client';

export interface PaginatorInfo<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: unknown[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface GetParams {
  slug: string | number;
}

type QueryParams<T = Record<string, unknown>> = Partial<T>;

export function crudFactory<Type, InputType>(endpoint: string) {
  return {
    all(params?: QueryParams) {
      return HttpClient.get<Type[]>(endpoint, params);
    },
    paginated(params: QueryParams) {
      return HttpClient.get<PaginatorInfo<Type>>(endpoint, params);
    },
    get({ slug }: GetParams) {
      return HttpClient.get<Type>(`${endpoint}/${slug}`);
    },
    create(data: InputType) {
      return HttpClient.post<Type>(endpoint, data);
    },
    update({ id, ...input }: Partial<InputType> & { id: string | number }) {
      return HttpClient.put<Type>(`${endpoint}/${id}`, input);
    },
    delete({ id }: { id: string | number }) {
      return HttpClient.delete<boolean>(`${endpoint}/${id}`);
    }
  };
}
