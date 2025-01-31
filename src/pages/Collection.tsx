import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmailContainer from "../components/emailContainer";
import { Email } from "../types/Email"; // import the Email type from the types folder

function Collection() {
    // Type only needs to be defined if it is not a primitive type in hooks
    const [emails, setEmails] = useState<Email[]>([]);

    // Hooks cannot be within the function, it has to be at the top level
    const navigate = useNavigate();

    // useEffect runs side effects whenever the component renders
    // Side Effects are any operations that affects the state of application or interacts with outside world
    useEffect(() => {
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
              email: userEmail  // Send userEmail in the request body
            });
              setEmails(response.data.rows); // Get the array of emails
          } catch (error) {
              console.error("Error fetching emails:", error);
          }
      };
      
      // Call fetchEmails within the useEffect
      fetchEmails();
    }, []); // Empty array means this effect runs once when the component mounts (instead of every time XX changes)

    const handleHomeButton = () => {
        navigate("/");
    }
    
    return (
        <div className="flex flex-col p-4 w-full items-center">
        <button className={`mb-8 text-left text-black bg-pink-200 rounded-lg hover:bg-gray-200`} onClick={handleHomeButton} >
          ← Go back to converting emails
        </button>
        <div className="w-full max-w-3xl">
        {emails.map((email, index) => (
                <EmailContainer 
                key={index} 
                email_id={email.email_id}
                user_email={email.user_email}
                content={email.content}
                created_at={email.created_at} 
                updated_at={email.updated_at}
                /> // If type is not defined, email.content has error
            ))}
        </div>
  
      </div>
    )
  }
  
  export default Collection
