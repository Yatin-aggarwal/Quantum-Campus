
export function Loader(){

    return (
        <>
            <div className=" h-dvh w-dvh flex justify-center items-center text-emerald-600 bg-neutral-900">
                <div
                    className=" absolute  rotate- h-[300px] w-[300px]  border-x-neutral-800 border-y-neutral-800 animate-spin border-[15px]  rounded-full flex justify-center items-center py-[200px] pt-[200px]"></div>
                <div
                    className=" p-[8px] absolute rotate-90 h-[300px] w-[300px]  border-x-neutral-800 border-y-neutral-800 animate-spin border-[15px]  rounded-full flex justify-center items-center py-[200px] pt-[200px]"></div>
                <div
                    className="absolute h-[210px] w-[210px]  rounded-full flex justify-center items-center text-white font-semibold text-3xl  bg-neutral-900 animate-pulse  "> Loading&nbsp;...
                </div>
            </div>

        </>
    )
}

export function Loader_chat(){

    return (
        <>
            <div className=" h-full w-full flex justify-center items-center text-emerald-600 bg-neutral-900">
                <div
                    className=" absolute  rotate- h-[300px] w-[300px] border-b-emerald-700  border-x-neutral-800 border-y-neutral-800 animate-spin border-[15px]  rounded-full flex justify-center items-center "></div>

                <div
                    className="absolute h-[210px] w-[210px]  rounded-full flex justify-center items-center text-white font-semibold text-3xl  bg-neutral-900 animate-pulse  "> Loading&nbsp;...
                </div>
            </div>

        </>
    )
}