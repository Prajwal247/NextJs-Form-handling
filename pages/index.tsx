import React from 'react'
import { useRouter } from 'next/router'

export default function index() {
    const router = useRouter();
    const toForm = () => {
        if (localStorage.getItem("isLoggedIn") === "true") {
            router.push("/DonationForm")
        }else{
            router.push("/login")
        }
    }
    
    return (
        <div className="text-center">
            <div className="header">
                <h2 className="p-4 mt-5">
                    Donate to Save Lives
                </h2>
                <p>
                    Thank you for your Decision to donate to the cause of saving lives.
                </p>
                <small> We need some information before we proceed, Please fill the eligibility form by Pressing the begin button</small>
            </div>
            <div>
                <button className="px-3 py-2 m-3 btn btn-primary" onClick={() => toForm()}>
                    Let's Start
                </button>
            </div>
        </div>
    )
}
