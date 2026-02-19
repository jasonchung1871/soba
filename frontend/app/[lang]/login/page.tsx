import { notFound, redirect } from 'next/navigation';
import { getDictionary, hasLocale } from '@/app/[lang]/dictionaries';
import { getServerSession } from '@/app/lib/auth/session';
import LoginButton from '@/app/ui/LoginButton';

export default async function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
	const { lang } = await params;
	const session = await getServerSession();

	if (session?.preferred_username) redirect('/');

	if (!hasLocale(lang)) notFound();

	const dict = await getDictionary(lang);

	return (
		<main>
			<h1>{dict.header.idp}</h1>
			<LoginButton label={dict.idp.types.idir} idp={dict.idp.types.idir} redirectUri={`/${lang}`} />
		</main>
	);
}
