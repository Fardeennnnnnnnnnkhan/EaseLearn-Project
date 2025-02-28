import React from 'react';
import { UserData } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import pfp from '../account/pfp.png'
function Account({ user }) {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = UserData();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate('/login');
  };

  return (
   <div className="flex items-center justify-center h-screen bg-[#0C0C0C] text-white">
      <div className="w-96 p-6 shadow-lg rounded-lg bg-[#1D1D1D]">
        <h2 className="text-3xl font-semibold text-center mb-4 text-[#24CFA6]">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-[#3C3C3C] border border-gray-600 text-white focus:border-[#24CFA6] focus:ring-1 focus:ring-[#24CFA6]"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-[#3C3C3C] border border-gray-600 text-white focus:border-[#24CFA6] focus:ring-1 focus:ring-[#24CFA6]"
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full py-2 mt-2 bg-[#24CFA6] text-black font-semibold rounded hover:bg-[#1AAE8F] transition">Login</button>
        </form>
      </div>
    </div>
  
  );
}

export default Account;
