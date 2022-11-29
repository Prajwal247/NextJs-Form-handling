import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDocs, collection, query } from "firebase/firestore";
import { db } from "../src/public/firebase";

const buildResultsDocs = (docs: any) => {
  const data: any = [];
  docs.forEach((doc: any) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export default function index() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [donations, setDonations] = useState<any>([]);

  const toForm = () => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      router.push("/DonationForm");
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    setLoading(true);
    const getJobs = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "bloodDonation"))
        );
        setDonations(buildResultsDocs(querySnapshot));
      } catch (error) {
        console.log(error);
      }
    };
    getJobs();
    setLoading(false);
  }, []);

  return (
    <div className="text-center">
      <div className="header">
        <h2 className="p-4 mt-2">Donate to Save Lives</h2>
        <p>
          Thank you for your donation to the cause of saving lives.
        </p>
        <small>
          {" "}
          We need some information before we proceed, Please fill the
          eligibility form by Pressing the begin button
        </small>
      </div>
      <div>
        <button
          className="px-3 py-2 m-3 btn btn-primary"
          onClick={() => toForm()}
        >
          Make Donation Pledge
        </button>
      </div>
      <div className="recent-donation mt-3">
        <h3>Recent Donation Pledges</h3>
        <div className="row">
          {donations?.map((donation: any, index: number) => (
            <div class="card  mx-5 col-6" key={index}>
              <div class="card-header text-center">
                <h5>{donation?.name}</h5>
              </div>
              <div class="card-body">
                <h6>Information</h6>
                <div className="row">
                  <div className="col-6">
                    <p className="">Email:  {donation?.email}</p>
                  </div>
                  <div className="col-6">
                    <p className="">Contact Number:  {donation?.mobile}</p>
                  </div>
                  <div className="col-6">
                    <p className="">Blood Group:  {donation?.blood}</p>
                  </div>
                  <div className="col-6">
                    <p className="">country:  {donation?.country}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
