export interface CategoryTableDto {
    id: number;
    name: string;
    level: string;
    idParent: number;
    nameParent: string;
}

export interface CategoryInOrUpDto {
    id: number;
    name: string;
    level: string;
    idParent: number;
    nameParent: string;
}

export interface CategoryInterview {
    id: number;
    level: number;
}

export interface CategorySelectedProps {
    level: number;
    ids: number[];
}