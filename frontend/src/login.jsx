import {Button} from "@material-tailwind/react";
import {useRef, useState} from "react";
import retrive from "./Components/Data.js";
import {  useDispatch } from 'react-redux'
import {add_data} from "./features/Credentials_slice.js";
import { Use_firebase} from "./Context.jsx";
import {NavLink, useNavigate} from 'react-router-dom';
import {add_today_date} from "./Components/Data.js";
import {Loader} from "./Loader.jsx";
import im1 from "../images/im1.jpg"
import im2 from "../images/im2.jpg"
import im3 from "../images/im3.jpg"
import im4 from "../images/im4.jpg"
export function Login(){
    const [load , set_load] = useState(false)
    const [token, settoken] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const dispatch = useDispatch()
    const Firebase = Use_firebase()
    const navigate = useNavigate();
    const date = new Date();
    const today = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    return (
      <>
          {load && <Loader/>}
          {load === false &&
          <div className="bg-neutral-900 h-dvh w-dvw text-amber-50  flex ">
              <div className="bg-black h-full w-[45%] flex items-center">
                  <div className="carousel w-full h-[93%]">
                      <div id="slide1" className="carousel-item relative w-full">
                          <img
                              src={im2}
                              className="w-full"/>
                          <div
                              className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                              <a href="#slide4" className="btn btn-circle">❮</a>
                              <a href="#slide2" className="btn btn-circle">❯</a>
                          </div>
                      </div>
                      <div id="slide2" className="carousel-item relative w-full">
                          <img
                              src={im1}
                              className="w-full"/>
                          <div
                              className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                              <a href="#slide1" className="btn btn-circle">❮</a>
                              <a href="#slide3" className="btn btn-circle">❯</a>
                          </div>
                      </div>
                      <div id="slide3" className="carousel-item relative w-full">
                          <img
                              src={im3}
                              className="w-full"/>
                          <div
                              className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                              <a href="#slide2" className="btn btn-circle">❮</a>
                              <a href="#slide4" className="btn btn-circle">❯</a>
                          </div>
                      </div>
                      <div id="slide4" className="carousel-item relative w-full">
                          <img
                              src={im4}
                              className="w-full"/>
                          <div
                              className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                              <a href="#slide3" className="btn btn-circle">❮</a>
                              <a href="#slide1" className="btn btn-circle">❯</a>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="h-full w-[55%] flex flex-col  items-center  pt-[3%] ">
                  <div
                      className=" w-full text-amber-50 text-5xl font-['Georgia'] font-normal  mt-[4%] flex justify-center mx-[2%] pb-[6%]">
                      Login in account
                  </div>


                    <div className="h-full w-full flex flex-col justify-center items-center pb-[8%]">
                  <div className="w-full  flex justify-center pb-[3%]">
                      <input
                          type="email"
                          placeholder="Email"
                          className=" input input-bordered input-accent w-[83%] " onChange={(e) => {
                          setemail(e.target.value.toLowerCase())
                      }}/>
                  </div>
                  <div className="w-full flex justify-center pb-[3%]">
                      <input
                          type="password"
                          placeholder="Password"
                          className=" input input-bordered input-accent w-[83%] " onChange={(e) => {
                          setpassword(e.target.value)
                      }}/>
                  </div>


                  <div className="w-full flex justify-center">
                      <button className="btn btn-active btn-accent w-[83%]" onClick={async (e) => {
                                        try{
                                            set_load(true)
                                            const user = await Firebase.User(email,password)
                                            await add_today_date(email)
                                            navigate(`/chat/${email}/${today}`)
                                        }
                                        catch(err){
                                            set_load(false)
                                            alert("wrong email or password")
                                        }
                                        }
                      }>LOGIN IN
                      </button>
                  </div>
                  <div className="w-full flex justify-center pt-[4%]">Create an account?&nbsp;&nbsp; <NavLink
                      className="text-emerald-600 underline" to="/signin">Sign In</NavLink></div>
              </div>
            </div>

          </div>
          }
      </>
  )
}