import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CustomBox from '@/components/CustomBox';

export default function Dashboard() {
  const [todayOrders, setTodayOrders] = useState(0);
  const [thisWeekOrders, setThisWeekOrders] = useState(0);
  const [thisMonthOrders, setThisMonthOrders] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [thisWeekRevenue, setThisWeekRevenue] = useState(0);
  const [thisMonthRevenue, setThisMonthRevenue] = useState(0);

  useEffect(() => {
    async function fetchData(url, setState) {
      const response = await fetch(url);
      const data = await response.json();
      setState(data.count || data.revenue); // count for orders, revenue for revenue
    }

    fetchData('/api/orders/today', setTodayOrders);
    fetchData('/api/orders/thisWeek', setThisWeekOrders);
    fetchData('/api/orders/thisMonth', setThisMonthOrders);
    fetchData('/api/revenue/today', setTodayRevenue);
    fetchData('/api/revenue/thisWeek', setThisWeekRevenue);
    fetchData('/api/revenue/thisMonth', setThisMonthRevenue);
  }, []);

  return (
    <Layout>
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
          <CustomBox header="Today" title={`$${todayRevenue.toFixed(2)}`} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomBox header="This week" title={`$${thisWeekRevenue.toFixed(2)}`} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomBox header="This Month" title={`$${thisMonthRevenue.toFixed(2)}`} />
        </Grid>
      </Grid>
    </Layout>
  );
}
