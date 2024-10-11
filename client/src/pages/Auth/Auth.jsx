import React from 'react'
import './Auth.css'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

const Auth = () => {
    return (
        <div className='auth-container'>
            <SignedOut>
                <SignInButton mode='modal' />
                <SignUpButton mode='modal' />
            </SignedOut>
            
        </div>
    )
}

export default Auth