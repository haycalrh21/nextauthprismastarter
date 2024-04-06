"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const UserNavbar = () => {
	return (
		<div>
			<Button
				onClick={() =>
					signOut({
						redirect: true,
						callbackUrl: `${window.location.origin}/`,
					})
				}
			>
				Sign out
			</Button>
		</div>
	);
};
export default UserNavbar;
