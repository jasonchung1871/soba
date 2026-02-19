'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import './formio.css';

interface FormioReactModule {
	FormBuilder?: ComponentType;
}

interface FormioReactModuleWithDefault {
	default?: FormioReactModule;
}

function loadFormBuilder(): Promise<ComponentType> {
	return import('@formio/react').then((mod: FormioReactModule & FormioReactModuleWithDefault) => {
		const Component = mod.FormBuilder ?? mod.default?.FormBuilder;
		if (!Component) {
			throw new Error('FormBuilder component not found in @formio/react');
		}
		return Component as ComponentType;
	});
}

interface FormBuilderProps {
	initialForm?: FormDefinition;
	options?: FormBuilderOptions;
	onChange?: (form: FormDefinition) => void;
	onBuilderReady?: (instance: unknown) => void;
}

const FormioBuilder = dynamic(() => loadFormBuilder(), {
	ssr: false,
}) as unknown as React.ComponentType<FormBuilderProps>;

interface FormDefinition {
	display?: string;
	components?: unknown[];
	[key: string]: unknown;
}

interface FormBuilderOptions {
	language?: string;
	i18n?: Record<string, unknown>;
	builder?: Record<string, unknown>;
	[key: string]: unknown;
}

export function FormBuilder({
	initialForm,
	options,
	onChange,
	onBuilderReady,
}: {
	initialForm?: FormDefinition;
	options?: FormBuilderOptions;
	onChange?: (form: FormDefinition) => void;
	onBuilderReady?: (instance: unknown) => void;
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
