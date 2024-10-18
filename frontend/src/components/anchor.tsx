"use client";

import { cn } from "@/lib/utils";
import type { NavLink } from "@/types";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";

const anchorVariants = cva("w-full cursor-auto p-2 text-center", {
	variants: {
		isActive: {
			true: "pointer-events-none active-nav-link",
			false: "",
		},
		type: {
			default: "link",
			navlink: "nav-link",
		},
	},
	defaultVariants: {
		isActive: false,
		type: "default",
	},
});

type AnchorProps = {
	children?: ReactNode;
	type?: "navlink" | "default";
} & NavLink;

export const Anchor = ({ href, isExternal, text, children, type = "default" }: AnchorProps) => {
	const pathname = usePathname();
	const isActive = useMemo(() => pathname?.includes(href), [pathname]);

	return (
		<Link
			href={href}
			className={cn(anchorVariants({ isActive, type }))}
			key={text}
			target={isExternal ? "_blank" : "_self"}
		>
			{text || children}
		</Link>
	);
};
