export interface AssessmentSupplierOverviewDto {
    totalStar: number;
    avgStar: number;
    totalComment: number;
}

export interface AssessmentSupplierCommentDto {
    id: number;
    comment: string;
    star: number;
    isNew: boolean;
    numberImage: number;
    assessmentProductId: number;
    productName: string;
    creatorUserId: number | null;
    nameUser: string;
    lastModificationTime: string;
    isActive: boolean | null;
}