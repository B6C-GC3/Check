import Entity from "../dto/entity";

export interface SelectedModel extends Entity<number> {
    value: string;
}

export interface SelectedModelConvert {
    label: string;
    value: string;
}