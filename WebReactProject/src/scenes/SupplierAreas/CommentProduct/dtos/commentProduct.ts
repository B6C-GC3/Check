export interface AssessmentProductComment {
    id: number;
    star: number | null;
    commnet: string;
    status: boolean;
    feel: number[];
    attributeProductComment: AttributeProductComment[];
    useful: number;
    meaningless: number;
    myUseful: boolean;
    myMeaningless: boolean;
    feedback: number;
    image: AssessmentProductImage[];
}

export interface AttributeProductComment {
    attributeKeyName: string;
    attributeValueName: string;
}

export interface AssessmentProductImage {
    imageName80x80: string;
    imageName340x340: string;
}