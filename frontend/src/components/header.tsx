import type { ApiResponse, ApiRootLayout } from "@/types";
import { Anchor } from "@/components/anchor";
import { HeaderCombobox } from "@/components/header-combobox";

export function Header({ data }: Readonly<ApiResponse<ApiRootLayout>>) {
	if (!data) return null;
	const { name, title, nav } = data;
	return (
		<header className="flex flex-col">
			<div className="flex flex-col items-center sm:flex-row sm:justify-between">
				<h1 className="gradient-mask font-heading text-3xl leading-relaxed tracking-wider sm:text-4xl sm:leading-relaxed lg:text-5xl lg:leading-relaxed">
					{name}
				</h1>
				<h2 className="text-l lg:text-xl">{title}</h2>
			</div>
			<nav className="hidden items-center justify-around pt-2 sm:flex">
				{nav.navItems && nav.navItems.map((item) => <Anchor {...item} type="navlink" />)}
			</nav>
			<nav className="relative flex pt-2 sm:hidden sm:pt-5">
				<HeaderCombobox
					items={nav.navItems.map((navItem) => ({
						label: navItem.text || "",
						value: navItem.href,
					}))}
				/>
			</nav>
		</header>
	);
}
