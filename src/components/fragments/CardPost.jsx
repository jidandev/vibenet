'use client'
import Image from "next/image"
import { useEffect, useState } from "react"
import { Chatbox, EllipsisVertical, Heart, Send } from "react-ionicons"
import { useSelector, useDispatch } from 'react-redux';
import {
  likePost,
} from '../../app/redux/features/postSlice';
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const CardPost = ({children}) => {
    
    return (
        <div className="flex flex-col w-full dark:bg-black bg-white">
            {children}
        </div>
    )
}

const Header = ({image = "/images.jpeg", username="unknown"}) => {
    const { theme } = useTheme();
  
    return(
        <div className="flex justify-between flex-row mt-2 ml-2 mb-2">
            <div className="flex">
                <Image src={image} alt="" width={500} height={500} className="h-10 w-10 rounded-full" />
                <h1 className="text-black text-md dark:text-white font-semibold mt-2 ml-2">{username}</h1>
            </div>
            <h1 className="w-6 h-6 mt-2"><EllipsisVertical style={{fill: theme == "light" ? "black" : "white", width: "100%", height: "100%"}}/></h1>
        </div>
    )
}

const Body = ({image = ""}) => {
    return(
        <div className="w-full h-48 sm:h-80 md:h-80 lg:h-72 xl:h-96 ">
            <Image src={image} alt="No Image" width={500} height={500} className="w-full h-full object-cover"/>
        </div>
    )
}

const Footer = ({like = 0, username="unknown", children="", id, handleComment, setPostId, iconColor}) => {
    const dispatch = useDispatch();
    const { post } = useSelector((state) => state.post);
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLike, setIsLike] = useState(false);
    
   

    //SET LIKE
    const handleLike = (id) => {
          dispatch(likePost(id));
    }

    // Potong teks jika panjangnya lebih dari 30 karakter
    const truncatedText = children.length > 200 ? children.slice(0, 200) + '...' : children;

    return(
        <>
            <ul className="flex flex-row w-full mt-2">
                <li className="w-8 h-8 ml-2" onClick={() => {setIsLike(!isLike); handleLike(id)}}><Heart style={{fill: isLike ? "red" : iconColor, width: "100%", height: "100%"}} /></li>
                <li onClick={() => {handleComment(true); setPostId(id)}} className="w-8 h-8 ml-4"><Chatbox style={{fill: iconColor, width: "100%", height: "100%"}} /></li>
                <li className="w-8 h-8 ml-4"><Send style={{fill: iconColor, width: "100%", height: "100%"}} /></li>
            </ul>
            <div>
                <strong className="text-black dark:text-white mt-1 ml-2">{like} suka</strong>
                <h1 className="text-black dark:text-white font-normal ml-2">
                <strong className="mr-1">{username}</strong>{isExpanded ? children : truncatedText}
                </h1>
                {children.length > 200 && (
        <button className="ml-2" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Tampilkan Lebih Sedikit' : 'Selengkapnya'}
        </button>
      )}
            </div>
        </>
    )
}

CardPost.Header = Header;
CardPost.Body = Body;
CardPost.Footer = Footer;

export default CardPost;