export interface ICategory {
    id: string,
    name: string, 
    description: string,
    slug: string,
    createAt: Date,
    updateAt: Date
}
export interface ICreateCategoryRequest {
    name: string,
    slug: string,
    description: string
}

export interface IUpdateCategoryRequest extends Partial<ICreateCategoryRequest> {
    id: string
}

export interface ICategoryOption {
    label: string;
    value: string;
}

export interface ICategoryForm {
    name: string;
    description: string;
}