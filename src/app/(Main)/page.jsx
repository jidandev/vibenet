'use client'

import { Button } from "@/components/elemets/Button";
import CardComment from "@/components/fragments/CardComment";
import CardPost from "@/components/fragments/CardPost";
import CardReply from "@/components/fragments/CardReply";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowBackOutline, Close, EllipsisVertical, Heart, Send } from "react-ionicons";
import { useSelector, useDispatch } from 'react-redux';
import { addComment, addReply, addSubReply, likeComment, likeReply } from '../redux/features/commentSlice';
import { useTheme } from "next-themes";


const Home = () => {
    const [openComment, setOpenComment] = useState(false);
    const { post } = useSelector((state) => state.post);
    const [width, setWidth] = useState('100%'); // State untuk menyimpan lebar elemen utama
    const mainDivRef = useRef(null);
    //Komentar
    const comments = useSelector((state) => state.comments.comments);
    const dispatch = useDispatch();
    const [newComment, setNewComment] = useState('');
    const [replying, setReply] = useState({ text: '', commentId: null, parentId: null, username: "" });
    const [commentData, setCommentData] = useState(null);
    const [parentData, setParentData] = useState(null);
    const [isReply, setIsReply] = useState(false)
    const [postId, setPostId] = useState(0);
    const { theme, setTheme, systemTheme } = useTheme();
    

    // Mengambil lebar elemen utama ketika pertama kali render atau saat openComment berubah
    const updateWidth = () => {
        if (mainDivRef.current) {
          const mainDivWidth = (mainDivRef.current.offsetWidth / window.innerWidth) * 100;
          setWidth((mainDivWidth ) + '%');
        }
      };

    useEffect(() => {
        // Update lebar pertama kali saat openComment aktif
        if (openComment) {
          updateWidth();
        }
        
        // Event listener untuk menangani perubahan ukuran layar
        window.addEventListener('resize', updateWidth);
    
        // Cleanup saat component unmount atau openComment berubah
        return () => {
          window.removeEventListener('resize', updateWidth);
        };
      }, [openComment]);



    // Tentukan tema yang aktif saat ini
    const currentTheme = theme === 'system' ? systemTheme : theme;


    const handleAddComment = () => {
        const comment = {
        postId: postId,
        id: Date.now().toString(),
        text: newComment,
        username: "User",
        date: new Date().toLocaleDateString(),
        replies: [],
        likes: [],
        };
        dispatch(addComment(comment));
        setNewComment('');
     
    };
    
      const handleAddReply = () => {
        const replyData = {
        postId: postId,
          id: Date.now().toString(),
          text: replying.text,
          username: "User1",
          date: new Date().toLocaleDateString(),
          reply: replying.username,
          likes: [],
        };

       
    
        // Dispatch reply based on parent comment or reply
        dispatch(addReply({ commentId: replying.commentId, reply: replyData }));
        setReply({ text: '', commentId: null, parentId: null, username: "" });
        setCommentData(null);
        setParentData(null);
        setIsReply(false);
       
      };

      const handleAddSubReply = () => {
        const replyData = {
          postId: postId,
          id: Date.now().toString(),
          text: replying.text,
          username: "User1",
          date: new Date().toLocaleDateString(),
          reply: replying.username,
          likes: [],
        };

        
        console.log(replying)
        // Dispatch reply based on parent comment or reply
        dispatch(addSubReply({ commentId: replying.commentId, parentId: replying.parentId, reply: replyData }));
        setReply({ text: '', commentId: null, parentId: null , username: ""});
        setCommentData(null);
        setParentData(null);
        console.log(comments)
        
      };
    
      
    
    
      

    return (
        <div ref={mainDivRef} className="bg-white inter dark:bg-black h-screen relative overflow-y-auto w-full px-0 lg:px-0 flex flex-col">
            <div className=" bg-black "> {/* Menambahkan container di sini */}
            
            {post.map((item) => (
                <CardPost key={item.id}>
                    <CardPost.Header username={item.username}></CardPost.Header>
                    <CardPost.Body image={item.image}></CardPost.Body>
                    <CardPost.Footer iconColor={currentTheme == "dark" ? "white" : "black"} setPostId={setPostId} handleComment={setOpenComment} id={item.id} like={item.likes.length} username={item.username}>{item.caption}</CardPost.Footer>                
            </CardPost>
            ))}
            {openComment && (
                <div
                style={{ width}} // Mengatur lebar berdasarkan elemen utama
                className="fixed top-0 left-0 sm:left-auto  lg:left-auto h-screen bg-white dark:bg-black z-50 p-2 sm:p-6  overflow-y-auto"
                >
                    <div className="w-full h-12 bg-white dark:bg-black flex mt-1 ">
                        <h1 onClick={() => {setOpenComment(false); setPostId(0)}} className="w-8 h-8 cursor-pointer "><ArrowBackOutline style={{color: currentTheme == "dark" ? "white" : "black", width: "100%", height: "100%"}} /></h1>
                        <h2 onClick={() => console.log(comments)} className="text-lg font-semibold text-black dark:text-white mx-auto">Comments</h2>
                    </div>
                    
                    <div className="mt-4 mb-16">
                    { comments.filter((comment) => comment.postId == postId).map((comment) => (
                        <div key={comment.id} className="">
                            <CardComment>
                                <CardComment.Header id={comment.id} like={comment.likes.length} commentData={comment} image="/images.jpeg" username={comment.username} date={comment.date} />
                                <CardComment.Body>{comment.text}</CardComment.Body>
                                <CardComment.Footer>
                                <h2 onClick={() => {setReply({ ...replying, commentId: comment.id, username: comment.username }); setCommentData(comment); setIsReply(true);}} className="text-md font-medium ml-10 mt-1 text-gray-600 dark:text-gray-300 cursor-pointer">Reply</h2>
         
                                </CardComment.Footer>
                            </CardComment>
                            {comment.replies && comment.replies.map((reply) => (
                                <div key={reply.id} className="ml-6">
                                <CardReply>
                                    <CardReply.Header id={reply.id} pId={comment.id} like={reply.likes.length} replyData={reply} image="/images.jpeg" username={reply.username} date={reply.date} />
                                    <CardReply.Body reply={reply.reply}>
                                    {reply.text}
                                    </CardReply.Body>
                                    <CardReply.Footer>
                                    <h2 onClick={() => {setReply({ ...replying, commentId: reply.id, parentId: comment.id, username: reply.username}); setCommentData(reply); setParentData(comment)}} className="text-sm font-medium ml-16 mt-1 text-gray-600 dark:text-gray-300 cursor-pointer">Balas</h2>
                                    
                                    </CardReply.Footer>
                                </CardReply>

                                
                                </div>
                                    
                                ))}
                        </div>
                    ))}
                        
                        
                    </div>
                    <div style={{ width }} className="fixed  bottom-0 left-0 sm:left-auto md:left-auto lg:left-auto px-2 sm:pr-10  bg-white dark:bg-black flex flex-col">
                        {commentData !== null && (
                            <div className="flex">
                                <h2 className="text-md font-semibold ml-2 mb-1 text-black dark:text-gray-200">Membalas {commentData.username}</h2>
                                <h1 onClick={() => {setReply({text: "", commentId: null, parentId: null}); setCommentData(null); setParentData(null); setIsReply(false);}} className="h-5 w-5 mt-1 ml-1"><Close style={{fill: currentTheme == "dark" ? "white" : "black", width:"100%", height:"100%"}} /></h1>
                                
                            </div>
                        )} 
                        
                        <div className="flex w-full mb-2 ">
                            {replying.commentId === null && commentData === null && parentData === null && (
                                <>
                                    <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} name="comment" id="comment" placeholder="Isi komentar" className=" p-3 h-12 w-full rounded-lg bg-gray-500 text-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-0"></textarea>
                                    <div onClick={handleAddComment} className="bg-gray-500 dark:bg-gray-800 h-10 w-10 rounded-full py-2 px-[0.6rem] ml-2">
                                        <h1 className="w-6 h-6"><Send style={{fill: "white", width: "100%", height: "100%"}} /></h1>
                                    </div>
                                </>
                            )}
                            {commentData !== null && isReply && replying.commentId === commentData.id && replying.parentId === null && (
                                <>
                                    <textarea value={replying.text} onChange={(e) => setReply({ ...replying, text: e.target.value })} name="comment" id="comment" placeholder="Isi komentar" className=" p-3 h-12 w-full rounded-lg bg-white text-black dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-0"></textarea>
                                    <div onClick={handleAddReply} className="bg-gray-800 h-10 w-10 rounded-full py-2 px-[0.6rem] ml-2">
                                        <h1 className="w-6 h-6"><Send style={{fill: "white", width: "100%", height: "100%"}} /></h1>
                                    </div>
                                </>
                            )}
                            { commentData !== null && !isReply && replying.commentId === commentData.id && replying.parentId === parentData.id && (
                                <>
                                    <textarea value={replying.text} onChange={(e) => setReply({ ...replying, text: e.target.value })} name="comment" id="comment" placeholder="Isi komentar" className=" p-3 h-12 w-full rounded-lg bg-white text-black dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-0"></textarea>
                                    <div onClick={handleAddSubReply} className="bg-gray-800 h-10 w-10 rounded-full py-2 px-[0.6rem] ml-2">
                                        <h1 className="w-6 h-6"><Send style={{fill: "white", width: "100%", height: "100%"}} /></h1>
                                    </div>
                                </>
                            )}
                            
                            
                        </div>
                    </div>
                    
                </div>
            )}
            {post.length == 0 &&
                (
                   <>
                        <div className="w-full h-full flex justify-center items-center">
                            <h1 className="text-xl font-bold">Tidak ada postingan</h1>
                        </div>
                   </>
                )
            }
            </div>
        </div>
    )
}

export default Home;