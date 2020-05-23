import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {API} from '../../config';
import classes from './Cars.module.css'
import Footer from '../footer/footer'
class Cars extends Component {
    state = {
        cars : []
    }
    componentDidMount(){
        fetch(`${API}/cars`, {
            method: "GET",
          })
            .then((response) => {
                console.log(response)
              return response.json()
            })
            .then((response) => {
                this.setState({cars: response})
            })
            .catch((err) => {
              console.log(err)
            });
    }

    isAvailable = (bookings) => {
        let currentDate = Date.parse(new Date());
        //console.log(bookings)
        for(let el of bookings){
            if(Date.parse(el.issueDate)<= currentDate && Date.parse(el.returnDate) >= currentDate){
                return false;
            }
        }
        return true;
    }

    render(){
        return(
            <div>
                <div className={classes.container}>
                <h1 className={classes.heading}>Cars for Rent</h1>
                {this.state.cars.map((car, i)=>(
                    <div className={classes.row} key={i}>
                        <div className={classes.image}>
                            <img className={classes.img} src={`${API}/cars/photo/${car._id}`} alt="..."/>
                        </div>
                        <div className={classes.content}>
                            <h3>{car.model}</h3>
                            <div className={classes.detail}>
                                <span><i class="fas fa-eye-dropper"></i>{car.color}</span>
                                <span><i class="fas fa-car"></i>{car.seatingCapacity} Seater</span>
                            </div>
                        </div>
                        <div className={classes.rent}>
                            <h3>&#8377; {car.rent}</h3>
                        </div>
                        <div className={classes.book}>
                            {this.isAvailable(car.bookings) ? <button className={classes.bookBtn}><Link to={`/booking/${car._id}`} className={classes.bookLink}>Book Now</Link></button>:
                                    <button disabled type="button" className={[classes.bookBtn, classes.disabled].join(" ")} style={{pointerEvents: 'none'}}>Book Now</button>
                            }
                            
                            <button className={classes.detailsBtn}><Link to={`/car/${car._id}`} className={classes.link}>Details</Link></button>
                            {this.isAvailable(car.bookings) ?  null: <span>Currently Unavailable!</span>}
                            
                        </div>
                    </div>
                ))}
                <Footer></Footer>
            </div>
            
            </div>
            
        )
    }
}

export default Cars;