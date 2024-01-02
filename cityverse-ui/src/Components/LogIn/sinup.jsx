import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Sigup = (props) => {
  const [first_name, setFirst_name] = useState()
  const [last_name, setLast_name ] = useState()
  const [email , setEmail] = useState()
  const [phone , setPhone] = useState()
  const [password ,  setPassword] = useState()
  const [confirm_password ,  setConfirmPassword] = useState()
  const [created_on, setcreated_on] = useState()
  const [modified_on, setmodified_on] = useState()
  const [is_creator , setIscreator ] = useState()
  const history = useHistory();

  const sign_up = () => {
    const obj = {
     // profile_image: "C:/Users/hp/Desktop/profile.png",
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      is_creator: is_creator === "CR" ? true : false,
      interest_points: [],
    }

    axios
      .post(
        process.env.REACT_APP_ADMINISTRATION_USERS_SERVER + "/auth/signup",      
          obj,
      )
      .then((value) => {
        history.push("/");
      })
      .catch((err) => {
      });
  };

  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/motion-tailwind/motion-tailwind.css"
        />
      </head>
      <div
        class="h-screen overflow-hidden flex items-center justify-center"
        // style={{ background: "#edf2f7" }}
      >
        <body class="bg-video px-50 py-50 shadow-lg backdrop-blur-md max-sm:px-8">
          <div class="container flex flex-col mx-auto  rounded-lg pt-12 my-24 mx-24 ">
            <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
              <div class="flex items-center justify-center w-full lg:p-12">
                <div class="flex items-center xl:p-10">
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
                          value={first_name}
                          onChange={(e) => setFirst_name(e.target.value)}
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
                          type="second"
                          placeholder="Second Name"
                          class="flex items-center w-full px-3 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-5 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                          value={last_name}
                          onChange={(e) => setLast_name(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="h-56 grid grid-cols-2 gap-4 content-start">
                      <div class="grid justify-items-start">
                        <label
                          for="first name"
                          class="mb-2 text-sm text-start text-white"
                        >
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="mail@loopple.com"
                          class="flex items-center w-full px-3 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-5 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                          value={email}
                          onChange={(e) => {setEmail(e.target.value)}}
                        />
                      </div>
                      <div class="grid justify-items-start">
                        <label
                          for="email"
                          class="mb-2 text-sm text-start text-white"
                        >
                          Phone
                        </label>
                        <input
                          id="email"
                          type="tel"
                          placeholder="Tél"
                          class="flex items-center w-full px-3 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-5 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                          value={phone}
                          onChange={(e) => {setPhone(e.target.value)}}
                        />
                      </div>
                    </div>
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
                          class="flex items-center w-full px-3 py-3 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                          class="flex items-center w-full px-3 py-3 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                          value={confirm_password}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <label
                      for="countries"
                      class="mb-2 text-sm text-start text-white"
                    >
                      Profile
                    </label>
                    <select
                      id="countries"
                      class="flex items-center w-full px-3 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-10 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                      value={is_creator}
                      onChange={(e) => setIscreator(e.target.value)}
                    >
                      <option value="CR">Creator</option>
                      <option selected value="US">user</option>
                    </select>
                    <button type="button" class="w-full px-4 py-4 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-full rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500" onClick={sign_up}>
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
