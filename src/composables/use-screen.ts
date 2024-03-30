import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

/**
 * https://tailwindcss.com/docs/screens
 * 
 * breakpointsTailwind: {
    'sm': '640px',
    // => @media (min-width: 640px) { ... }

    'md': '768px',
    // => @media (min-width: 768px) { ... }

    'lg': '1024px',
    // => @media (min-width: 1024px) { ... }

    'xl': '1280px',
    // => @media (min-width: 1280px) { ... }

    '2xl': '1536px',
    // => @media (min-width: 1536px) { ... }
  }
*/

export function useIsMobile() {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  //0~640
  return breakpoints.smaller('sm');
}

export function useIsIPad() {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  //0~768px
  return breakpoints.smaller('md');
}

export function useIsTablet() {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  //0~1024
  return breakpoints.smaller('lg');
}

export function useIsSmallDesktop() {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  //0~1280
  return breakpoints.smaller('xl');
}

export function useIsDesktop() {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  //1536~N
  return breakpoints.greater('2xl');
}
