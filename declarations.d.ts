declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.scss'
declare module '*.css'
declare module 'normalize.css'

interface TrustedTypePolicy {
  createHTML(input: string): string
  createScript(input: string): string
  createScriptURL(input: string): string
}

interface TrustedTypePolicyFactory {
  createPolicy(
    name: string,
    rules: Partial<TrustedTypePolicy>,
  ): TrustedTypePolicy
}

interface Window {
  trustedTypes?: TrustedTypePolicyFactory
}
