import {mongooseConnect} from "@/lib/mongoose";
import {Order} from "@/pages/Order";

export default async function handler(req,res) {
  await mongooseConnect();
  res.json(await Order.find().sort({createdAt:-1}));
}


