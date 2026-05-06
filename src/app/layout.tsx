import type { Metadata } from 'next';
import StyledComponentsRegistry from './registry';
import GlobalStyle from '@/src/styles/GlobalStyle';

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
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
