import React from "react";



function EverydayFresh({post}) {
    const imageUrl = 'url(' + post.image + ')';
    return (
        <div style={{ backgroundImage: imageUrl,backgroundSize: 'cover'}} className="w-[405.33px] h-[244.48px] pl-[50px] pt-[48.94px] rounded-[10px] ml-[12px] text-left  font-medium text-gray-500 uppercase tracking-wider ring shadow-xl ring-gray-900/5 ">
        <h4 className="w-[202.92px] h-[100px] text-xl">{post.infomation} </h4>
        <button className="w-[103.61px] h-[31.59px] text-xs rounded-[4px]  text-white  bg-green-600 hover:bg-green-900">{post.time}</button>
  </div>
    )
}


function DetailPost() {
    const postData = [ 
        {
          infomation: "Everyday Fresh & Clean with Our Products",
          image:"https://s3-alpha-sig.figma.com/img/04f7/16d9/9245eacb0ea40bec876d1f6fef0f7a37?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uYMAcZcsY3T56jwvaEaSVR9a7tikINa0B2vlWbugoDpcsncZW9Tc2DMkEnS-027XpNKq-tldVLItRdkZw96DGjhPLvvDqE9wVoYFTdkqzhYvszsr9EarUPizNJHWDgSTsJLV7kCiQm~2890aQtOYcMqhZOQfyXgh4WSieetOlN2G3940bO4FXCEYiDAiu4qWeiX8JsKCHgD64ZGMQVb3cNANyHQmTy~l78a3Wf9FXB8345ABdpMBG2t81nqA2ZVz0s575h13Uoer4M7WULnKNegrf~oE6V0139567UIyRpWGqxtNqzatjsvdnwwNJSTojuFxAfqmADWFY4SQOWoizg__",
          time: 'Shop Now',
        },
        {
          infomation: "Make your Breakfast  Healthy and Easy",
          image:"https://s3-alpha-sig.figma.com/img/81e2/d2da/b3a741ea7f4d7cecc6d5315cb77be123?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qfYpzqbsSW5WquGYeWWwl0Uht2fPapMXbCRufRaB1q7aLYiZWQLR3d426aQyk-EOBy0SvMw6LrnYZyRpev2vsanXc5V8SaSZZfaJnELKWQZrqzZBgT~FCM0QxTFhltCJAdsiuLiuLBZnSl7T4n1ahvfIvRhDS-Y9eW~yL5enPMocdsaD~zqi1BFthj3irn67hWb~~cCoH5Co4q7qBuwf2TAzZt5sx3X5BIDUsedKhsc~NroGKTuJOu5BXUr-5DK2VU6wQokBQFBBgiemSlaqDy6yPC2KRXgTWGH5EdSRhCkiIwaDBfu9r8RnEvL0~AVCfS7CioQgrmdIjB5Abc~3TA__",
          time: 'Shop Now',
        },
        {
          infomation: "Everyday Fresh & Clean with Our Products",
          image:"https://s3-alpha-sig.figma.com/img/61b4/9bd5/b7fa6aea055c1b1a720c6a697bd7298a?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nYSg1twrkGC4cyYaXZjdbzqXd2NbBdCbQsnS0foXRwGN9bjTEf9kLnitiBbig2qb8xfNK4tA4HhIPzQPaPAtcDPXxsVOCA0UobC7TJhrEyip~v4rT10qw65NzxAMEJIbWHy~TyKw7p3~UNkWLQX-eebdMLpckeYFLizYocsWNcwsOw1L~ppno-Zj6vwNLta7ApNjhun~Tnx15Hf2nqReKSjpEGAk9wcHLOFEYa7mQq8xelWhfzUpANqHqh88pBGEr8rA82ZVOMohbn-bEn7zuAqpMOOcVgTQM~2HQarayFZ1FXzWhpFn4WOOZYmQMw6CG~X9yfGEJiJPo1U800Merw__",
          time: 'Shop Now',
        },
    ]
  
    return (
        <div className="ml-[200px] mt-10 grid grid-cols-3 gap-[4px] ">  
        {postData.map((post) => (
          <div  key={post.infomation} >
            <EverydayFresh post={post} />
          </div>
        ))}
      </div>
    );
  }

export default DetailPost;