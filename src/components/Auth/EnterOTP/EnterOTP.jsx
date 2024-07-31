import {useEffect, useState} from 'react';
import { createPortal } from 'react-dom'

import closeBtn from '../../../images/closeBtn.jpg';

import css from './EnterOTP.module.css'
import axios from 'axios';

let EnterOTP = ({setModal, setLoggedIn = () => {}, setAuth = () => {}, type = 'login', mobile}) => {

    let [count, setCount] = useState(60);
    let [otp, setOtp] = useState('');

    const loginHandler = async () => {
        console.log(mobile)
            try {
                const response = await axios.post('https://cravess.createdinam.com/superadmin/api/v1/verify-login-otp', {
                    mobile: mobile,
                    mobile_otp: otp
                });

                console.log(response.data.status)
                if(response.data.status){
                    localStorage.setItem("auth", true);
                    setAuth(false);
                    setModal(false); 
                    setLoggedIn(true);
                    alert("logged in successfully")
                } else {
                    alert(response.data.message)
                    setOtp('')
                }
            console.log('OTP received successfully:', response.data);
            } catch (error) {
                console.error('Error sending OTP:', error);
            }
        }



        const resendEmailOtp = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post('https://cravess.createdinam.com/superadmin/api/v1/login-otp-send', {
                    mobile: mobile,
    
                });
                console.log(response.data.status)
                if(response.data.status){
                    alert("Otp Sent successfully");
                    setCount(60);
                }else{
                    alert(response.data.message)
                }
                console.log('OTP received successfully:', response.data);
            } catch (error) {
                console.error('Error sending OTP:', error);
            }
        }

    useEffect(()=>{
        if (!count) return;

        let interval = setInterval(()=>{
            if(count > 0){
                setCount(val => val - 1);
            }
        }, [1000])
    
        return () => clearInterval(interval);

    }, [count])




    const domObj = <div className={css.outerDiv}>
        <div className={css.innerDiv}>
            <div className={css.header}>
                <div className={css.title}>Enter OTP</div>
                <span className={css.closeBtn} onClick={() => setModal(false)}>
                    <img className={css.closeBtnImg} src={closeBtn} alt="close button" />
                </span>
            </div>
            <div className={css.body}>
                <div className={css.txt1}>OTP send successfully</div>
                <div className={css.OTPBox}>
                    <div className={css.otpNumBox}>
                        <input className={css.inpBox} type="text" name="" id="" maxLength="6" value={otp}  onChange={(e) => setOtp(e.target.value)} />
                    </div>
                </div>
                <div onClick={loginHandler} className={css.okBtn}>OK</div>
                <div className={css.footerBox}>
                    <div className={css.time}>Time: {count}</div>
                    <div className={css.footerTxt}>Didn't receive OTP? <span className={css.resendTxt} onClick={(e) => resendEmailOtp(e)}>Resend Now</span></div>
                </div>
            </div>
        </div>
    </div>

    return createPortal(domObj, document.getElementById('modal'));
}

export default EnterOTP;