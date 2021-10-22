import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap'
import './ModalForm.scss'
import { Formik } from "formik";
import * as yup from "yup";
import { AiOutlineClose } from 'react-icons/ai'
import { BiRupee } from 'react-icons/bi'
import { pricingData } from './pricingData'
import displayRazorpay from "./utils/PaymentGateway";


const validationSchema = yup.object().shape({
    dietType: yup.string().required("Required"),
    name: yup.string().required("Required"),
    phone: yup.number("Enter correct phone number").positive("Enter correct phone number").required("Required"),
    email: yup.string().email("Invalid email format").required("Required"),
    gender: yup.string().required("Required"),
    age: yup.number("Enter correct Age").positive("Enter correct Age").required("Required"),
    height: yup.number("Enter correct Height").positive("Enter correct Height").required("Required"),
    weight: yup.number("Enter correct Weight").positive("Enter correct Weight").required("Required"),
    activity: yup.string().required("Required"),
    startDate: yup.date().required("Required"),
    address: yup.string().required("Required"),
    state: yup.string().required("Required"),
    city: yup.string().required("Required"),
    pin: yup.number("Enter correct Pin code").positive("Enter correct Pin code").required("Required"),
});

const formInitialValues = {
    dietType: "",
    name: "",
    phone: "",
    email: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    activity: "",
    startDate: "",
    address: "",
    state: "",
    city: "",
    pin: "",
};

