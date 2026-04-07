// import { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Settings as SettingsIcon, User, Lock } from 'lucide-react';
// import { toast } from 'sonner';
// import { API_BASE_URL } from '@/config/api';

// export const Settings = () => {
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isChangingPassword, setIsChangingPassword] = useState(false);

//   const handleSave = () => {
//     toast.success('Settings saved successfully');
//   };

//   const handlePasswordChange = async () => {
//     // Validation
//     if (!currentPassword || !newPassword || !confirmPassword) {
//       toast.error('Please fill in all password fields');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast.error('New passwords do not match');
//       return;
//     }

//     if (newPassword.length < 6) {
//       toast.error('New password must be at least 6 characters long');
//       return;
//     }

//     setIsChangingPassword(true);

//     try {
//       const response = await fetch(`${API_BASE_URL}/auth.php?action=change-password`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           currentPassword,
//           newPassword,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Password updated successfully');
//         // Clear the form
//         setCurrentPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//       } else {
//         toast.error(data.message || 'Failed to update password');
//       }
//     } catch (error) {
//       console.error('Password change error:', error);
//       toast.error('Error updating password. Please try again.');
//     } finally {
//       setIsChangingPassword(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
//         <p className="text-gray-500 mt-1">Manage your dashboard preferences</p>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <User className="h-5 w-5" />
//               Admin Profile
//             </CardTitle>
//             <CardDescription>Update your admin account information</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="username">Username</Label>
//               <Input id="username" defaultValue="admin" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" type="email" defaultValue="admin@cybaemtech.com" />
//             </div>
//             <Button onClick={handleSave}>Save Changes</Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Lock className="h-5 w-5" />
//               Security
//             </CardTitle>
//             <CardDescription>Update your password and security settings</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="current-password">Current Password</Label>
//               <Input 
//                 id="current-password" 
//                 type="password" 
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//                 placeholder="Enter current password"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="new-password">New Password</Label>
//               <Input 
//                 id="new-password" 
//                 type="password" 
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 placeholder="Enter new password (min 6 characters)"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="confirm-password">Confirm New Password</Label>
//               <Input 
//                 id="confirm-password" 
//                 type="password" 
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 placeholder="Confirm new password"
//               />
//             </div>
//             <Button 
//               onClick={handlePasswordChange}
//               disabled={isChangingPassword}
//             >
//               {isChangingPassword ? 'Updating...' : 'Update Password'}
//             </Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <SettingsIcon className="h-5 w-5" />
//               Dashboard Credentials
//             </CardTitle>
//             <CardDescription>
//               To change admin login credentials, update these environment variables in your Replit Secrets
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="bg-gray-50 p-4 rounded-lg space-y-2">
//               <p className="text-sm font-medium">Required Environment Variables:</p>
//               <ul className="text-sm text-gray-600 space-y-1">
//                 <li><code className="bg-gray-200 px-2 py-1 rounded">VITE_ADMIN_USERNAME</code></li>
//                 <li><code className="bg-gray-200 px-2 py-1 rounded">VITE_ADMIN_PASSWORD</code></li>
//               </ul>
//               <p className="text-xs text-gray-500 mt-2">
//                 Default credentials: username: admin, password: admin123
//               </p>
//             </div>
//             <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
//               <p className="text-sm font-medium text-amber-800 mb-2">⚠️ Security Notice</p>
//               <p className="text-xs text-amber-700">
//                 This dashboard uses client-side authentication and is suitable for development/demo only. 
//                 For production, implement proper backend authentication with password hashing, secure sessions, 
//                 and database integration. See the admin README for details.
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings as SettingsIcon, User, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/config/api';

