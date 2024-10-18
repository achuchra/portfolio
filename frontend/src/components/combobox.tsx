"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";

export function Combobox({
	selectedValue,
	options,
	asLinks,
	withSearch,
}: {
	selectedValue?: string;
	options: Array<{ label: string; value: string }>;
	asLinks?: boolean;
	withSearch?: boolean;
}) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(".");

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button aria-expanded={open} className="w-full justify-between rounded-none border-2">
					{selectedValue || value}
					<ChevronDown
						className={open ? "rotate-180 transition-transform" : "rotate-0 transition-transform"}
					/>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-max p-0">
				<Command>
					{withSearch ? <CommandInput /> : null}
					<CommandList>
						<CommandGroup>
							{options.map((option) => {
								return asLinks ? (
									<Link key={option.value} href={option.value}>
										<CommandItem
											value={option.value}
											onSelect={(currentValue) => {
												const valueToSet = options.find((o) => o.value === currentValue)?.label;
												!selectedValue && setValue(valueToSet || "");
												setOpen(false);
											}}
										>
											{option.label}
										</CommandItem>
									</Link>
								) : (
									<CommandItem
										key={option.value}
										value={option.value}
										onSelect={(currentValue) => {
											setValue(currentValue);
											setOpen(false);
										}}
									>
										{option.label}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
