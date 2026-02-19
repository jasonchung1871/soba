export default async function LangLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}) {
	return (
		<html lang={(await params).lang}>
			<body>{children}</body>
		</html>
	);
}
