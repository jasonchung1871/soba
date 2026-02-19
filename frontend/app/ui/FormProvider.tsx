'use client';

import dynamic from 'next/dynamic';
import type { ComponentType, ReactNode } from 'react';

interface FormioReactModule {
	FormioProvider?: ComponentType<{
		children: ReactNode;
		baseUrl?: string;
		projectUrl?: string;
		Formio?: unknown;
	}>;
}

interface FormioReactModuleWithDefault {
	default?: FormioReactModule;
}

function loadFormioProvider(): Promise<
	ComponentType<{ children: ReactNode; baseUrl?: string; projectUrl?: string; Formio?: unknown }>
> {
	return import('@formio/react').then((mod: unknown) => {
		const typedMod = mod as FormioReactModule & FormioReactModuleWithDefault;
		const Component = typedMod.FormioProvider ?? typedMod.default?.FormioProvider;
		if (!Component) {
			throw new Error('FormioProvider component not found in @formio/react');
		}
		return Component;
	});
}

interface FormioProviderProps {
	baseUrl?: string;
	projectUrl?: string;
	children: ReactNode;
}

const FormioProvider = dynamic(() => loadFormioProvider(), {
	ssr: false,
}) as unknown as ComponentType<FormioProviderProps>;

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
