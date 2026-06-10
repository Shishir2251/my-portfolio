# Shishir Portfolio CMS

Personal portfolio built with Next.js and Firebase, designed to work as a CMS-backed site with an admin dashboard.

## Features

- Next.js App Router
- Firebase Authentication for admin login
- Firestore-backed CMS content
- Serverless API route for reading and saving content
- Dynamic portfolio sections with placeholder fallback data
- Protected `/admin` dashboard for content editing

## Project Structure

- `portfolio/` - main Next.js app
- `portfolio/src/app/admin/page.tsx` - admin dashboard
- `portfolio/src/app/api/content/route.ts` - serverless CMS API
- `portfolio/src/lib/content.ts` - default placeholder content
- `portfolio/src/lib/cms.ts` - Firestore load/save helpers

## Local Setup

1. Install dependencies.

```bash
cd portfolio
npm install
```

2. Create `.env.local` in `portfolio/` and add Firebase config.

3. Run the app.

```bash
npm run dev
```

4. Open:

- Home: `http://localhost:3000`
- Admin dashboard: `http://localhost:3000/admin`

## Firebase Setup

### 1. Enable Authentication

- Go to Firebase Console
- Open **Authentication**
- Enable **Email/Password** sign-in

### 2. Create Firestore Database

- Go to **Firestore Database**
- Create a database
- Use the default collection path below for CMS content:

```text
portfolio-cms/content
```

### 3. Create an Admin User

- In **Authentication**, create a user with email/password
- Put that email into `FIREBASE_ADMIN_EMAIL`
- Only that email will be allowed to save CMS changes if the env var is set

### 4. Add Service Account Keys

- Go to **Project Settings > Service accounts**
- Generate a new private key
- Add the values to `.env.local`

## Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
FIREBASE_ADMIN_EMAIL=
```

## Firestore Data Shape

The CMS stores data in:

- Collection: `portfolio-cms`
- Document: `content`

If the document does not exist, the site falls back to the built-in placeholder content.

## Admin Workflow

1. Visit `/admin`
2. Sign in with the Firebase Auth account
3. Edit the content fields
4. Click **Save changes**
5. The homepage updates from Firestore

## Notes

- `.env.local` is ignored by git
- Firebase service account JSON files should never be committed
- The site still renders default placeholder content if Firestore is unavailable

## License

Private project for personal portfolio use.
