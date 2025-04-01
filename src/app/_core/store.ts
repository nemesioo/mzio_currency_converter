import { create } from "zustand";

export interface ExchangeRates {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

type CurrencyStore = {
  baseCurrency: string;
  setBaseCurrency: (currency: string) => void;
  qouteCurrency: string;
  setQouteCurrency: (currency: string) => void;
  currencies: { value: string; label: string }[] | null;
  setCurrencies: (currencies: { value: string; label: string }[]) => void;
  exchangeRates: ExchangeRates | null;
  setExchangeRates: (exchangeRates: ExchangeRates) => void;
  value: number;
  setValue: (value: number) => void;
};

export const useCurrencyStore = create<CurrencyStore>((set, state) => ({
  baseCurrency: "PHP",
  setBaseCurrency: (currency) => set({ ...state, baseCurrency: currency }),
  qouteCurrency: "USD",
  setQouteCurrency: (currency) => set({ ...state, qouteCurrency: currency }),
  currencies: null,
  setCurrencies: (currencies) => set({ ...state, currencies: currencies }),
  exchangeRates: null,
  setExchangeRates: (exchangeRates) =>
    set({ ...state, exchangeRates: exchangeRates }),
  value: 100,
  setValue: (value: number) => set({ ...state, value: value }),
}));
