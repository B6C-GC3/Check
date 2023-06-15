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
    feel: number[];
    attributeProductComment: AttributeProductComment[];
    useful: number;
    meaningless: number;
    myUseful: boolean;
    myMeaningless: boolean;
    feedback: number;
    image: AssessmentProductImage[];
}

export enum TypeLikeComment {
    IsDislike = 0,
    IsLike = 1
}

export interface LikeCommentAssessmentProduct {
    idsp: number;
    idAssessment: number;
    level: number;
    status: boolean;
    typeLike: TypeLikeComment;
}

export interface ReplyCommentAssessmentProduct {
    idsp: number;
    idAssessment: number;
    comment: string;
}

export interface LoadRepCommnetAssessmentProduct {
    idAccount: number;
    avatar: string;
    name: string;
    idComment: number;
    comment: string;
    numberLike: number;
    numberDisike: number;
    numberRepComment: number;
    timeComment: string;
    myLikes: boolean;
    myDisLikes: boolean;
}