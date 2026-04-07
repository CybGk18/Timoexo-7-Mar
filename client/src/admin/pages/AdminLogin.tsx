import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, ShieldCheck, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { login, forgotPassword } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(username, password);

    if (success) {
      toast.success('Login successful! Welcome back.');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid credentials. Please check your username and password.');
    }

    setIsLoading(false);
  };

  const handleForgotPassword = async () => {
    setIsResetting(true);

    try {
      const success = await forgotPassword();

      if (success) {
        toast.success('Password reset email sent to info@imoexo.com. Please check your inbox.');
      } else {
        toast.error('Failed to send password reset email. Please try again or contact support.');
      }
    } catch (error) {
      toast.error('Network error. Please try again later.');
    }

    setIsResetting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back to Home Link */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-10 flex items-center gap-2 text-gray-700 hover:text-[#0055ff] transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </Link>

      {/* Login Container */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="bg-[#0055ff] rounded-lg p-4 shadow-md">
                <ShieldCheck className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              T-IMOEXO
            </h1>
            <p className="text-gray-600 text-lg">Admin Portal</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-gray-600 text-sm">Sign in to access your dashboard</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-700 font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12 border-gray-300 focus:border-[#0055ff] focus:ring-[#0055ff]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12 border-gray-300 focus:border-[#0055ff] focus:ring-[#0055ff]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#0055ff] hover:bg-[#0044cc] text-white font-semibold text-base shadow-md hover:shadow-lg transition-all"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing in...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              {/* Forgot Password Link */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isResetting}
                  className="text-sm text-[#0055ff] hover:text-[#0044cc] font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResetting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 border-2 border-[#0055ff]/30 border-t-[#0055ff] rounded-full animate-spin"></div>
                      Sending reset email...
                    </span>
                  ) : (
                    'Forgot your password? (Super Admin only)'
                  )}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <p className="text-gray-500 text-sm text-center">
                Secured with enterprise-grade encryption
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <p className="text-gray-500 text-center text-sm mt-6">
            © 2025 T-IMOEXO International. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
