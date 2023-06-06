export interface ImageForProductDto {
    virtualPath: string;
    altAttribute: string;
    seoFilename: string;
    titleAttribute: string;
    displayOrder: number;
}

export interface ImageProductContainerDto {
    size: string;
    image: ImageForProductDto[];
}