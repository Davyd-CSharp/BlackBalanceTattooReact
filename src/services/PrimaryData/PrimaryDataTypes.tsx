export interface UserDTO {
    Identifier: string,
    Name: string,
    Birthday: Date,
    Gender: number,
    PhoneNumber: string,
    Email: string,
    Country: string,
    City: string,
    IsEmailNewsletterEnable: boolean,
    IsPhoneNewsletterEnable: boolean
}

export interface UseGetUserDetailByIdentifier
{
    Identifier: string
}
