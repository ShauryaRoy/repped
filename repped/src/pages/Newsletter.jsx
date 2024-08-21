import { useState } from 'react'
import Navbar from '../components/navbar'
import axios from 'axios';

import "../styles/pages/Newsletter.scss"

const Newsletter = () => {
    const [email, setEmail] = useState("")
    console.log(email)
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post("http://localhost:5000/subscribe", { email })
            setMessage(response.data.message);
            setEmail("")
        } catch (error) {
            setMessage("Error is:" + error)
        }
    }

    return (
        <>
            <Navbar />
            <section className='section_newsletter'>
                <div className="newsletter_container">
                    <h1>Sign Up for the journey of Repped</h1>
                    <p>Get the latest news and updates from Repped</p>
                    <form onSubmit={handleSubmit}>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                    {message && <p>{message}</p>}

                </div>
            </section>
        </>
    )
}

export default Newsletter