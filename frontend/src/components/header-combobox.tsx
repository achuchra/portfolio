"use client";

import { Combobox } from "@/components/combobox";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const HeaderCombobox = ({ items }: { items: Array<{ label: string; value: string }> }) => {
	const pathname = usePathname();
	const [selectedValue, setSelectedValue] = useState<string | undefined>("");

	useEffect(() => {
		setSelectedValue(() => {
			return items.find(({ value }) => pathname.includes(value))?.label;
		});
	}, [pathname]);

	return <Combobox selectedValue={selectedValue} options={items} asLinks withSearch={false} />;
};
