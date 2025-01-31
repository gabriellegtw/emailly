import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Email } from "../types/Email";

function EmailContainer({ email_id, user_email, content, created_at, updated_at }: Email) {
    const navigate = useNavigate();

    const handleEditButton = () => {
        navigate("/");
    }

    // Format the date to a more readable format in GMT+8
    const formatDate = (date: Date) => {
      return date.toLocaleString("en-US", {
          timeZone: "Asia/Singapore", // GMT+8 timezone
          year: "numeric",
          month: "long", // Full month name
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
      });
  };
    
    return (
        <div className="w-150 mt-6 bg-white p-4 rounded-md shadow-md">
          {/* whitespace pre wrap maintains the formatting of the content */}
          <p className="text-left text-gray-600 whitespace-pre-wrap">{content}</p>

          <div className="mt-4 flex justify-end space-x-4">
            {/* Edit Button */}
            <button 
              className="flex items-center text-gray-600 bg-white hover:text-gray-800 focus:outline-none focus:ring-0"
              onClick={handleEditButton}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 6.343a2 2 0 0 1 0 2.828L9.828 16H7v-2.828l7.828-7.828a2 2 0 0 1 2.828 0l1.001 1.001z"></path>
              </svg>
              Edit
            </button>

            {/* Delete Button */}
            <button 
              className="flex items-center text-gray-600 bg-white hover:text-gray-800 focus:outline-none focus:ring-0"
              
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Delete
            </button>

            <p className="text-left text-gray-400 text-xs whitespace-pre-wrap">Created at: {formatDate(new Date(created_at))}</p>
            <p className="text-left text-gray-400 text-xs whitespace-pre-wrap">Last updated at: {formatDate(new Date(updated_at))}</p>
          </div>

        </div>
    )
  }
  
  export default EmailContainer
