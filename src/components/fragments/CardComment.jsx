'use client'

import { likeComment } from "@/app/redux/features/commentSlice"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Heart } from "react-ionicons"
import { useDispatch } from "react-redux"

const CardComment = ({children}) => {
    return (
        <div className="w-full bg-white dark:bg-black flex-col mb-2">
            {children}
        </div>
    )
}

const Header = ({image, username, date, like, id, commentData}) => {
    const Dispatch = useDispatch();
    const isLike = commentData.likes.includes(1);
    return (
        <div className="flex flex-row justify-between">
            <div className="flex">
                <Image src={image} alt="profile" width={500} height={500} className="w-8 h-8 rounded-full" />
                <h2 className="text-md font-semibold ml-2 mt-1 text-black dark:text-white">{username}</h2>
                <h2 className="text-xs font-medium ml-1 mt-2 text-gray-600 dark:text-gray-300">{date}</h2>
            </div>
            <div className="flex flex-col items-center relative">
                <h1 onClick={() => Dispatch(likeComment(id))} className="w-6 h-6 " ><Heart style={{fill: isLike ? "red" : "gray", width: "100%", height: "100%"}} /></h1>
                {like > 0 && <h1 className="text-sm text-gray-600 dark:text-gray-300 font-medium absolute mt-5">{like}</h1>}
            </div>
            
        </div>
    )
}

const Body = ({children}) => {
    return (
        <h2 className="text-md font-medium ml-10 text-black dark:text-white">{children}</h2>
    )
}

const Footer = ({children}) => {
    return (
        <>
        {children}
        </>
    )
}

CardComment.Header = Header;
CardComment.Body = Body;
CardComment.Footer = Footer;

export default CardComment;