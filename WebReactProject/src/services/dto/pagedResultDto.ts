export interface PagedResultDto<T> {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  indexFrom: number;
  items: T[];
}
