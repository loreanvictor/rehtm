export class WrongAddressError extends Error {
  constructor(
    public readonly address: number[],
    public readonly matched: number[],
    public readonly host: Node | Node[] | NodeList
  ) {
    super(`Address ${address.join('->')} not found on ${host}. Best match: ${matched.join('->')}.`)
  }
}
