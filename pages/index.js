import Layout from '@/components/Layout';
import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, CircularProgress, IconButton } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Notifications, Person } from '@mui/icons-material';
import axios from 'axios';

const Dashboard = () => {
  const [todayOrders, setTodayOrders] = useState(0);
  const [thisWeekOrders, setThisWeekOrders] = useState(0);
  const [thisMonthOrders, setThisMonthOrders] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [thisWeekRevenue, setThisWeekRevenue] = useState(0);
  const [thisMonthRevenue, setThisMonthRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/dashboard');
        const data = response.data;

        setTodayOrders(data.orders.day);
        setThisWeekOrders(data.orders.week);
        setThisMonthOrders(data.orders.month);
        setTodayRevenue(data.revenue.day);
        setThisWeekRevenue(data.revenue.week);
        setThisMonthRevenue(data.revenue.month);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  const session = {
    user: {
      name: "Siddeg Omer",
      image: "./-s6afmh.jpg",
      email: "alsiddeg.omer19990@gmail.com",
    },
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h4">Hello, <b>{session.user.name}</b></Typography>
          <div className="flex items-center">
            <IconButton>
              <Notifications />
            </IconButton>
            <div className="flex items-center bg-gray-300 p-2 rounded-lg ml-2">
              <img src={session.user.image} alt="Profile" className="w-6 h-6 rounded-full" />
              <Typography className="ml-2">{session.user.name}</Typography>
            </div>
          </div>
        </div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper className="p-4">
              <Typography variant="h6">Today's Orders</Typography>
              <Typography variant="h4">{todayOrders}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="p-4">
              <Typography variant="h6">This Week's Orders</Typography>
              <Typography variant="h4">{thisWeekOrders}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="p-4">
              <Typography variant="h6">This Month's Orders</Typography>
              <Typography variant="h4">{thisMonthOrders}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={4} className="mt-4">
          <Grid item xs={12} md={4}>
            <Paper className="p-4">
              <Typography variant="h6">Today's Revenue</Typography>
              <Typography variant="h4">${todayRevenue}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="p-4">
              <Typography variant="h6">This Week's Revenue</Typography>
              <Typography variant="h4">${thisWeekRevenue}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="p-4">
              <Typography variant="h6">This Month's Revenue</Typography>
              <Typography variant="h4">${thisMonthRevenue}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="h5" className="mt-8">Sales Overview</Typography>
        <ResponsiveContainer width="100%" height={300} className="mt-4">
          <LineChart data={[{ name: 'Jan', uv: 400, pv: 2400, amt: 2400 }, /* Add your data here */]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
};

export default Dashboard;
