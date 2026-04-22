import type { Metadata } from 'next';
import StyledComponentsRegistry from './registry';
import GlobalStyle from '@/src/styles/GlobalStyle';
import AppShell from '@/src/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'Taskify',
  description: 'Task management application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <AppShell>{children}</AppShell>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
