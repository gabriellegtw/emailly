import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmailContainer from "../components/emailContainer";
import { Email } from "../types/Email"; // import the Email type from the types folder

function Collection() {
    // Type only needs to be defined if it is not a primitive type in hooks
    const [emails, setEmails] = useState<Email[]>([]);

    // This is for the pagination
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const [emailsPerPage, setEmailsPerPage] = useState(5); // Emails per page

    // Hooks cannot be within the function, it has to be at the top level
    const navigate = useNavigate();

    const userEmail = localStorage.getItem("userEmail");
    
      if (!userEmail) {
        console.log("no userEmail");
        return ;
      }

      console.log(userEmail);

      // define fetchEmails function
      const fetchEmails = async () => {
          try {
            const response = await axios.post('http://localhost:3001/api/fetchEmails', {
              email: userEmail,  // Send userEmail in the request body
              page: currentPage,
              limit: emailsPerPage
            });
              setEmails(response.data.rows); // Get the array of emails
              setTotalPages(Math.ceil(response.data.totalCount / 5)); // Set total number of page
              console.log(response.data.totalCount);
              console.log(totalPages);
          } catch (error) {
              console.error("Error fetching emails:", error);
              toast.error("Error fetching emails");
          }
      };

    // useEffect runs side effects whenever the component renders
    // Side Effects are any operations that affects the state of application or interacts with outside world
    useEffect(() => {
      // Call fetchEmails within the useEffect
      fetchEmails();
    }, [currentPage]); // Empty array means this effect runs once when the component mounts (instead of every time XX changes)
    // so putting current inside means that it would re render based on the page ypu are on
    // Putting emails in here would cause it to infinitely refresh as fetchEmails causes the emails to change so it infinitely refreshes
    // Better to put the fetchEmails within the delete button

    const handleHomeButton = () => {
        navigate("/");
    }

    // Change to previous page
    const handlePreviousPage = () => {
      if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
      }
    };

    // Change to next page
    const handleNextPage = () => {
      if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
      }
    };
    
    return (
        <div className="flex flex-col p-1 sm:p-2 md:p-4 w-full min-w-[320px] items-center">
            {/* Back button - smaller on mobile */}
            <button className="mb-2 sm:mb-4 md:mb-8 text-left text-black bg-pink-200 rounded-lg hover:bg-gray-200 text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 sm:py-2" onClick={handleHomeButton}>
                ← Go back to converting emails
            </button>

            {/* Email container - smaller width on mobile */}
            <div className="w-full max-w-[98%] sm:max-w-[95%] md:max-w-2xl lg:max-w-3xl px-1 sm:px-2">
                {emails.map((email, index) => (
                    <EmailContainer 
                        key={index} 
                        email_id={email.email_id}
                        user_email={email.user_email}
                        content={email.content}
                        created_at={email.created_at} 
                        updated_at={email.updated_at}
                        fetchEmails={fetchEmails}
                    />
                ))}
            </div>

            {emails.length === 0 && (
                <>
                    <div className="w-full bg-white p-4 rounded-md shadow-md">
                        <p className="text-left text-gray-600 whitespace-pre-wrap">
                            Hmm.. you don't have any saved emails yet :(
                        </p>
                    </div>
                </>
            )}

            {emails.length != 0 && (
                <>
                    {/* Pagination Controls - smaller on mobile */}
                    <div className="flex justify-between w-full mt-4 sm:mt-6 md:mt-10 px-1 sm:px-2 md:px-4">
                        <button 
                            className="bg-gray-300 px-1 sm:px-2 md:px-4 py-1 rounded-lg text-xs sm:text-sm md:text-base"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className="text-black text-xs sm:text-sm md:text-base self-center">{`Page ${currentPage} of ${totalPages}`}</span>
                        <button
                            className="bg-gray-300 px-1 sm:px-2 md:px-4 py-1 rounded-lg text-xs sm:text-sm md:text-base"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
            
            
        </div>
    )
  }
  
  export default Collection
