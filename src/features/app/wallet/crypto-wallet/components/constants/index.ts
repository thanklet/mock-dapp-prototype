import amazon from "@/assets/amazon.svg";
import apple from "@/assets/apple.svg";
import google from "@/assets/google.svg";
import paypal from "@/assets/paypal.svg";

const regionOptions = [
  { children: "Japan (JP)", value: "JP" },
  { children: "United States (US)", value: "US" },
  { children: "United Kingdom (UK)", value: "UK" },
  { children: "Canada (CA)", value: "CA" },
  { children: "Australia (AU)", value: "AU" },
  { children: "Singapore (SG)", value: "SG" },
];

const currencyOptions = [
  { children: "EUR", value: "EUR" },
  { children: "USD", value: "USD" },
  { children: "GBP", value: "GBP" },
  { children: "JPY", value: "JPY" },
  { children: "CAD", value: "CAD" },
  { children: "RUB", value: "RUB" },
  { children: "CNY", value: "CNY" },
  { children: "KRW", value: "KRW" },
];

const digitalGiftOptions = [
  { value: "amazon", image: amazon },
  { value: "paypal", image: paypal },
  { value: "apple", image: apple },
  { value: "google", image: google },
];

const tokenOptions = [
  { children: "THX", value: "THX" },
  { children: "SOL", value: "SOL" },
];

export { regionOptions, currencyOptions, digitalGiftOptions, tokenOptions };
