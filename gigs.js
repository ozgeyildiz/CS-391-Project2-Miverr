import React, {Component} from 'react';

import '../css/layout.css';

class Gigs extends Component {
    render() {
	    return (
		<div className="row ">
        <div className="medium-12 columns"/>
        <div id="header">
        <a href="mainpage.html">
        <img id="logo" src="./res/logo.png"/>

    </a>
    <a href = "mainpage.html"> 
        <h2 id="homebutton">Home</h2>
    </a>
    <a href="./profile.html">
        <h2 id="profileButton">Profile</h2>
    </a>

    <a href="./gigs.html">
        <h2 id="gigs">Create Notices</h2>
    </a>
    <a href="./offeredgigs.html">
        <h2 id="offeredgigs">Gigs Offered</h2>
    </a>
            <p>
                <form id="logoutform" method="post">
			        <input type="hidden" value="1"/>
			        <input class="button" type="submit" value="Logout" id="logout"/>
		        </form>
            </p>

        </div>
        <div className="gigFormContainer">
        <form id="createGigForm" method="post">
            <label for title class="prettyColorText">Title:</label>
            <br/>
            <input id="title" class="titleBox" type="text" placeholder="Enter a title" maxlength="100" required/>
            <br/>
            <label for description class="prettyColorText">Job Description (max 600 characters):</label>
            <br/>
            <textarea id="description" class="descriptionBox" cols="40" rows="5" maxlength="600" required></textarea> 
            <br/>
            <input class="button" style={{marginTop: '5px'}} type="submit" value="Upload"/>
    </form>
    <footer>
    <h2>CS391 Project</h2>

    <div id="footer">
    <img id="logo" src="../res/logo.png"/>

    </div>
    </footer>
        </div>
        </div>
        );
        }
    }

    export default Gigs;
        