import DOMPurify from 'dompurify'

/**
 * Trusted security policies
 * @link https://stackoverflow.com/a/64595475/8713532
 */
if (window.trustedTypes && window.trustedTypes.createPolicy) {
  // Feature testing
  window.trustedTypes.createPolicy('default', {
    createHTML: (string) =>
      DOMPurify.sanitize(string, { RETURN_TRUSTED_TYPE: true }),
    createScriptURL: (string) => string, // warning: this is unsafe!
    createScript: (string) => string, // warning: this is unsafe!
  })
}
