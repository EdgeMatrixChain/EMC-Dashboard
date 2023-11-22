import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

/**
  breakpointsTailwind: {
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

export function useIsTablet() {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  //640~1024
  return breakpoints.between('sm', 'xl');
}

export function useIsSmallDesktop() {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  //1024~1536
  return breakpoints.between('xl', '2xl');
}

export function useIsDesktop() {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  //1536~N
  return breakpoints.greater('2xl');
}
