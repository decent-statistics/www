import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stripUuidDashes(uuid: string) {
  return uuid.replace(/-/g, "");
}

export function hyphenateUuid(uuid: string) {
  const stripped = stripUuidDashes(uuid);
  return `${stripped.slice(0, 8)}-${stripped.slice(8, 12)}-${stripped.slice(
    12,
    16
  )}-${stripped.slice(16, 20)}-${stripped.slice(20)}`;
}

export function formatNumber(
  number: number,
  locales?: Intl.LocalesArgument,
  options?: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat(locales, options).format(number);
}
