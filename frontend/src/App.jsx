import {
    BrowserRouter, createBrowserRouter, createRoutesFromElements, Outlet,
    Route, RouterProvider,
    Routes, useNavigate
} from "react-router-dom";
import {Chat_page} from "./Chat.jsx";
import {SignIn} from "./signin.jsx";
import {Login} from "./login.jsx";
import {Routing} from "./Route.jsx";
import {app, Use_firebase} from "./Context.jsx";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";

import retrive from "./Components/Data.js";
import {add_data} from "./features/Credentials_slice.js";
import {useDispatch, useSelector} from "react-redux";
import {Loader} from "./Loader.jsx";
import {Error} from "./Error.jsx";
import {Upload} from "./Upload.jsx";
import {Home} from "./home.jsx";
const auth = getAuth(app)



function App() {

    const [logged, setLogged] = useState(false)
    const [User, setUser] = useState()
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user)
                setLogged(true)
            }
            else{
                setLogged(false)
            }
        })
    })
    const Firebase = Use_firebase()
    const [role,set_role] = useState(useSelector((state)=>{return state.Credential_reduce.role}))
    const dispatch = useDispatch()

    const router = createBrowserRouter(
       createRoutesFromElements(
    <Route path='/' element={<Routing />}>
            <Route path = '' element={<Home/>}/>
            <Route path='login' element={<Login />}/>
            <Route path='signin' element={<SignIn />}/>
            {User === undefined && logged === false && <Route path="*" element={<Loader/>} /> }
            {logged &&  <Route path='chat' element={<Outlet />} loader={async (params)=>{
                const Key =await  (async ()=>{
                         const token = await Firebase.Get_token(User)
                                       const key = await retrive(params.params.email)
                                        key['Email'] = params.params.email
                                        key['Token'] = token
                                        return key

                     })();
                    dispatch(add_data(Key))
                    return "";
                 }}>
                     <Route path=":email/:date" element={<Chat_page/>}/>
                 </Route>}
        { logged && <Route path={"upload/:dept"} element={<Upload/>}/>}
        <Route path = "*" element={<Error/>}/>
        </Route>
  )
);
    return(
        <RouterProvider router={router}/>
    )
}

export default App
