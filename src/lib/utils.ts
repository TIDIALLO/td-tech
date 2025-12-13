import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convertit un texte en slug URL-safe.
 * Exemple: "Développement .NET/C#" -> "developpement-net-c"
 */
export function slugify(input: string): string {
  return input
    .toString()
    .normalize("NFKD") // sépare accents (é -> e + ́)
    .replace(/[\u0300-\u036f]/g, "") // supprime accents
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

/**
 * Formate une date en FR par défaut.
 * Supporte Date, string ISO, et Prisma Date (Date).
 */
export function formatDate(
  value: Date | string,
  locale: string = "fr-FR",
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "2-digit" },
): string {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return new Intl.DateTimeFormat(locale, options).format(date)
}
