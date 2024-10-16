import type { ApiResponse, ApiRootLayout } from "@/types";
import { Anchor } from "@/components/anchor";
import { Combobox } from "@/components/combobox";
import { HeaderCombobox } from "@/components/header-combobox";
import Link from "next/link";

export function Header({ data }: Readonly<ApiResponse<ApiRootLayout>>) {
	if (!data) return null;
	const { name, title, nav } = data;
	return (
		<header className="flex flex-col">
			<div className="flex flex-col">
				<h1 className="gradient-mask font-heading text-3xl leading-relaxed tracking-wider sm:text-4xl sm:leading-relaxed md:text-5xl md:leading-relaxed">
					{name}
				</h1>
				<h3>{title}</h3>
			</div>
			<nav className="hidden items-center justify-around pt-5 sm:flex">
				{nav.navItems && nav.navItems.map((item) => <Anchor {...item} />)}
			</nav>
			<nav className="relative flex pt-5 sm:hidden">
				<HeaderCombobox
					items={nav.navItems.map((navItem) => ({
						label: navItem.text || "",
						value: navItem.href,
					}))}
				/>
			</nav>
			{/* {cta && (
          <div className="hidden items-center gap-2 md:flex">
            <Button asChild>
              <Link
                href={cta.href}
                className="cursor-pointer"
                target={cta.isExternal ? "_blank" : "_self"}
              >
                {cta.text}
              </Link>
            </Button>
          </div>
        )}
      </div>
      <MobileNavbar>
        <div className="rounded-b-lg bg-background py-4 container text-foreground shadow-xl">
          <nav className="flex flex-col gap-1 pt-2">
            {navItems &&
              navItems.map((item) => (
                <Link
                  key={item.text}
                  href={item.href}
                  className="flex w-full cursor-pointer items-center rounded-md p-2 font-medium text-muted-foreground hover:text-foreground"
                >
                  {item.text}
                </Link>
              ))}

            {cta && (
              <Button asChild size="lg" className="mt-2 w-full">
                <Link
                  href={cta.href}
                  className="cursor-pointer"
                  target={cta.isExternal ? "_blank" : "_self"}
                >
                  {cta.text}
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </MobileNavbar> */}
		</header>
	);
}
