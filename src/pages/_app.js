import "@/styles/globals.css";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import { WalletProvider } from '../../context/WalletContext';

function MyApp({ Component, pageProps }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  
  // Pages where we want to hide sidebar and footer
  const excludedPages = ['/', '/login', '/signUp'];
  const shouldShowSidebarAndFooter = !excludedPages.includes(router.pathname);

  return (
    <SessionProvider session={pageProps.session}>
      {/* Add WalletProvider here - it will wrap everything */}
      <WalletProvider>
        {/* Global gradient background - always present */}
        <div className="vibrant-gradient font-raleway min-h-screen">
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
          
          {/* Navbar - appears on all pages */}
          <Navbar />
          
          {/* Only show sidebar if NOT on excluded pages */}
          {shouldShowSidebarAndFooter && (
            <>
              {/* Mobile Overlay */}
              {sidebarOpen && (
                <div 
                  onClick={() => setSidebarOpen(false)}
                  className="fixed inset-0 z-10 bg-black/50 md:hidden"
                ></div>
              )}

              {/* Sidebar Component */}
              <div
                className={`fixed mt-[65px] inset-y-0 left-0 z-20 bg-transparent backdrop-blur-md
                  transition-all duration-300 ease-in-out
                  ${sidebarOpen ? 
                    'w-64 translate-x-0 md:w-72 lg:w-64' : 
                    'w-16 -translate-x-12 hover:translate-x-0'
                  }
                  ${!sidebarOpen && 'md:w-20 md:-translate-x-10 md:hover:translate-x-0'}`}
              >
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`absolute -right-3 top-4 z-30 bg-gray-500 p-2 rounded-full shadow-lg transition-all duration-300
                    ${sidebarOpen ? '' : 'rotate-180'}`}
                >
                  {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>

                <div className={`h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent 
                  ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none md:opacity-0'}`}>
                  <Sidebar />
                </div>

                {!sidebarOpen && (
                  <div className="absolute inset-y-0 left-0 w-1 bg-white/50 rounded-r-full"></div>
                )}
              </div>
            </>
          )}

          {/* Main Content with conditional padding */}
          <div
            className={`transition-all duration-300 min-h-screen pt-[0px]
              ${
                shouldShowSidebarAndFooter
                  ? (sidebarOpen 
                      ? 'ml-0 md:ml-0 lg:ml-64 pl-4 md:pl-6' 
                      : 'ml-4 md:ml-6 lg:ml-32 lg:mr-16 pl-0')
                  : 'mx-0 px-0'  // No side margins on excluded pages
              }`}
          >
            <Component {...pageProps} />
          </div>
          
          {/* Only show footer if NOT on excluded pages */}
          {shouldShowSidebarAndFooter && <Footer />}
        </div>
      </WalletProvider>
    </SessionProvider>
  );
}

export default MyApp;