const ModalForm = () => {
    const [show, setShow] = useState(false);
    const [currentView, setCurrentView] = useState(0);
    const [packageDetails, setPackageDetails] = useState({
        type: "veg",
        days: 3,
        meal: ["breakfast"],
    })
    const [totalPrice, setTotalPrice] = useState(0)
    const [dietType, setDietType] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlePackageDetails = (value, changeType) => {
        if (changeType === "meal") {
            setPackageDetails((prev) => {
                let arr = { ...prev }
                let index = arr.meal.indexOf(value)
                if (index > -1) {
                    arr.meal.splice(index, 1)
                } else {
                    arr.meal.push(value)
                }
                return arr;
            })
        } else {
            setPackageDetails((prev) => {
                let arr = { ...prev }
                arr[changeType] = value
                return arr;
            })
        }
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getPrice = () => {
        const data = pricingData
        let price;
        if (dietType) {
            price = data[dietType][packageDetails.type][packageDetails.days][packageDetails.meal.length]
        } else {
            price = 0
        }
        return price;
    }

    useEffect(() => {
        setTotalPrice(getPrice())
    }, [packageDetails, dietType, getPrice])

    const handleSubmit = (values) => {
        displayRazorpay(dietType, packageDetails, values)
        handleClose()
    }
    return (
        <>
            <Button onClick={handleShow}>Open Modal</Button>

            <Modal size="lg" className="modal" show={show} onHide={handleClose} centered>
                <Modal.Body className="modalBody">
                    <AiOutlineClose onClick={handleClose} className="close" />
                    <div className="left">
                        <div className="formProgress">
                            <div className={`bar bar${currentView}`} />
                            <Image src={"/images/icon1.svg"} className={currentView >= 0 ? "icon icon1 showColor" : "icon icon1"} />
                            <Image src={"/images/icon2.svg"} className={currentView >= 1 ? "icon icon2 showColor" : "icon icon2"} />
                            <Image src={"/images/icon3.svg"} className={currentView >= 2 ? "icon icon3 showColor" : "icon icon3"} />
                            <Image src={"/images/icon4.svg"} className={currentView >= 3 ? "icon icon4 showColor" : "icon icon4"} />
                            <Image src={"/images/icon5.svg"} className={currentView >= 4 ? "icon icon5 showColor" : "icon icon5"} />
                        </div>
                    </div>
                    <div className="right">
                        <Formik
                            initialValues={formInitialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                handleSubmit(values);
                            }}
                        >
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                values,
                                touched,
                                errors,
                            }) => {
                                return (
                                    <Form className="infoForm">
                                        {currentView === 0 ? <>
                                            <Form.Group className="infoGroup">
                                                <Form.Check name="dietType" type="radio" className="diet-type">
                                                    <Form.Check.Input name="dietType" checked={dietType === "keto"} type="radio" value="keto" className="diet-type-input" onChange={(e) => {
                                                        handleChange(e)
                                                        setDietType(e.target.value)
                                                    }}
                                                        onBlur={handleBlur}
                                                        isInvalid={errors.dietType} />
                                                    <Form.Check.Label className="diet-type-label">Keto</Form.Check.Label>
                                                </Form.Check>
                                                <Form.Check name="dietType" type="radio" className="diet-type">
                                                    <Form.Check.Input name="dietType" checked={dietType === "balanced diet"} type="radio" value="balanced diet" className="diet-type-input" onChange={(e) => {
                                                        handleChange(e)
                                                        setDietType(e.target.value)
                                                    }}
                                                        onBlur={handleBlur}
                                                        isInvalid={errors.dietType} />
                                                    <Form.Check.Label className="diet-type-label">Balanced Diet</Form.Check.Label>
                                                </Form.Check>
                                                <Form.Check name="dietType" type="radio" className="diet-type">
                                                    <Form.Check.Input name="dietType" checked={dietType === "low carb"} type="radio" value="low carb" className="diet-type-input" onChange={(e) => {
                                                        handleChange(e)
                                                        setDietType(e.target.value)
                                                    }}
                                                        onBlur={handleBlur}
                                                        isInvalid={errors.dietType} />
                                                    <Form.Check.Label className="diet-type-label">Low Carb</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>
                                        </> : null}
                                        {currentView === 1 ? <>
                                            <h3 className="infoTitle">Personal Information</h3>
                                            <Form.Group className="infoGroup">
                                                <Form.Control
                                                    name="name"
                                                    value={values.name}
                                                    className="infoControl"
                                                    placeholder="Name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={errors.name} />
                                                <Form.Control.Feedback className="pl-2" type="invalid">
                                                    {errors.name}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="infoGroup">
                                                <Form.Control
                                                    name="email"
                                                    value={values.email}
                                                    className="infoControl"
                                                    placeholder="Email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={errors.email} />
                                                <Form.Control.Feedback className="pl-2" type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="infoGroup">
                                                <Form.Control
                                                    name="phone"
                                                    value={values.phone}
                                                    type="number"
                                                    className="infoControl"
                                                    placeholder="Phone Number"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={errors.phone} />
                                                <Form.Control.Feedback className="pl-2" type="invalid">
                                                    {errors.phone}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </> : null}
                                        {currentView === 2 ? <>
                                            <h3 className="infoTitle">General Information</h3>
                                            <Row>
                                                <Form.Group as={Col} className="infoGroup">
                                                    <Form.Control
                                                        name="gender" value={values.gender} as="select" className="infoControl" onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={errors.gender}>
                                                        <option value="" default>Select Gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Others</option>
                                                        <option value="prefer not to say">Prefer not to say</option>
                                                    </Form.Control>
                                                    <Form.Control.Feedback className="pl-2" type="invalid">
                                                        {errors.gender}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group as={Col} className="infoGroup">
                                                    <Form.Control name="age" value={values.age} type="number" className="infoControl" placeholder="Age" onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={errors.age} />
                                                    <Form.Control.Feedback className="pl-2" type="invalid">
                                                        {errors.age}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col} className="infoGroup">
                                                    <Form.Control name="height" value={values.height} type="number" className="infoControl" placeholder="Height (in)" onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={errors.height} />
                                                    <Form.Control.Feedback className="pl-2" type="invalid">
                                                        {errors.height}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group as={Col} className="infoGroup">
                                                    <Form.Control name="weight" value={values.weight} type="number" className="infoControl" placeholder="Weight (kg)" onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={errors.weight} />
                                                    <Form.Control.Feedback className="pl-2" type="invalid">
                                                        {errors.weight}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col} className="infoGroup">
                                                    <Form.Control name="activity" value={values.activity} as="select" className="infoControl" onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={errors.activity}>
                                                        <option value="" default>Your Physical Activity</option>
                                                        <option value="Strongly">Strongly Active</option>
                                                        <option value="moderately">Moderately Active</option>
                                                        <option value="slightly">Slightly Active</option>
                                                        <option value="sedentary">Sedentary</option>
                                                    </Form.Control>
                                                    <Form.Control.Feedback className="pl-2" type="invalid">
                                                        {errors.activity}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>

                                        </> : null}

                                        {currentView === 3 ? <>

                                            <div className="selectType">
                                                <div className={packageDetails.type === "veg" ? "type typeSelected" : "type"} onClick={() => handlePackageDetails("veg", "type")}>Veg</div>
                                                <div className={packageDetails.type === "non-veg" ? "type typeSelected middle" : "type middle"} onClick={() => handlePackageDetails("non-veg", "type")}>Non-Veg</div>
                                                <div className={packageDetails.type === "egg" ? "type typeSelected" : "type"} onClick={() => handlePackageDetails("egg", "type")}>Egg</div>
                                            </div>

                                            <div className="selectLabel">No. Of days</div>
                                            <div className="selectDays">
                                                <div className={packageDetails.days === 3 ? "days selected" : "days"} onClick={() => handlePackageDetails(3, "days")}>3 days</div>
                                                <div className={packageDetails.days === 7 ? "days selected" : "days"} onClick={() => handlePackageDetails(7, "days")}>7 days</div>
                                                <div className={packageDetails.days === 14 ? "days selected" : "days"} onClick={() => handlePackageDetails(14, "days")}>14 days</div>
                                                <div className={packageDetails.days === 21 ? "days selected" : "days"} onClick={() => handlePackageDetails(21, "days")}>21 days</div>
                                                <div className={packageDetails.days === 30 ? "days selected" : "days"} onClick={() => handlePackageDetails(30, "days")}>30 days</div>
                                            </div>

                                            <div className="selectLabel">Types of meal</div>
                                            <div className="selectDays">
                                                <div className={packageDetails.meal.indexOf("breakfast") > -1 ? "days selected" : "days"} onClick={() => handlePackageDetails("breakfast", "meal")}>Breakfast</div>
                                                <div className={packageDetails.meal.indexOf("lunch") > -1 ? "days selected" : "days"} onClick={() => handlePackageDetails("lunch", "meal")}>Lunch</div>
                                                <div className={packageDetails.meal.indexOf("dinner") > -1 ? "days selected" : "days"} onClick={() => handlePackageDetails("dinner", "meal")}>Dinner</div>
                                            </div>

                                            <div className="selectLabel">Start date</div>
                                            <Form.Group className="dateGroup">
                                                <Form.Control name="startDate" value={values.startDate} type="date" className="dateControl" onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={errors.startDate} />
                                                <Form.Control.Feedback className="pl-2" type="invalid">
                                                    {errors.startDate}
                                                </Form.Control.Feedback>
                                            </Form.Group>


                                        </> : null}

                                        {currentView === 4 ? <>
                                            <h3 className="infoTitle">Address</h3>

                                            <Form.Group className="infoGroup">
                                                <Form.Control name="address" value={values.address} className="infoControl" placeholder="Flat no., Building name, road, area" onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={errors.address} />
                                                <Form.Control.Feedback className="pl-2" type="invalid">
                                                    {errors.address}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Row>
                                                <Form.Group as={Col} className="infoGroup">
                                                    <Form.Control name="state" value={values.state} className="infoControl" placeholder="State" onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={errors.state} />
                                                    <Form.Control.Feedback className="pl-2" type="invalid">
                                                        {errors.state}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col} className="infoGroup">
                                                    <Form.Control name="city" value={values.city} className="infoControl" placeholder="City" onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={errors.city} />
                                                    <Form.Control.Feedback className="pl-2" type="invalid">
                                                        {errors.city}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group as={Col} className="infoGroup">
                                                    <Form.Control name="pin" value={values.pin} type="number" className="infoControl" placeholder="Pin Code" onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={errors.pin} />
                                                    <Form.Control.Feedback className="pl-2" type="invalid">
                                                        {errors.pin}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>

                                            <h3 className="infoPrice">Total amount you have to pay is <BiRupee />{totalPrice}</h3>

                                        </> : null}
                                        <Form.Group className="btnsGroup">
                                            {currentView !== 0 && <Button onClick={() => setCurrentView((prev) => prev - 1)} className="nextBtn">Back</Button>}
                                            {currentView < 4 ? <Button onClick={() => setCurrentView((prev) => prev + 1)} className="nextBtn">Next</Button> : <Button onClick={handleSubmit} className="nextBtn">Pay Now</Button>}
                                        </Form.Group>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalForm
