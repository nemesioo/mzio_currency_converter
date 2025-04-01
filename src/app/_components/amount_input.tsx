import { useState } from "react";
import { Input } from "~/components/ui/input";

type AmountInputProps = {
  value: number;
  onValueChange: (value: number) => void;
};

export default function AmountInput({
  value,
  onValueChange,
}: AmountInputProps) {
  return (
    <Input
      type="text"
      id="amount"
      placeholder="Amount"
      pattern="[0-9]*"
      inputMode="numeric"
      className="text-white"
      value={value}
      onChange={(e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
          if (!Number.isNaN(parseInt(value))) {
            onValueChange(parseInt(value));
          } else {
            onValueChange(0);
          }
        }
      }}
    />
  );
}
