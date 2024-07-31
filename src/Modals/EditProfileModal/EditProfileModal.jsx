import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom'

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import css from './EditProfileModal.module.css'

import axios from 'axios';
import closeBtn from '../../images/closeBtn.jpg';
import cameraIcon from '../../icons/photo-camera.png';
import bgImg from '../../images/profilebanner.jpg'
import profilePic from '../../images/profilepic.jpg'
import cover1 from '../../images/cover1.jpg'
import cover2 from '../../images/cover2.jpg'
import cover3 from '../../images/cover3.jpg'
import cover4 from '../../images/cover4.jpg'
import cover5 from '../../images/cover5.jpg'
import cover6 from '../../images/cover6.jpg'
import cover7 from '../../images/cover7.jpg'
import cover8 from '../../images/cover8.jpg'
import cover9 from '../../images/cover9.jpg'
import cover10 from '../../images/cover10.jpg'

import RedBtnHov from '../../utils/Buttons/RedBtnHov/RedBtnHov'
import WhiteBtnHov from '../../utils/Buttons/WhiteBtnHov/WhiteBtnHov'
import TextUtil from '../../utils/FormUtils/TextUtil/TextUtil'
import TextUtilWithCancel from '../../utils/FormUtils/TextUtilWithCancel/TextUtilWithCancel'
import EnterOTP from '../../components/Auth/EnterOTP/EnterOTP'

const EditProfileModal = ({ setModal }) => {


    // redux



    let [dropdown, setDropDown] = useState(false);
    let [changeMailModal, setChangeMailModal] = useState(false);
    let [initialValues, setInitialValues] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        description: "",
        handle: "",
        website: ""
    })

    let validationSchema = Yup.object({
        fullName: Yup.string().min(3, "Minimum 3 charecters required!"),
        phone: Yup.string().min(10, "Minimum 3 charecters required!").min(10, "Enter valid phone number!").max(10, "Enter valid phone number!"),
        email: Yup.string().email("Enter correct email address!"),
        address: Yup.string().min(5, "Minimum 5 charecters required!"),
        description: Yup.string().min(5, "Minimum 5 charecters required!").max(150, "Maximum 150 charecters only!"),
        handle: Yup.string().min(5, "Minimum 5 charecters required!"),
        website: Yup.string().url("Provide correct URL!"),
    })

    let submitForm = (values, { setSubmitting }) => {
        console.log(values, "submited");
    }

    const mailCahngeHandler = () => {
        setChangeMailModal(val => !val);
    }

    
    let [openImages, setOpenImages] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        console.log(image)
        setSelectedImage(image);
    };

    const updateBanner = () =>{
        setOpenImages(val => !val)
    }

    const images = [
        cover1, cover2, cover3, cover4, cover5, cover6, cover7, cover8, cover9, cover10
    ];

    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");
    const [image1, setImage1] = useState("");

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setImage1(file)
            setDropDown(false)
        }
    };

    const deletePic = () => {
        setFileName("");
        setDropDown(false)
    }



    useEffect(() => {
        return () => {
            if (image1) {
                URL.revokeObjectURL(URL.createObjectURL(image1));
            }
        };
    }, [image1]);


    const [name, setName] = useState('')

    const updateUser = async () => {
        if (!image1) return; 

        const formData = new FormData();
        formData.append('image', image1);
        formData.append('name', name);

        try {
            const response = await axios.post('your-api-endpoint', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log('Image uploaded successfully');
            } else {
                console.error('Image upload failed');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const domObj = <>
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
                                    alt="Preview"
                                />
                            </div>
                            {dropdown ? <div className={css.dropdownCam}>
                                <div className={css.opt} onClick={handleClick}>Change Photo</div>
                                <input
                                    ref={fileInputRef}
                                    className={css.input1}
                                    type="file"
                                    onChange={handleFileChange}
                                ></input>
                                <div className={css.opt} onClick={deletePic}>Delete Photo</div>
                            </div> : ""}
                        </div>
                        <div className={css.cameraIconBox2}>
                            <div className={css.bgCssImg}>
                                <img src={cameraIcon} onClick={() => setOpenImages(!openImages)} className={css.cameraIcon} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.bdy}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={submitForm}
                        className={css.formikForm}
                    >{(formik) => {
                        return <Form className={css.form}>
                            <TextUtil name="fullName"  onClick={(e) => setName(e.target.value)} placeholder="Enter name" />
                            <TextUtil name="phone" placeholder="Enter phone number" disabled />
                            <span className={css.formTxt}>You can update your phone number using the Zomato app</span>
                            <TextUtilWithCancel txt="Change" name="email" placeholder="sample@sample.com" formik="" changeHandler={mailCahngeHandler} disabled />
                            <TextUtil name="address" placeholder="Enter address" />
                            <TextUtil name="description" placeholder="Description" />
                            <span className={css.formTxt}>Tell us something about yourself ({150 - formik.values.description.length} characters remaining)</span>
                            <TextUtil name="handle" placeholder="Handle" />
                            <span className={css.formTxt}>You can only change your handle once</span>
                            <TextUtil name="website" placeholder="Website" />
                            <div className={css.btns}>
                                <WhiteBtnHov txt="Cancel" onClick={() => setModal(val => !val)} />
                                <RedBtnHov txt="Update" onClick={updateUser} />
                            </div>
                        </Form>
                    }}
                    </Formik>
                </div>
            </div>
        </div>
        {changeMailModal ? <EnterOTP setModal={setChangeMailModal} /> : ""}

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

    return createPortal(domObj, document.getElementById('modal'));
}

export default EditProfileModal