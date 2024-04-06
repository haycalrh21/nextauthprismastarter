// middleware/isAuthenticated.ts

import { NextRequest, NextResponse } from "next/server";

export async function isAuthenticated(
	req: NextRequest
): Promise<NextRequest | NextResponse> {
	// Di sini Anda harus mengganti logika ini dengan cara yang sesuai dengan cara Anda mengimplementasikan autentikasi.
	// Misalnya, jika Anda menggunakan sesi, Anda dapat memeriksa apakah ada sesi yang aktif.
	const isAuthenticated = true; // Ganti ini dengan logika autentikasi Anda

	// Jika pengguna telah terautentikasi, lanjutkan ke permintaan selanjutnya.
	if (isAuthenticated) {
		return req;
	} else {
		// Jika pengguna belum terautentikasi, kirim respons bahwa akses ditolak.
		return NextResponse.redirect("/sign-in"); // Ganti '/login' dengan rute yang sesuai untuk halaman login Anda.
	}
}
