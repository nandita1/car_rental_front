import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {API} from '../../config';
import classes from './Car.module.css';
import Footer from '../footer/footer'

class Car extends Component{
    state = {
      id:'',
      bookings:[],
      model: '',
      vehicleNo: '',
      rent: '',
      seatingCapacity: '',
      color: '',
      error: false,
      months : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    }
    
    componentDidMount(){
        const carId = this.props.match.params.carId;
        console.log(carId)
        fetch(`${API}/car/${carId}`,{
            method: "GET",
          })
            .then((response) => {
                
              return response.json()
            })
            .then((response) => {
                console.log(response)
                //this.setState({car: {...response}})
                let bookings = []
                response.bookings.forEach(el => {
                  bookings.push(el)
                });
                this.setState({...this.state, id: response._id, bookings:bookings, model: response.model, rent: response.rent, vehicleNo: response.vehicleNo, color: response.color, seatingCapacity: response.seatingCapacity})
            })
            .catch((err) => {
                this.setState({...this.state, error: err})
              console.log(err)
            })
    }

    
    isAvailable = (bookings) => {
      let currentDate = Date.parse(new Date());
      
      for(let el of bookings){
        console.log(new Date(el.issueDate))
        if(Date.parse(el.issueDate)<= currentDate && Date.parse(el.returnDate) >= currentDate){
            return false;
        }
    }
        
        return true;
  }

    render(){
      return(
        <div className={classes.main}>
          <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.image}>
            <img className={classes.img} src={`${API}/cars/photo/${this.state.id}`} alt="..."/>
          </div>
          <div className={classes.content}>
            <h1>{this.state.model}</h1>
              <div className={classes.detail}>
                <span><i class="fas fa-eye-dropper"></i>{this.state.color}</span>
                <span><i class="fas fa-car"></i>{this.state.seatingCapacity} Seater</span>
              </div>
            <p className={classes.rent}>Rent per day: &#8377; <b>{this.state.rent}</b></p>
            <div className={classes.book}>
              {this.isAvailable(this.state.bookings) ? <button className={classes.bookBtn}><Link to={`/booking/${this.state.id}`} className={classes.bookLink}>Book Now</Link></button>:
                <button disabled type="button" className={[classes.bookBtn, classes.disabled].join(" ")} style={{pointerEvents: 'none'}}>Book Now</button>
              }
              {this.isAvailable(this.state.bookings) ?  null: <span>Currently Unavailable!</span>}
                            
            </div>
          </div>
         
        </div>
        <div className={classes.carDetails}>
          <h2>Car Details</h2>
          <p>Vehicle No. {this.state.vehicleNo}</p>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div>
          <h2>Current Bookings</h2>
          <table style={{width: '100%'}}>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Issue Date</th>
              <th>Return Date</th>
            </tr>
            {this.state.bookings.map((booking, i)=>(
              <tr className={classes.bookings}>
                <td>{booking.customer.name}</td>
                <td>{booking.customer.phone}</td>
                <td>{new Date(booking.issueDate).getDate()} {this.state.months[new Date(booking.issueDate).getMonth()]} {new Date(booking.issueDate).getFullYear()}</td>
                <td>{new Date(booking.returnDate).getDate()} {this.state.months[new Date(booking.returnDate).getMonth()]} {new Date(booking.returnDate).getFullYear()}</td>
              </tr>
            ))}
          </table>

        </div>
       
      </div>
      <Footer></Footer>
        </div>)
      
    }
}

export default Car