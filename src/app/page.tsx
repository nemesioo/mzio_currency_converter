"use client";

import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { fetchCurrencies, fetchExchangeRates } from "./_core/actions";
import { CurrencySelection } from "./_components/currency_selection";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useCurrencyStore } from "./_core/store";
import AmountInput from "./_components/amount_input";

export default function HomePage() {
  const {
    baseCurrency,
    setBaseCurrency,
    setCurrencies,
    setQouteCurrency,
    qouteCurrency,
    currencies,
    exchangeRates,
    setExchangeRates,
    setValue,
    value,
  } = useCurrencyStore();

  const { mutate: server_fetchCurrencies } = useMutation({
    mutationFn: fetchCurrencies,
    onError: (error) => {
      // toast.error(error.message);
    },
    onSuccess: (data) => {
      if (data) {
        setCurrencies(data);
      }
    },
  });

  const { mutate: server_fetchExchangeRates } = useMutation({
    mutationFn: fetchExchangeRates,
    onError: (error) => {
      // toast.error(error.message);
    },
    onSuccess: (data) => {
      if (data) {
        setExchangeRates(data);
      }
    },
  });

  useEffect(() => {
    server_fetchCurrencies();
    server_fetchExchangeRates("PHP");
  }, []);

  useEffect(() => {
    server_fetchExchangeRates(baseCurrency);
  }, [baseCurrency]);

  const exchange = (exchangeRates?.rates[qouteCurrency] ?? 0) * value;

  return (
    // <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
    //   <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
    //     <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
    //       <span className="text-[hsl(280,100%,70%)]">Currency Converter</span>{" "}
    //       App
    //     </h1>
    //     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div>
    //   </div>
    // </main>
    <main className="flex min-h-screen flex-col items-center justify-center space-y-2">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Currency Converter App
      </h1>
      {currencies && (
        <Card className="w-auto border border-gray-500 bg-[#121212]">
          <CardContent>
            <>
              <div className="flex flex-row space-x-2 pb-5">
                <div className="grid max-w-sm items-center gap-1.5">
                  <Label htmlFor="amount" className="text-white">
                    Amount
                  </Label>
                  <AmountInput value={value} onValueChange={setValue} />
                </div>
                <div className="grid max-w-sm items-center gap-1.5">
                  <Label htmlFor="from" className="text-white">
                    From
                  </Label>
                  <CurrencySelection
                    currencies={currencies!.filter(
                      (c) => c.value !== qouteCurrency,
                    )}
                    onCurrencyChange={setBaseCurrency}
                    value={baseCurrency}
                  />
                </div>
                <div className="grid max-w-sm items-center gap-1.5">
                  <Label htmlFor="to" className="text-white">
                    To
                  </Label>
                  <CurrencySelection
                    currencies={currencies!.filter(
                      (c) => c.value !== baseCurrency,
                    )}
                    onCurrencyChange={setQouteCurrency}
                    value={qouteCurrency}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white">
                  {value} {baseCurrency} = {exchange} {qouteCurrency}
                </span>
                <span className="text-white">
                  1 {baseCurrency} = {exchangeRates?.rates[qouteCurrency] ?? 1}
                  {qouteCurrency}
                </span>
              </div>
            </>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
