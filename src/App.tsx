import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Leaf, BarChart3, Clock, Globe2, ArrowUpRight, Wallet, User, LogOut, Shield, Users, Landmark, Waves } from 'lucide-react';

interface CarbonCredit {
  id: string;
  project: string;
  location: string;
  credits: number;
  price: number;
  verified: boolean;
  image: string;
}

interface AuthUser {
  email: string;
  name: string;
  credits: number;
  transactions: number;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      email: "demo@carbonbazar.com",
      name: "Demo User",
      credits: 1500,
      transactions: 12
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const carbonCredits: CarbonCredit[] = [
    {
      id: '1',
      project: 'Mangrove Forest Restoration',
      location: 'Indonesia',
      credits: 1000,
      price: 28,
      verified: true,
      image: 'images/mangrove-restoration-guidelines.png'
    },
    {
      id: '2',
      project: 'Seagrass Meadow Conservation',
      location: 'Australia',
      credits: 750,
      price: 25,
      verified: true,
      image: 'images/Sanc0209_-_Flickr_-_NOAA_Photo_Library.jpg'
    },
    {
      id: '3',
      project: 'Salt Marsh Restoration',
      location: 'United Kingdom',
      credits: 500,
      price: 22,
      verified: true,
      image: 'images/Marsh-shutterstock_1575966571-scaled-e1670426591587-1024x682.jpg'
    },
    {
      id: '4',
      project: 'Coastal Wetland Protection',
      location: 'Mexico',
      credits: 800,
      price: 24,
      verified: true,
      image: 'images/Coasts-and-Deltas-Healthy-Wetlands.jpg'
    }
  ];

  const stats = [
    { label: 'Total Credits Traded', value: '2.5M', icon: BarChart3 },
    { label: 'Active Projects', value: '156', icon: Globe2 },
    { label: 'Avg. Settlement Time', value: '48h', icon: Clock }
  ];

  const Navigation = () => (
    <nav className="nav-blur fixed w-full z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-emerald-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">Carbon Bazar</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-white/20">
                  <User className="h-5 w-5" />
                  <span className="ml-2">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-white/20"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  const LoginPage = () => (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full glass-card p-8 rounded-2xl space-y-8">
        <div className="text-center">
          <Leaf className="mx-auto h-12 w-12 text-emerald-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">Welcome to Carbon Bazar</h2>
          <p className="mt-2 text-sm text-gray-300">Sign in to start trading carbon credits</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const ProfilePage = () => {
    if (!user) return <Navigate to="/login" />;

    return (
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-500/10 p-3 rounded-full">
                <User className="h-8 w-8 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="text-gray-300">{user.email}</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white">Carbon Credits</h3>
                <p className="mt-2 text-3xl font-bold text-emerald-500">{user.credits}</p>
                <p className="text-gray-300">Available credits</p>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white">Transactions</h3>
                <p className="mt-2 text-3xl font-bold text-emerald-500">{user.transactions}</p>
                <p className="text-gray-300">Completed trades</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="glass-card flex items-center justify-between p-4 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="bg-emerald-500/10 p-2 rounded-full">
                        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Purchased Carbon Credits</p>
                        <p className="text-sm text-gray-300">From Amazon Rainforest Conservation</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-emerald-500">+100 Credits</p>
                      <p className="text-sm text-gray-300">2 days ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MarketplacePage = () => (
    <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card p-6 rounded-xl">
            <div className="flex items-center">
              <stat.icon className="h-8 w-8 text-blue-400" />
              <div className="ml-4">
                <p className="text-sm text-blue-200">{stat.label}</p>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">Blue Carbon Credit Marketplace</h2>
          <p className="mt-2 text-blue-200">Browse verified coastal and marine conservation projects</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
          {carbonCredits.map((credit) => (
            <div key={credit.id} className="marketplace-card rounded-xl overflow-hidden">
              <img src={credit.image} alt={credit.project} className="h-48 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{credit.project}</h3>
                  {credit.verified && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">{credit.location}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Available Credits</p>
                    <p className="text-lg font-semibold text-gray-900">{credit.credits.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price per Credit</p>
                    <p className="text-lg font-semibold text-gray-900">${credit.price}</p>
                  </div>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  Purchase Credits
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );

  const LandingPage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542397284385-6010376c5337?auto=format&fit=crop&q=80&w=2070"
            alt="Coastal Community"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="flex items-center mb-8 fade-in-up">
            <div className="logo-shine bg-gradient-to-r from-emerald-500 to-blue-500 p-3 rounded-lg">
              <Waves className="h-12 w-12 text-white" />
            </div>
            <span className="ml-4 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
              Carbon Bazar
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight fade-in-up fade-in-up-delay-1">
            Empowering <font color = "#00FFFF">coastal</font><br />
            communities worldwide.
          </h1>
          
          <p className="text-xl text-blue-100 max-w-2xl mb-8 fade-in-up fade-in-up-delay-2">
            Join us in revolutionizing the carbon credit marketplace while supporting sustainable coastal development and marine conservation efforts.
          </p>
          
          <div className="flex space-x-4 fade-in-up fade-in-up-delay-3">
            <Link
              to="/marketplace"
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all transform hover:scale-105 font-semibold flex items-center"
            >
              Explore Marketplace
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-slate-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Bridging the gap between coastal communities and global carbon markets
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Why We Exist */}
            <div className="glass-card p-8 rounded-2xl transform hover:scale-105 transition-all">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Globe2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Global Impact</h3>
              <p className="text-blue-100">
                Connecting local conservation efforts with global carbon markets through innovative blockchain solutions.
              </p>
            </div>

            {/* Transparent & Secure */}
            <div className="glass-card p-8 rounded-2xl transform hover:scale-105 transition-all">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Verified Projects</h3>
              <p className="text-blue-100">
                Every credit is thoroughly verified and tracked, ensuring maximum impact and transparency.
              </p>
            </div>

            {/* Community Support */}
            <div className="glass-card p-8 rounded-2xl transform hover:scale-105 transition-all">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Community First</h3>
              <p className="text-blue-100">
                Supporting local communities through direct funding and sustainable development initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">2.5M+</div>
              <div className="text-blue-100">Carbon Credits Traded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">150+</div>
              <div className="text-blue-100">Conservation Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">50K+</div>
              <div className="text-blue-100">Community Members</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;