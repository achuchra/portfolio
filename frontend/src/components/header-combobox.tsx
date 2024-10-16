"use client";

import { Combobox } from "@/components/combobox";
import { usePathname } from "next/navigation";

export const HeaderCombobox = ({ items }: { items: Array<{ label: string; value: string }> }) => {
	const pathname = usePathname();

	return (
		<Combobox
			defaultValue={items.find((item) => pathname.includes(item.value))?.value}
			options={items}
			asLinks
			withSearch={false}
		/>
	);
};
