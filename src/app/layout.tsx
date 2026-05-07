import type { Metadata } from 'next';
import StyledComponentsRegistry from './registry';
import GlobalStyle from '@/src/styles/GlobalStyle';
import Toast from '@/src/components/common/Toast';
import 'react-loading-skeleton/dist/skeleton.css';

export const metadata: Metadata = {
  title: 'Taskify',
  description: 'Task management application',
  icons: {
    icon: '/images/favicon.svg',
    shortcut: '/images/favicon.svg',
    apple: '/images/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          {children}
          <Toast />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
