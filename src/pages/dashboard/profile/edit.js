// pages/dashboard/profile/edit.js
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useRouter } from 'next/router';
import Head from 'next/head'

export default function ProfileEdit() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [profile, setProfile] = useState({
    displayName: '',
    gender: '',
    sexualInterests: [],
    xAccount: '',
    bio: ''
  });
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);


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
            bio: ''
          });
        }
      };
      loadProfile();
    }
  }, [user]);


  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
  
    setSaving(true);
    try {
      // Update auth profile
      await updateProfile(auth.currentUser, {
        displayName: profile.displayName
      });
  
      // Save to Firestore
      await setDoc(doc(db, 'profiles', user.uid), {
        ...profile,
        lastUpdated: new Date()
      });
  
      setSaveSuccess(true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Show success for 1.5s

      // Redirect immediately after successful save
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    // This will briefly show before redirect happens
    return <div className="p-4">Please log in to edit your profile</div>;
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

        
          @keyframes checkmark {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateX(-5px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-checkmark {
            animation: checkmark 0.5s ease-out forwards;
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out 0.2s both;
          }
        `}</style>
      </Head>

      <div className='vibrant-gradient text-white'>
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6 mt-[70px]">Edit Profile</h1>
          
          <form onSubmit={handleSave} className="space-y-4">
            {/* Display Name */}
            <div>
              <label className="block mb-2 font-medium">Display Name</label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) => setProfile({...profile, displayName: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block mb-2 font-medium">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full p-2 border rounded min-h-[100px]"
                maxLength="200"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-2 font-medium">Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({...profile, gender: e.target.value})}
                className="w-full p-2 border rounded"
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
              <label className="block mb-2 font-medium">X (Twitter) Account</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={profile.xAccount}
                  onChange={(e) => setProfile({...profile, xAccount: e.target.value})}
                  placeholder="@username"
                  className="flex-1 p-2 border rounded"
                />
                <button 
                  type="button"
                  className="px-4 bg-black text-white rounded"
                >
                  Connect
                </button>
              </div>
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
                    className={`px-3 py-1 rounded-full text-sm ${
                      profile.sexualInterests.includes(interest)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 border rounded"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                  type="submit"
                  className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-all duration-300 ${
                    saveSuccess 
                      ? 'bg-green-500 scale-105' 
                      : saving 
                        ? 'bg-blue-500' 
                        : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
                  disabled={saving || saveSuccess}
                >
                  {saveSuccess ? (
                    <>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 animate-checkmark"
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span className="animate-fadeIn">Saved! Redirecting...</span>
                    </>
                  ) : saving ? (
                    <>
                      <svg 
                        className="animate-spin h-5 w-5" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
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