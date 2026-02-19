import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from '@/app/[lang]/dictionaries';
import { FormGrid } from '@/app/ui/FormGrid';
import { FormProvider } from '@/app/ui/FormProvider';
import { Header } from '@/app/ui/Header';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
	const { lang } = await params;
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
	const projectUrl = process.env.NEXT_PUBLIC_PROJECT_URL;

	if (!hasLocale(lang)) notFound();

	const dict = await getDictionary(lang);

	return (
		<main>
			<Header dict={dict} />
			<FormProvider baseUrl={baseUrl} projectUrl={projectUrl}>
				<FormGrid />
			</FormProvider>
		</main>
	);
}
