'use client';

import dynamic from 'next/dynamic';

const FormioProvider = dynamic(
	() =>
		import('@formio/react').then(
			(mod) => mod.FormioProvider ?? (mod as any).default?.FormioProvider,
		),
	{
		ssr: false,
	},
);

export function FormProvider({
	baseUrl,
	projectUrl,
	children,
}: {
	baseUrl?: string;
	projectUrl?: string;
	children: React.ReactNode;
}) {
	return (
		<FormioProvider baseUrl={baseUrl} projectUrl={projectUrl}>
			{children}
		</FormioProvider>
	);
}
