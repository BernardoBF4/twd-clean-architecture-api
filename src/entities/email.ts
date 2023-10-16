export default class Email {
  public static validate(email: string): boolean {
    if (!email) {
      return false
    }
    return true
  }
}
