import {NavLink} from "react-router-dom";

export function Home(){
    return(
        <>
          <div className="h-dvh w-dvw bg-neutral-900 flex justify-center items-center gap-[3%]">
            <NavLink to="/login" className="bg-emerald-500  hover:bg-emerald-700 text-3xl p-[1%] font-semibold text-white rounded">
                Login
            </NavLink>
              <NavLink to="/signin" className="bg-emerald-500  hover:bg-emerald-700 text-3xl p-[1%] font-semibold text-white rounded">Sign Up</NavLink>
          </div>
        </>
    )
}