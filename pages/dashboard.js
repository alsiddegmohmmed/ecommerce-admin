import Layout from '@/components/Layout'
import React from 'react'
import Grid from '@mui/material/Grid';
import CustomBox from '@/components/CustomBox';

export default function dashboard() {
  return (
    <Layout>
        <h1 className='mt-4'>Orders</h1>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
                <CustomBox header="Today" title="16" />
            </Grid>
            <Grid item xs={14} sm={6} md={4}>
                <CustomBox header="This week" title="21" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <CustomBox header="This Month" title="28" />
            </Grid>
        </Grid>
        

        <h1 className='mt-4'>Revenue</h1>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
                <CustomBox header="Today" title="$101 656" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <CustomBox header="This week" title="$115 147" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <CustomBox header="This Month" title="$118 640" />
            </Grid>
        </Grid>




    </Layout>
   
  )
}
