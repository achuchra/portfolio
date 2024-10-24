import { getStrapiURL } from "@/lib/utils";
import qs from "qs";
import "./globals.css";

import type { Metadata } from "next";
import { Abril_Fatface, Metrophobic } from "next/font/google";

import { cn } from "@/lib/utils";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ApiResponse, ApiRootLayout } from "@/types";

const fontSans = Metrophobic({
	variable: "--font-sans",
	weight: "400",
	subsets: ["latin"],
});

const fontHeading = Abril_Fatface({
	variable: "--font-heading",
	weight: "400",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Andrzej Chuchra - Senior Front-end Developer",
	description:
		"Andrzej Chuchra's webpage. Senior Front-end Developer with over 5 years of experience.",
};

const fetchRootLayout = async () => {
	const { fetchData } = await import("@/lib/fetch");
	const path = "/api/root-layout";
	const baseUrl = getStrapiURL();
	const url = new URL(path, baseUrl);

	const query = qs.stringify({
		populate: {
			nav: {
				populate: "*",
			},
			footer: {
				populate: "*",
			},
		},
	});
	url.search = query;

	const data = await fetchData<ApiResponse<ApiRootLayout>>(url.href);
	return data;
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const data = await fetchRootLayout();

	return (
		<html lang="en">
			<body
				className={cn(
					"flex h-svh flex-col p-5 pt-0 font-sans antialiased",
					fontSans.variable,
					fontHeading.variable,
				)}
			>
				<Header {...data} />
				<main className="content h-full min-h-[400px] overflow-hidden p-5">{children}</main>
				<Footer {...data} />
			</body>
		</html>
	);
}
