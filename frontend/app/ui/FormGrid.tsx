'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import './formio.css';

interface FormioReactModule {
	FormGrid?: ComponentType;
}

interface FormioReactModuleWithDefault {
	default?: FormioReactModule;
}

function loadFormGrid(): Promise<ComponentType> {
	return import('@formio/react').then((mod: FormioReactModule & FormioReactModuleWithDefault) => {
		const Component = mod.FormGrid ?? mod.default?.FormGrid;
		if (!Component) {
			throw new Error('FormGrid component not found in @formio/react');
		}
		return Component as ComponentType;
	});
}

const FormioGrid = dynamic(() => loadFormGrid(), {
	ssr: false,
}) as unknown as React.ComponentType<unknown>;

export function FormGrid() {
	return <FormioGrid />;
}
