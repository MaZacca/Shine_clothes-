import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cloudinary from '../Cloudinary/Cloudinary';
import st from './UserProfileEdit.module.css'
import { editUser } from '../../redux/actions';
import { useAuth0 } from '@auth0/auth0-react';

export default function UserEdit({changePage}) {

    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.usersDetails)

    let info = {}

    userInfo._id ?
        info = {
            id: userInfo._id,
            fullName: userInfo.full_name,
            email: userInfo.email,
            image: userInfo.image,
            active: String(userInfo.active),
        }
    : console.log('Algo esta pasando')
    // console.log('SOY LA INFOOO: ', info)

    const [input, setInput] = useState({})

    // const [nav, setNav] = useState(false)

    useEffect(()=>{
        userInfo._id?
        setInput({    
            ...userInfo
        })
        : console.log('Algo esta pasando en el useEffect')
    }, [])

    // console.log('SOY EL INPUT: ', input)

    const handleChange = (e) => {
        e.preventDefault()
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        if (e.target.name === 'update') {
            dispatch(editUser(info.id, input))
            // setNav(true)
            window.location.reload(true)
            changePage()
        }
    }


    return (
        <div className={st.userUpdate}>
            <h4 className=' text-center mb-10'>Edit profile</h4>
            <form onSubmit={handleUpdate} className={st.userUpdateForm}>

                <div className={st.userUpdateUpload}>
                    <img
                        className={st.userUpdateImg}
                        src={info.image}
                        alt="Profile Pic"
                    />
                    <label htmlFor="file">
                        <Cloudinary
                        setEditInput={setInput}
                        editInput={input}
                    /> 
                    </label>
                    <input
                        name="image"
                        type="file"
                        id="file"
                        style={{ display: 'none' }}
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className={st.userInputs}>
                    <div className={st.userUpdateItem}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder={info.fullName}
                            className={st.userUpdateInput}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={st.userUpdateItem}>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder={info.email}
                            className={st.userUpdateInput}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
                <div className=' flex justify-around'>
                    <button
                        onClick={changePage}
                        className=' w-28 h-14 p-2 font-medium bg-slate-900 text-slate-50 rounded-lg flex justify-center items-center transition hover:bg-slate-50 hover:text-slate-900 hover:border-2 hover:border-slate-900'
                        >
                        {"<<--- Back"}
                    </button>
                    <button
                        name="update"
                        onClick={handleUpdate}
                        className=' w-28 h-14 p-2 font-medium bg-slate-900 text-slate-50 rounded-lg flex justify-center items-center transition hover:bg-slate-50 hover:text-slate-900 hover:border-2 hover:border-slate-900'
                        >
                        Update
                    </button>
                </div>
            </form>

            {/* {nav ? <Navigate to={`/profile/${info.id}`} /> : null} */}
        </div>
    )
}
