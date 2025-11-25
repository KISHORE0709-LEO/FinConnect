import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const currencies = [
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
];

export const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchExchangeRate = async () => {
    if (!fromCurrency || !toCurrency) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      
      if (data.rates && data.rates[toCurrency]) {
        setExchangeRate(data.rates[toCurrency]);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error("Failed to fetch exchange rate:", error);
      // Fallback rates for demo
      const fallbackRates: { [key: string]: { [key: string]: number } } = {
        INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095 },
        USD: { INR: 83.2, EUR: 0.92, GBP: 0.79 },
        EUR: { INR: 90.5, USD: 1.09, GBP: 0.86 },
      };
      
      if (fallbackRates[fromCurrency]?.[toCurrency]) {
        setExchangeRate(fallbackRates[fromCurrency][toCurrency]);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (fromAmount && exchangeRate) {
      const converted = (parseFloat(fromAmount) * exchangeRate).toFixed(2);
      setToAmount(converted);
    } else {
      setToAmount("");
    }
  }, [fromAmount, exchangeRate]);

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFromAmount(value);
    }
  };

  return (
    <Card className="bg-card/80 border-primary/30 p-4 glow-card hover:glow-border transition-all duration-300 backdrop-blur-sm animate-currency-glow group">
      <div className="space-y-4">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-lg font-bold glow-text flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
            💱 Currency Converter
          </h3>
          {lastUpdated && (
            <p className="text-xs text-primary/70 mt-1 font-mono">
              🎮 Live rate updated: {lastUpdated}
            </p>
          )}
        </div>

        {/* From Currency */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-primary">From</Label>
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger className="bg-background/50 border-primary/30 text-foreground glow-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-primary/30">
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            type="text"
            placeholder="Enter amount"
            value={fromAmount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="bg-background/50 border-primary/30 text-foreground glow-border focus:border-primary"
          />
        </div>

        {/* Exchange Rate Display */}
        {exchangeRate && (
          <div className="text-center py-2 border border-primary/20 rounded-lg bg-background/30 glow-border">
            <div className="text-sm text-primary font-mono font-bold">
              1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </div>
            {isLoading && (
              <div className="text-xs text-neon-green animate-pulse flex items-center justify-center gap-1">
                <span className="animate-spin">⚡</span> Updating...
              </div>
            )}
          </div>
        )}

        {/* To Currency */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-primary">To</Label>
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger className="bg-background/50 border-primary/30 text-foreground glow-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-primary/30">
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            type="text"
            value={toAmount}
            disabled
            className="bg-muted/30 border-primary/20 text-foreground font-mono text-lg font-bold cursor-not-allowed"
            placeholder="Converted amount"
          />
        </div>

        {/* Game-like Status */}
        <div className="text-center pt-2 border-t border-primary/20">
          <div className="text-xs text-primary/80 flex items-center justify-center gap-1">
            <span className="animate-bounce">🎮</span> 
            <span className="font-mono">Live exchange rate updated</span>
            <span className="animate-pulse">✨</span>
          </div>
        </div>
      </div>
    </Card>
  );
};