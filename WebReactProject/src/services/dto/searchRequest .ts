export interface SearchRequest extends OrderByRequest {
    propertySearch?: string[];
    valuesSearch?: string[];
}

export interface OrderByRequest extends PagedListRequest {
    propertyOrder?: string;
    valueOrderBy?: boolean;
}

export interface PagedListRequest {
    pageIndex: number;
    pageSize: number;
}