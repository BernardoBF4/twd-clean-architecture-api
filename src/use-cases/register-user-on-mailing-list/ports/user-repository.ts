import { UserData } from '../../../entities'

export interface UserRepository {
  addUser(user: UserData): Promise<void>
  findUserByEmail(email: string): Promise<UserData>
  findAllUsers(): Promise<UserData[]>
  exists(user: UserData): Promise<boolean>
}
