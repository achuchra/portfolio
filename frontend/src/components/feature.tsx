import { Anchor } from "@/components/anchor";
import type { FeatureProps } from "@/types";

export function Feature(data: Readonly<FeatureProps>) {
	if (!data) return null;
	const { description, link } = data;

	return (
		<p className="pb-5 text-xl">
			{description}
			{link ? <Anchor {...link} /> : null}
		</p>
	);
}
