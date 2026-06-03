type ILink = { name: string; href: string };

export const LinkData: ILink[] = [
  { name: "Books", href: "/books" },
  { name: "Loans", href: "/loans" },
  { name: "Fines", href: "/fines" },
];

type ITabsBook = { name: string; value: string };

export const TabsBookData: ITabsBook[] = [
  { name: "ALL BOOKS", value: "all" },
  { name: "CATEGORIES", value: "category" },
  { name: "AUTHORS", value: "author" },
  { name: "PUBLISHERS", value: "publisher" },
];
