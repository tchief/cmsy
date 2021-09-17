import { quotes } from "./quotes";
import { default as slugify } from "slugify";
import { Page, TextResource } from "../types";

const quotesResources = quotes.map((q, i) => ({
  key: slugify(`${q.author}-${i}`),
  value: `"${q.text}" - ${q.author}`,
  maxLength: 250,
  isMultiline: true,
}));
const groupBy = (x, f) => x.reduce((a, b) => ((a[f(b)] ||= []).push(b), a), {});

const authors = groupBy(quotes, (q) => q.author);
const quotesPages = Object.keys(authors).map((author) => ({
  name: author,
  url: slugify(`${author}`),
  resources: authors[author],
}));

const pageResources = [
  { key: "header", maxLength: 40, isMultiline: false, value: "Ready to take charge of your content?" },
  { key: "greeting", maxLength: 150, isMultiline: true, value: "Join a global community of Creators" },
  { key: "contact", maxLength: 40, isMultiline: true, value: "Join the Waitlist" },
];

const webPages = [
  { name: "Welcome", url: "https://earth.com/welcome", resources: pageResources.slice(0, 1) },
  { name: "Contact Us", url: "https://earth.com/contact", resources: pageResources.slice(2) },
];

export const pages: Page[] = [...quotesPages, ...webPages];

export const resources: TextResource[] = [...quotesResources, ...pageResources];
