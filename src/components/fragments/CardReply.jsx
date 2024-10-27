'use client'

import { likeReply } from "@/app/redux/features/commentSlice"
import Image from "next/image"
import { Heart } from "react-ionicons"
import { useDispatch } from "react-redux"

const CardReply = ({children}) => {
    return (
        <div className="w-full bg-black flex-col">
            {children}
        </div>
    )
}

const Header = ({image, username, date, like, id, pId, replyData}) => {
    const dispatch = useDispatch();
    const isLike = replyData.likes.includes(1);
    return (
        <div className="flex flex-row ml-10 justify-between">
            <div className="flex">
                <Image src={image} alt="Profile" width={500} height={500} className="w-6 h-6 rounded-full" />
                <h2 className="text-sm font-semibold ml-2 mt-1 text-white">{username}</h2>
                <h2 className="text-xs font-normal ml-1 mt-1 text-gray-300">{date}</h2>
            </div>
            <div className="flex flex-col items-center relative">
                <h1 onClick={() => dispatch(likeReply({id, pId}))} className="w-5 h-5 " ><Heart style={{fill: isLike ? "red" : "gray", width: "100%", height: "100%"}} /></h1>
                {like > 0 && <h1 className="text-xs text-gray-300 font-medium absolute mt-5">{like}</h1>}
            </div>
        </div>
    )
}

const Body = ({reply, children}) => {
    return (
        <h2 className="text-sm font-medium ml-16 mt-1 text-white"><h1 className="text-sky-200 inline mr-1">@{reply}</h1>{children}</h2>
    )
}

const Footer = ({children}) => {
    return (
        <>
        {children}
        </>
    )
}

CardReply.Header = Header;
CardReply.Body = Body;
CardReply.Footer = Footer;

export default CardReply;