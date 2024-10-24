import type { HTMLAttributeAnchorTarget } from "react";

type ComponentType =
	| "layout.hero"
	| "layout.card-grid"
	| "layout.section-heading"
	| "layout.content-with-image"
	| "layout.price-grid"
	| "elements.feature";

interface Base<T extends ComponentType, D extends {} = {}> {
	__component: T;
	id: string;
	createdAt: string;
	updatedAt: string;
	data: D;
}

export type LinkIcon = "linkedin" | "facebook" | "github";

export interface NavLink {
	href: string;
	text?: string;
	icon?: LinkIcon;
	isExternal: HTMLAttributeAnchorTarget;
	isPrimary: boolean;
}

export type Block =
	| HeroProps
	| CardGridProps
	| SectionHeadingProps
	| ContentWithImageProps
	| PriceGridProps
	| FeatureProps;

export interface FeatureProps extends Base<"elements.feature"> {
	description: string;
	link?: NavLink;
}

export interface HeroProps extends Base<"layout.hero"> {
	heading: string;
	text: string;
	topLink?: NavLink;
	buttonLink?: NavLink[];
	image: {
		url: string;
		alternativeText: string | null;
		name: string;
	};
}

export interface CardGridProps extends Base<"layout.card-grid"> {
	cardItems: {
		id: string;
		heading: string;
		text: string;
		icon: string;
	}[];
}

export interface SectionHeadingProps extends Base<"layout.section-heading"> {
	heading: string;
	subHeading: string;
	text: string;
	centered?: boolean;
}

export interface ContentWithImageProps extends Base<"layout.content-with-image"> {
	reverse: boolean;
	image: {
		url: string;
		name: string;
	};
	heading: string;
	subHeading: string;
	text: string;
}

export interface PriceGridProps extends Base<"layout.price-grid"> {
	priceCard: {
		id: string;
		heading: string;
		description: string;
		price: string;
		selected: boolean;
		feature: {
			id: string;
			description: string;
		}[];
		link: NavLink;
	}[];
}

export interface ApiResponse<T> {
	data: T;
}

export interface ApiRootLayout {
	name: string;
	title: string;
	nav: {
		navItems: NavLink[];
	};
	footer: {
		email: string;
		socialLinks: NavLink[];
	};
}

export interface ApiHome {
	firstLine: string;
	secondLine: string;
	bgMobile: {
		name: string;
		width: number;
		height: number;
		url: string;
	};
	bgTablet: {
		name: string;
		width: number;
		height: number;
		url: string;
	};
	bgDesktop: {
		name: string;
		width: number;
		height: number;
		url: string;
	};
}

export interface ApiAboutPage {
	title: string;
	description: string;
	blocks: Block[];
}

export interface ApiAbout {
	paragraph: Array<{ description: string; link?: NavLink }>;
}
export interface ApiExperience {
	company: string;
	role: string;
	started: string;
	finished: string;
	description: string;
	stack: string;
	previous?: string;
	next?: string;
	references: Reference[];
	paragraph: Array<{ description: string }>;
	slug: string;
}

export interface ApiProject {
	title: string;
	description: string;
	stack: string;
	previous?: string;
	next?: string;
	references: Reference[];
	paragraph: Array<{ description: string; link?: NavLink }>;
	slug: string;
}

export interface Reference {
	title: string;
	link: NavLink;
}
