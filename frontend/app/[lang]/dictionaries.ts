import 'server-only';

import type en from './dictionaries/en.json';

// Infer the dictionary type from the English file
export type Dictionary = typeof en;

const dictionaries: Record<string, () => Promise<Dictionary>> = {
	en: () => import('./dictionaries/en.json').then((m) => m.default),
	fr: () => import('./dictionaries/fr.json').then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;

export const hasLocale = (locale: string): locale is Locale => locale in dictionaries;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => dictionaries[locale]();
