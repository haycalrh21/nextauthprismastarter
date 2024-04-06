// api/user/route.ts

import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { z } from "zod";

// mendefinisika schema
const userSchema = z.object({
	username: z.string().min(1, "Username is required").max(100),
	email: z.string().min(1, "Email is required").email("Invalid email"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must have than 8 characters"),
});

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { email, password, username } = userSchema.parse(body);

		// kalo emailnya sama ga bisa
		const emailExisting = await db.user.findUnique({
			where: { email: email },
		});
		if (emailExisting) {
			return NextResponse.json(
				{ error: "Email already exists" },
				{ status: 409 }
			);
		}

		// kalo emailnya sama ga bisa
		const usernameExisting = await db.user.findUnique({
			where: { username: username },
		});
		if (usernameExisting) {
			return NextResponse.json(
				{ error: "Username already exists" },
				{ status: 409 }
			);
		}
		const passwordHash = await hash(password, 6);
		const newUser = await db.user.create({
			data: {
				email,
				password: passwordHash,
				username,
			},
		});
		// bikin password tidak terlihat di response
		const { password: newUserPassword, ...rest } = newUser;
		return NextResponse.json({ user: rest }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 }
		);
	}
}
