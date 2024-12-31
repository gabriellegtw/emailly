import { useState } from "react";

function Home() {
    const [content, setContent] = useState("");
    const [display, setDisplay] = useState("");

    const handleClick = () => {
      // Set display to current content
      setDisplay(content);
    };

    return (
      // No need for full-page wrapper - that's in App.tsx
      <div className="space-y-6 w-[90%] md:w-[70%] lg:w-[50%] mx-auto">
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
        <button className={`text-left ${content ? 'bg-black-500 hover:bg-black-700' : 'bg-gray-400 cursor-not-allowed'}`} onClick={handleClick}>
          Convert email
        </button>

        {display && (
        // When you return an element, there should only be one container
        // So when you have 2 dives, you have to wrap it in a fragment
        <>
        <div className="w-full">
          <p className="text-left text-gray-600">This is the formalised email:</p>
        </div>
        <div className="w-full bg-white p-4 rounded-md shadow-md">
          {/* whitespace pre wrap maintains the formatting of the content */}
          <p className="text-left text-gray-600 whitespace-pre-wrap">{display}</p>
        </div>
        </>
        )}
      </div>
    )
  }
  
  export default Home
