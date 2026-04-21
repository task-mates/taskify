import type { Metadata } from "next";
import StyledComponentsRegistry from "./registry";

export const metadata: Metadata = {
	title: "Taskify",
	description: "Task management application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body>
				<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
			</body>
		</html>
	);
}
