import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from '@/app/[lang]/dictionaries';
import { FormBuilder } from '@/app/ui/FormBuilder';

export default async function BuilderPage({ params }: { params: Promise<{ lang: string }> }) {
	const { lang } = await params;

	if (!hasLocale(lang)) notFound();

	const dict = await getDictionary(lang);

	return (
		<main>
			<h1>{dict.header.builder}</h1>
			<FormBuilder
				options={{
					language: dict.locale,
					i18n: {
						[dict.locale]: dict,
					},
					builder: {
						premium: false,
					},
				}}
			/>
		</main>
	);
}
