import React from "react";
import classes from './Footer.module.css'
const Footer = () => (
  <div>
    <h1>Rent Vroom</h1>
    <p>Rent Vroom Pvt. Ltd.</p>
    <p>No: 296, 3rd Cross Rd, Jakkasandra, 1st Block, Koramangla</p>
    <p>Bengaluru, Karnataka 560034</p>
    <div className={classes.icons}>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-instagram"></i>
        <i class="fab fa-linkedin"></i>
    </div>
    <div className={classes.links}>
        <span>Home</span>
        <span>Contact</span>
        <span>About</span>
    </div>
  </div>
);

export default Footer;