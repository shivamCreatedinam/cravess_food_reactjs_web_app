import { createPortal } from 'react-dom';
import { useState } from 'react';
import axios from 'axios';

import gLogo from '../../../images/google.png';
import mailLogo from '../../../images/emailIcon.jpg';
import closeBtn from '../../../images/closeBtn.jpg';

import signupCss from './Signup.module.css';
import EnterOTP2 from '../../Auth/EnterOTP/EnterOTP2'

let Signup = ({ setAuth, setSignedIn }) => {
    const [otpModal, setOTPModal] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);  // State for checkbox

    const handleSendOTP = async () => {
        console.log(password, confirmpassword)
        if (!name) {
            alert("The Name field is required");
        } else if (!email) {
            alert("The Email field is required");
        } else if (!mobile) {
            alert("The Mobile field is required");
        } else if (!password) {
            alert("The Password field is required");
        } else if (!confirmpassword) {
            alert("The Confirm Password field is required");
        } else if (!isChecked) {
            alert("You must agree to the terms and conditions");
        } else if (password !== confirmpassword) {
            alert("Password and Confirm Password do not match");
        } else {
            try {
                const response = await axios.post('https://cravess.createdinam.com/superadmin/api/v1/register', {
                    name: name,
                    email: email,
                    mobile: mobile,
                    password: password,
                    confirm_password: confirmpassword
                });
                if(response.data.status){
                setOTPModal(true);
            }
            console.log('OTP sent successfully:', response.data);
            } catch (error) {
                console.error('Error sending OTP:', error);
            }
        }
    };

    let signupDiv = otpModal ? (
        <EnterOTP2
            setModal={setOTPModal} // Function to toggle OTP modal visibility
            setSignedIn={setSignedIn}
            setAuth={setAuth}
            type='signup' // Pass 'signup' type to handle both OTPs
            email={email}
            mobile={mobile}
        />
    ) : (
        <div className={signupCss.outerDiv}>
            <div className={signupCss.modal}>
                <div className={signupCss.header}>
                    <span className={signupCss.ttl}>Signup</span>
                    <span className={signupCss.closeBtn} onClick={() => setAuth({ closed: true, login: false, signup: false })}>
                        <img className={signupCss.closeBtnImg} src={closeBtn} alt="close button" />
                    </span>
                </div>
                <div className={signupCss.lgBox}>
                    <input className={signupCss.inpBox} onChange={(e) => setName(e.target.value)} type="text" placeholder='Full Name ...' />
                    <input className={signupCss.inpBox} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email ...' />
                    <input className={signupCss.inpBox} onChange={(e) => setMobile(e.target.value)} type="number" placeholder='Mobile No. ' />
                    <input className={signupCss.inpBox} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password ...' />
                    <input className={signupCss.inpBox} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='Confirm Password ...' />
                    <span className={signupCss.termsTxt}>
                        <input 
                            type="checkbox" 
                            name="accept" 
                            id="accept" 
                            className={signupCss.checkBox} 
                            checked={isChecked} 
                            onChange={(e) => setIsChecked(e.target.checked)} 
                        />
                        <span>
                            I agree to Cravess's <a href="" className={signupCss.termaAnchor}>Terms of Service, Privacy Policy</a> and <a href="" className={signupCss.termaAnchor}>Content Policies</a>
                        </span>
                    </span>
                    <button className={signupCss.btn} onClick={handleSendOTP}>Create Account</button>
                </div>
                <div className={signupCss.orBreak}><span className={signupCss.orBreakText}>or</span></div>
                <div className={signupCss.socialSignupBox}>
                    <img className={signupCss.icon} src={gLogo} alt="google signup" />
                    Continue with Google
                </div>
                <hr className={signupCss.break} />
                <div className={signupCss.newToCravess}>
                    Already have an account? <div className={signupCss.createAcc} onClick={() => setAuth({ closed: false, login: true, signup: false })}>Log in</div>
                </div>
            </div>
        </div>
    );
    
    return createPortal(signupDiv, document.getElementById('modal'));
}

export default Signup;
