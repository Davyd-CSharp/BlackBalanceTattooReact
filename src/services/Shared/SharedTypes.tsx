export interface EnumDTO {
    Name: string,
    Values: EnumValueDTO[]
}

export interface EnumValueDTO {
    Value: number,
    Name: string
}

export interface ApiResponse<TResponse> {
    StatusCode: number,
    Errors: Error[],
    Response: TResponse
}

export  interface PagedList<TModel> {
    HasNextPage: boolean,
    HasPreviousPage: boolean,
    TotalCount:  number,
    TotalPages: number,
    CurrentPage: number,
    PageSize: number,
    Models: TModel[]
}

export interface Error {
    [Key: string]: string[] 
}
