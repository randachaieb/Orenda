import React from 'react'
import './ContactUs.css'

import {FaFacebook , FaInstagram , FaGoogle , FaTwitter} from 'react-icons/fa'


function ContactUs() {
    return (
            <div className="contact-wrap">
                        <div className="contact-in">
                            <h1>Contact Info</h1>
                            <h2><i className="fa fa-phone" aria-hidden="true"></i> Phone</h2>
                            <p>123-456-789</p>
                            <h2><i className="fa fa-envelope" aria-hidden="true"></i> Email</h2>
                            <p>info@democompany.com</p>
                            <h2><i className="fa fa-map-marker" aria-hidden="true"></i> Address</h2>
                            <p>Vasant Vihar, Delhi, India</p>
                            <ul>
                                <li><a href="#"><FaFacebook size={20}  color={'blue'} /></a></li>
                                <li><a href="#"><FaInstagram size={21} color={'brown'}  /></a></li>
                                <li><a href="#"><FaGoogle size={21}    color={'brown'} /></a></li>
                                <li><a href="#"><FaTwitter size={21}   color={''} /></a></li>
                            </ul>
                        </div>
                        <div className="contact-in">
                            <h1>Send a Message</h1>
                            <form>
                                <input type="text" placeholder="Full Name" className="contact-in-input" /> 
                                <input type="text" placeholder="Email" className="contact-in-input" />
                                <input type="text" placeholder="Subject" className="contact-in-input" />
                                <textarea placeholder="Message" className="contact-in-textarea"></textarea>
                                <input type="submit" value="SUBMIT" className="contact-in-btn" />
                            </form>
                        </div>
            </div>
    )
}

export default ContactUs
