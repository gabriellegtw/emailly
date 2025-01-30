import { useState } from "react";
import axios from "axios";
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

function Home() {
    const [content, setContent] = useState("");
    const [display, setDisplay] = useState("");
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

    const handleClickConvert = () => {
      const input = {
        content
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
        <h1 className="text-4xl font-bold text-gray-600">
          Hi! I am Emailly. I help to make your emails sound more formal
        </h1>
        <p className="text-gray-600 text-left">
          Just type your informal sounding email here:
        </p>
        {/* The below code is the textbox */}
        <textarea
        className="w-full h-64 px-4 py-2 rounded-md text-white focus:ring-0 border-none"
        placeholder="Enter your email content here"
        // e is an event object
        onChange={(e) => setContent(e.target.value)}
        // We need the below because onChange handler causes a re-render
        // Meaning to say that React will not know of the true value of content
        // The textbox will still show the content but that is managed by the DOM
        value={content}
        />
        {/* ${} is an embedded expression. Anything inside is treated as a javascript expression.
        When you use embedded expression, use `` */}
        {/* mr means margin right*/}
        <button className={`text-left ${content ? 'bg-black-500 hover:bg-black-700' : 'bg-gray-400 cursor-not-allowed'} mr-4`} onClick={handleClickConvert}>
          Convert email
        </button>

        <button className={`text-left ${content ? 'bg-black-500 hover:bg-black-700' : 'bg-gray-400 cursor-not-allowed'}`} onClick={openLoginModal}>
          Save as Draft
        </button>

        {display && (
        // When you return an element, there should only be one container
        // So when you have 2 divs, you have to wrap it in a fragment
        <>
        <div className="w-full">
          <p className="text-left text-gray-600">Below is the formalized email, you can edit it however you like if you click into the box!</p>
        </div>
        <div className="w-full bg-white p-4 rounded-md shadow-md">
          {/* whitespace pre wrap maintains the formatting of the content */}
          <p contentEditable={true} className="text-left text-gray-600 whitespace-pre-wrap">{display}</p>
        </div>
        </>
        )}
      </div>
    )
  }
  
  export default Home
