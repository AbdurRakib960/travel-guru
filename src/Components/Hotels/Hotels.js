import React from 'react';
import Header from '../Header/Header'
import blackLogo from '../../images/Logo-black.png'
import { Grid } from '@material-ui/core';

import {hotelsInfo} from '../../travelInfo'
import HotelDetails from '../HotelDetails/HotelDetails';
import Map from '../Map/Map';
const Hotels = () => {
    return (
        <div>
           <Header color="black" img={blackLogo}></Header>

           <Grid container item xs={12} justify="space-between">

               <Grid item xs={12} md={6}>
                {
                    hotelsInfo.map(hotel=>{
                        return (
                            <HotelDetails hotel={hotel}></HotelDetails>
                        )
                    })
                }
               </Grid>

               <Grid item xs={12} md={6}>
                <Map></Map>
               </Grid>
           </Grid>
        </div>
    );
};

export default Hotels;