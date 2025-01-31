import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

function Home() {
    // Better to do this if you want to pass states dynamically between navigation
    // Passing it through the whole component is better for static data (refers to data that is "hardcoded" like login details)
    const location = useLocation(); // Used to get the current location

    // location state is the state object passed along navigation actiond
    // If there is no state passed along, the default is null (empty set)
    const { email_id, user_email, content, created_at, updated_at } = location.state || {};

    const [writtenContent, setWrittenContent] = useState<string>(content);
    const [display, setDisplay] = useState("");
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [emailId, setEmailId] = useState(email_id);

    // Hooks cannot be within the function, it has to be at the top level
    const navigate = useNavigate();

    const handleLogout = () => {
      alert("You have logged out");
      // Clear user data from local storage
      localStorage.removeItem("userEmail");
      navigate("/");
    };

    const handleClickConvert = () => {
      const input = {
        content: writtenContent
      };
      axios.post('http://localhost:3001/api/formalize', input)
      .then(response => {
        console.log("response.data" + response.data)
        setDisplay(response.data);
      })
      .catch(error => console.log("Error: " + error));
    };

    // The toggling of modals have to be handled in the parent class (Home.tsx) and
    // not within the modals because that violates React's one-way flow of data
    // Can think of it as how the main page is constantly there but not the modals
    // so if you have the logic in the modals then the modals have to always be there 
    // for the fucntions to work
    const handleLoginToSignIn = () => {
      setIsLoginModalOpen(false);
      setIsSignUpModalOpen(true);
    };

    const handleSignInToLogin = () => {
      setIsSignUpModalOpen(false);
      setIsLoginModalOpen(true);
    };

    const openLoginModal = () => {
      console.log("opening login modal")
      setIsLoginModalOpen(true);
    }

    const closeLoginModal = () => {
      setIsLoginModalOpen(false);
    }

    const closeSignUpModal = () => {
      setIsSignUpModalOpen(false);
    }

    const handleSaveButton = () => {
        console.log("save button clicked");
        const userEmail = localStorage.getItem("userEmail");

        if (userEmail) {
          const emailData = {
            email_id: emailId,
            user_email: userEmail,
            content: writtenContent
        }

        axios.post("http://localhost:3001/api/save", emailData)
        .then(res => {
          // This is the (new) email ID that is saved into the database by the API
          setEmailId(res.data.email_id);
          console.log("Email saved successfully and email id is : ", res.data.email_id);
          alert("Email saved successfully :)");
        })
        .catch(e => console.error(e.message));

      } else {
        console.log("No user found, please log in");
        openLoginModal();
      }
    }

    const handleCollectionButton = () => {
      navigate("/collection");
    }

    // This starts a brand new email draft
    const handleNewButton = () => {
      setWrittenContent("");
      setEmailId(null);
    }

    return (
      // No need for full-page wrapper - that's in App.tsx
      <div className="space-y-6 w-[90%] md:w-[70%] lg:w-[50%] mx-auto">
        {/* This is the pop-up for the log in page. When we pass data to a another page
        i.e. through the isLoginModalOpen and closeLoginModal variables, these are called props.
        Props can be states,components or functions.*/}
        <>
            <LoginModal 
                isLoginModalOpen={isLoginModalOpen} 
                closeLoginModal={closeLoginModal}
                onSignUpClick={handleLoginToSignIn}
            />
            <SignUpModal 
                isSignUpModalOpen={isSignUpModalOpen} 
                closeSignUpModal={closeSignUpModal}
                onLoginClick={handleSignInToLogin}
            />
        </>

        {localStorage.getItem("userEmail") && (
          <>
            <div className="flex justify-between items-center">
              <button className="text-left text-white bg-gray-600 hover:bg-red-300 rounded-lg" onClick={handleLogout}>
                  Log out
              </button>
            </div>
          </>
        )}
         
        <h1 className="text-4xl font-bold text-gray-600">
          Hi! I am Emailly. I help to make your emails sound more formal
        </h1>

        {localStorage.getItem("userEmail") && (
          <>
            <button className={`text-left text-black bg-pink-200 rounded-lg hover:bg-gray-200`} onClick={handleCollectionButton} >
              View past email drafts →
            </button>
          </>
        )}

        <p className="text-gray-600 text-left">
          Just type your informal sounding email here:
        </p>
        {/* The below code is the textbox */}
        <textarea
        className="w-full h-64 px-4 py-2 rounded-md text-white focus:ring-0 border-none"
        placeholder="Enter your email content here"
        // e is an event object
        onChange={(e) => setWrittenContent(e.target.value)}
        // We need the below because onChange handler causes a re-render
        // Meaning to say that React will not know of the true value of writtenContent
        // The textbox will still show the writtenContent but that is managed by the DOM
        value={writtenContent}
        />

        <button className={`text-left mr-4 ${writtenContent ? 'bg-black-500 hover:bg-black-700' : 'bg-gray-400 cursor-not-allowed'}`} onClick={handleNewButton}>
          Start a new Email
        </button> 

        <button className={`text-left mr-4 ${writtenContent ? 'bg-black-500 hover:bg-black-700' : 'bg-gray-400 cursor-not-allowed'}`} onClick={handleSaveButton}>
          Save as Draft
        </button>

        {/* ${} is an embedded expression. Anything inside is treated as a javascript expression.
        When you use embedded expression, use `` */}
        {/* mr means margin right*/}
        <button className={`text-left ${writtenContent ? 'bg-black-500 hover:bg-black-700' : 'bg-gray-400 cursor-not-allowed'}`} onClick={handleClickConvert}>
          Convert email
        </button>

        {display && (
        // When you return an element, there should only be one container
        // So when you have 2 divs, you have to wrap it in a fragment
        <>
        <div className="w-full">
          <p className="text-left text-gray-600">Below is the formalized email, you can edit it however you like if you click into the box!</p>
        </div>
        <div className="w-full bg-white p-4 rounded-md shadow-md">
          {/* whitespace pre wrap maintains the formatting of the writtenContent */}
          <p contentEditable={true} className="text-left text-gray-600 whitespace-pre-wrap">{display}</p>
        </div>
        </>
        )}
      </div>
    )
  }
  
  export default Home
