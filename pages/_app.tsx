import type { AppProps } from 'next/app';
import '../styles/globals.css';

/**
 * Custom App component that injects global styles. This file is
 * automatically rendered by Next.js on every route. You can add
 * providers here (e.g. for context or theme) if needed.
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
