import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from '@/app/[lang]/dictionaries';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
	const { lang } = await params;

	if (!hasLocale(lang)) notFound();

	const dict = await getDictionary(lang);

	return (
		<main>
			<h1>{dict.general.title}</h1>
		</main>
	);
}
