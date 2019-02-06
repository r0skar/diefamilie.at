/**
 * Check whether a link is **not** a Vue `router` link, but an external link.
 */
export const isExternalLink = (link: string): boolean => {
  return (
    link.startsWith(`http`) ||
    link.startsWith(`www`) ||
    link.startsWith(`mailto`) ||
    link.startsWith(`tel`)
  )
}
