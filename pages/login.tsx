import React, {useState} from 'react';
import { useRouter } from 'next/router';
import * as Yup from "yup";
import { useFormik } from "formik";
import { auth } from '../src/public/firebase';
import {
  signInWithEmailAndPassword
} from "firebase/auth";

export default function Login() {

  const router = useRouter();

  const [error, setError] = useState(null);
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email"),
    password: Yup.string().required("Please enter Password"),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: ValidationSchema,

    onSubmit: async (values:any) => {
        signInWithEmailAndPassword(auth,values.email,values.password).
        then(() => {
          localStorage.setItem("isLoggedIn", "true");
          router.push("/DonationForm")
        }).catch(() => setError("Either Email or Password is incorrect"))
    }
    }
  )

  return (
    <div className='d-flex justify-content-center p-4 align-items-center'>
      <div className='shadow-lg p-4 mb-5 bg-white rounded'>
        <div>
          <h5 className='text-center'>Login Form</h5>
        </div>
        <form className='m-4' onSubmit={formik.handleSubmit}>
          {error && <label className='text-danger'>{error}</label>}
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className='text-center'>Email Address</label>
            <input type="email" className="form-control mb-3" placeholder="Enter email" {...formik.getFieldProps("email")}/>
            {formik.errors.email ? <div style={{ color: "red" }}><small>{formik.errors.email}</small></div> : null}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className=''>Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" {...formik.getFieldProps("password")}/>
            {formik.errors.password ? <div style={{ color: "red" }}><small>{formik.errors.password}</small></div> : null}
          </div>
          <div className='text-center mt-4'>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
        <div>
          <small>Don't have a account yet? Sign up <a href='/registration'>Here</a></small>
        </div>
      </div>
    </div>
  )
}
