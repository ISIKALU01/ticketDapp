// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

// MongoDB connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: 'http://localhost:3000/auth/google/callback', // Custom Redirect URI

    }),
    Providers.Credentials({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await client.connect();
        const db = client.db('my-database'); // Replace with your DB name
        const usersCollection = db.collection('users');

        // Find user by email
        const user = await usersCollection.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('No user found with this email.');
        }

        // Compare passwords
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid password.');
        }

        return { id: user._id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async session(session, user) {
      session.user.id = user.id; // Add user ID to the session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Add a secret for encryption
});