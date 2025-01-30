import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmailContainer({content}: {content: string}) {
    const navigate = useNavigate();

    const handleEditButton = () => {
        navigate("/");
    }
    
    return (
        <div className="w-full bg-white p-4 rounded-md shadow-md">
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
          </div>

        </div>
    )
  }
  
  export default EmailContainer
