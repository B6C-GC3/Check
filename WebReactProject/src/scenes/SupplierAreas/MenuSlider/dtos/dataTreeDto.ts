export interface DataTreeDto{
    item:item ,
    children:DataTreeDto[]
};

export interface item{
    departmentId: number;
    departmentName: string;
    parentId: number;
};