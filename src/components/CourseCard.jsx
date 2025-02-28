import React from 'react';
import { server } from '../main';
import { CourseData } from '../context/CourseContext';
import { UserData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios'; // Ensure axios is imported
import {motion} from 'framer-motion'
function CourseCard({ course }) {
  const navigate = useNavigate();
  const { isAuth, user } = UserData();
  const { fetchCourses } = CourseData();

  // Delete handler for deleting the course
  const deleteHandler = async (id) => {
    const token = localStorage.getItem("token");

    // Check if token exists
    if (!token) {
      toast.error("You are not authorized to perform this action.");
      return;
    }

    if (confirm("Are You Sure You want to delete this Course?")) {
      try {
        const response = await axios.delete(`${server}/admin/course/${id}`, {
          headers: {
            token: token, // Pass the token from localStorage
          },
        });

        if (response && response.data) {
          toast.success(response.data.message); // Show success message
          fetchCourses(); // Refresh the list of courses after successful deletion
        }
      } catch (err) {
        // Handle different error cases
        if (err.response && err.response.data) {
          toast.error(err.response.data.message); // Show error message from server
        } else if (err.request) {
          toast.error("No response from server. Please check your network.");
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      }
    }
  };

  return (
    <motion.div
    whileHover={{ scale: 1.02, translateY: -5 }}
    whileTap={{ scale: 0.98 }}
    className="bg-[#171717] rounded-xl shadow-lg p-4 text-white relative max-w-xs"
  >
    {/* Course Image */}
    <div className="relative w-full h-48">
      <img
        className="w-full h-full object-cover rounded-lg"
        src={`${server}/${course.image}`}
        alt={course.title}
      />
      <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md">
        JOB READY
      </span>
    </div>

    {/* Course Details */}
    <h3 className="text-lg font-bold mt-3">{course.title}</h3>

    {/* Badges */}
    <div className="flex space-x-2 mt-2">
      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">LIVE BATCH</span>
      <span className="bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded-md">HINDI</span>
    </div>

    {/* Pricing */}
    <div className="mt-3">
      <p className="text-green-400 text-sm font-semibold">Limited Time Discount</p>
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold">₹ {course.price}</span>
        <span className="line-through text-gray-400">₹ {course.originalPrice}</span>
        <span className="bg-white text-black text-xs font-bold px-2 py-1 rounded-md">{course.discount}% OFF</span>
      </div>
    </div>

    {/* Buttons */}
    {isAuth ? (
      user && user.role !== "admin" ? (
        user.subscription.includes(course._id) ? (
          <button
            onClick={() => navigate(`/course/study/${course._id}`)}
            className="w-full mt-3 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg"
          >
            Study Now
          </button>
        ) : (
          <button
            onClick={() => navigate(`/course/${course._id}`)}
            className="w-full mt-3 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg"
          >
            Buy Now
          </button>
        )
      ) : (
        <button
          onClick={() => navigate(`/course/study/${course._id}`)}
          className="w-full mt-3 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg"
        >
          Study Now
        </button>
      )
    ) : (
      <button
        onClick={() => navigate("/login")}
        className="w-full mt-3 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg"
      >
        Buy Now
      </button>
    )}

    {/* Admin Button */}
    {user && user.role === "admin" && (
      <button
        onClick={() => deleteHandler(course._id)}
        className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg"
      >
        Delete
      </button>
    )}
  </motion.div>


  );
}

export default CourseCard;


