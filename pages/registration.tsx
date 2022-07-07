import React, { useState } from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";

export default function Registration() {

    const [validation, setValidation] = useState(true);

    const ValidationSchema = Yup.object().shape({
        firstname: Yup.string().required("Please enter Your First Name"),
        lastname: Yup.string().required("Please enter Your last name"),
        gender: Yup.string().required("Please select your gender"),
        contact: Yup.number().required("Please enter Contact number"),
        address: Yup.string().required("Please enter your Address"),
        email: Yup.string().email("Invalid email"),
        password1: Yup.string()
            .required()
            .min(8, 'Should be atleast 8 characters')
            .max(15, 'Should not be more than 15 characters')
    })

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            gender: '',
            email: '',
            contact: '',
            address: '',
            password1: '',
            password2: '',
        },
        validationSchema: ValidationSchema,

        onSubmit: async (values: any) => {
            console.log("helo")
            console.log(values)
        }
    })

    const validatePassword = (e: any) => {
        if (e.target.value === formik.values.password1) {
            setValidation(true)
            formik.handleChange(e);
        } else {
            setValidation(false)
            formik.handleChange(e);
        }
    }

    return (
        <div className='d-flex justify-content-center p-4 align-items-center'>
            <div className='shadow-lg p-4 mb-5 bg-white rounded col-6'>
                <div>
                    <h5 className='text-center'>Registration Form</h5>
                </div>
                <form className='m-4 col-10' onSubmit={formik.handleSubmit}>
                    <div className="form-group row">
                        <div className='col-6'>
                            <label htmlFor="exampleInputFirstname" className='text-center mt-3'>First name</label>
                            <input type="text" className="form-control" placeholder="Enter First Name" {...formik.getFieldProps("firstname")} />
                            {formik.errors.firstname ? <div style={{ color: "red" }}><small>{formik.errors.firstname}</small></div> : null}
                        </div>
                        <div className='col-6'>
                            <label htmlFor="exampleInputLastname" className='text-center mt-3'>Last name</label>
                            <input type="text" className="form-control" placeholder="Enter Last Name" {...formik.getFieldProps("lastname")} />
                            {formik.errors.lastname ? <div style={{ color: "red" }}><small>{formik.errors.lastname}</small></div> : null}
                        </div>
                        <div className='col-6'>
                            <label htmlFor="exampleInputEmail" className='text-center mt-3'>Email Address</label>
                            <input type="email" className="form-control" placeholder="Enter Email Address" {...formik.getFieldProps("email")} />
                            {formik.errors.email ? <div style={{ color: "red" }}><small>{formik.errors.email}</small></div> : null}
                        </div>
                        <div className='col-6'>
                            <label htmlFor="exampleInputgender" className='text-center mt-3'>Gender</label>
                            <select
                                name="gender"
                                id="gender"
                                className='form-control'
                                {...formik.getFieldProps("gender")}

                            >
                                <option disabled selected value="">--Select Gender--</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Other</option>
                            </select>
                            {formik.errors.gender ? <div style={{ color: "red" }}><small>{formik.errors.gender}</small></div> : null}

                        </div>
                        <div className='col-6'>
                            <label htmlFor="exampleInputContact" className='text-center mt-3'>Contact No:</label>
                            <input type="number" className="form-control" placeholder="Enter Contact Number" {...formik.getFieldProps("contact")} />
                            {formik.errors.contact ? <div style={{ color: "red" }}><small>{formik.errors.contact}</small></div> : null}
                        </div>
                        <div className='col-6'>
                            <label htmlFor="exampleInputAddress" className='text-center mt-3'>Address</label>
                            <input type="text" className="form-control" placeholder="Enter Address" {...formik.getFieldProps("address")} />
                            {formik.errors.address ? <div style={{ color: "red" }}><small>{formik.errors.address}</small></div> : null}
                        </div>
                        <div className="col-12">
                            <label htmlFor="exampleInputPassword1" className=''>Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" {...formik.getFieldProps("password1")} />
                            {formik.errors.password1 ? <div style={{ color: "red" }}><small>{formik.errors.password1}</small></div> : null}
                        </div>
                        <div className="col-12">
                            <label htmlFor="exampleInputPassword2" className=''>Confirm Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Confirm Password" {...formik.getFieldProps("password2")} onChange={(e) => validatePassword(e)} />
                            {!validation ? <div style={{ color: "red" }}><small>Password didn't match</small></div> : null}
                        </div>
                    </div>
                    <div className='text-center mt-4'>
                        <button type="submit" className="btn btn-primary" onClick={() => formik.handleSubmit()}>Submit</button>
                    </div>
                </form>
                <div>
                    <small>Already Have a Account? Login <a href='/login'> Here</a></small>
                </div>
            </div>
        </div>
    )
}
