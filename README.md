This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

## branch names:

- branch main is locked (which mean can’t push to it at all)
- branches name should be prefixed with (dev,hotfix,feature) and suffix with `-[a-z0-9_-]{3,}` , e.g:
  - `dev-123-ab`
  - `dev-a_b`
  - `hotfix-123abc`
- merge to main only after PR approval , then branch is deleted automatically

to get started , go to main branch (locally):

```bash
git pull (to make sure you aligned with origin/main)
git checkout -b dev-example-01
git add . # add your changes to staging area
git commit -m 'changes...' # commit changes
```

publish branch
open pull request
etc…

## typescript naming convention:

- use ITypeName with the I prefix for every type in the project , i.e.:

```ts
type Foo = string; // this is wrong 👎
type IFoo = string; // this should be the convention 👍
```

- use EEnumName with the E prefix for every enum in the project , i.e.:

```ts
enum Foo = {A,B}; // this is wrong 👎
type EFoo = {A,B}; // this should be the convention 👍
```

## DB Tree:

adding to the project an `db/**` folder which represet the data modeling in the database.
if the model is change run `tree db` so and update this block (tree represtation of db model):

```
.
├── clients
│   └── [clientDoc]
│       ├── companies
│       │   └── [companyDoc]
│       ├── settings
│       │   └── [settingDoc]
│       │       └── budgeChapters
│       │           └── [budgetChapterDoc]
│       │               └── budgetItems
│       │                   └── [budgetItemDoc]
│       └── usersRoles
│           └── [userRolesDoc]
├── projects
│   └── [projectDoc]
│       ├── appartments
│       │   └── [appartmentDoc]
│       ├── attachments
│       │   └── [attachmentDoc]
│       ├── buildings
│       │   └── [buildingDoc]
│       │       └── floors
│       │           └── [floorDoc]
│       ├── confirmsSettings
│       │   └── [confirmDoc]
│       ├── contracts
│       │   └── [contractDoc]
│       │       ├── accounts
│       │       │   └── [accountDoc]
│       │       ├── actuals
│       │       │   └── [actualDoc]
│       │       ├── comments
│       │       │   └── [commentDoc]
│       │       ├── payments
│       │       │   └── [paymentDoc]
│       │       └── sections
│       │           └── [sectionDoc]
│       │               └── milestones
│       │                   └── [milestoneDoc]
│       └── oddJobs
│           └── [oddJobDoc]
├── users
│   └── [userDoc]
└── vendors
    └── [vendorDoc]
        └── contacts
            └── [contactDoc]
```
