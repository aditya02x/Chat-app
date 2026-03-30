import React, { useEffect } from 'react'
import useChatStore from '../Store/useChatStore'





const Sidebar = () => {

  const {users,getUsers ,selectedUser,setSelectedUser} = useChatStore()

  useEffect(()=>{
    getUsers()
  },[])
  return (
<div className='w-1/3 bg-[#082E55] h-screen text-white p-4 flex flex-col gap-3'>
            <h1 className='text-2xl font-bold mb-4'>Chats</h1>

            {users.map((user) => (
                <div
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className={`flex items-center gap-3 p-3 rounded cursor-pointer hover:bg-blue-800
                    ${selectedUser?._id === user._id ? 'bg-blue-800' : ''}`}
                >
                    <div className='w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center font-bold'>
                        {user.fullname[0].toUpperCase()}
                    </div>
                    <p className='text-lg'>{user.fullname}</p>
                </div>
            ))}
        </div>
  )
}

export default Sidebar
