function Home() {
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
        />
        <button className="text-left">
          Click here
        </button>
      </div>
    )
  }
  
  export default Home
