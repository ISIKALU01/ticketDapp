// components/Navbar.js
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <Image
                  src="/logo.png" // Replace with your logo path
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </a>
            </Link>
          </div>

          {/* Login and Signup Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <a className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </a>
            </Link>
            <Link href="/signup">
              <a className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Sign Up
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;