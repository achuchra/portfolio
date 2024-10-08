import { Email } from "@/components/icons/email";
import { Facebook } from "@/components/icons/facebook";
import { GitHub } from "@/components/icons/github";
import { LinkedIn } from "@/components/icons/linkedin";
import { ApiResponse, ApiRootLayout, LinkIcon } from "@/types";
import Link from "next/link";

function renderIcon(text: LinkIcon) {
	switch (text) {
		case "linkedin":
			return <LinkedIn />;
		case "github":
			return <GitHub />;
		case "facebook":
			return <Facebook />;
		default:
			return null;
	}
}

export function Footer({ data }: Readonly<ApiResponse<ApiRootLayout>>) {
	if (!data) return null;
	const { footer } = data;
	return (
		<footer className="mt-5 flex items-center justify-between border-2">
			<a href={`mailto:${footer.email}`} className="flex items-center gap-3 px-5 py-2 text-sm">
				<Email />
				{footer.email}
			</a>
			<div className="striped flex h-10 w-full border-l-2 border-r-2"></div>
			<div className="flex items-center gap-5 px-5 py-2">
				{footer.socialLinks &&
					footer.socialLinks.map((link) => {
						const { href, isExternal, icon } = link;

						return (
							<Link
								href={href}
								className="text-muted-foreground hover:text-foreground"
								key={icon}
								target={isExternal ? "_blank" : "_self"}
							>
								{icon && renderIcon(icon)}
							</Link>
						);
					})}
			</div>
		</footer>
	);
}
