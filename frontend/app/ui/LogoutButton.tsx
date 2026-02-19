'use client';

import { useAuth } from '@/app/auth/AuthProvider';

export default function LogoutButton({ label }: { label: string }) {
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<button
			type="button"
			onClick={handleLogout}
			className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
		>
			{label}
		</button>
	);
}
