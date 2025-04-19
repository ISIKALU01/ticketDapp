import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword } from "../../lib/firebase";
import { useRouter } from "next/router";
import Image from 'next/image';
import { useState } from "react";
import Link from 'next/link';
import Head from 'next/head';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Head>
        <style>{`
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .vibrant-gradient {
            background: linear-gradient(
              135deg,              
            #0f172a 0%,
            #1e1b4b 30%,
            #5b21b6 50%,
            #1e1b4b 70%,
            #0f172a 100%
            );
            background-size: 300% 300%;
            animation: gradientFlow 8s ease infinite;
          }
        `}</style>
       </Head>

       <div className="min-h-screen flex items-center justify-center bg-gray-50 font-raleway pt-24 pb-12 
        vibrant-gradient px-4 font-raleway">
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white/10 w-full max-w-md 
           hover:shadow-purple-500/10 transition-shadow duration-300 text-white">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semi-bold mb-2 font-great-vibes">Welcome Back</h1>
            <p className="text-sm">
              The Night Awaits Your Return...
            </p>
          </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white/90 hover:bg-white text-gray-800 
          font-medium py-3 px-4 rounded-lg mb-6 transition-all duration-300 hover:scale-[1.02]"
        >
          <Image
            src="https://www.google.com/favicon.ico"
            alt="Google"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 border-t border-white/20"></div>
          <span className="px-3 text-white/50 text-sm whitespace-nowrap">or sign in with email</span>
          <div className="flex-1 border-t border-white/20"></div>
        </div>  

        {/* Email Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500/90 hover:bg-purple-400 text-white font-medium py-3 px-4 rounded-lg 
            transition-all duration-300 shadow-lg hover:shadow-purple-400/20 hover:scale-[1.02]"
          >
            Sign In
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-purple-300 hover:text-purple-200 font-medium transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
    
  )}