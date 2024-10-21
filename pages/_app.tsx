import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import type { AppProps } from 'next/app';
import { createTheme, MantineProvider } from '@mantine/core';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

if (typeof window === 'undefined') {
  import('../cron/resetTasksCompletedThisMonth').then((module) => {
    const resetTasksCompletedThisMonth = module.default;
    if (typeof resetTasksCompletedThisMonth === 'function') {
      resetTasksCompletedThisMonth();
    } else {
      console.error('Default export is not a function');
    }
  }).catch((error) => {
    console.error('Failed to load cron job script:', error);
  });
}

const theme = createTheme({});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showNavbar = router.pathname === '/home' || router.pathname === '/ai-chat';

  return (
    <MantineProvider theme={theme}>
      <Layout showNavbar={showNavbar}>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}