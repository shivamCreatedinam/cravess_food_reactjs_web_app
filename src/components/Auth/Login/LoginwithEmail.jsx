import { useState } from 'react';
import axios from 'axios';
import closeBtn from '../../../images/closeBtn.jpg';
import css from './Login.module.css'; // Assuming you have styles for this component

const EmailLogin = ({ setOpenEmail, setOTPModal, setAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openPhone, setOpenPhone] = useState(false)
    const [phone, setPhone] = useState('')
    const [openOtp, setOpenOTP] = useState(false)
    const [mobileOtp, setMobileOtp] = useState('')
    const [EmailOtp, setEmailOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [openPasswordChange, setOpenPasswordChange] = useState(false)
    const [token, setToken] = useState();

    const handleLogIn = async (e) => {
        e.preventDefault();
        console.log('clicked')
        if (!email) {
            alert("Please put a Valid Email")
        } else if (!password) {
            alert("Please put a Valid Password")
        } else {
            try {
                const response = await axios.post('https://cravess.createdinam.com/superadmin/api/v1/login-using-email', {
                    email: email,
                    password: password
                });
                if (response.data.status) {
                    console.log('OTP sent successfully:', response.data);
                    setOTPModal(true);
                    setOpenEmail(false);
                    localStorage.setItem("auth", true);
                    setAuth(false);
                    window.location.reload();
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error('Error sending OTP:', error);
            }
        }
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!phone) {
            alert("Please put a Valid Email")
        }
        else {
            try {
                const response = await axios.post('https://cravess.createdinam.com/superadmin/api/v1/forgot-password', {
                    mobile: phone,
                });
                if (response.data.status) {
                    console.log('OTP sent successfully:', response.data);
                    setOpenOTP(true);
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error('Error sending OTP:', error);
            }
        }
    };


    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (!phone) {
            alert("Please put a Valid Email")
        } else if (!mobileOtp) {
            alert("Please put a Valid Mobile OTP")
        } else if (!mobileOtp) {
            alert("Please put a Valid Email OTP")
        }
        else {
            try {
                const response = await axios.post('https://cravess.createdinam.com/superadmin/api/v1/verify-forgot-password-otp', {
                    mobile: phone,
                    mobile_otp: mobileOtp,
                    email_otp: EmailOtp
                });
                if (response.data.status) {
                    console.log('OTP sent successfully:', response.data);
                    // setOTPModal(true);
                    // setOpenEmail(false);
                    // localStorage.setItem("auth", true);
                    // setAuth(false);
                    // location.reload();
                    setToken(response.data.data.temp_token);
                    setOpenPhone(false)
                    setOpenPasswordChange(true)

                    alert('Verified, Please Change Your Password!');
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error('Error sending OTP:', error);
            }
        }
    };

    const handlePasswordUpdate = async (e) => {
        console.log(token)
        e.preventDefault();
        if (!newPassword) {
            alert("Please put a Valid New Password")
        } else if (!mobileOtp) {
            alert("Please put the Password again to Confirm it")
        } else if (newPassword !== confirmPassword) {
            alert("Both Password doesn't match.")
        }
        else {
            try {
                const response = await axios.post('https://cravess.createdinam.com/superadmin/api/v1/update-password', {
                    temp_token: token,
                    password: newPassword,
                    confirm_password: confirmPassword
                });
                if (response.data.status) {
                    console.log('OTP sent successfully:', response.data);
                    alert('Verified, Please Login Now');
                    setOpenEmail(false)

                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error('Error sending OTP:', error);
            }
        }
    };




    return (
        <div className={css.outerDiv}>
            <div className={css.modal2}>
                <div className={css.header}>
                    <span className={css.ttl2}>Email Login</span>
                    <span className={css.closeBtn} onClick={() => setOpenEmail(false)}>
                        <img className={css.closeBtnImg} src={closeBtn} alt="close button" />
                    </span>
                </div>
                <div className={css.inputfields}>
                    {openPhone ? (
                        <div>
                            <input className={css.inpBox} type="number" placeholder="Mobile No." maxLength="6" value={phone} onChange={(e) => setPhone(e.target.value)} />

                            {!openOtp && (<button className={css.btn2} onClick={(e) => { handleSendOTP(e) }}>
                                Get OTP
                            </button>)}

                            {openOtp && (
                                <div>
                                    <input className={css.inpBox} type="number" placeholder="Mobile OTP" maxLength="6" value={mobileOtp} onChange={(e) => setMobileOtp(e.target.value)} />
                                    <input className={css.inpBox} type="number" placeholder="Email OTP" maxLength="6" value={EmailOtp} onChange={(e) => setEmailOtp(e.target.value)} />
                                    <button className={css.btn2} onClick={(e) => { handleVerifyOTP(e) }}>
                                        Verify
                                    </button>
                                    <p className={css.para} onClick={(e) => { handleSendOTP(e) }} >Resend OTP</p>
                                </div>
                            )}

                        </div>
                    ) : (
                        <div>
                            {openPasswordChange ? (
                                <div>
                                    <input className={css.inpBox} type="password" placeholder="New Password" maxLength="" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                    <input className={css.inpBox} type="password" placeholder="Confirm Password" maxLength="" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    <button className={css.btn2} onClick={(e) => {handlePasswordUpdate(e)}}>
                                        Verify
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <input className={css.inpBox} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <input className={css.inpBox} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <button className={css.btn2} onClick={(e) => { handleLogIn(e) }}>
                                        Log In
                                    </button>
                                </div>

                            )}

                        </div>
                    )}
                </div>
                <a href='#' onClick={(e) => { setOpenPhone(!openPhone) }}>  {openPhone ? 'Log in With Email' : 'Forgot Password'}</a>
            </div>
        </div>
    );
};

export default EmailLogin;
