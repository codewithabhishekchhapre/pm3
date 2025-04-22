import axios from "axios";
import { useEffect, useState } from "react";

const QuoteCard = () => {

     const [count, setcount] = useState(0)
     const [value, setvalue] = useState("user")
     const [data, setdata] = useState([])
     const [newdata,setnewdata]=useState(null);

     useEffect(() => {
          axios.get('https://dummyjson.com/posts')
               .then((res) => {
                    console.log(res.data.posts)
                    setdata(res.data.posts)
               })
     }, [])
     useEffect(() => {
          axios.get('https://dummyjson.com/posts/1')
               .then((res) => {
                    console.log(res.data)
                    setnewdata(res.data)
               })
     }, [])

// console.log(newdata[0].body)
     return (

          <>
<p>{newdata.body}</p>
               {
                    data.map(function (value) {
                         return (<>
                              <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-gray-200 hover:shadow-xl transition duration-300">
                                   <h2 className="text-2xl font-bold text-gray-800">{value.title}</h2>
                                   <p className="text-gray-600">{value.body}</p>

                                   <div className="flex flex-wrap gap-2 mt-2">
                                        {
                                             value.tags.map(function(tag){
                                                  return (<span
                                                       key={tag}
                                                       className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                                                  >
                                                       {tag}
                                                  </span>)
                                             })
                                        }
                                       
                                   </div>

                                   <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                                        <div className="flex gap-4">
                                             <span>👍 {value.reactions.likes}</span>
                                             <span>👎 {value.reactions.dislikes}</span>
                                        </div>
                                        <span>👁️ {value.views}</span>
                                   </div>
                              </div>
                         </>)
                    })
               }

          </>
     );
};

export default QuoteCard;
