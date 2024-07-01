// pages/api/revenue/thisMonth.js

import { mongooseConnect } from "@/lib/mongoose";
import { Order } from '@/models/Order';
import dayjs from 'dayjs';

export default async function handler(req, res) {
    await mongooseConnect();
  
    const startOfMonth = dayjs().startOf('month').toDate();
    const endOfMonth = dayjs().endOf('month').toDate();
  
    const orders = await Order.find({
      createdAt: { $gte: startOfMonth, $lt: endOfMonth },
      paid: true,
    });
  
    const totalRevenue = orders.reduce((acc, order) => {
      const orderRevenue = order.line_items.reduce((lineAcc, item) => {
        return lineAcc + (item.price_data.unit_amount * item.quantity / 100); // unit_amount is in cents
      }, 0);
      return acc + orderRevenue;
    }, 0);
  
    res.status(200).json({ revenue: totalRevenue });
  }
