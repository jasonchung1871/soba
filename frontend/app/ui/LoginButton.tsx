'use client';

import { useAuth } from '@/app/auth/AuthProvider';

export default function LoginButton({
	label,
	idp,
	redirectUri,
}: {
	label: string;
	idp: string;
	redirectUri: string;
}) {
	const { login } = useAuth();

	return (
		<button
			type="button"
			onClick={() => login({ idpHint: idp, redirectUri })}
			className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
		>
			{label}
		</button>
	);
}
