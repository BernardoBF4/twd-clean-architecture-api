import UserData from '../../../entities/user-data'

export default interface UserRepository {
  addUser(user: UserData): Promise<void>
  findUserByEmail(email: string): Promise<UserData>
  findAllUsers(): Promise<UserData[]>
  exists(user: UserData): Promise<boolean>
}
