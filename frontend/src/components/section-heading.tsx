import React from "react";
import type { SectionHeadingProps } from "@/types";

export function SectionHeading(data: Readonly<SectionHeadingProps>) {
	if (!data) return null;
	const { heading } = data;

	return (
		<h3 className="pb-2 text-3xl">
			<b>{heading}</b>
		</h3>
	);
}
