import { AttributeValueReadCartDto } from "./attributeValueReadCartDto";
import { ProductReadForCartDto } from "./cartBasicProductDto";
import { ImageWithValueAttributeDto } from "./imageWithValueAttributeDto";

export interface FeatureProductContainerDto {
    productReadForCartDto: ProductReadForCartDto[];
    keyValuesName: AttributeValueReadCartDto[];
    renderImage: ImageWithValueAttributeDto[];
}

export interface FeatureProductAttribute {

    attributeIdOneName: string;
    attributeIdTwoName: string;
    attributeIdThreeName: string;
}

export interface FeatureProductAttributeValue {
    attributeValueOne: number;
    attributeValueTwo: number | null;
    attributeValueThree: number | null;
    attributeValueOneName: string;
    attributeValueTwoName: string;
    attributeValueThreeName: string;
}

export interface FeatureProductReadDto {
    id: number;
    productId: number;
    attributeValueOne: number;
    attributeValueTwo: number | null;
    attributeValueThree: number | null;
    attributeValueOneName: string;
    attributeValueTwoName: string;
    attributeValueThreeName: string;
    price: number;
    quantityRemaining: number;
    quantityTotal: number;
    displayOrder: number;
    pictureId: number;
    pictureName: string;
    mainProduct: boolean;
    weightAdjustment: number;
    lengthAdjustment: number;
    widthAdjustment: number;
    heightAdjustment: number;
    name: string;
}

export interface FeatureProductAttributeDto {
    id: number | null;
    value: string;
}