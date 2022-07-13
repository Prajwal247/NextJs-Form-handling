import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import * as Yup from "yup";
import { useFormik } from "formik";


function DonationForm() {

  const router = useRouter();
  const countries = [
    "Nepal", "India", "China", "United States", "United Kingdom", "Australia"
  ]
  const [isEligible, setIsEligible] = useState(true);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("isLoggedIn") !== "true"){
      router.push("/")
    }
  }, [])
  
  const nameRegex = /^[a-zA-Z ]*$/;
  const ValidationSchema = Yup.object().shape({
    country: Yup.string().required("Country is required"),
    isCovid: Yup.string().required("Select any one"),
    name: Yup.string()
      .matches(nameRegex, "Should contain only alphabets")
      .min(0, "Too Short!")
      .max(50, "Too Long!")
      .required("Full Name is Required"),
    age: Yup.number().required("Age is required"),
    mobile: Yup.number()
      .min(1000000000, "too short")
      .max(13000000000, "too long")
      .required("Mobile number is required"),
    email: Yup.string().email("Invalid email"),
    gender: Yup.string().required("Select any one"),
    blood: Yup.string().required("Brood Group is required"),
    citizenship: Yup.string().required("Document Number is required"),
    donatedBefore: Yup.string().required("Select any one"),
    // recoveryDate: Yup.number().required("required"),
    donationNumber: Yup.number().required("required"),
  })

  const formik = useFormik({
    initialValues: {
      country: '',
      age: '',
      name: '',
      email: '',
      mobile: '',
      blood: '',
      gender: '',
      donationNumber: '',
      recoveryDate: '',
      donatedBefore: '',
      isCovid: '',
      citizenship: '',
      iseligible: '',
    },
    validationSchema: ValidationSchema,

    onSubmit: async(values) => {
      const post = await fetch("api/api",{
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await post.json()
      console.log(data)
    }
  })

  const setCountries = (e:any) => {
    formik.setValues({
      ...formik.values,
      country: e.target.value
    })
  };

  return (
    <>
    <div className="header text-center">
      <h3 className="py-2">Please Fill up the Eligiblility form Below</h3>
    </div>
    <div class="custom-form plasma-donar">
      <form onSubmit={formik.handleSubmit}>
        <div class="tab-content">
          <div class="row justify-content-md-center">
            <div className="col-lg-9 col-md-12">
              <div className="section-card">
                <div className="row">
                  <div className="col-lg-6 col-md-6 child">
                    <div className="input-content-block">
                      <label className="content" for="country">
                        Select your Country<i className="required">*</i>
                      </label>

                      <select
                        className="input-field"
                        name="country"
                        id="country"
                        {...formik.getFieldProps("country")}
                        value={formik.values.country}
                        onChange={(e) => setCountries(e)}
                      >
                        <option selected disabled value=""> --Choose Country--</option>
                        {countries.map((x) => {
                          return <option>{x}</option>;
                        })}
                      </select>
                      {formik.errors.country ? <div style={{ color: "red" }}><small>{formik.errors.country}</small></div> : null}

                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 child">
                    <div className="input-content-block">
                      <label for="country" className="content">
                        Did you Ever get Covid <i className="required">*</i>
                      </label>
                      <select
                        className="input-field"
                        name="covid"
                        id="covid"
                        {...formik.getFieldProps("isCovid")}
                      >
                        <option selected disabled value="">-- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {formik.errors.isCovid ? <div style={{ color: "red" }}><small>{formik.errors.isCovid}</small></div> : null}
                    </div>

                  </div>

                  <div class="col-lg-6 col-md-6 child">
                    <div className="input-content-block">
                      <label className="content">Full Name<i className="required">*</i></label>
                      <input
                        className="input-field"
                        type="text"
                        {...formik.getFieldProps("name")}

                        placeholder="Enter your name"
                      />
                      {formik.errors.name ? <div style={{ color: "red" }}><small>{formik.errors.name}</small></div> : null}

                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 child">
                    <div className="input-content-block">
                      <label className="content">Age<i className="required">*</i></label>
                      <input
                        className="input-field"
                        type="number"
                        min="0"
                        {...formik.getFieldProps("age")}

                        placeholder="Enter your Age"
                      />
                      {formik.errors.age ? <div style={{ color: "red" }}><small>{formik.errors.age}</small></div> : null}

                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6 child">
                    <div className="input-content-block">
                      <label className="content">Mobile no.<i className="required">*</i></label>
                      <input
                        className="input-field"
                        type="number"
                        minLength="7"
                        min="1000000"
                        {...formik.getFieldProps("mobile")}

                        placeholder="Enter your Mobile Number"
                      />
                      {formik.errors.mobile ? <div style={{ color: "red" }}><small>{formik.errors.mobile}</small></div> : null}

                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 child">
                    <div className="input-content-block">
                      <label className="content">Email</label>
                      <input
                        className="input-field"
                        type="email"
                        {...formik.getFieldProps("email")}

                        placeholder="Enter your Email Address "
                      />
                      {formik.errors.email ? <div style={{ color: "red" }}><small>{formik.errors.email}</small></div> : null}

                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 child">
                    <div className="input-content-block">
                      <label className="content"> Gender<i className="required">*</i></label>
                      <select
                        className="input-field"
                        name="gender"
                        id="gender"
                        {...formik.getFieldProps("gender")}

                      // onChange={this.selectChange.apply.bind(this)}
                      >
                        <option disabled selected value="">--Select Gender--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Other</option>
                      </select>
                      {formik.errors.gender ? <div style={{ color: "red" }}><small>{formik.errors.gender}</small></div> : null}

                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6 child">
                    <div className="input-content-block">
                      <label className="content" for="blood">
                        Blood Group<i className="required">*</i>
                      </label>
                      <select
                        className="input-field"
                        name="blood"
                        id="blood"
                        {...formik.getFieldProps("blood")}
                      >
                        <option disabled selected value="">Please Select blood group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                      {formik.errors.blood ? <div style={{ color: "red" }}><small>{formik.errors.blood}</small></div> : null}

                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 child">
                    <div className="input-content-block">
                      <label className="content" for="blood-grp">
                        Citizenship or Adhar Card number?<i className="required">*</i>
                      </label>
                      <input
                        className="input-field "
                        type="number"
                        min="0"
                        {...formik.getFieldProps("citizenship")}

                        placeholder="Citizenship/Adhar card no"
                      />
                      {formik.errors.citizenship ? <div style={{ color: "red" }}><small>{formik.errors.citizenship}</small></div> : null}

                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 child">
                    <div className="input-content-block">
                      <label className="content" for="blood-grp">
                        What was your date of recovery?
                      </label>
                      <input
                        className="input-field "
                        type="date"
                        {...formik.getFieldProps("recoveryDate")}

                      />
                      {formik.errors.recoveryDate ? <div style={{ color: "red" }}><small>{formik.errors.recoveryDate}</small></div> : null}

                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 child">
                    <div className="input-content-block">
                      <label className="content" for="blood-grp">
                        Have you donated blood before also?<i className="required">*</i>
                      </label>

                      <select
                        className="input-field"
                        name="donated-before"
                        id="donated-before"
                        {...formik.getFieldProps("donatedBefore")}

                      >
                        <option selected disabled value="">-- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {formik.errors.donatedBefore ? <div style={{ color: "red" }}><small>{formik.errors.donatedBefore}</small></div> : null}

                    </div>

                  </div>

                  <div className="col-lg-6 col-md-6 child">
                    <div className="input-content-block">
                      <label className="content" for="iseligible">
                        Is latest covid negative test in last 2 weeks?
                      </label>
                      <select
                        className="input-field"
                        name="iseligible"
                        id="iseligible"
                        {...formik.getFieldProps("iseligible")}
                      >
                        <option selected disabled value="">-- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No" >No</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 child">
                    <div className="input-content-block">
                      <label className="content" for="blood-grp">
                        Number of times you donated.
                      </label>
                      <input
                        className="input-field "
                        type="number"
                        min="0"
                        {...formik.getFieldProps("donationNumber")}

                        placeholder=""
                      />
                      {formik.errors.donationNumber ? <div style={{ color: "red" }}><small>{formik.errors.donatedNumber}</small></div> : null}

                    </div>
                  </div>
                </div>

                <div>
                  <label class="small-content ">
                    By submitting this form,you accept terms and conditions
                  </label>
                </div>
                <div class="text-center">
                  <button class="btn btn-primary btn-add" type="submit" onClick={() => formik.handleSubmit()}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    </>
  );
}

export default DonationForm;
