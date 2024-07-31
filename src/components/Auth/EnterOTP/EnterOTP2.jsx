import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import closeBtn from '../../../images/closeBtn.jpg';

import css from './EnterOTP.module.css';
import axios from 'axios';



let EnterOTP2 = ({ setModal, setSignedIn = () => {}, setAuth = () => {}, type = 'login', email, mobile  }) => {
    const [emailCount, setEmailCount] = useState(60);
    const [emailOtp, setEmailOtp] = useState('');
    const [mobileOtp, setMobileOtp] = useState('');

    const SignupHandler = async (e) => {

        e.preventDefault();
        console.log(email, mobile, mobileOtp, emailOtp)
       

                try {
                    const response = await axios.post('https://cravess.createdinam.com/superadmin/api/v1/verify-registration-otp', {
                        email: email,
                        mobile: mobile,
                        mobile_otp: mobileOtp,
                        email_otp: emailOtp
                    });
        
                    console.log(response.data.status)
                    if (response.data.status) {
                        localStorage.setItem("auth", true);
                        setAuth(false);
                        setSignedIn(true);
                        setModal(false);
                        alert("Signed in successfully");
                        window.location.reload();
                    } else {
                        alert(response.data.message);
                        setEmailOtp('')
                        setMobileOtp('')
                    }
                    console.log('OTP received successfully:', response.data);
                } catch (error) {
                    console.error('Error sending OTP:', error);
                }
        

    };


    const resendEmailOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://cravess.createdinam.com/superadmin/api/v1/resend-registration-otp', {
                mobile: mobile,

            });
            console.log(response.data.status)
            if(response.data.status){
                alert("Otp Sent successfully")
                setEmailCount(60)
            }else{
                alert(response.data.message)
            }
            console.log('OTP received successfully:', response.data);
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    }


    useEffect(() => {
        if (emailCount <= 0 ) return;

        const emailInterval = emailCount > 0 && setInterval(() => {
            setEmailCount(val => val - 1);
        }, 1000);

       

        return () => {
            clearInterval(emailInterval);
            
        };
    }, [emailCount]);

    const domObj = (
        <div className={css.outerDiv}>
            <div className={css.innerDiv}>
                <div className={css.header}>
                    <div className={css.title}>Enter OTP</div>
                    <span className={css.closeBtn} onClick={() => setModal(false)}>
                        <img className={css.closeBtnImg} src={closeBtn} alt="close button" />
                    </span>
                </div>
                <div className={css.body}>
                    <div className={css.txt1}>OTP sent successfully</div>
                    <div className={css.OTPBox2}>
                        {type === 'signup' && (
                            <>
                                <div className={css.otpNumBox2}>
                                    <p>Mobile OTP</p>
                                    <input
                                        className={css.inpBox2}
                                        type="text"
                                        maxLength="6"
                                        value={mobileOtp}
                                        onChange={(e) => setMobileOtp(e.target.value)}
                                    />
                                </div><br /><br />
                                <div className={css.otpNumBox2}>
                                <p>Email OTP</p>
                                    <input
                                        className={css.inpBox2}
                                        type="text"
                                        maxLength="6"
                                        value={emailOtp}
                                        onChange={(e) => setEmailOtp(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <div onClick={(e) => SignupHandler(e)} className={css.okBtn2}>OK</div>
                    <div className={css.footerBox}>
                        <div className={css.time2}>OTP Time: {emailCount}</div>
                        <div className={css.footerTxt}>
                            Didn't receive OTP? <span className={css.resendTxt} onClick={(e) => resendEmailOtp(e)}>Resend Now</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(domObj, document.getElementById('modal'));
};

export default EnterOTP2;
