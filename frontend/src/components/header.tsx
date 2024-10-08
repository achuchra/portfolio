import type { ApiResponse, ApiRootLayout, NavLink } from "@/types";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MobileNavbar } from "@/components/mobile-navbar";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import { Anchor } from "@/components/anchor";

export function Header({ data }: Readonly<ApiResponse<ApiRootLayout>>) {
	if (!data) return null;
	const { name, title, nav } = data;
	return (
		<header className="flex flex-col">
			<div className="flex flex-col">
				<h1 className="gradient-mask font-heading text-5xl leading-relaxed tracking-wider">
					{name}
				</h1>
				<h3>{title}</h3>
			</div>
			<nav className="flex items-center justify-around pt-5">
				{nav.navItems && nav.navItems.map((item) => <Anchor {...item} />)}
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
