import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Email } from "../types/Email";

function EmailContainer({ email_id, user_email, content, created_at, updated_at, fetchEmails }: Email & { fetchEmails: () => Promise<void> }) {
    const navigate = useNavigate();

    const handleEditButton = () => {
      navigate('/', { state: { email_id, user_email, content, created_at, updated_at } });
    }

    const handleDeleteButton = async () => {
      const input = { email_id, user_email };
      try {
          const response = await axios.post('https://emailly-1.onrender.com/api/deleteEmail', input);
          console.log("response.data", response.data);
          fetchEmails(); // Call fetchEmails to refresh the email list
      } catch (error) {
          console.error("Error: ", error);
      }
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
        <div className="w-full mt-3 sm:mt-4 md:mt-6 bg-white p-2 sm:p-3 md:p-4 rounded-md shadow-md">
            {/* Content - adjust text size */}
            <p className="text-left text-gray-600 whitespace-pre-wrap text-xs sm:text-sm md:text-base">
                {content}
            </p>

            <div className="mt-2 sm:mt-3 md:mt-4 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                {/* Edit Button */}
                <button 
                    className="flex items-center text-gray-600 bg-white hover:text-gray-800 focus:outline-none focus:ring-0 text-xs sm:text-sm md:text-base"
                    onClick={handleEditButton}
                >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 6.343a2 2 0 0 1 0 2.828L9.828 16H7v-2.828l7.828-7.828a2 2 0 0 1 2.828 0l1.001 1.001z"></path>
                    </svg>
                    Edit
                </button>

                {/* Delete Button */}
                <button 
                    className="flex items-center text-gray-600 bg-white hover:text-gray-800 focus:outline-none focus:ring-0 text-xs sm:text-sm md:text-base"
                    onClick={handleDeleteButton}
                >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Delete
                </button>

                {/* Timestamps - stack on mobile */}
                <div className="flex flex-col space-y-1 text-[10px] sm:text-xs md:text-sm text-gray-400">
                    <p className="text-left whitespace-pre-wrap">
                        Created at: {formatDate(new Date(created_at))}
                    </p>
                    <p className="text-left whitespace-pre-wrap">
                        Last updated at: {formatDate(new Date(updated_at))}
                    </p>
                </div>
            </div>
        </div>
    )
  }
  
  export default EmailContainer
