// components/Sidebar.js
import Link from 'next/link';
import Images from 'next/image';
import { FiHome, FiSettings, FiUsers, FiPieChart, FiCalendar, FiLogOut, FiEdit2 } from 'react-icons/fi';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Home, Ticket, Image, LockKeyhole, Users, Coins, Gem, BarChart2} from 'lucide-react';


export default function Sidebar() {
  const [user, loading] = useAuthState(auth);
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const docRef = doc(db, 'profiles', user.uid);
        const docSnap = await getDoc(docRef);
        setProfile(docSnap.exists() ? docSnap.data() : null);
      }
    };
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="w-full h-full bg-black/10 text-white flex flex-col gap-6 p-5 backdrop-blur-sm z-50 shadow-md font-raleway overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
      {/* Profile Section */}
      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition-all duration-200">
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
            {user?.photoURL ? (
              <Images
                src={user.photoURL}
                alt="Profile"
                width={48}
                height={48}
                className="object-cover"
              />
            ) : (
              <span className="text-lg">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold truncate">
              {profile?.displayName || user?.displayName || user?.email?.split('@')[0]}
            </h3>
            <Link href="/dashboard/profile/edit" className="text-white/60 hover:text-white">
              <FiEdit2 size={16} />
            </Link>
          </div>
          
          {profile?.gender && (
            <p className="text-sm text-white/70 capitalize">{profile.gender}</p>
          )}
          
          {profile?.sexualInterests?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {profile.sexualInterests.slice(0, 3).map(interest => (
                <span key={interest} className="text-xs px-2 py-0.5 bg-white/10 rounded-full">
                  {interest}
                </span>
              ))}
              {profile.sexualInterests.length > 3 && (
                <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full">
                  +{profile.sexualInterests.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link 
          href="/dashboard/BuyTickets" 
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200"
        >
          <Ticket className="w-5 h-5" />
          <span>Buy a Ticket</span>
        </Link>
        <Link 
          href="/dashboard/users" 
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200"
        >
          <Image className="w-5 h-5" />
          <span>Gallery</span>
        </Link>
        <Link 
          href="/dashboard/analytics" 
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200"
        >
          <LockKeyhole className="w-5 h-5" />
          <span>Exclusive Contents</span>
        </Link>
        <Link 
          href="/dashboard/calendar" 
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200"
        >
          <Users className="w-5 h-5" />
          <span>Meet FreekzAngels</span>
        </Link>
        <Link 
          href="/dashboard/calendar" 
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200"
        >
          <Coins className="w-5 h-5" />
          <span>Earn with Freekz</span>
        </Link>
        <Link 
          href="/dashboard/settings" 
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200"
        >
          <Gem className="w-5 h-5" />
          <span>Stake n Win</span>
        </Link>
      </nav>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200"
      >
        <FiLogOut className="text-lg" />
        <span>Logout</span>
      </button>
    </div>
  );
}