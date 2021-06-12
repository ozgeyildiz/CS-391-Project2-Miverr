import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Gigs from './gigs'
import '../css/layout.css';


class Home extends Component {
    render() {
	    return (
		<div className="row ">
	           <div className="medium-12 columns"/>
               <div id="header">
        <a href="Home.js">
        <img id="logo" src="/src/res/logo.png"/>

    </a>
    <a href = "Home.js"> 
        <h2 id="homebutton">Home</h2>
    </a>
    <a href="./profile.js">
        <h2 id="profileButton">Profile</h2>
    </a>

    <a href={Gigs}>
        <h2 id="gigs">Create Notices</h2>
    </a>
    <a href="./offeredgigs.js">
        <h2 id="offeredgigs">Gigs Offered</h2>
    </a>
    
            <p>
                <form id="logoutform" method="post">
			        <input type="hidden" value="1"/>
			        <input classsName="button" type="submit" value="Logout" id="logout"/>
		        </form>
            </p>
</div>





    <form id="loginform" method="post">
        <h2 classsName="prettyColorText" >Sign In</h2>

        <label for username>Username: </label>
        <br/>
        <input id="usernameLogin" type="text" minlength="5" maxlength="15" required/>
        <br/>

        <label for password>Password:</label>
        <br/>
        <input id="passwordLogin" type="password" minlength="6" required/>
        <br/>

        <input classsName="button" style={{marginTop: '10px'}} type="submit" value="Sign in"/>

    </form>

    
    <div>
        <h2 classsName="prettyColorText">Register</h2>

        <form id="userreg" method="post">

            <label for mail>Mail address:</label>
            <br/>
            <input id="mail" type="email" placeholder="Enter your Email Address" required/>
            <br/>
            <label for username>Username:</label>
            <br/>
            <input id="username" type="text" minlength="4" maxlength="20" required/>
            <br/>
            <label for password>Password:</label>
            <br/>
            <input id="password" type="password" minlength="6" required/>
            <br/>
            <label for firstname>Full Name:</label>
            <br/>
            <input id="name" type="text" maxlength="30" required/>
            <br/>
            <label for country>Country:</label>
            <br/>
            <select name="country" id="country" selected="Turkey" required>
                <option value="Turkey">Tr</option>
                <option value="United States">Us</option>
                <option value="New Zealand">Nz</option>
                <option value="Germany">Gr</option>
            </select>
            <br/>
            <input classsName="button" style={{marginTop: '5px'}} type="submit" value="Register"/>
            
        </form>
        </div>
    
    <div id="profile">
        <div classsName="userProfile">
            <h3 id="userName"> </h3>

            <h1 classsName="mainInformationBox">Welcome to Miverr!</h1>
            <h3>In this website, you can publish notices on the jobs you want to hire people for!</h3>
            <h3>Find numerous jobs, get the employer's information to negotiate in private!</h3>
        </div>
    </div>
    <div id="feed">
        <article classsName="talentArticle">
            <h2>Discover Great Talent</h2>
            <p>Curated Talent Awaits You</p>
        </article>

        <article classsName="thingsArticle">
            <h2>Get Things Done</h2>
            <p>We have an outstanding team ready to accomplish your most demanding tasks</p>
        </article>

    </div>
    </div>
        );
        }
    }
export default Home;