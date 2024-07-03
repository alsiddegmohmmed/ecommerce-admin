// pages/admin/dashboard.js
import Layout from '@/components/Layout';
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

export default function Home() {
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
        const [
          todayOrdersRes,
          thisWeekOrdersRes,
          thisMonthOrdersRes,
          todayRevenueRes,
          thisWeekRevenueRes,
          thisMonthRevenueRes,
        ] = await Promise.all([
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
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const session = {
    user: {
      name: 'Siddeg Omer',
      image: './-s6afmh.jpg',
      email: 'alsiddeg.omer19990@gmail.com', // Replace with your admin email
    },
  };

  // Check if session exists (simulating logged-in state)
  const isLoggedIn = !!session;

  if (!isLoggedIn) {
    return (
      <Layout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgcolor="background.default"
        >
          <Typography variant="h5" color="textPrimary">
            You are not logged in. Please log in to access the application.
          </Typography>
        </Box>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box p={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" color="textPrimary">
            Hello, <b>{session.user.name}</b>
          </Typography>
          <Box display="flex" alignItems="center"   p={1} borderRadius="16px">
            <Avatar src={session.user.image} alt={session.user.name} />
            <Typography variant="" color="textPrimary" ml={2}>
              {session.user.name}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h5" color="textPrimary" mb={2}>
          Orders
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Today
                </Typography>
                <Typography variant="h5">
                  {todayOrders}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  This week
                </Typography>
                <Typography variant="h5">
                  {thisWeekOrders}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  This Month
                </Typography>
                <Typography variant="h5">
                  {thisMonthOrders}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" color="textPrimary" mt={4} mb={2}>
          Revenue
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Today
                </Typography>
                <Typography variant="h5">
                  ${todayRevenue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  This week
                </Typography>
                <Typography variant="h5">
                  ${thisWeekRevenue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  This Month
                </Typography>
                <Typography variant="h5">
                  ${thisMonthRevenue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
