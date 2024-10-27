'use client'

import { Button } from "@/components/elemets/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowBackOutline } from "react-ionicons";
import { useSelector, useDispatch } from 'react-redux';
import {
  addPost,
} from '../../redux/features/postSlice';
import Image from "next/image";

const Home = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { post } = useSelector((state) => state.post);
    const [image, setImage] = useState(""); // State untuk menyimpan gambar

    useEffect(() => {
        // Akses localStorage hanya di sini
        const savedImage = localStorage.getItem("image");
        if (savedImage) {
            setImage(savedImage);
        } else {
            setImage("/images.jpeg");
        }
    }, []); // Hanya dijalankan saat komponen dimount

    const handlePost = async (e) => {
        e.preventDefault();
        let caption = e.target.caption.value;
        dispatch(addPost({
            id: Date.now().toString(),
            username: "jidann_.0",
            image,
            caption,
            likes: [],
        }))
        router.push("/")
    }
    return (
        <form onSubmit={handlePost} className="bg-black h-screen overflow-y-auto w-full flex flex-col">
            <div className="w-full h-12 flex flex-row pt-2 justify-between">
                <div className="flex flex-row">
                    <h1 onClick={() => router.push("/")} className="w-8 h-8 cursor-pointer"><ArrowBackOutline style={{color: "white", width: "100%", height: "100%"}} /></h1>
                    <h1 className="text-black font-semibold ml-3 mt-1 dark:text-white">Postingan Baru</h1>
                </div>
                <button type="submit">
                    <h1 className="text-blue-600 font-semibold ml-3 mt-1 cursor-pointer">Bagikan</h1>
                </button>
            </div>
            <Image src={image} alt="" width={500} height={500} className="w-full h-96 object-cover"/>
            <textarea name="caption" id="caption" placeholder="Isi caption" className="p-2 w-full h-full bg-white text-black dark:bg-black dark:text-white focus:outline-none focus:ring-0"></textarea>
        </form>
    )
}

export default Home;