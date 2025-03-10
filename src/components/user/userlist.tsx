import React from "react";
import { useQuery } from "@tanstack/react-query";
import * as api from "../../redux/api/axios";



function UserList() {
    const { data, isPending, error } = useQuery({
        queryKey: ["users"],
        queryFn: () => api.getuser(),
      });

    console.log('data :',data)
    
    if (error) {
        return <p>Error loading posts: {error.message}</p>;
    };

    const Skeleton = () => (
        <div className="animate-pulse">
            {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg bg-white">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
            ))}
        </div>
    );
    return (
        <div>
            <p className="text-4xl font-bold text-gray-800"> List User</p>
            <section>
                {isPending ? (
                    <Skeleton/>
                ) : 
                    data.map((post: { id: number; img: string;name:string; email:string }) =>(
                        <div 
                        key={post.id}
                        className="mx-4 my-4 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex p-4 "
                        style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        }}>
                            <div className="flex ">
                                <img 
                                src={post.img}
                                className="h-[64px] w-[64px] mx-4 my-4 object-cover rounded-full"
                                />
                                <div className="ml-4 mt-4 flex flex-col">
                                    <div className="text-left">{post.name}</div>
                                    <div className="text-left">{post.email}</div>
                                </div>
                            </div>
                        </div>
                    ))
                
                }
            </section>
        </div>
    )

}

export default UserList;