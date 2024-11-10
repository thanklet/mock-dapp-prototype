import amazon from "@/assets/amazon.png";
import apple from "@/assets/apple.svg";
import google from "@/assets/google.svg";
import paypal from "@/assets/paypal.svg";

const REGION_OPTIONS = [
  { children: "Japan(JP)", value: "JP" },
  { children: "United States(US)", value: "US" },
  { children: "United Kingdom(UK)", value: "UK" },
  { children: "Canada(CA)", value: "CA" },
  { children: "Australia(AU)", value: "AU" },
  { children: "Singapore(SG)", value: "SG" },
];

const VALUE_OPTIONS = [
  { children: "EUR", value: "EUR" },
  { children: "USD", value: "USD" },
  { children: "GBP", value: "GBP" },
  { children: "JPY", value: "JPY" },
  { children: "CAD", value: "CAD" },
  { children: "RUB", value: "RUB" },
  { children: "CNY", value: "CNY" },
  { children: "KRW", value: "KRW" },
];

const DIGITAL_GIFT_OPTIONS = [
  { value: "amazon", image: amazon },
  { value: "paypal", image: paypal },
  { value: "apple", image: apple },
  { value: "google", image: google },
];

export { REGION_OPTIONS, VALUE_OPTIONS, DIGITAL_GIFT_OPTIONS };
