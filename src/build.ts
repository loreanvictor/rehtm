import { build as buildTemplate, SmartTemplate } from './template'


// TODO: accept processors and pass them down
export function build() {
  const template = buildTemplate()
  const cache = new Map<string, SmartTemplate>()

  return (strings: TemplateStringsArray, ...values: unknown[]) => {
    const key = strings.join('&')
    if (cache.has(key)) {
      return cache.get(key)!.create(...values)
    } else {
      const host = template(strings, ...values)
      cache.set(key, host)

      return host.create(...values)
    }
  }
}
