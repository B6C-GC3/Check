import Entity from "../../../../services/dto/entity";
import { AttributeUL } from "./atributeTypes";

export interface EditableRowProps {
    index: number;
}

export interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof DataTypeProductAdd;
    record: DataTypeProductAdd;
    handleSave: (record: DataTypeProductAdd) => void;
}

export interface DataTypeProductAdd extends DataTypeProductDto {
    attribute1: string | undefined;
    attribute2: string | undefined;
    attribute3: string | undefined;
}
export interface DataTypeProductDto {
    id:number;
    key: string;
    name: string;
    price: string;
    quantity: number;
    displayOrder: number;
    avatar: string;
    isActive: boolean;
    keyAttributeOne: number;
    keyAttributeTwo: number;
    keyAttributeThree: number;
    idKeyAttributeOne: number | undefined;
    idKeyAttributeTwo: number | undefined;
    idKeyAttributeThree: number | undefined;
}
export interface ProductQueryDto {
    name: string;
    fragile: boolean;
    trademark: number;
    unitProduct: number;
    orderMinimumQuantity: number;
    orderMaximumQuantity: number;
    productAlbum: string;
}

export interface ProductAddDto {
    id: number;
    name: string;
    types: number;
    categoryProductId: number;
    displayOrder: number;
    isActive: boolean;
    isDeleted: boolean;
    lastModifierUserId: number | null;
    categoryProductName: string;
    lastModifierUserName: string;
    lastModificationTime: string | null;
}

export interface CategorySelectedDto extends Entity<number> {
    value: string;
}

export interface CategorySelectedTreeDto extends CategorySelectedDto {
    children: CategorySelectedTreeDto[];
}

export interface SupplierCategorAddProductDto extends Entity<number> {
    name: string;
}

export interface Values {
    label: string;
    value: string;
}

export interface ProductAttributeValueInsertSupplierDto {
    values: string;
    categoryId: number[];
    isActive: boolean;
    typesAttribute: AttributeUL;
}

export interface SupplierCtreateAttributeByAddProoduct {
    values: string;
    categoryId: number;
    typesAttribute: number;
}

export interface ProductAttributeValueAddBySuppllier {
    idAttribute: number;
    value: string;
}