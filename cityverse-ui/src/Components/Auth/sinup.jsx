import "../background.css"

const Sigup = (props) => {
  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/motion-tailwind/motion-tailwind.css"       
        />
      </head>
      <div
        class="bg-video h-screen overflow-hidden flex items-center justify-center"
        // style={{ background: "#edf2f7" }}
      >
        <body class="rounded-xl bg-gray-800 bg-opacity-50 px-50 py-50 shadow-lg backdrop-blur-md max-sm:px-8">
          <div class="container flex flex-col mx-auto  rounded-lg pt-12 my-24 mx-24 ">
            <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
              <div class="flex items-center justify-center w-full lg:p-12">
                <div class="flex items-center xl:p-10" >
                  <form class="flex flex-col w-full h-full pb-6 text-center rounded-3xl">
                    <h3 class="mb-8 text-4xl font-extrabold text-white">
                      Sign up
                    </h3>
                    <div class="h-56 grid grid-cols-2 gap-4 content-start">
                      <div class="grid justify-items-start">
                      <label
                      for="first name"
                      class="mb-2 text-sm text-start text-white"
                    >
                      First Name *
                    </label>
                    <input
                      id="email"
                      type="second"
                      placeholder="First Name"
                      class="flex items-center w-full px-3 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-5 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                    />
                      </div>
                      <div class="grid justify-items-start">
                      <label
                      for="email"
                      class="mb-2 text-sm text-start text-white"
                    >
                      Second Name *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Second Name"
                      class="flex items-center w-full px-3 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-5 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                    />                 
                      </div>
                    </div>
                    <label
                      for="email"
                      class="mb-2 text-sm text-start text-white"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="mail@loopple.com"
                      class="flex items-center w-full px-3 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-5 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                    />
                    <label
                      for="password"
                      class="mb-2 text-sm text-start text-white"
                    >
                      Password *
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter a password"
                      class="flex items-center w-full px-3 py-3 mb-6 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                    />
                    <label
                      for="password"
                      class="mb-2 text-sm text-start text-white"
                    >
                      Confirm Password *
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Confirm password"
                      class="flex items-center w-full px-3 py-3 mb-10 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                    />
                      <div class="h-56 grid grid-cols-2 gap-4 content-start">
                      <div class="grid justify-items-start">
                      <label
                      for="password"
                      class="mb-2 text-sm text-start text-white"
                    >
                      Password *
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter a password"
                      class="flex items-center w-full px-3 py-3 mb-6 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                    />
                      </div>
                      <div class="grid justify-items-start">
                      <label
                      for="password"
                      class="mb-2 text-sm text-start text-white"
                    >
                      Confirm Password *
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Confirm password"
                      class="flex items-center w-full px-3 py-3 mb-10 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                    />         
                      </div>
                    </div>
                    
                    <button class="w-full px-4 py-4 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-full rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                      Sign Up
                    </button>     
                  </form>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    </>
  );
};

export default Sigup;
