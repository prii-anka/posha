# Firebase Setup Guide for Beta User Tracking

## Overview
This guide will help you set up Firebase to collect beta user data for Posha.

## What Firebase Does for You
- **Authentication**: Track who signs up (Google, Apple, Email)
- **Database (Firestore)**: Store user emails, names, profiles, and engagement data
- **Analytics**: Track user behavior and app usage
- **Free Tier**: 50K reads/day, 20K writes/day (more than enough for beta)

---

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: **"Posha"** or **"Posha-Beta"**
4. Enable Google Analytics (recommended)
5. Click **"Create project"**

---

## Step 2: Add Web App to Firebase

1. In your Firebase project, click the **⚙️ Settings** icon → **Project settings**
2. Scroll down to **"Your apps"** section
3. Click the **</> Web icon** to add a web app
4. App nickname: **"Posha Web App"**
5. **Check** "Also set up Firebase Hosting" (optional)
6. Click **"Register app"**
7. **Copy the Firebase configuration** (firebaseConfig object)

---

## Step 3: Enable Firestore Database

1. In Firebase Console sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in production mode"** (we'll update rules next)
4. Choose a Cloud Firestore location (pick one closest to you)
5. Click **"Enable"**

### Update Firestore Security Rules

1. Go to **Firestore Database** → **Rules** tab
2. Replace with these rules:

\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all users to write their own data during beta
    match /betaUsers/{email} {
      allow read, write: if true; // Open for beta testing
    }
  }
}
\`\`\`

3. Click **"Publish"**

⚠️ **Note**: These rules are open for beta testing. Restrict them later for production.

---

## Step 4: Enable Authentication Methods

1. In Firebase Console, click **"Authentication"**
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable these providers:
   - **Email/Password** (Click → Enable → Save)
   - **Google** (Click → Enable → Add support email → Save)
   - **Apple** (Optional, requires Apple Developer account)

---

## Step 5: Configure Your App

1. **Create `.env` file** in your project root:
   ```bash
   cd "d:\SA ASU\SA Education by Design\SA Weather Wardrobe\posha"
   copy .env.example .env
   ```

2. **Open `.env` file** and paste your Firebase config:
   ```
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=posha-xxxxx.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=posha-xxxxx
   VITE_FIREBASE_STORAGE_BUCKET=posha-xxxxx.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   VITE_FIREBASE_MEASUREMENT_ID=G-ABC123XYZ
   ```

3. **Add `.env` to `.gitignore`** (already done - never commit this file!)

---

## Step 6: Update Your Code

The Firebase integration is already set up! Here's what happens:

### When a user signs up:
- `saveBetaUser()` saves their data to Firestore
- Data includes: email, name, signup method, profile, engagement metrics

### Data structure saved:
\`\`\`javascript
{
  email: "user@example.com",
  name: "User Name",
  signupMethod: "google",
  signupDate: <timestamp>,
  lastActive: <timestamp>,
  profile: {
    gender: "female",
    styleVibes: ["minimalist", "casual"],
    makeupPreference: "everyday",
    theme: "light"
  },
  engagement: {
    onboardingCompleted: true,
    hasUsedChat: false,
    hasAddedClothes: false,
    hasCreatedOutfit: false,
    totalSessions: 1
  },
  feedback: {
    rating: null,
    review: null,
    submitted: false
  }
}
\`\`\`

---

## Step 7: Test the Integration

1. **Restart your dev server**:
   ```bash
   npm run dev -- --host
   ```

2. **Sign up as a test user**:
   - Go to http://localhost:5173/
   - Click "Get Started"
   - Sign up with email or Google

3. **Check Firebase Console**:
   - Go to **Firestore Database**
   - You should see a new document in `betaUsers` collection
   - Click on the document to see all user data

---

## Step 8: View Your Beta Users

### In Firebase Console:
1. Go to **Firestore Database**
2. Click **"betaUsers"** collection
3. See all users who signed up

### Export Data (for emails):
1. Click on a document
2. Copy email addresses manually, or
3. Use Firebase CLI to export: `firebase firestore:export`

### For Analytics:
1. Go to **Analytics** → **Dashboard**
2. See user counts, retention, engagement

---

## What Data You Can Track

✅ User emails (for reaching out)
✅ Signup dates (who are early adopters)
✅ Profile preferences (style vibes, gender)
✅ Engagement metrics (did they use chat, add clothes, etc.)
✅ Session count (how many times they returned)
✅ Last active timestamp
✅ Feedback/reviews (when you add a feedback form)

---

## Next Steps

1. **Create Firebase project** (5 minutes)
2. **Copy config to `.env`** (2 minutes)
3. **Test signup flow** (1 minute)
4. **Deploy to Vercel** with environment variables

---

## Adding Environment Variables to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **Posha** project
3. Go to **Settings** → **Environment Variables**
4. Add each variable from your `.env` file:
   - `VITE_FIREBASE_API_KEY` = `your_api_key`
   - `VITE_FIREBASE_AUTH_DOMAIN` = `your_domain`
   - etc.
5. Click **"Save"**
6. **Redeploy** your app

---

## Alternative: Google Forms (Simpler)

If Firebase feels too complex, you can use Google Forms:

1. Create a Google Form with fields: Name, Email, Feedback
2. Add a "Submit Feedback" button in your app
3. Link opens the Google Form
4. Users manually fill it out

**Pros**: Super simple, no code needed
**Cons**: Users need to manually submit, less automatic

---

## Questions?

- Firebase Docs: https://firebase.google.com/docs/web/setup
- Firestore Docs: https://firebase.google.com/docs/firestore
- Firebase Support: https://firebase.google.com/support

Your beta users are now being tracked! 🎉
