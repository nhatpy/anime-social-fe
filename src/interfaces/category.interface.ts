export interface ICategory {
    id: string,
    name: string, 
    description: string,
    createAt: Date,
    updateAt: Date
}
export interface ICreateCategoryRequest {
    name: string,
    description: string
}

export interface IUpdateCategoryRequest extends Partial<ICreateCategoryRequest> {
    id: string
}

export interface ICategoryOption {
    label: string;
    value: string;
}