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
		<footer className="mt-5 flex items-center justify-center border-2 sm:flex-row sm:justify-between">
			{footer.email ? (
				<Link
					href={`mailto:${footer.email}`}
					className="nav-link groupa flex items-center gap-3 py-2 pl-5 text-sm sm:px-5"
				>
					<Email />
					<span className="groupa-hover:text-red-200 hidden sm:inline">{footer.email}</span>
				</Link>
			) : null}
			<div className="striped hidden h-[2.6rem] w-full border-l-2 border-r-2 sm:flex"></div>
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
