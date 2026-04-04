declare module '*.svg' {
  const content: any
  export default content
}

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
