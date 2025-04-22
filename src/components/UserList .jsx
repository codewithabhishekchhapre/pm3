import React, { useEffect, useState } from 'react';
// import { faEye } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Link } from 'react-router-dom';
// import DotLoader from './DotLoader';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core'
// library.add(faEye)
const UserList = () => {
    const [users, setNewUsers] = useState([])
    const [loding, setLoading] = useState(false)
    // console.log(users);
    useEffect(() => {
        const useDetails = async () => {
            const response = await axios.get("https://dummyjson.com/users")
            // console.log(response.data.users);
            setNewUsers(response.data.users)
            setLoading(true)
        }
        useDetails()
    }, [])
//     if (loding === false) {
//         return <DotLoader />
//     }
    return (
        <div className="p-6">
            <h1 className='font-bold text-2xl p-3 mt-7'>Users List!!</h1>
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                <table className="min-w-full table-auto text-sm text-left text-gray-700">
                    <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4">#</th>
                            <th className="px-6 py-4">Profile</th>
                            <th className="px-6 py-4">First Name</th>
                            <th className="px-6 py-4">Last Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Gender</th>
                            <th className="px-6 py-4">DOB</th>
                            <th className="px-6 py-4">City</th>
                            <th className="px-6 py-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((usrdata) => (
                                <tr className="border-b hover:bg-gray-100 transition-all duration-300">
                                    <td className="px-6 py-4">{usrdata.id}</td>
                                    <td className="px-6 py-4">
                                        <img className='w-[20%]' src={usrdata.image} alt="" />
                                    </td>
                                    <td className="px-6 py-4">{usrdata.firstName}</td>
                                    <td className="px-6 py-4">{usrdata.lastName}</td>
                                    <td className="px-6 py-4">{usrdata.email}</td>
                                    <td className="px-6 py-4">{usrdata.gender}</td>
                                    <td className="px-6 py-4">{usrdata.birthDate}</td>
                                    <td className="px-6 py-4">{usrdata.address.city}</td>
                                    <td className="px-6 py-4 text-center">
                                        <Link to={`/details/${usrdata.id}`}>
                                        <button className="text-blue-600 hover:text-blue-800 cursor-pointer">

                                             view
                                            {/* <FontAwesomeIcon icon="eye" /> */}
                                        </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default UserList;