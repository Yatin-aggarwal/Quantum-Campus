import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {NavLink, useLoaderData, useNavigate, useNavigation, useParams} from "react-router-dom";
import {Loader, Loader_chat} from "./Loader.jsx";
import axios from "axios";


function Ai(props){
    return (
        <div className="w-full px-[4%] py-[1%] mb-[2%] font-medium  flex">
            <div className=" w-[43px]  h-[43px] bg-white flex items-center justify-center rounded-3xl">
                    {
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
                    }
            </div>
            <div className=" pl-[1%]">{props.content}</div>

        </div>
    )
}

function Human(props) {
    return (
        <div className="w-full flex justify-end pr-[3%] pb-[1%] ">
            <div className="flex w-[60%] bg-[#424242] rounded-xl p-[1%]">
                {props.content}
            </div>

        </div>
    )
}
function Date_add(props){
    return(
        <NavLink   className={({isActive}) => `${isActive ? "text-emerald-700" : "text-white"}  w-full flex justify-center h-[6%] border-y items-center` }  to={`/chat/${props.email}/${props.content}`}>
            {props.content}
        </NavLink>
    )
}

export function Chat_page() {
    let  {date} = useParams()
    const [email,set_email] = useState(useSelector((state)=>{return state.Credential_reduce.email}))
    const [Date, set_date] = useState(useSelector((state)=>{return state.Credential_reduce.date.toReversed()}))
    const [department, set_department]=  useState(useSelector((state)=>{return state.Credential_reduce.department}))
    const [text, set_text]= useState([])
    const [data, set_data]= useState([])
    const [role, set_role] = useState(useSelector((state)=>{return state.Credential_reduce.role}))
    const [Input, Set_input] = useState("")
    const navigate = useNavigate();
    const [loading , set_loading] = useState(false)
    const t = useLoaderData();
        useEffect(()=>{
        let result = axios.get("/query_chat", {
                                        params:{
                                                         Query:"",Department:department ,Key:`${email}_${date}`,Email:email
                                                 },
                                            headers:{

                                        Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lIjoicGF5bG9hZCJ9.4twFt5NiznN84AWoo1d7KO1T_yoc0Z6XOpOVswacPZg"
                                }
                                    })
                                result.then((e)=>{
                                set_text(e.data.reverse())
                                })
    },[date])

    useEffect(()=>{
            set_text(data)
            set_loading(false)
    },[data])
    return (
        <>

            <div className="w-full h-dvh bg-neutral-900 flex flex-row text-amber-50 ">
                <div className=" w-1/5  bg-black h-full overflow-y-scroll">
                    { Date.map((date)=>{return <><Date_add content={date} email = {email}/></>})}
                </div>
                <div className="w-4/5 flex flex-col pt-[2%]">
                    <div
                        className="h-[80%] overflow-y-scroll  scrollbar scrollbar-thumb-pink-500 scrollbar-track-gray-100 ">
                        {loading && <Loader_chat/>}
                        {loading === false && text.map((data)=>{return <>
                            <Human content = {data['Human']}/>
                        <Ai content = {data['AI']}/>
                        </>
                        })}
                    </div>
                    <div className=" h-[20%] pt-[2%] flex justify-center">
                        <button
                            className="bg-emerald-500 rounded-full h-[40%] w-[4%] mx-[2%] mt-[2%] flex justify-center items-center  hover:bg-emerald-700"
                            onClick={() => {
                                navigate(`/upload/${department}`)
                            }}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
                            </svg>

                        </button>
                        <div className="h-2/3 w-3/4 flex  border border-amber-50 rounded-2xl content-start ">
                            <textarea value={Input} onChange={(e) => {
                                Set_input(e.target.value)

                            }} className="m-[1%] w-[100%] bg-neutral-900 px-0.5  break-words   outline-0 resize-none"/>
                        </div>
                        <button
                            className="bg-emerald-500 rounded-full h-[40%] w-[4%] mx-[2%] mt-[2%] flex justify-center items-center pr-1 pt-1 hover:bg-emerald-700"
                            onClick={ () => {
                                    set_loading(true)
                                    console.log(Input)

                                     const fun = async ()=>{
                                         let result = await axios.get("/query_chat", {
                                        params:{
                                                         Query:Input,Department:department ,Key:`${email}_${date}`,Email:email
                                                 },
                                            headers:{

                                        Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lIjoicGF5bG9hZCJ9.4twFt5NiznN84AWoo1d7KO1T_yoc0Z6XOpOVswacPZg"
                                            }
                                    })
                                          set_data(result.data.reverse())
                                }
                                fun()
                                Set_input("")
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"
                                 color="#ffffff" fill="none">
                                <path
                                    d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z"
                                    stroke="currentColor" stroke-width="1.5"/>
                                <path d="M11.5 12.5L15 9" stroke="currentColor" stroke-width="1.5"
                                      stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    )
}