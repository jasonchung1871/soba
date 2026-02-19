'use client';

import dynamic from 'next/dynamic';
import './formio.css';

const FormioBuilder = dynamic(
	() => import('@formio/react').then((mod) => mod.FormBuilder ?? (mod as any).default?.FormBuilder),
	{ ssr: false },
);

export function FormBuilder({
	initialForm,
	options,
	onChange,
	onBuilderReady,
}: {
	initialForm?: any;
	options?: any;
	onChange?: (form: any) => void;
	onBuilderReady?: (instance: any) => void;
}) {
	return (
		<FormioBuilder
			initialForm={initialForm}
			options={options}
			onBuilderReady={onBuilderReady}
			onChange={onChange}
		/>
	);
}
