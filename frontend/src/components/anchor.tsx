"use client";

import { cn } from "@/lib/utils";
import type { NavLink } from "@/types";
import { cva } from "class-variance-authority";
import { SquareArrowOutUpRightIcon } from "lucide-react";
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
	const pathnameSegments = pathname?.split("/") || [];
	const cleanHref = href?.replaceAll("/", "");

	const isActive = useMemo(() => pathnameSegments.includes(cleanHref), [pathname]);

	return (
		<Link
			href={href}
			className={cn(anchorVariants({ isActive, type }))}
			key={text}
			target={isExternal ? "_blank" : "_self"}
		>
			{isExternal ? (
				<>
					{text}
					<SquareArrowOutUpRightIcon size={16} className="inline w-6 pb-[2px]" />
				</>
			) : (
				text || children
			)}
		</Link>
	);
};
