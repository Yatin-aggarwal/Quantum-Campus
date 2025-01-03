import axios from 'axios';
import {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


export function Upload(){
    const [role, set_role] = useState(useSelector((state)=>{return state.Credential_reduce.role}))
    const [Email,set_email] = useState(useSelector((state)=>{return state.Credential_reduce.email}))
    const [department, set_department]=  useState(useSelector((state)=>{return state.Credential_reduce.department}))
    const [Date, set_date] = useState(useSelector((state)=>{return state.Credential_reduce.date.toReversed()}))
    const [file, set_file ] = useState()
    const [name, set_name] = useState("")
    const navigate = useNavigate()
    const [response, set_response] = useState(false)
    const formSubmit = async (e)=>{
            e.preventDefault();
            const Form = new FormData();
            Form.append("file",file)
            const email = Email
            const dept = department
            const book_name = name
            const result = await axios.post(`/uploadfile/?Department=${dept}&Email=${email}&Book_Name=${name}`, Form,{headers:{
                "Content-Type":"multipart/form-data"
                }})

    }
    return(<>
        <form className="  bg-neutral-900 " onSubmit={formSubmit}>
            <div className="w-dvw h-dvh  flex flex-col justify-end items-center pb-[2%] gap-[2%]">
                <div className="h-full w-full self-start bg-neutral-900">

                </div>
                <div className="w-full flex justify-center gap-[2%]">
                <button
                    className="bg-emerald-500 h-[37px] w-[37px] text-white text-2xl rounded-full flex justify-center font-extrabold" onClick={()=>{
                        navigate(`/chat/${Email}/${Date[0]}`)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32}
                         color={"#000000"} fill={"none"}>
                        <path
                            d="M19 16V14C19 11.1716 19 9.75736 18.1213 8.87868C17.2426 8 15.8284 8 13 8H11C8.17157 8 6.75736 8 5.87868 8.87868C5 9.75736 5 11.1716 5 14V16C5 18.8284 5 20.2426 5.87868 21.1213C6.75736 22 8.17157 22 11 22H13C15.8284 22 17.2426 22 18.1213 21.1213C19 20.2426 19 18.8284 19 16Z"
                            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                        <path
                            d="M19 18C20.4142 18 21.1213 18 21.5607 17.5607C22 17.1213 22 16.4142 22 15C22 13.5858 22 12.8787 21.5607 12.4393C21.1213 12 20.4142 12 19 12"
                            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                        <path
                            d="M5 18C3.58579 18 2.87868 18 2.43934 17.5607C2 17.1213 2 16.4142 2 15C2 13.5858 2 12.8787 2.43934 12.4393C2.87868 12 3.58579 12 5 12"
                            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                        <path
                            d="M13.5 3.5C13.5 4.32843 12.8284 5 12 5C11.1716 5 10.5 4.32843 10.5 3.5C10.5 2.67157 11.1716 2 12 2C12.8284 2 13.5 2.67157 13.5 3.5Z"
                            stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M12 5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M9 13V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M15 13V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M10 17.5C10 17.5 10.6667 18 12 18C13.3333 18 14 17.5 14 17.5" stroke="currentColor"
                              strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </button>
                <div className="bg-neutral-900">
                    <input type="file" placeholder="input"
                           className="form-control bg-emerald-700 text-white rounded text-lg" accept="application/pdf"
                            onChange={(e) => {
                        set_file(e.target.files[0])
                        set_name(e.target.files[0].name)
                    }}/>
                </div>
                <div
                    className="bg-emerald-500 h-[37px] w-[37px] text-white text-2xl rounded-full flex justify-center font-extrabold items-center pb-[2px]">
                    <button type="submit" onClick={()=>{
                        alert("File Submitted")
                    }}>
                        {">"}
                    </button>
                </div>
                </div>
            </div>
        </form>


    </>)
}