export interface AssessmentProductReq {
    image: string[];
    starNumber: number;
    feel: number[];
    commnet: string;
    level: number;
    assessmentProductId: number | null;
}

export interface AssessmentProductRes {

}

export interface AssessmentProductStat {
    starOne: number;
    starTwo: number;
    starThree: number;
    starForur: number;
    starFive: number;
    starTotal: number;
}

export interface AssessmentProductImage {
    imageName80x80: string;
    imageName340x340: string;
}

export interface AttributeProductComment {
    attributeKeyName: string;
    attributeValueName: string;
}

export interface AssessmentProductUserComment {
    id: number;
    avatar: string;
    name: string;
    time: string;
    evaluated: number;
    responded: number;
    respected: number;
    incorrected: number;
}

export interface AssessmentProductComment {
    id: number;
    userComment: AssessmentProductUserComment;
    star: number | null;
    commnet: string;
    status: boolean;
    attributeProductComment: AttributeProductComment[];
    useful: number;
    meaningless: number;
    feedback: number;
    image: AssessmentProductImage[];
}