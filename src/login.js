import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import Link from 'next/link'
import Image from 'next/image'
import Logo from "../public/logo2.png"
import Loader from "../public/whiteloader.gif"
import Head from 'next/head';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { Button, Divider, Input } from "@nextui-org/react";
import { HStack, PinInput, PinInputField, useToast } from '@chakra-ui/react';

import { AiOutlineQq } from "react-icons/ai";
import { UnexpectedResponseException } from 'pdfjs-dist';
import axios from 'axios';




export default function Login() {
  const [wrongotp, setwrongotop] = useState(false)

  const [userotpinput, setuserotpinput] = useState()
  const [showOtp, setShowOtp] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);
  const router = useRouter();

  const toast = useToast({
    title: `Plaese fill all the filds`,
    status: 'warning',
    isClosable: true,
    position: 'top'
  })
  const toast2 = useToast({
    title: `Wrong credentail`,
    status: 'error',
    isClosable: true,
    position: 'top'
  })
  const toast3 = useToast({
    title: `Logged in successfully`,
    status: 'success',
    isClosable: true,
    position: 'top'
  })


  const [user, setuser] = useState({
    email: '', password: ''
  });

  let name, value;
  const handeluserinput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setuser({ ...user, [name]: value });
  }

  const [loader, setloader] = useState(false)


  const login = async () => {
    const { url } = router.query;

    try {
      setloader(true);
      const { email, password } = user;

console.log(process.env.NEXT_PUBLIC_BACKEND_URL, "this is backend url")
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      // Successful lon
      if (response.status === 200) {
        toast3();

        //for test report page if not logged in it will be redirected to that test from where it came from
        if (url) {
          await router.replace(url);
          window.location.reload();
        } else {
         
          router.replace("/")
        }


        return;
      }

      // Handle status 203 - likely invalid credentials
      if (response.status === 203) {
        toast2();
      }
    } catch (error) {

      if (error.response && error.response.status === 429) {
        setShowOtp(true);
        resendOtp()
      }
      // Handle error status 422 - likely validation error
      if (error.response && error.response.status === 422) {
        toast();
      } else {
        toast({
          title: error?.response?.data?.err ||  `An error occurred. Please try again.`,
          status: 'error',
          isClosable: true,
          position: 'top'
        });
        console.error("Login error:", error);
      }
    } finally {
      // Always stop loader if not redirecting
      setloader(false);
    }
  };


  const handeluserotpinput = (e) => {

    setuserotpinput(e)
  }
  const resendOtp = async (e) => {

    setSendingOTP(true)


    try {


      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resend-verification-otp`, { email: user.email })

      console.log(response, "this si response");
      if (response.status === 200) {
        toast({
          title: `OTP sent succesfully`,
          status: 'info',
          isClosable: true,
          position: 'top'
        });
        setSendingOTP(false);


      } else {
        toast({
          title: `An error occurred. Please try again.`,
          status: 'error',
          isClosable: true,
          position: 'top'
        });
      }



    } catch (error) {
      console.error(error, "this is error response");
      const message = error.response?.data?.error || "An error occurred. Please try again.";
      toast({
        title: message,
        status: 'error',
        isClosable: true,
        position: 'top'
      });
      setSendingOTP(false);
    }



  }



  const verifyotp = async (e) => {
    const { url } = router.query;

    if (!userotpinput) {
      toast({
        title: `Please enter otp`,
        status: 'warning',
        isClosable: true,
        position: 'top'
      });
      return;
    }



    setloader(true);
    try {


      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify-otp`, { email: user.email, otp: userotpinput }, { withCredentials: true })

      console.log(response, url, "this si response");
      if (response.status === 200) {
        toast({
          title: `Verified successfully`,
          status: 'success',
          isClosable: true,
          position: 'top'
        });
        setloader(false);

        await router.replace(url || '/');
        window.location.reload();
        return;


      } else {
        toast({
          title: `An error occurred. Please try again.`,
          status: 'error',
          isClosable: true,
          position: 'top'
        });
      }



    } catch (error) {
      setwrongotop(true)
      console.error(error, "this is error response");
      const message = error.response?.data?.error || "An error occurred. Please try again.";
      toast({
        title: message,
        status: 'error',
        isClosable: true,
        position: 'top'
      });
      setloader(false);
    }



  }




  const googlelogin = (data) => {
    setloader(true)

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/googlelogin`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: data.email,
        profile: data.picture,
        username: data.name
      }), credentials: 'include'
    }).then(function (response) {

      return response.status
    }).then(function (result) {
      if (result == 422) {
        toast()
        setloader(false)
      }

      if (result == 200) {
        router.back()
        toast3()
      }
      else if (result == 203) {
        setloader(false)
        toast2()


      }

    }).catch(function (err) {
      console.log(err);
    })


  }



  const responseMessage = (response) => {
    googlelogin(jwt_decode(response.credential))

  }
  const errorMessage = (err) => {
    console.log(err);
  }



  const [quote, setQuote] = useState(null);
  const getQuoteOfTheDay = () => {
    axios.get('/api/quote').then((res) => {
      setQuote(res.data)
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getQuoteOfTheDay();
  }, [])



  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);




  return (
    <>

      <Head>
        <title>Login</title>

        <meta name="description" content="Share your Knowledge with friends, family and the world " />
      </Head>

      <div className='w-full h-full overflow-hidden  flex flex-col justify-center   items-center' >


        {!showOtp && <>
          <div className='w-fit py-14 h-full  flex flex-row '>


            <div className='w-fit overflow-hidden rounded-xl  shadow-md h-full  flex flex-row '>
              <div className='w-[400px]  z-20  flex flex-col  items-center bg-transparent backdrop-blur-xl'>
                <div className='w-full flex items-center justify-center   h-14'>
                  {/* <Image src={Logo} className='w-32 h-14'></Image> */}
                  <AiOutlineQq onClick={() => { router.push("/") }} className='w-12 cursor-pointer   fill-black  h-12' />
                </div>
                <div className='text-black h-14  w-full mt-1  text-center font-bold text-2xl' >Login</div>
                {/* <div className='text-white text-sm w-80 flex justify-center font-medium items-center bg-slate-400 h-10 rounded-xl cursor-pointer active:bg-slate-300 hover:shadow-md'>Login in with Google</div>
<div className='text-black mt-3 font-medium' > OR</div> */}


                <div className='w-80   mt-3 rounded-md flex justify-center items-center' >
                  <GoogleOAuthProvider clientId="464893429666-0aj0k4qejupj6la1lhpped2hn298d2ib.apps.googleusercontent.com">

                    <GoogleLogin logo_alignment='center' shape='pill' text='continue_with' onSuccess={responseMessage} onError={errorMessage} />
                  </GoogleOAuthProvider>
                </div>

                <div className="w-80 my-3 flex items-center justify-center">
                  <div className="flex-grow border-b border-gray-400"></div>
                  <span className="px-4 text-gray-500">or</span>
                  <div className="flex-grow border-b border-gray-400"></div>
                </div>

                <Input onChange={(e) => { handeluserinput(e) }} onKeyUp={(e) => { if (e.key == "Enter") { login() } }} name='email' className='w-80 h-10 m-3 border-none outline-none text-black bg-transparent' type="text" placeholder='Username' ></Input>


                <Input onChange={(e) => { handeluserinput(e) }} onKeyUp={(e) => { if (e.key == "Enter") { login() } }} name='password' className='w-80 h-10  m-3 border-none outline-none text-black bg-transparent' type={isVisible ? "text" : "password"} placeholder='Password' endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                } ></Input>

                <div className='w-80 h-10  text-center flex justify-center items-center mt-5'>
                  <div onClick={() => { router.push("/recover") }} className='w-fit cursor-pointer  hover:text-blue-400 mb-8 text-gray-800 '>Forgot Password !</div></div>
                <Button color="primary" radius='full' className="w-80 outline-none" onPress={() => { login(); }}>
                  {
                    loader && <Image className='h-7 w-7' src={Loader} ></Image>
                  }
                  {
                    !loader && <div>Login</div>
                  }
                </Button>



                <p className="text-center mt-8  text-base">
                  Need to create an account?{" "}
                  <Link size="sm" href={'/signup'}>
                    Sign up
                  </Link>
                </p>
                <div className='w-full flex items-center flex-col justify-center text-[13px] text-black bottom-3 mt-10'>By creating this account, you agree to our
                  <div className='flex '><div onClick={() => { router.push("/guidelines/Privacy Policy") }} className='mr-2 text-text-gray-900 font-medium cursor-pointer'>Privacy Policy </div>& <div onClick={() => { router.push("/guidelines/Cookie Policy") }} className='ml-2 text-text-gray-900 font-medium cursor-pointer'>Cookie Policy</div></div>
                  . </div>

              </div>

              <div className=' relative w-[400px]  hidden md:flex items-center justify-center  ' >
                {quote &&
                  <div className='w-full space-y-4 flex-col px-6 text-white bg-black bg-opacity-40 z-50 h-full flex justify-center items-center '  >

                    <p className='text-center text-xl font-medium'>{quote?.content}</p>
                    <p className=''>by</p>
                    <p className=''>{quote?.author}</p>
                  </div>}
                <Image className='absolute top-0' width={1024} height={1024} src='https://img.freepik.com/free-photo/young-man-using-cellphone-with-laptop-digital-tablet-coffee-mug-kitchen-counter_23-2147936958.jpg?uid=R68596152&ga=GA1.1.1097242138.1744094652&semt=ais_country_boost&w=740'></Image>
              </div>
            </div>
            {/* <svg viewBox="0 0 200 200" className='absolute w-full h-full' xmlns="http://www.w3.org/2000/svg">
            <path fill="#D0E2FF" d="M35,-43.3C46.5,-32.1,57.6,-22.1,65.8,-7C74,8.2,79.3,28.5,71.4,40.3C63.5,52.2,42.5,55.5,23,62.3C3.4,69.1,-14.5,79.2,-25.1,73.5C-35.7,67.7,-38.8,45.9,-41,29.7C-43.3,13.4,-44.7,2.6,-46.2,-11.5C-47.7,-25.7,-49.4,-43.2,-41.7,-55.1C-34,-67,-17,-73.2,-2.6,-70.1C11.8,-67,23.6,-54.6,35,-43.3Z" transform="translate(100 100)" />
          </svg> */}

          </div>
        </>
        }


        {/* otp section */}




        {showOtp &&
          <div className='w-full h-[100vh]  flex justify-center items-center'>
            <div className='w-96 h-[65%] rounded-md shadow-md z-20 flex flex-col items-center  bg-transparent backdrop-blur-lg '>
              <div className='text-black h-14  w-full mt-3  text-center font-bold text-2xl' >Verify Email</div>
              <div className='text-slate-400 m-3 w-80 text-sm text-center'>Enter six digit Verification code that we have sent to your email address '{user.email}', to verify your email address.</div>
              <div className='w-80 h-12   m-3 overflow-hidden   px-2 '>
                {/* <input onChange={(e)=>{handeluserotpinput(e)}} value={userotpinput} className='w-full h-full border-none outline-none text-black bg-slate-100'  type="number" placeholder='Verification code' ></input> */}

                <div className='w-80 h-18  flex items-center m-1 overflow-hidden   px-2  rounded-xl'>

                  <HStack>
                    <PinInput onChange={(x) => { handeluserotpinput(x) }} value={userotpinput} isInvalid={wrongotp}>
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                </div>
              </div>
              <div className='w-80 mt-3 text-slate-500 justify-between rounded-md  h-10  flex text-sm'>
                {sendingOTP && <div onClick={(e) => { resendOtp(e) }} className='h-full cursor-pointer flex px-2 items-center font-medium'>Sending</div>
                }

                {!sendingOTP && <div onClick={(e) => { resendOtp(e) }} className='h-full cursor-pointer flex px-2 items-center font-medium'>Resend Code</div>
                }  </div>
              {!loader && <button onClick={(e) => {
                verifyotp(e)
              }} disabled={loader} className='w-80    bg-blue-600 mt-2 overflow-hidden  p-2   cursor-pointer flex rounded-xl active:bg-slate-300 select-none  text-white items-center justify-center'>
                Verify

              </button>}
              {loader && <button disabled={loader} className='w-80    bg-blue-400 mt-2 overflow-hidden  p-2  cursor-pointer flex rounded-xl active:bg-slate-300 select-none  text-white items-center justify-center'>
                Verifying

              </button>}
            </div></div>}
      </div>


    </>
  )
}

export const EyeSlashFilledIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
        fill="currentColor"
      />
      <path
        d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
        fill="currentColor"
      />
      <path
        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
        fill="currentColor"
      />
      <path
        d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
        fill="currentColor"
      />
      <path
        d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EyeFilledIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
        fill="currentColor"
      />
      <path
        d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
        fill="currentColor"
      />
    </svg>
  );
};