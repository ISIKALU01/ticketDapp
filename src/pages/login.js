// pages/login.js
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await signIn('credentials', { email, password }); // Sync with NextAuth
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <button
          onClick={() => signIn('google')} // Use Google provider
          className="bg-white border border-gray-300 
          text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}