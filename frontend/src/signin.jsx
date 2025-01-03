import {Button} from "@material-tailwind/react";
import {useState} from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {app} from "./config.js";
import {getFirestore} from "firebase/firestore";
import {useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
const auth = getAuth(app);
const db = getFirestore(app)

import im1 from "../images/im1.jpg"
import im2 from "../images/im2.jpg"
import im3 from "../images/im3.jpg"
import im4 from "../images/im4.jpg"
export function SignIn(){
    const [first_name, set_first_name] = useState("")
    const [last_name, set_last_name] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [re_password, setre_password] = useState("")
    const [role, setRole] = useState("Select Role")
    const [Department, setDepartment] = useState("Select Department")
    const naveigate = useNavigate()
    return (<>
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
                            src={im3}
                            className="w-full"/>
                        <div
                            className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img
                            src={im4}
                            className="w-full"/>
                        <div
                            className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide2" className="btn btn-circle">❮</a>
                            <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        <img
                            src={im1}
                            className="w-full"/>
                        <div
                            className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide3" className="btn btn-circle">❮</a>
                            <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full w-[55%] flex flex-col items-center pt-[3%] ">
                <div
                    className=" w-full text-amber-50 text-5xl font-['Georgia'] font-normal  mt-[4%] flex justify-center mx-[2%] pb-[6%]">
                    Create an account
                </div>

                <div className="w-full flex justify-center gap-[3%] pb-[3%]">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="input input-bordered input-accent w-[40%] " onChange={(e)=>{
                            set_first_name(e.target.value)
                    }}/>
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="input input-bordered input-accent w-[40%]" onChange={(e)=>{
                            set_last_name(e.target.value)
                    }}/>
                </div>

                <div className="w-full flex justify-center pb-[3%]">
                    <input
                        type="email"
                        placeholder="Email"
                        className=" input input-bordered input-accent w-[83%] " onChange={(e)=>{
                            setemail(e.target.value)
                    }}/>
                </div>
                <div className="w-full flex justify-center pb-[3%]">
                    <input
                        type="password"
                        placeholder="Password"
                        className=" input input-bordered input-accent w-[83%] " onChange={(e)=>{
                            setpassword(e.target.value)
                    }}/>
                </div>
                <div className="w-full flex justify-center pb-[3%]">
                    <input
                        type="password"
                        placeholder="Re-type Password"
                        className=" input input-bordered input-accent w-[83%] " onChange={(e)=>{
                            setre_password(e.target.value)
                    }
                    }/>
                </div>
                <div className="pb-[3%] w-full flex  justify-center gap-[3%]">
                    <div className="dropdown w-[40%] flex justify-center">
                        <div tabIndex={1} role="button" className="btn m-1 w-full">{role}</div>
                        <ul tabIndex={1}
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow  ">
                            <li><Button onClick={() => {
                                setRole("Student")
                            }}>Student</Button></li>
                            <li><Button onClick={() => {
                                setRole("Teacher")
                            }}>Teacher</Button></li>
                        </ul>
                    </div>
                    <div className="dropdown w-[40%] flex justify-center">
                        <div tabIndex={0} role="button" className="btn m-1 w-full">{Department}</div>
                        <ul tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow  ">
                            <li><Button onClick={() => {
                                setDepartment("Computer Science and Engineering")
                            }}>Computer Science and Engineering</Button></li>
                            <li><Button onClick={() => {
                                setDepartment("Electronics Engineering")
                            }}>Electronics Engineering</Button></li>
                            <li><Button onClick={() => {
                                setDepartment("Chemical Engineering")
                            }}>Chemical Engineering</Button></li>
                            <li><Button onClick={() => {
                                setDepartment("Chemistry")
                            }}>Chemistry</Button></li>
                            <li><Button onClick={() => {
                                setDepartment("Physics")
                            }}>Physics</Button></li>
                            <li><Button onClick={() => {
                                setDepartment("Maths")
                            }}>Maths</Button></li>
                        </ul>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <button className="btn btn-active btn-accent w-[83%]"  onClick={(e)=>{

                        if(password === re_password && email!=="" && password!=="" && last_name!=="" && first_name!=="" && Department!=="" && role!==""){
                                createUserWithEmailAndPassword(auth,email, password)
                                .then(() => {
                                    var today = new Date();
                                    const date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`
                                    setDoc(doc(db, "users", email.toLowerCase()), {
                                        First_name:first_name.toLowerCase(),
                                        Last_name:last_name.toLowerCase(),
                                        Role:role.toLowerCase(),
                                        Date: [date],
                                        Department: Department.toLowerCase()
                                    })
                                    naveigate('/login')
                                })
                                 .catch((error) => {
                                    alert (error.message);
                                });
                            }
                            else {
                                alert("Form details are not correct")
                            }


                    }}>SIGN IN</button>
                </div>
                <div className="w-full flex justify-center pt-[4%]">Have an account?&nbsp;&nbsp; <NavLink
                    className="text-emerald-600 underline" to = "/login">Login</NavLink></div>
            </div>


        </div>

    </>);
}