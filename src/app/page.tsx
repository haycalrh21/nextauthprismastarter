import User from "@/components/User";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
	const session = await getServerSession(authOptions);
	return (
		<div>
			<h1 className='text-4xl'>Home</h1>
			<div>
				<h1>client component</h1>
				<User />
			</div>
			<div>
				<h1>client component</h1>
				{JSON.stringify(session)}
			</div>
		</div>
	);
}
