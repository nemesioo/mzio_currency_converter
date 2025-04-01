"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

type CurrencySelectionProps = {
  currencies: { value: string; label: string }[] | null;
  onCurrencyChange: (currency: string) => void;
  value: string;
};

export function CurrencySelection({
  currencies,
  onCurrencyChange,
  value,
}: CurrencySelectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? currencies!.find((currencie) => currencie.value === value)?.label
            : "Select currency..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search currency..." className="h-9" />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {currencies!.map((currencie) => (
                <CommandItem
                  key={currencie.value}
                  value={currencie.value}
                  onSelect={(currentValue) => {
                    onCurrencyChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {currencie.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === currencie.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
