// components/Navbar.js
import Link from 'next/link';
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession(); // Get session data

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <Image
                  src="/logo.png" // Replace with your logo
                  alt="Logo"
                  className="h-10 w-10 rounded-full"
                />
                <span className="ml-2 text-xl font-bold text-gray-800">
                  MyBrand
                </span>
              </a>
            </Link>
          </div>

          {/* Conditional Rendering */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-gray-800 text-sm font-medium">
                  Welcome, {session.user.name}!
                </span>
                <Link href="/dashboard">
                  <a className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </a>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => signIn('google')} // Use Google provider
                  className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login with Google
                </button>
                <Link href="/login">
                  <a className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    Login with Email
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;