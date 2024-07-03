// pages/admin/dashboard.js
import Layout from '@/components/Layout';
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CustomBox from '@/components/CustomBox';
import axios from 'axios';

export default function Dashboard() {
  const [todayOrders, setTodayOrders] = useState(0);
  const [thisWeekOrders, setThisWeekOrders] = useState(0);
  const [thisMonthOrders, setThisMonthOrders] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [thisWeekRevenue, setThisWeekRevenue] = useState(0);
  const [thisMonthRevenue, setThisMonthRevenue] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [todayOrdersRes, thisWeekOrdersRes, thisMonthOrdersRes, todayRevenueRes, thisWeekRevenueRes, thisMonthRevenueRes] = await Promise.all([
          axios.get('/api/orders/today'),
          axios.get('/api/orders/thisWeek'),
          axios.get('/api/orders/thisMonth'),
          axios.get('/api/revenue/today'),
          axios.get('/api/revenue/thisWeek'),
          axios.get('/api/revenue/thisMonth'),
        ]);

        setTodayOrders(todayOrdersRes.data.count || 0);
        setThisWeekOrders(thisWeekOrdersRes.data.count || 0);
        setThisMonthOrders(thisMonthOrdersRes.data.count || 0);
        setTodayRevenue(todayRevenueRes.data.revenue || 0);
        setThisWeekRevenue(thisWeekRevenueRes.data.revenue || 0);
        setThisMonthRevenue(thisMonthRevenueRes.data.revenue || 0);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  const session = {
    user: {
      name: "Siddeg Omer",
      image: "https://lh3.googleusercontent.com/ogw/AF2bZyhhOdiUSDOcitII29_hcoAk8HwLB4g2lcBo1kiVUxX-3HA=s64-c-mopg",
      email: "alsiddeg.omer19990@gmail.com", // Replace with your admin email
    },
  };

  // Check if session exists (simulating logged-in state)
  const isLoggedIn = !!session;

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="bg-blue-900 w-screen h-screen flex items-center">
          <div className="text-center w-full">
            <p className="text-white text-lg">
              You are not logged in. Please log in to access the application.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>Hello, <b>{session.user.name}</b></h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img src={session.user.image} alt="" className="w-6 h-6" />
          <span className="px-2">{session.user.name}</span>
        </div>
      </div>
      <h1 className='mt-4'>Orders</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <CustomBox header="Today" title={todayOrders.toString()} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomBox header="This week" title={thisWeekOrders.toString()} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomBox header="This Month" title={thisMonthOrders.toString()} />
        </Grid>
      </Grid>

      <h1 className='mt-4'>Revenue</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <CustomBox header="Today" title={`$${todayRevenue}`} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomBox header="This week" title={`$${thisWeekRevenue}`} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomBox header="This Month" title={`$${thisMonthRevenue}`} />
        </Grid>
      </Grid>
    </Layout>
  );
}
