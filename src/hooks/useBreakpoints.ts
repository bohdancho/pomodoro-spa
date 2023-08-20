import { useMediaQuery } from '.'

/**
 * Get a set of boolean representing which breakpoint is active
 * and which breakpoints are inactive.
 *
 * Inspired by: https://github.com/contra/react-responsive/issues/162#issuecomment-592082035
 */
export function useBreakpoints() {
  const breakpoints: { isMd: boolean; isLg: boolean; active: string | null } = {
    isMd: useMediaQuery('(min-width: 640px)'), // also change tailwind.config.js
    isLg: useMediaQuery('(min-width: 1024px)'),
    active: null,
  }
  if (breakpoints.isMd) breakpoints.active = 'md'
  if (breakpoints.isLg) breakpoints.active = 'lg'
  return breakpoints
}
