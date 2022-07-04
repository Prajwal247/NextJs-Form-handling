import { donationEligibility } from "../../datas/donationsEligibility"

export default function handler(req:any, res:any) {
  console.log(req)
  if(req.method === 'GET') {
    res.status(200).json({name:"Prazzwal"})
  }else if(req.method === "POST"){
    console.log("Hello");
    const donation = req.body.values;
    res.status(201).json(donation)
  }
}
