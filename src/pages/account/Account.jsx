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
    <div className="min-h-screen bg-black text-gray-200 py-16 px-4">
    {user && (
      <div className="container bg-gradient-to-t from-teal-900/40 to-black mx-auto">
        {/* Profile Section */}
        <section className="profile flex flex-col md:flex-row items-center  bg-[#171717] bg-opacity-80 p-6 rounded-lg shadow-md mb-12">
          <div className="avatar flex-shrink-0 mr-6 mb-4 md:mb-0">
            <img
              className="w-32 h-32 rounded-full shadow-lg border-4 border-white"
              src={pfp}
              alt="Profile"
            />
          </div>
          <div className="profile-details text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
            <p className="text-lg text-gray-300 mb-4">{user.email}</p>
            <div className="buttons flex flex-col sm:flex-row sm:gap-4 justify-center md:justify-start">
              <button
                onClick={logoutHandler}
                className="bg-red-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-red-600 transition duration-300 ease-in-out mb-4 sm:mb-0"
              >
                Logout
              </button>
              {user.role === "admin" && (
                <button
                  onClick={() => navigate(`/admin/dashboard`)}
                  className="bg-yellow-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out"
                >
                  Admin Dashboard
                </button>
              )}
            </div>
          </div>
        </section>
  
        {/* Recent Activity */}
        <section className="recent-activity bg-[#171717] bg-opacity-80 p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Recent Activities</h2>
          <div className="activity-list space-y-4">
            <div className="activity-item flex justify-between items-center border-b border-gray-600 pb-4">
              <span className="font-medium text-gray-300">Completed "JavaScript for Beginners"</span>
              <span className="text-sm text-gray-400">2 days ago</span>
            </div>
            <div className="activity-item flex justify-between items-center border-b border-gray-600 pb-4">
              <span className="font-medium text-gray-300">Enrolled in "React Mastery"</span>
              <span className="text-sm text-gray-400">1 week ago</span>
            </div>
            <div className="activity-item flex justify-between items-center">
              <span className="font-medium text-gray-300">Joined a live session on "Node.js"</span>
              <span className="text-sm text-gray-400">1 month ago</span>
            </div>
          </div>
        </section>
  
        {/* Enrolled Courses */}
        <section className="enrolled-courses bg-[#171717] bg-opacity-80 p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Your Enrolled Courses</h2>
          <div className="course-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="course-card bg-[#171717] p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <h3 className="font-bold text-lg mb-2 text-white">React for Beginners</h3>
              <p className="text-sm text-gray-300">50% completed</p>
              <div className="progress-bar bg-gray-600 h-2 rounded-full mt-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "50%" }}></div>
              </div>
            </div>
            <div className="course-card bg-[#171717] p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <h3 className="font-bold text-lg mb-2 text-white">Advanced JavaScript</h3>
              <p className="text-sm text-gray-300">75% completed</p>
              <div className="progress-bar bg-gray-600 h-2 rounded-full mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div className="course-card bg-[#171717] p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <h3 className="font-bold text-lg mb-2 text-white">CSS Flexbox and Grid</h3>
              <p className="text-sm text-gray-300">20% completed</p>
              <div className="progress-bar bg-gray-600 h-2 rounded-full mt-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "20%" }}></div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Account Information */}
        <section className="account-info bg-[#171717] bg-opacity-80 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-white mb-6">Account Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
              <span className="font-semibold text-gray-300">Username:</span>
              <span className="text-gray-200">{user.name}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
              <span className="font-semibold text-gray-300">Phone:</span>
              <span className="text-gray-200">+1-202-555-0190</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
              <span className="font-semibold text-gray-300">Role:</span>
              <span className="text-gray-200 capitalize">{user.role}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-300">Member Since:</span>
              <span className="text-gray-200">January 2023</span>
            </div>
          </div>
        </section>
      </div>
    )}
  </div>
  
  );
}

export default Account;
