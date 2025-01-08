import { IUser } from "./IUser"

export interface IClient {
    clientId: number
    dni: string
    firstName: string
    lastName: string
    userId: IUser
}