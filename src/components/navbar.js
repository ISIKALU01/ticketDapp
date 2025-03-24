// components/Navbar.js
import Link from 'next/link';
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession(); // Get session data

  return (
    <nav className="fixed top-0 left-0 w-full bg-black-100 bg-opacity-50 backdrop-blur-sm z-50 shadow-md 
    font-raleway text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
                <Image
                  src="/yellowLogo.png" // Replace with your logo
                  alt="Logo"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
            </Link>
          </div>

          {/* Conditional Rendering */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-gray-800 text-sm font-medium">
                  Welcome, {session.user.name}!
                </span>
                <Link href="/dashboard" className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md 
                  text-sm font-medium">
                    Dashboard
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
                  className="text-black px-3 py-2 rounded-md text-[10px] font-medium 
                  bg-[#ffd106] cursor-pointer"
                >
                  Login with Google
                </button>
                <Link href="/login" className="text-black px-4 py-2 rounded-md text-[10px] font-medium 
                  bg-[#ffd106]">
                  Login with Email 
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