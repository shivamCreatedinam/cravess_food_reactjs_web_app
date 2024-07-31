import { useState } from "react";
import { createPortal } from 'react-dom';

import gLogo from '../../../images/google.png';
import mailLogo from '../../../images/emailIcon.jpg';
import closeBtn from '../../../images/closeBtn.jpg';

import loginCss from './Login.module.css';

import EnterOTP from '../../Auth/EnterOTP/EnterOTP'
import EmailLogin from "./LoginwithEmail";

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from "axios";

const Login = ({ setAuth, setLoggedIn }) => {
    const [phone, setPhone] = useState('');
    const [otpModal, setOTPModal] = useState(false);
    const [openEmail, setOpenEmail] = useState(false)
    const handleSendOTP = async () => {
        if (phone?.length === 10) {
            console.log(phone)
            try {
                const response = await axios.post('https://cravess.createdinam.com/superadmin/api/v1/login-otp-send', {
                    mobile: phone
                });
                console.log('OTP sent successfully:', response.data);
                setOTPModal(true);
            } catch (error) {
                console.error('Error sending OTP:', error);
            }
        }
    };

    let loginDiv = !otpModal ? (
        <div className={loginCss.outerDiv}>
            <div className={loginCss.modal}>
                <div className={loginCss.header}>
                    <span className={loginCss.ttl}>Login</span>
                    <span className={loginCss.closeBtn} onClick={() => setAuth({ closed: true, login: false, signup: false })}>
                        <img className={loginCss.closeBtnImg} src={closeBtn} alt="close button" />
                    </span>
                </div>
                <div className={loginCss.lgBox}>
                    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
                        <input className={loginCss.phoneInp} type="tel" placeholder='Phone number ...' onChange={(e) => setPhone(e.target.value)} />

                        </div>
                    </div>
                    <button
                        className={phone?.length === 10 ? [loginCss.btn, loginCss.Sbtn].join(" ") : loginCss.btn}
                        onClick={handleSendOTP}
                    >
                        Send One Time Password
                    </button>
                </div>
                <div className={loginCss.orBreak}><span className={loginCss.orBreakText}>or</span></div>
                <div className={loginCss.socialSignupBox} onClick={(e) => {setOpenEmail(!openEmail)}}>
                    <img className={loginCss.icon} src={mailLogo}  alt="email signup" />
                    Continue with Email

                </div>
                <div className={loginCss.socialSignupBox}>
                    <img className={loginCss.icon} src={gLogo} alt="google signup" />
                    Continue with Google
                </div>
                <hr className={loginCss.break} />
                <div className={loginCss.newToCravess}>
                    New to Cravess? <div className={loginCss.createAcc} onClick={() => setAuth({ closed: false, login: false, signup: true })}>Create Account</div>
                </div>
            </div>

            {openEmail && (
                <EmailLogin setOpenEmail={setOpenEmail} setOTPModal={setOTPModal} setAuth={setAuth} />
            )}
        </div>

    ) : (
        
        <EnterOTP setModal={setOTPModal} setLoggedIn={setLoggedIn} setAuth={setAuth} mobile={phone}  type='login'/>
        
    );

    return createPortal(loginDiv, document.getElementById('modal'));
}

export default Login;
