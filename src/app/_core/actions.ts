"use server";

export async function fetchCurrencies() {
  try {
    const res = await fetch("https://api.frankfurter.dev/v1/currencies");
    if (!res.ok) throw new Error("Failed to fetch currencies");

    const data: Record<string, string> = await res.json();
    console.log(data);

    // Convert object to array of { value, label } objects
    return Object.entries(data).map(([value, label]) => ({ value, label }));
  } catch (error) {
    console.error("Error fetching currencies:", error);
    return [];
  }
}

export async function fetchExchangeRates(baseCurrency: string = "PHP") {
  try {
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${baseCurrency}`,
    );
    if (!res.ok) throw new Error("Failed to fetch exchange rates");

    const data = await res.json();
    return data; // Returns { amount, base, date, rates }
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
}