export const Settings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileNotification, setProfileNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [securityNotification, setSecurityNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Fetch current admin profile data
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth.php?action=check`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (data.success && data.user) {
          setUsername(data.user.username || 'admin');
          // Fetch full profile with email
          const profileResponse = await fetch(`${API_BASE_URL}/auth.php?action=get-profile`, {
            method: 'GET',
            credentials: 'include',
          });

          const profileData = await profileResponse.json();
          if (profileData.success && profileData.user) {
            setEmail(profileData.user.email || 'info@imoexo.com');
          }
        }
      } catch (error) {
        console.error('Error fetching admin profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleSave = async () => {
    // Clear previous notifications
    setProfileNotification(null);

    // Validation
    if (!username.trim() || !email.trim()) {
      setProfileNotification({ type: 'error', message: 'Username and email are required' });
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setProfileNotification({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth.php?action=update-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, email }),
      });

      const data = await response.json();

      if (data.success) {
        setProfileNotification({ type: 'success', message: 'Profile updated successfully! Email notification sent to info@imoexo.com' });
      } else {
        setProfileNotification({ type: 'error', message: data.message || 'Failed to update profile' });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setProfileNotification({ type: 'error', message: 'Error updating profile. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    // Clear previous notifications
    setSecurityNotification(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setSecurityNotification({ type: 'error', message: 'Please fill in all password fields' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setSecurityNotification({ type: 'error', message: 'New passwords do not match' });
      return;
    }

    if (newPassword.length < 6) {
      setSecurityNotification({ type: 'error', message: 'New password must be at least 6 characters long' });
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth.php?action=change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setSecurityNotification({ type: 'success', message: 'Password updated successfully' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setSecurityNotification({ type: 'error', message: data.message || 'Failed to update password' });
      }
    } catch (error) {
      console.error('Password change error:', error);
      setSecurityNotification({ type: 'error', message: 'Error updating password. Please try again.' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your dashboard preferences</p>
      </div>

      {/* Grid Cards */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Admin Profile */}
        <Card className="rounded-xl shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <User className="h-5 w-5 text-primary" />
              Admin Profile
            </CardTitle>
            <CardDescription>Update your admin account information</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Notification Area for Admin Profile */}
            {profileNotification && (
              <div className={`p-3 rounded-lg border ${profileNotification.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                <p className="text-sm font-medium">{profileNotification.message}</p>
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-4 text-gray-500">Loading profile...</div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-gray-300 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-gray-300 focus:ring-primary focus:border-primary"
                  />
                </div>

                <Button
                  className="bg-[#155EEF] text-white hover:bg-[#0E4BCF] shadow-sm"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            )}

          </CardContent>
        </Card>

        {/* Security: Change Password */}
        <Card className="rounded-xl shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Lock className="h-5 w-5 text-primary" />
              Security
            </CardTitle>
            <CardDescription>Update your password and security settings</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Notification Area for Security */}
            {securityNotification && (
              <div className={`p-3 rounded-lg border ${securityNotification.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                <p className="text-sm font-medium">{securityNotification.message}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="border-gray-300 focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="border-gray-300 focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="border-gray-300 focus:ring-primary focus:border-primary"
              />
            </div>

            <Button
              onClick={handlePasswordChange}
              disabled={isChangingPassword}
              className="bg-[#155EEF] text-white hover:bg-[#0E4BCF] shadow-sm"
            >
              {isChangingPassword ? "Updating..." : "Update Password"}
            </Button>

          </CardContent>
        </Card>

        {/* Dashboard Credentials Info */}
        <Card className="rounded-xl shadow-sm bg-white lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <SettingsIcon className="h-5 w-5 text-primary" />
              Dashboard Credentials
            </CardTitle>
            <CardDescription>
              Change admin login credentials via environment variables
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* Environment Variables */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-inner space-y-2">
              <p className="text-sm font-medium">Required Environment Variables:</p>

              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  <code className="bg-gray-200 px-2 py-1 rounded text-xs">VITE_ADMIN_USERNAME</code>
                </li>
                <li>
                  <code className="bg-gray-200 px-2 py-1 rounded text-xs">VITE_ADMIN_PASSWORD</code>
                </li>
              </ul>

              <p className="text-xs text-gray-500 mt-2">
                Default credentials: <b>admin / admin123</b>
              </p>
            </div>

            {/* Security Alert */}
            <div className="bg-amber-50 p-5 rounded-lg shadow-sm border border-amber-200">
              <p className="text-sm font-semibold text-amber-800 mb-2">⚠️ Security Notice</p>
              <p className="text-xs text-amber-700 leading-5">
                This dashboard uses client-side authentication and is only suitable for development or demos.
                For production, use secure backend authentication with hashed passwords and server-managed sessions.
              </p>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
};
