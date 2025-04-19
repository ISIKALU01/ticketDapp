// components/Navbar.js
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { auth } from '../../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Only show dashboard links when on dashboard page and user is authenticated
  const showDashboardLinks = router.pathname === '/dashboard' && user;

  return (
    <nav className="fixed top-0 left-0 w-full bg-black-100 bg-opacity-50 backdrop-blur-sm z-50 shadow-md font-raleway text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
              <Image
                src="/yellowLogo.png"
                alt="Logo"
                width={150}
                height={150}
                className="rounded-full"
                priority
              />
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="animate-pulse h-8 w-20 bg-gray-400 rounded-md opacity-50"></div>
            ) : showDashboardLinks ? (
              <>
                <div className="hidden md:flex items-center space-x-3">
                  {user.photoURL && (
                    <Image
                      src={user.photoURL}
                      alt="User"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-white text-sm font-medium">
                    Welcome, {user.displayName || user.email?.split('@')[0]}!
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {router.pathname !== '/login' && (
                  <Link
                    href="/login"
                    className="text-black px-4 py-2 rounded-md text-[10px] md:text-sm font-medium bg-[#ffd106] hover:bg-[#ffdc3d] transition-colors"
                  >
                    Login
                  </Link>
                )}
                {router.pathname !== '/signup' && router.pathname !== '/signUp' && (
                  <Link
                    href="/signUp"
                    className="text-black px-4 py-2 rounded-md text-[10px] md:text-sm font-medium bg-[#ffd106] hover:bg-[#ffdc3d] transition-colors"
                  >
                    Sign Up
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;