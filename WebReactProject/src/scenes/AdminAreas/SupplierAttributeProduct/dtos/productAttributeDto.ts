import Entity from "../../../../services/dto/entity";
import { AttributeUL } from "../../../SupplierAreas/ProductAdd/dtos/atributeTypes";

export interface ProductAttributeValueSupplier extends Entity<number> {
    attributeId: number;
    nameAttribute: string;
    typesAttribute: AttributeUL;
    categoryName: string;
    categoryId: number;
    value: string;
    isActive: boolean;
    isDelete: boolean;
    lastModificationTime: string | null;
    lastModifierUserId: number | null;
    productCount: number;
    lastModifierUserName: string;
}