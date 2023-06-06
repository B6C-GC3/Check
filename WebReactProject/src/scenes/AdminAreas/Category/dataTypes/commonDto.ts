
import { TablePaginationConfig } from "antd";
import { FilterValue } from "antd/lib/table/interface";

export interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
}

export interface DataNodeCustomer {
    title: string;
    key: string;
    isLeaf?: boolean;
    children?: DataNodeCustomer[];
}