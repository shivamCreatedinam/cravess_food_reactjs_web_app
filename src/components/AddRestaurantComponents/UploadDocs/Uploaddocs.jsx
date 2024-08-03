import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import css from './Upload.module.css';
import pending from '../../../images/pending.png';

export const Uploaddocs = ({ data, status, token }) => {
  const [gstImage, setGstImage] = useState(null);
  const [fssaiImage, setFssaiImage] = useState(null);

  useEffect(() => {
    console.log(token);
  }, [token]);

  const API = 'https://cravess.createdinam.com/superadmin/api/v1/store';

  const getValidationSchema = () => {
    const schema = {
      aadharcard: Yup.string().required('Aadhar Card Number is required'),
      pannumber: Yup.string().required('PAN Card Number is required'),
      gst_number: Yup.string().required('GST Number is required'),
      gst_image: Yup.mixed().required('GST Certificate Image is required'),
      fssai_image: Yup.mixed().required('FSSAI Image is required'),
    };
  
    if (data.aadhar_verified === 1) {
      delete schema.aadharcard;
    }
    if (data.pan_verified === 1) {
      delete schema.pannumber;
    }
    if (data.gst_verified === 1) {
      delete schema.gst_number;
      delete schema.gst_image;
    }
    if (data.fssai_verified === 1) {
      delete schema.fssai_image;
    }
  
    return Yup.object(schema);
  };
  
  const handleFileChange = (event, setFieldValue, setImageState) => {
    const file = event.currentTarget.files[0];
    setImageState(file);
    setFieldValue(event.target.name, file);
  };

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const submitAadharPanDetails = (values) => {
    return axios.post(
      `${API}/aadhar-pan-card-update`,
      {
        aadhar_number: values.aadharcard,
        pan_number: values.pannumber
      },
      config
    );
  };

  const submitGstDetails = (values) => {
    const formData = new FormData();
    formData.append('gst_number', values.gst_number);
    formData.append('gst_cert_image', values.gst_image);

    return axios.post(
      `${API}/gst-update`,
      formData,
      { ...config, headers: { ...config.headers, 'Content-Type': 'multipart/form-data' } }
    );
  };

  const submitFssaiDetails = (values) => {
    const formData = new FormData();
    formData.append('fssai_image', values.fssai_image);

    return axios.post(
      `${API}/fssai-details-update`,
      formData,
      { ...config, headers: { ...config.headers, 'Content-Type': 'multipart/form-data' } }
    );
  };

  const onSubmit = (values, { setSubmitting }) => {
    const apiCalls = [];
  
    if (data.aadhar_verified === 0 || data.pan_verified === 0) {
      apiCalls.push(submitAadharPanDetails(values));
    }
    if (data.gst_verified === 0) {
      apiCalls.push(submitGstDetails(values));
    }
    if (data.fssai_verified === 0) {
      apiCalls.push(submitFssaiDetails(values));
    }
  
    Promise.all(apiCalls)
      .then(([aadharPanResponse, gstResponse, fssaiResponse]) => {
        if (aadharPanResponse) console.log('Aadhar/PAN Response:', aadharPanResponse.data);
        if (gstResponse) console.log('GST Response:', gstResponse.data);
        if (fssaiResponse) console.log('FSSAI Response:', fssaiResponse.data);
      })
      .finally(() => setSubmitting(false));
  };
  
  return (
    <div className={css.mainDiv}>
      {data.aadhar_verified === 0 || data.pan_verified === 0 ? (
        <div className="register-form">
          <h1>Document Upload</h1>
          <Formik
            initialValues={{
              aadharcard: '',
              pannumber: '',
              gst_number: '',
              gst_image: null,
              fssai_image: null,
            }}
            validationSchema={getValidationSchema()}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <div className="form-control">
                  <label htmlFor="aadharcard">Aadhar Card Number</label>
                  <Field 
                    type="text" 
                    id="aadharcard" 
                    name="aadharcard" 
                    disabled={data.aadhar_verified === 1} 
                  />
                  {data.aadhar_verified === 1 && <span className={css.greenTick}>&#10003; Submitted Already</span>}
                  <ErrorMessage name="aadharcard" component="div" className="error" />
                </div>
                <div className="form-control">
                  <label htmlFor="pannumber">PAN Card Number</label>
                  <Field 
                    type="text" 
                    id="pannumber" 
                    name="pannumber" 
                    disabled={data.pan_verified === 1} 
                  />
                  {data.pan_verified === 1 && <span className={css.greenTick}>&#10003; Submitted Already</span>}
                  <ErrorMessage name="pannumber" component="div" className="error" />
                </div>
                {data.gst_verified === 0 && (
                  <>
                    <div className="form-control">
                      <label htmlFor="gst_number">GST Number</label>
                      <Field 
                        type="text" 
                        id="gst_number" 
                        name="gst_number" 
                        disabled={data.gst_verified === 1} 
                      />
                      {data.gst_verified === 1 && <span className={css.greenTick}>&#10003; Submitted Already</span>}
                      <ErrorMessage name="gst_number" component="div" className="error" />
                    </div>
                    <div className="form-control">
                      <label htmlFor="gst_image">GST Certificate Image <span className={css.file_type}>(file type: png, jpg, jpeg.)</span></label>
                      <input
                        type="file"
                        id="gst_image"
                        name="gst_image"
                        onChange={(event) => handleFileChange(event, setFieldValue, setGstImage)}
                        disabled={data.gst_verified === 1}
                      />
                      {data.gst_verified === 1 && <span className={css.greenTick}>&#10003; Submitted Already</span>}
                      <ErrorMessage name="gst_image" component="div" className="error" />
                    </div>
                  </>
                )}
                {data.fssai_verified === 0 && (
                  <div className="form-control">
                    <label htmlFor="fssai_image">FSSAI Image <span className={css.file_type}>(file type: png, jpg, jpeg.)</span></label>
                    <input
                      type="file"
                      id="fssai_image"
                      name="fssai_image"
                      onChange={(event) => handleFileChange(event, setFieldValue, setFssaiImage)}
                      disabled={data.fssai_verified === 1}
                    />
                    {data.fssai_verified === 1 && <span className={css.greenTick}>&#10003; Submitted Already</span>}
                    <ErrorMessage name="fssai_image" component="div" className="error" />
                  </div>
                )}
                <button type="submit" disabled={isSubmitting}>Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div>
          <img src={pending} className={css.pending_image} alt="Pending approval" />
          <p className={css.para}>Your Restaurant is still pending, please wait for approval!</p>
        </div>
      )}
    </div>
  );
  
};
