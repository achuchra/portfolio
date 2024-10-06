"use client";

import { cn } from "@/lib/utils";
import type { NavLink } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Anchor = ({ href, isExternal, text }: NavLink) => {
	const pathname = usePathname();
	const isActive = pathname?.includes(href) ? "active-link pointer-events-none" : "link";

	return (
		<Link
			href={href}
			className={cn("w-full cursor-auto p-2 text-center", isActive)}
			key={text}
			target={isExternal ? "_blank" : "_self"}
		>
			{text}
		</Link>
	);
};
