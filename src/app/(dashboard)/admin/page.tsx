import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Page = async () => {
	const session = await getServerSession(authOptions);
	console.log(session);
	if (session?.user) {
		return (
			<div>welcome back {session?.user?.name || session?.user?.username}</div>
		);
	}
	return (
		<div>
			<p>tolong login</p>
		</div>
	);
};

export default Page;
