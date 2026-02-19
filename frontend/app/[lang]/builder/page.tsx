import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from '@/app/[lang]/dictionaries';
import { getServerSession } from '@/app/lib/auth/session';
import { FormBuilder } from '@/app/ui/FormBuilder';
import { FormProvider } from '@/app/ui/FormProvider';
import { Header } from '@/app/ui/Header';

export default async function BuilderPage({ params }: { params: Promise<{ lang: string }> }) {
	const { lang } = await params;
	const session = await getServerSession();
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
	const projectUrl = process.env.NEXT_PUBLIC_PROJECT_URL;

	if (!hasLocale(lang)) notFound();

	const dict = await getDictionary(lang);

	return (
		<main>
			<h1>{dict.header.builder}</h1>
			<h2>Welcome {session?.preferred_username}</h2>
			<Header dict={dict} />
			<FormProvider baseUrl={baseUrl} projectUrl={projectUrl}>
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
			</FormProvider>
		</main>
	);
}
