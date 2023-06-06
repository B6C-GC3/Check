import { SpecificationAttributeDto } from "./specificationAttributeDto";

export interface DetailInfoBasicProductDto {
    attributeIdOne: number;
    attributeIdTwo: number | null;
    attributeIdThree: number | null;
    attributeIdOneName: string;
    attributeIdTwoName: string;
    attributeIdThreeName: string;
    fragile: boolean;
    trademark: number;
    trademarkValue: string;
    unitProduct: number;
    unitProductValue: string;
    isGiftCard: boolean;
    hasUserAgreement: boolean;
    isRecurring: boolean;
    disableBuyButton: boolean;
    isFreeShipping: boolean;
    fullDescription: string;
    speccificationAttribute: ProductSpecificationsAttributeDto[];
    supplierId: number;
    orderMinimumQuantity:number;
    orderMaximumQuantity:number;
}

export interface ProductSpecificationsAttributeDto {
    group: string;
    attributeValue: string;
    attributeId: number;
    value: string;
}

export interface ProductReadForCartDto {
    id: number;
    price: number;
    quantity: number;
    displayOrder: number;
    mainProduct: boolean;
    idImg: number;
    iMGS80x80: string;
    name: string;
}