"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";

export function Combobox({
	defaultValue,
	options,
	asLinks,
	withSearch,
}: {
	defaultValue?: string;
	options: Array<{ label: string; value: string }>;
	asLinks?: boolean;
	withSearch?: boolean;
}) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button aria-expanded={open} className="w-full justify-between rounded-none border-2">
					{value ? options.find((option) => option.value === value)?.label : "Select framework..."}
					<ChevronDown />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-max p-0">
				<Command>
					{withSearch ? <CommandInput defaultValue={defaultValue} /> : null}
					<CommandList>
						<CommandGroup>
							{options.map((option) => {
								return asLinks ? (
									<Link href={option.value}>
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
