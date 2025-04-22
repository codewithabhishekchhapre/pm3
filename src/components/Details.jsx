import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

function Details() {

     const { id } = useParams();
     // const id=5
     console.log(id)

     const [data,setdata]=useState(null);

     useEffect(()=>{
          const fetchData=async()=>{
               const response=await axios.get(`https://dummyjson.com/users/${id}`)
               setdata(response.data);
              
               // setdata(user)
          }
          fetchData()
     },[])

     console.log(data)

     if (!data) return <p>No user data available.</p>;

     

     return (

          

          <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl font-sans">
               <div className="flex gap-6">
                    <img src={data.image} alt={data.firstName} className="w-32 h-32 rounded-full object-cover border" />
                    <div>
                         <h2 className="text-2xl font-bold">{data.firstName} {data.lastName}</h2>
                         <p className="text-gray-600 capitalize">{data.role}</p>
                         <p className="text-sm text-gray-500">{data.email}</p>
                         <p className="text-sm text-gray-500">{data.phone}</p>
                         <p className="text-sm text-gray-500">Username: {data.username}</p>
                    </div>
               </div>

               <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                         <h3 className="text-lg font-semibold mb-2">Personal Info</h3>
                         <p>Age: {data.age}</p>
                         <p>Gender: {data.gender}</p>
                         <p>Height: {data.height} cm</p>
                         <p>Weight: {data.weight} kg</p>
                         <p>Eye Color: {data.eyeColor}</p>
                         <p>Hair: {data.hair?.color} - {data.hair?.type}</p>
                         <p>Birth Date: {data.birthDate}</p>
                         <p>Blood Group: {data.bloodGroup}</p>
                         <p>University: {data.university}</p>
                    </div>

                    <div>
                         <h3 className="text-lg font-semibold mb-2">Address</h3>
                         <p>{data.address?.address}</p>
                         <p>{data.city}, {data.state} - {data.postalCode}</p>
                         <p>{data.country}</p>
                         <p>Coordinates: {data.coordinates?.lat}, {data.coordinates?.lng}</p>
                    </div>

                    <div>
                         <h3 className="text-lg font-semibold mb-2">Company</h3>
                         <p>Name: {data.company?.name}</p>
                         <p>Title: {data.company?.title}</p>
                         <p>Department: {data.company?.department}</p>
                    </div>

                    <div>
                         <h3 className="text-lg font-semibold mb-2">Bank Info</h3>
                         <p>Card Type: {data.bank?.cardType}</p>
                         <p>Card Number: {data.bank?.cardNumber}</p>
                         <p>Card Expiry: {data.bank?.cardExpire}</p>
                         <p>IBAN: {data.bank?.iban}</p>
                         <p>Currency: {data.bank?.currency}</p>
                    </div>

                    <div>
                         <h3 className="text-lg font-semibold mb-2">Crypto Wallet</h3>
                         <p>Coin: {data.crypto?.coin}</p>
                         <p>Wallet: {data.crypto?.wallet}</p>
                         <p>Network: {data.crypto?.network}</p>
                    </div>

                    <div>
                         <h3 className="text-lg font-semibold mb-2">Other Info</h3>
                         <p>IP: {data.ip}</p>
                         <p>MAC: {data.macAddress}</p>
                         <p>SSN: {data.ssn}</p>
                         <p>EIN: {data.ein}</p>
                         <p>Password: {data.password}</p>
                         <p>User Agent: {data.userAgent}</p>
                    </div>
               </div>
          </div>
     );
};
export default Details