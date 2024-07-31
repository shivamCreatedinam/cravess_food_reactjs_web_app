import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './RestaurantRegistration.css';

export const RestaurantRegistration = () => {
  const [verify, setVerify] = useState(false);
  const [token, setToken] = useState('');
  const [mobile, setMobile] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [otpExpired, setOtpExpired] = useState(false);

  useEffect(() => {
    let countdown;
    if (verify && timer > 0) {
      countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setOtpExpired(true);
    }
    return () => clearInterval(countdown);
  }, [verify, timer]);

  const handleResendOtp = () => {
    axios.post('https://cravess.createdinam.com/superadmin/api/v1/store/resend-registration-otp', { contact: mobile })
      .then(response => {
        console.log('OTP resent successfully:', response.data);
        setTimer(300); // Reset timer
        setOtpExpired(false);
        setToken(response.data.data.emp_token)
      })
      .catch(error => {
        console.error('There was an error resending the OTP:', error);
      });
  };

  const initialValues = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirm_password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    mobile: Yup.string().required('Mobile number is required'),
    mobile: Yup.string().length(10).required('Mobile number must be 10 numbers'),
    password: Yup.string().required('Password is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    axios.post('https://cravess.createdinam.com/superadmin/api/v1/store/register', values)
      .then(response => {
        console.log('Form submitted successfully:', response.data);
        if(response.data.status){
        // setSubmitting(false);
        setVerify(true);
        }
      })
      .catch(error => {
        console.error('There was an error submitting the form:', error);
        // setSubmitting(false);
      });
  };

  const initialValues2 = {
    temp_token: token,
    mobile_otp: '',
    email_otp: '',
  };

  const validationSchema2 = Yup.object({
    mobile_otp: Yup.string().required('Mobile OTP is required'),
    email_otp: Yup.string().required('Email OTP is required'),
  });

  const onSubmit2 = (values, { setSubmitting }) => {
    axios.post('https://cravess.createdinam.com/superadmin/api/v1/store/verify-registration-otp', values)
      .then(response => {
        console.log('Verification successful:', response.data);
        
      })
      .catch(error => {
        console.error('There was an error verifying the OTP:', error);
       
      });
  };

  return (
    <div className='main'>
      {!verify ? (
        <div className="register-form">
          <h1>Register</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-control">
                  <label htmlFor="name">Name</label>
                  <Field type="text" id="name" name="name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>

                <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>

                <div className="form-control">
                  <label htmlFor="mobile">Mobile</label>
                  <Field type="text" id="mobile" name="mobile" onChange={(e) => setMobile(e.target.value)}/>
                  <ErrorMessage name="mobile" component="div" className="error" />
                </div>

                <div className="form-control">
                  <label htmlFor="password">Password</label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage name="password" component="div" className="error" />
                </div>

                <div className="form-control">
                  <label htmlFor="confirm_password">Confirm Password</label>
                  <Field type="password" id="confirm_password" name="confirm_password" />
                  <ErrorMessage name="confirm_password" component="div" className="error" />
                </div>

                <button type="submit" disabled={isSubmitting}>Register</button>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div className="register-form">
          <h1>Verify OTP</h1>
          <p>{`Time remaining: ${Math.floor(timer / 60)}:${timer % 60}`}</p>
          {otpExpired && (
            <div>
              <p>OTP expired. Please click the button below to resend OTP.</p>
              <button onClick={handleResendOtp}>Resend OTP</button>
            </div>
          )}
          <Formik
            initialValues={initialValues2}
            validationSchema={validationSchema2}
            onSubmit={onSubmit2}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-control">
                  <label htmlFor="mobile_otp">Mobile OTP</label>
                  <Field type="text" id="mobile_otp" name="mobile_otp" />
                  <ErrorMessage name="mobile_otp" component="div" className="error" />
                </div>

                <div className="form-control">
                  <label htmlFor="email_otp">Email OTP</label>
                  <Field type="text" id="email_otp" name="email_otp" />
                  <ErrorMessage name="email_otp" component="div" className="error" />
                </div>

                <button type="submit" disabled={isSubmitting || otpExpired}>Verify</button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default RestaurantRegistration;
