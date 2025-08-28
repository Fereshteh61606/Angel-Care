import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, QrCode, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSelector } from '../components/LanguageSelector';
import { useAdmin } from '../contexts/AdminContext';
import { UserDashboard } from '../components/UserDashboard';
import { AdminLogin } from '../components/AdminLogin';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const { isAdmin, logout } = useAdmin();
  const [showAdminLogin, setShowAdminLogin] = React.useState(false);

  // Show admin login if requested
  if (showAdminLogin && !isAdmin) {
    return <AdminLogin />;
  }

  // Show user dashboard for regular users
  if (!showAdminLogin && !isAdmin) {
    return <UserDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <QrCode className="w-8 h-8 text-purple-500" />
            <h1 className="text-2xl font-bold text-gray-800">QR Info - Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Admin Dashboard
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Manage all users' information and print their QR codes
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

            <Link
              to="/list"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-semibold rounded-2xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[200px]"
            >
              <Users className="w-5 h-5" />
              View All Users
            </Link>

            <button
              onClick={() => setShowAdminLogin(false)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-400 to-teal-400 text-white font-semibold rounded-2xl hover:from-green-500 hover:to-teal-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[200px]"
            >
              <Shield className="w-5 h-5" />
              User View
            </button> {/* Fixed: Changed </Link> to </button> */}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">User Management</h3>
            <p className="text-gray-600">View and manage all users' information</p>
          </div>

          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-xl flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Print QR Codes</h3>
            <p className="text-gray-600">Print and download QR codes for all users</p>
          </div>

          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-400 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Access</h3>
            <p className="text-gray-600">Protected admin panel with password authentication</p>
          </div>
        </div>

        {/* Admin Instructions */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-yellow-50/70 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-yellow-800 mb-4">Admin Instructions</h3>
            <div className="grid md:grid-cols-2 gap-6 text-yellow-700">
              <div>
                <h4 className="font-semibold mb-2">Managing Users:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• View all users' information</li>
                  <li>• Print QR codes for distribution</li>
                  <li>• Download QR codes as images</li>
                  <li>• Delete user records if needed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">User Experience:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Users can only see their own data</li>
                  <li>• Users can add their information</li>
                  <li>• Users can print their own QR codes</li>
                  <li>• QR codes work for anyone who scans them</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};