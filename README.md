---
title: Church Website
---

# Church Website

This project is a modern, headless website for a church, built with Next.js for the frontend and Sanity.io as the content management system (CMS). It's designed to be easily customizable and deployable.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Project Structure

This repository contains two separate applications:

- `nextjs-app/`: The Next.js frontend that consumes data from the Sanity CMS.
- `sanity-cms/`: The Sanity Studio for managing all website content, such as events, team members, and articles.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You'll need `pnpm` installed on your machine. If you don't have it, you can install it with npm:

```bash
npm install -g pnpm
```

### Installation

1.  **Clone the repo**

    ```bash
    git clone <your-repo-url>
    cd <your-repo-folder>
    ```

2.  **Install frontend dependencies**

    ```bash
    cd nextjs-app
    pnpm install
    ```

3.  **Install CMS dependencies**

    ```bash
    cd ../sanity-cms
    pnpm install
    ```

### Running the Development Servers

You will need two separate terminal windows to run both the frontend and the CMS at the same time.

- **To start the Next.js frontend (from the `nextjs-app/` directory):**

  ```bash
  pnpm dev
  ```

  Your site will be available at [http://localhost:3000](http://localhost:3000).

- **To start the Sanity Studio (from the `sanity-cms/` directory):**
  ```bash
  pnpm dev
  ```
  The studio will be available at [http://localhost:3333](http://localhost:3333).

## Environment Variables

You will need to create two separate environment files for this project. Follow the instructions below to set them up.

### Frontend (`nextjs-app`)

Create a `.env.local` file in the `nextjs-app/` directory and add the following variables.

```
NEXT_PUBLIC_SANITY_PROJECT_ID="<your-sanity-project-id>"
NEXT_PUBLIC_CHURCH_NAME="<your-church-name>"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your project ID from manage.sanity.io.
- `NEXT_PUBLIC_CHURCH_NAME`: The name of your church, which will be displayed on the site.
- `NEXT_PUBLIC_SITE_URL`: The public URL of your website. For local development, this should be `http://localhost:3000`.

### CMS (`sanity-cms`)

Create a `.env` file in the `sanity-cms/` directory and add the following variables.

```
SANITY_STUDIO_PROJECT_ID="<your-sanity-project-id>"
SANITY_STUDIO_DATASET="production"
```

- `SANITY_STUDIO_PROJECT_ID`: The same project ID from Sanity.
- `SANITY_STUDIO_DATASET`: The name of the dataset to use (e.g., `production`).

## Deployment

This application is optimized for deployment on [Vercel](https://vercel.com/). You will need to configure Vercel to correctly deploy the `nextjs-app`.

When setting up your project on Vercel, make sure to:

1.  Set the **Root Directory** to `nextjs-app`.
2.  Add all the environment variables from `nextjs-app/.env.local` to your Vercel project settings.

This will ensure Vercel builds and deploys only your Next.js application. The Sanity Studio should be deployed separately. You can deploy it on Vercel as well, or use Sanity's own hosting by running `sanity deploy` from the `sanity-cms` directory.
