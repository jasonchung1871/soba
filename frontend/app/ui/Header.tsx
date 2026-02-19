'use client';

import { redirect } from 'next/navigation';
import type { Dictionary } from '@/app/[lang]/dictionaries';
import { useAuth } from '@/app/auth/AuthProvider';
import LogoutButton from '@/app/ui/LogoutButton';

export function Header({ dict }: { dict: Dictionary }) {
	const { kc, isAuthenticated } = useAuth();

	if (!kc) return <div>Initializing Keycloak...</div>;

	return (
		<header className="flex items-center gap-4">
			<button
				type="button"
				onClick={() => redirect('/')}
				className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
			>
				{dict.header.list}
			</button>
			<button
				type="button"
				onClick={() => redirect('/builder')}
				className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
			>
				{dict.header.builder}
			</button>
			{isAuthenticated ? (
				<LogoutButton label={dict.general.logout} />
			) : (
				<button
					type="button"
					onClick={() => redirect('/login')}
					className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
				>
					{dict.general.login}
				</button>
			)}
		</header>
	);
}
