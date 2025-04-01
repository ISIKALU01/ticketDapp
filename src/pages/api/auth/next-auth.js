import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { FirebaseAdapter } from '@next-auth/firebase-adapter';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized:", app.name); 

export const auth = getAuth(app);
export const db = getFirestore(app);

export default NextAuth({
  adapter: FirebaseAdapter(db), // Use Firebase adapter
  providers: [
    GoogleProvider({  // Updated provider syntax
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Firebase Email/Password Auth (manual implementation)
        const { email, password } = credentials;
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          return {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            name: userCredential.user.displayName,
          };
        } catch (error) {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
})