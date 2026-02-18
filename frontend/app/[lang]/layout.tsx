export default async function LangLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { lang: string };
}) {
	return (
		<html lang={(await params).lang}>
			<body>{children}</body>
		</html>
	);
}
