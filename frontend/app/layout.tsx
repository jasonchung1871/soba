import type { Metadata } from 'next';
import { AuthProvider } from './auth/AuthProvider';
import './globals.css';

export const metadata: Metadata = {
	title: 'SOBA',
	description: 'Form design and submission',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
