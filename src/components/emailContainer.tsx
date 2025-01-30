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
        </div>
    )
  }
  
  export default EmailContainer
