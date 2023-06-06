export interface ProductAttributeValueDto {
    id: number;
    name: string;
    types: number;
    categoryProductId: number;
    isActive: boolean;
    isDeleted: boolean;
    lastModifierUserId: number | null;
    categoryProductName: string;
    lastModifierUserName: string;
    lastModificationTime: string | null;
}