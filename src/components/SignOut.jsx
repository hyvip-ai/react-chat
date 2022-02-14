import React from 'react'
import { auth } from '../firebase_config/firebase'

function SignOut() {
  return (
    <button className='signOut' onClick={()=>{auth.signOut()}}>Sign Out</button>
  )
}

export default SignOut