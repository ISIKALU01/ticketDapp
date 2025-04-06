import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword } from "../../lib/firebase";
import { useRouter } from "next/router";
import Image from 'next/image'
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  
    // Email/password login
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/dashboard');
      } catch (error) {
        alert(error.message);
      }
    };
  
    // Google login
    const handleGoogleLogin = async () => {
      try {
        await signInWithPopup(auth, googleProvider);
        router.push('/dashboard');
      } catch (error) {
        alert(error.message);
      }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          
          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center mb-4"
          >
            <Image
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              width={20}
              height={20}
              className="w-5 h-5 mr-2" 
            />
            Login with Google
          </button>
  
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-gray-500 text-sm">OR</span>
            </div>
          </div>
  
          {/* Email Login */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>
  
          <div className="mt-4 text-center text-sm">
            Dont have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    );
  }
