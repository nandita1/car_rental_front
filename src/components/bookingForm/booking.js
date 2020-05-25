import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {API} from '../../config';
import classes from './Booking.module.css';

class Booking extends Component {

    state = {
        name: "",
        phone: "",
        issueDate: "",
        returnDate: "",
        error:"",
        subError: false,
        success: false,
        car:""
    }
    componentDidMount(){
        //this.props.history.goBack()
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
                
                this.setState({...this.state, car: response.model})
            })
            .catch((err) => {
                this.setState({...this.state, error: err})
              console.log(err)
            })
    }
    inputChangeHandler = (event, name) => {
        //setValues({ ...values, error: false, [name]: event.target.value });
        
         const updatedControls = {
            ...this.state.controls,
            [name]: event.target.value
        };
        this.setState(updatedControls)
        
    };

    afterSetStateFinished = () => {
        if(!this.state.error){
            var formData = new FormData()
            formData.set("name", this.state.name)
            formData.set("phone", this.state.phone.substr(3))
            formData.set("issueDate", this.state.issueDate)
            formData.set("returnDate", this.state.returnDate)
            // Display the values
            fetch(`${API}/bookings/create/${this.props.match.params.carId}`,{
                method: "POST",
                body: formData
              })
            .then(response => {
                if (response.status === 400) {
                   this.setState({...this.state, subError: "Car not available", success: false})
              }
              else{
                this.setState({...this.state, subError: false, success: true})
              }
                //response.json()
            })
            .catch(err => {
                console.log(err)
                this.setState({...this.setState, success: false, subError: err})
            })
        }
    }

    checkValidity = () => {
        var pattern = new RegExp( /[+][9][1]\d{10}/)
        var error=""
        if(!pattern.test(this.state.phone)){
            error="Enter valid phone number"
            this.setState({...this.state, error: error},() => {
                this.afterSetStateFinished();
            })
            return
        }
        if(this.state.issueDate > this.state.returnDate){
            error="Return date should be greater than issue Date"
            this.setState({...this.state, error: error},() => {
                this.afterSetStateFinished();
            })
            return
        }
        this.setState({...this.state, error: ""},() => {
            this.afterSetStateFinished();
        })
    }

    clickSubmit = (event) => {
        event.preventDefault();
        this.checkValidity()
        
    }
    showError = () => {
        if(this.state.error)
            return (<span className={classes.error}>*{this.state.error}</span>)
        return null;
    }
    goback = () => {
        this.props.history.goBack();
    }
    render(){
        return(
        <div className={classes.container}>
            <h1>Booking Details</h1>
            {this.showError()}
            <form>
                <p>
                    <label for=""><h3>Name</h3></label><br></br>
                    <input type="text" required placeholder="John Doe" onChange={(event) => this.inputChangeHandler(event, "name")}></input>
                </p>
                <p>
                    <label for=""><h3>Contact Number</h3></label><br></br>
                    <input type="tel" required placeholder="+91" onChange={(event) => this.inputChangeHandler(event, "phone")}></input>
                </p>
                <p>
                    <label for=""><h3>Issue Date</h3></label><br></br>
                    <input type="date" required onChange={(event) => this.inputChangeHandler(event, "issueDate")}></input>
                </p>
                <p>
                    <label for=""><h3>Return Date</h3></label><br></br>
                    <input type="date" onChange={(event) => this.inputChangeHandler(event, "returnDate")} required></input>
                </p>
                <span className={classes.back} onClick={this.goback}><b>Back</b></span>
                <button type="submit" className={classes.submit} onClick={(event) => this.clickSubmit(event)}>Book Car</button>
            </form>
            {this.state.subError? (<div className={classes.modal}>

                <div className={classes.modalContent}>
                <h2>The Car is Not Available</h2>
                <Link to="/" className={classes.continue}>Continue</Link>
                <span className={classes.clear}></span>
                </div>

                </div>): null}
                {this.state.success? (<div className={classes.modal}>

                    <div className={classes.modalContent}>
                    <h2>Booking Confirmed!</h2>
                    <p>You have booked <b>{this.state.car}</b></p>
                    <p>for the duration <b>{this.state.issueDate} - {this.state.returnDate}</b></p>
                    <Link to="/" className={classes.continue}>Continue</Link>
                    <span className={classes.clear}></span>
                    </div>

                    </div>): null}
        </div>)
    }
}

export default Booking;