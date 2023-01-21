import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import st from './UserProfile.module.css'
import { getUsersDetails } from '../../redux/actions.js'
import UserProfileEdit from './UserProfileEdit'
import { useAuth0 } from '@auth0/auth0-react'
import {
    ManageAccounts,
    AlternateEmail,
    Pin,
    CalendarMonth,
    Wc,
    Public,
    MyLocation,
    PhoneInTalk,
    AccountBox,
} from '@mui/icons-material'

export default function UserProfile() {

    const { userId } = useParams() //usar el mismo nombre de variable que en la ruta principal
    console.log('SOY EL USER ID: ', userId)
    const dispatch = useDispatch()

    const userInfo = useSelector((state) => state.usersDetails)
    console.log(userInfo)
  

    useEffect(() => {
        dispatch(getUsersDetails(userId))
    }, [])

    const [ editMode, setEditMode] = useState(false)

    let props = {}

    userInfo._id ? 
        props = {
            id: userInfo._id,
            fullName: userInfo.full_name,
            email: userInfo.email,
            image: userInfo.image,
            active: String(userInfo.active),
        }
    : console.log('Algo esta pasando')

    // console.log('SOY LAS PROPS: ', props)

    const changePage = () => {
        console.log('SOY EL EDIT MODE', editMode)
        editMode ?
        setEditMode(false) : setEditMode(true)
    }

    return (
        <div className={st.Container}>
            <h1 className='mt-6 text-center'> User Profile </h1>
            
            {!editMode ?
                <div className={st.userInfo}>

                    <div className={st.accountDetails}>
                        <h4>Account information</h4>
                        
                        <div className=' mt-4 flex justify-around'>

                            <div className={st.rightSide}>

                                <div className={st.userDetails}>
                                    <AccountBox className={st.userShowIcon} />
                                    <span className={st.userDetailsInfo}>
                                        Name: {props.fullName}
                                    </span>
                                </div>
                                <div className={st.userDetails}>
                                    <AlternateEmail className={st.userShowIcon} />
                                    <span className={st.userDetailsInfo}>
                                        Email: {props.email}
                                    </span>
                                </div>
                                <div className={st.userDetails}>
                                    <ManageAccounts className={st.userShowIcon} />
                                    <span className={st.userDetailsInfo}>
                                        Active: {props.active}
                                    </span>
                                </div>
                            </div> 

                            <div className={st.leftSide}>
                                <img src={props.image} alt="Profile Pict" className={st.userImg} />
                            </div>

                        </div>

                        <div className={st.editButton}>
                            <button 
                            className=' w-28 h-14 p-2 bg-slate-900 text-slate-50 rounded-lg flex justify-center items-center transition hover:bg-slate-50 hover:text-slate-900 hover:border-2 hover:border-slate-900'
                            name='edit' 
                            // ref={target}
                            onClick={changePage}>
                                Edit profile
                            </button>
                        </div>
                    </div>
                </div>
                :
                <div className={st.userEditCont}>
                    <UserProfileEdit changePage={changePage} editMode={editMode}/>
                </div>
            }
        </div>
    )
}
