export interface ICategory {
    id: string,
    name: string, 
    description: string,
    createdAt: Date,
    updatedAt: Date
}
export interface ICreateCategoryRequest {
    name: string,
    description: string
}

export interface IUpdateCategoryRequest extends Partial<ICreateCategoryRequest> {
    id: string
}
