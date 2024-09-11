This is Easy Warehouse!

Easy Warehouse is my WMS web application to focus onto easy-to-use principle, no complexity, from inbound to inventory management to outbound.

#Main feature

-Inbound (receive item by enter UPC number, only can receive UPC number within exisiting item list.).
-Inventory (Look up for an item list, able to click on each item to see for more item detail, update item detail and delete specific item).
-Order (In development).
-Outbound (You can pick item by its UPC number, zero stock and over-pick is not allowed).
-Dashboard (Items summary chart).
-Create item (Create new item with image upload function).

This Web App is still in development, more features soon!

This App is inspired by my expriences as Warehouse Supervisor, sometimes WMS application is too technical to use, as though my app may be not relate to all WMS priciples, but
I'm sure it's easy to use and anyone without WMS knowledge can use this app easily.

Tech Stack: Next.JS, SQL (Supabase on Postgresql), Node.JS, Tailwind CSS, ShadCN

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
