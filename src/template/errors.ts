export class WrongAddressError extends Error {
  public readonly address: number[]
  public readonly matched: number[]
  public readonly host: Node | Node[] | NodeList

  constructor(
    address: number[],
    matched: number[],
    host: Node | Node[] | NodeList
  ) {
    super(`Address ${address.join('->')} not found on ${host}. Best match: ${matched.join('->')}.`)
    this.address = address
    this.matched = matched
    this.host = host
  }
}
