export interface UserDTO {
    Identifier: string,
    Name: string,
    Birthday: Date,
    Gender: number,
    PhoneNumber: string,
    Email: string,
    Country: number,
    City: string,
    IsEmailNewsletterEnable: boolean,
    IsPhoneNewsletterEnable: boolean
}

export interface UseGetUserDetailByIdentifier
{
    Identifier: string
}
