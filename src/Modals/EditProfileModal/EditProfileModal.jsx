import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import css from './EditProfileModal.module.css';
import axios from 'axios';
import closeBtn from '../../images/closeBtn.jpg';
import cameraIcon from '../../icons/photo-camera.png';
import bgImg from '../../images/profilebanner.jpg';
import profilePic from '../../images/profilepic.jpg';
import cover1 from '../../images/cover1.jpg';
import cover2 from '../../images/cover2.jpg';
import cover3 from '../../images/cover3.jpg';
import cover4 from '../../images/cover4.jpg';
import cover5 from '../../images/cover5.jpg';
import cover6 from '../../images/cover6.jpg';
import cover7 from '../../images/cover7.jpg';
import cover8 from '../../images/cover8.jpg';
import cover9 from '../../images/cover9.jpg';
import cover10 from '../../images/cover10.jpg';
import RedBtnHov from '../../utils/Buttons/RedBtnHov/RedBtnHov';
import WhiteBtnHov from '../../utils/Buttons/WhiteBtnHov/WhiteBtnHov';
import TextUtil from '../../utils/FormUtils/TextUtil/TextUtil';
import EnterOTP from '../../components/Auth/EnterOTP/EnterOTP';
import { useSelector } from 'react-redux';

const EditProfileModal = ({ setModal }) => {
    const token = useSelector((state) => state.token.token);
    const API = 'https://cravess.createdinam.com/superadmin/api/v1';

    const [dropdown, setDropDown] = useState(false);
    const [changeMailModal, setChangeMailModal] = useState(false);
    const [openImages, setOpenImages] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [fileName, setFileName] = useState("");
    const [image1, setImage1] = useState("");
    const fileInputRef = useRef(null);

    const images = [
        cover1, cover2, cover3, cover4, cover5, cover6, cover7, cover8, cover9, cover10
    ];

    const initialValues = {
        name: '',
        alternative_mobile: '',
        date_of_birth: '',
        anniversary_date: '',
        gender: "",
        food_preference: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        alternative_mobile: Yup.string().length(10, 'Mobile number must be 10 numbers').required('Mobile number is required'),
        date_of_birth: Yup.string().required("Date of birth is required"),
        gender: Yup.string().required("Gender is required"),
        food_preference: Yup.string().required("Food preference is required"),
    });

    const submitForm = async (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('alternative_mobile', values.alternative_mobile);
        formData.append('date_of_birth', values.date_of_birth);
        formData.append('gender', values.gender);
        formData.append('food_preference', values.food_preference);

        if (image1) {
            formData.append('profile_image', image1);
        }
        if (coverImage instanceof File) {
            formData.append('cover_photo', coverImage);
        }
        if (values.anniversary_date) {
            formData.append('anniversary_date', values.anniversary_date);
        }

        try {
            const response = await axios.post(`${API}/update-profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                console.log('Profile updated successfully', response);
            } else {
                console.error('Profile update failed');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const urlToBlob = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok.');
        return await response.blob();
    };

    const blobToFile = (blob, filename) => {
        return new File([blob], filename, { type: blob.type });
    };

    

    const handleImageClick = async (imageUrl) => {
        try {
            const blob = await urlToBlob(imageUrl);
            const file = blobToFile(blob, 'cover_photo.jpg'); // Adjust the filename as needed
            setSelectedImage(imageUrl);
            setCoverImage(file)
        } catch (error) {
            console.error('Error converting image to file:', error);
        }
    };

    
    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setImage1(file);
            setDropDown(false);
        }
    };

    const deletePic = () => {
        setFileName("");
        setImage1("");
        setDropDown(false);
    };

    useEffect(() => {
        return () => {
            if (image1) {
                URL.revokeObjectURL(URL.createObjectURL(image1));
            }
        };
    }, [image1]);



    const updateBanner = () => {
        setOpenImages(val => !val)
    }

    const domObj = (
        <>
            <div className={css.outerDiv}>
                <div className={css.innerDiv}>
                    <div className={css.header}>
                        <div className={css.headerLeft}>
                            <div className={css.title}>Edit Profile</div>
                        </div>
                        <span className={css.closeBtn} onClick={() => setModal(val => !val)}>
                            <img className={css.closeBtnImg} src={closeBtn} alt="close button" />
                        </span>
                    </div>
                    <div className={css.banner}>
                        <div className={css.BGImgBox}>
                            <img
                                src={selectedImage ? selectedImage : bgImg}
                                className={css.bgImg}
                                alt="Selected Preview"
                            />
                        </div>
                        <div className={css.overlayImg}>
                            <div className={css.profilePicBox}>
                                <img
                                    src={fileName ? URL.createObjectURL(image1) : profilePic}
                                    className={css.profilePic}
                                    alt="Preview"
                                />
                            </div>
                            <div className={css.cameraIconBox}>
                                <div className={css.bgCssImg} onClick={() => setDropDown(val => !val)}>
                                    <img
                                        src={cameraIcon}
                                        className={css.cameraIcon}
                                        alt="Camera Icon"
                                    />
                                </div>
                                {dropdown && (
                                    <div className={css.dropdownCam}>
                                        <div className={css.opt} onClick={handleClick}>Change Photo</div>
                                        <input
                                            ref={fileInputRef}
                                            className={css.input1}
                                            type="file"
                                            onChange={handleFileChange}
                                        />
                                        <div className={css.opt} onClick={deletePic}>Delete Photo</div>
                                    </div>
                                )}
                            </div>
                            <div className={css.cameraIconBox2}>
                                <div className={css.bgCssImg}>
                                    <img src={cameraIcon} onClick={() => setOpenImages(!openImages)} className={css.cameraIcon} alt="Camera Icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={css.bdy}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={submitForm}
                        >
                            {(formik) => (
                                <Form className={css.form}>
                                    <span className={css.info}>Name</span>
                                    <TextUtil name="name" placeholder="Enter name" />
                                    <span className={css.info}>Alternative Mobile No.</span>
                                    <TextUtil name="alternative_mobile" placeholder="Mobile No." />
                                    <span className={css.info}>Your Date of Birth</span>
                                    <TextUtil name="date_of_birth" placeholder="Enter Your DOB" type='date' />
                                    <span className={css.info}>Your Anniversary Date</span>
                                    <TextUtil name="anniversary_date" type='date' />
                                    <span className={css.formTxt}>(Optional)</span>
                                    <span className={css.info}>Gender</span>
                                    <TextUtil
                                        as="select"
                                        name="gender"
                                        className={css.selectInput}
                                    >
                                        <option value="" label="Select Gender" disabled />
                                        <option value="male" label="Male" />
                                        <option value="female" label="Female" />
                                    </TextUtil>
                                    <span className={css.info}>Food Preference</span>
                                    <TextUtil
                                        as="select"
                                        name="food_preference"
                                        className={css.selectInput}
                                    >
                                        <option value="" label="Select Food Preference" disabled />
                                        <option value="veg" label="Veg" />
                                        <option value="non_veg" label="Non - Veg" />
                                        <option value="both" label="Both" />

                                    </TextUtil>
                                    <div className={css.btns}>
                                        <WhiteBtnHov txt="Cancel" onClick={() => setModal(val => !val)} />
                                        {/* <RedBtnHov txt="Update" type='submit' /> */}
                                        <button type='submit' className={css.updateBtn}>Update</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            {changeMailModal && <EnterOTP setModal={setChangeMailModal} />}
            {openImages && (

                <div className={css.selectImages}>

                    <div className={css.outerDiv2}>
                        <div className={css.innerDiv}>
                            <div className={css.header}>
                                <div className={css.headerLeft}>
                                    <div className={css.title}>Select Background Banner</div>
                                </div>
                                <span className={css.closeBtn} onClick={() => setOpenImages(val => !val)}>
                                    <img className={css.closeBtnImg} src={closeBtn} alt="close button" />
                                </span>
                            </div>
                            <div className={css.banner}>
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`${css.banneImages} ${selectedImage === image ? css.selected : ''}`}
                                        onClick={() => handleImageClick(image)}
                                    >
                                        <img src={image} alt={`cover ${index + 1}`} className={css.banneImages} />
                                        {selectedImage === image && <div className={css.tick}></div>}
                                    </div>
                                ))}
                            </div>
                            <div className={css.btns}>
                                <WhiteBtnHov txt="Cancel" onClick={() => setModal(val => !val)} />
                                <RedBtnHov txt="Update" onClick={updateBanner} />
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </>
    );

    return createPortal(domObj, document.getElementById('modal'));
};

export default EditProfileModal;
