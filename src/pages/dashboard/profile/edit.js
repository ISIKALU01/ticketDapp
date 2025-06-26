import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Twitter, X, Check, Link as LinkIcon } from 'lucide-react';

export default function ProfileEdit() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [profile, setProfile] = useState({
    displayName: '',
    gender: '',
    sexualInterests: [],
    xAccount: '',
    bio: '',
    twitterConnected: false
  });
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [twitterLoading, setTwitterLoading] = useState(false);

  // Load profile data when user is available
  useEffect(() => {
    if (user) {
      const loadProfile = async () => {
        const docRef = doc(db, 'profiles', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          setProfile({
            displayName: user.displayName || '',
            gender: '',
            sexualInterests: [],
            xAccount: '',
            bio: '',
            twitterConnected: false
          });
        }
      };
      loadProfile();
    }
  }, [user]);

  const handleTwitterConnect = async () => {
    setTwitterLoading(true);
    try {
      // Simulate Twitter/X API connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProfile(prev => ({
        ...prev,
        twitterConnected: !prev.twitterConnected,
        xAccount: prev.twitterConnected ? '' : prev.xAccount || '@username'
      }));
    } finally {
      setTwitterLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
  
    setSaving(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: profile.displayName
      });
  
      await setDoc(doc(db, 'profiles', user.uid), {
        ...profile,
        lastUpdated: new Date()
      });
  
      setSaveSuccess(true);
      setTimeout(() => router.push('/dashboard'), 1500);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-white">Loading...</div>;
  }

  if (!user) {
    return <div className="p-4 text-white">Please log in to edit your profile</div>;
  }

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
          .btn-twitter {
            background: ${profile.twitterConnected ? '#1DA1F2' : 'black'};
            color: white;
            border: ${profile.twitterConnected ? '1px solid #1DA1F2' : '1px solid #333'};
          }
          .btn-twitter:hover {
            background: ${profile.twitterConnected ? '#1991DB' : '#111'};
          }
          .interest-pill {
            transition: all 0.2s ease;
          }
          .interest-pill.selected {
            background: #7e22ce;
            color: white;
          }
        `}</style>
      </Head>

      <div className='vibrant-gradient text-white min-h-screen'>
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6 mt-[70px]">Edit Profile</h1>
          
          <form onSubmit={handleSave} className="space-y-6">
            {/* Display Name */}
            <div>
              <label className="block mb-2 font-medium">Display Name</label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) => setProfile({...profile, displayName: e.target.value})}
                className="w-full p-3 bg-black/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block mb-2 font-medium">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full p-3 bg-black/30 border border-gray-700 rounded-lg min-h-[100px] focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                maxLength="200"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-2 font-medium">Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({...profile, gender: e.target.value})}
                className="w-full p-3 bg-black/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* X Account */}
            <div>
              <label className="block mb-2 font-medium">X (Twitter)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={profile.xAccount}
                  onChange={(e) => setProfile({...profile, xAccount: e.target.value})}
                  placeholder="@username"
                  className={`flex-1 p-3 bg-black/30 border ${
                    profile.twitterConnected ? 'border-[#1DA1F2]' : 'border-gray-700'
                  } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  disabled={profile.twitterConnected}
                />
                <button 
                  type="button"
                  onClick={handleTwitterConnect}
                  className={`btn-twitter px-4 rounded-lg flex items-center gap-2 transition-all ${
                    twitterLoading ? 'opacity-70' : ''
                  }`}
                  disabled={twitterLoading}
                >
                  {twitterLoading ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4"></circle>
                    </svg>
                  ) : profile.twitterConnected ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Connected</span>
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5" />
                      <span>Connect</span>
                    </>
                  )}
                </button>
              </div>
              {profile.twitterConnected && (
                <button 
                  type="button"
                  onClick={handleTwitterConnect}
                  className="mt-2 text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <LinkIcon className="w-4 h-4" />
                  <span>Disconnect X account</span>
                </button>
              )}
            </div>

            {/* Sexual Interests */}
            <div>
              <label className="block mb-2 font-medium">Interested In</label>
              <div className="flex flex-wrap gap-2">
                {['Men', 'Women', 'Non-binary', 'Trans', 'Other'].map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => setProfile({
                      ...profile,
                      sexualInterests: profile.sexualInterests.includes(interest)
                        ? profile.sexualInterests.filter(i => i !== interest)
                        : [...profile.sexualInterests, interest]
                    })}
                    className={`interest-pill px-4 py-2 rounded-full text-sm ${
                      profile.sexualInterests.includes(interest)
                        ? 'selected bg-purple-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-8">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  saveSuccess 
                    ? 'bg-green-600 scale-105' 
                    : saving 
                      ? 'bg-purple-700' 
                      : 'bg-purple-600 hover:bg-purple-700'
                } text-white`}
                disabled={saving || saveSuccess}
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-5 h-5 animate-bounce" />
                    <span>Saved! Redirecting...</span>
                  </>
                ) : saving ? (
                  <>
                    <svg 
                      className="animate-spin h-5 w-5" 
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}