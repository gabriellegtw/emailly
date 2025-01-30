import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmailContainer from "../components/emailContainer";

function Collection() {

    // Hooks cannot be within the function, it has to be at the top level
    const navigate = useNavigate();

    const handleHomeButton = () => {
        navigate("/");
    }
    
    return (
        <div className="flex flex-col items-start p-4">
        <button className={`mb-8 text-left text-black bg-pink-200 rounded-lg hover:bg-gray-200`} onClick={handleHomeButton} >
          ← Go back to converting emails
        </button>

        <EmailContainer
            content="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.">
        </EmailContainer>
       
      </div>
    )
  }
  
  export default Collection
