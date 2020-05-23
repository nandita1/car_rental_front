import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Cars from './components/cars/cars'
import Car from './components/car/car'
import Booking from './components/bookingForm/booking'

const Routes = () => {

    return (
   
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Cars}></Route>
                <Route path="/car/:carId" exact component={Car}></Route>
                <Route path="/booking/:carId" exact component={Booking}></Route>
            </Switch>
        </BrowserRouter>
    

)

}

export default Routes;