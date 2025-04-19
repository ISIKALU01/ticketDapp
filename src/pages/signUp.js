import { useState} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  auth, 
  createUserWithEmailAndPassword, 
  googleProvider, 
  signInWithPopup, 
  sendEmailVerification
} from '../../lib/firebase';
import Image from 'next/image';
import Head from 'next/head';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Form validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await sendEmailVerification(userCredential.user, {
        url: `${window.location.origin}/login`, // Points to login page after verification
        handleCodeInApp: false // Opens in browser rather than app
      });
      
      setSuccessMessage(
        <div className="text-center">
          <p className="mb-4">
            Verification email sent to <strong>{email}</strong>.
          </p>
          <p className="mb-4">
            Please check your inbox and click the verification link to activate your account.
          </p>
          <p className="mb-4">
            After verification, please <Link href="/login" className="text-purple-300 hover:text-purple-200 font-medium">login</Link> to continue.
          </p>
          <button 
            onClick={async () => {
              try {
                await sendEmailVerification(auth.currentUser, {
                  url: `${window.location.origin}/login`,
                  handleCodeInApp: false
                });
                setSuccessMessage(prev => (
                  <div className="text-center">
                    <p className="mb-4">{prev.props.children[0]}</p>
                    <p className="mb-4">Verification email resent!</p>
                    <p className="mb-4">
                      After verification, please <Link href="/login" className="text-purple-300 hover:text-purple-200 font-medium">login</Link> to continue.
                    </p>
                  </div>
                ));
              } catch (err) {
                setError('Failed to resend verification email: ' + err.message);
              }
            }}
            className="text-purple-300 underline mt-2"
          >
            Resend verification email
          </button>
        </div>
      );
      
      // Clear form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
    } catch (error) {
      console.error("Signup error:", error);
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in.');
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');
      const result = await signInWithPopup(auth, googleProvider);
      if (result?.user) {
        router.push('/dashboard');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
            background-size: 400% 400%;
            animation: gradientFlow 8s ease infinite;
          }
        `}</style>
      </Head>

      <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 overflow-hidden vibrant-gradient font-raleway">
        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white/10 w-full max-w-md hover:shadow-purple-500/10 transition-shadow duration-300">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-normal text-white mb-2 font-great-vibes">Sign Up</h1>
            <p className="text-white/80 font-light text-sm">
              Get ready to ignite your passions and create lasting memories.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 text-red-300 text-sm rounded-lg border border-red-700/50">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-900/30 text-green-300 text-sm rounded-lg border border-green-700/50">
              {successMessage}
            </div>
          )}

          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white/90 hover:bg-white text-gray-800 font-medium py-3 px-4 rounded-lg mb-6 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Image
              src="https://www.google.com/favicon.ico"
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span>{loading ? 'Processing...' : 'Sign up with Google'}</span>
          </button>

          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-3 text-white/50 text-sm whitespace-nowrap">or continue with email</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
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
                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
                placeholder="your@email.com"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
                Password (min 6 characters)
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-500/90 hover:bg-purple-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-400/20 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-300 hover:text-purple-200 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}