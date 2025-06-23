# Church Website

A church website built with Next.js, Sanity.io, and Tailwind CSS.

Contains 2 separate applications, a Next app and a Sanity CMS

## Environment Variables

To run this project, you will need to create a `.env.local` file in the `nextjs-app` directory and a `.env` file in the `sanity-cms` directory.

### nextjs-app

Create a `.env.local` file in the `nextjs-app` directory and add the following environment variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID="<your-sanity-project-id>"
NEXT_PUBLIC_CHURCH_NAME="<your-church-name>"
NEXT_PUBLIC_SITE_URL="<your-website-url>"
```

### sanity-cms

Create a `.env` file in the `sanity-cms` directory and add the following environment variables:

```
SANITY_STUDIO_PROJECT_ID="<your-sanity-project-id>"
SANITY_STUDIO_DATASET="production"
```
