declare module '*.json';
declare module '*.png';

declare module 'rn-dominant-color' {
  export function getColorFromURL(url: string): Promise<{
    background: string;
    detail: string;
    primary: string;
    secondary: string;
  }>;
}
