$(document).ready(function () {
    $('#logout').hide();
    $('#profileButton').hide();
    $('#gigs').hide();
    $('#offeredgigs').hide();
    if(localStorage.getItem("currentUser")!=null){
        $('#signinform').hide();
        $('#loginform').hide();
        $('#logout').show();
        $('#gigs').show();
        $('#offeredgigs').show();
        $('#profileButton').show();
        document.getElementById('userName').innerHTML = "Welcome back "+localStorage.getItem('currentUser') + "!";
        
        displayGigs();
    }
    $("#userreg").submit(function () {
        registerUser();
    });

    $("#loginform").submit(function () {
        logIn();
    });
    $('#logoutform').submit(function() {
        logOut();
    });

});





function registerUser(){
    var userInfo = getUserRegisterData();
    var exists = checkUsername(userInfo.username);
    if(!exists){
        storeUser(userInfo.mail, userInfo.username, userInfo.password, userInfo.name, userInfo.country);
        alert("Registration completed! You can now log in.");
    }
    else {
        alert("Username already exists! Pick another one.");
    }
}
function logIn(){
    var userInfo = getUserLoginData();
    if(localStorage.getItem('userList') != null){
        var user = fetchUserFromUsername(userInfo.username);
        var exists = checkUsername(userInfo.username);
        if(!exists || user.password != userInfo.password){
            alert("Cannot log in! Make sure you write the login information correctly.");
        }
        else{
            localStorage.setItem("currentUser",userInfo.username);
        }
    }
    else{
        alert("Cannot log in! Make sure you are signed up.")

    }
    
}


function storeUser(mail, username, password , name , country){

    if(localStorage.getItem('userList') != null){ //get the existing data and append new info to it
        var users = JSON.parse(localStorage.getItem('userList'));
        var userData = {
            "id": users[users.length-1].id + 1,
            "mail": mail,
            "username": username,
            "password":password,
            "name":name,
            "country":country,
            "balance":500
        }
    }
    else { //initiate the json array list for users registeration information
        var users = [];
        var userData = {
            "id": 1,
            "mail": mail,
            "username": username,
            "password":password,
            "name":name,
            "country":country,
            "balance":500
        }
    }
    users.push(userData);
    users = JSON.stringify(users);
    localStorage.setItem('userList', users);

}
function getUserRegisterData(){
    var mail = document.getElementById('mail').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var name = document.getElementById('name').value;
    var country = document.getElementById('country').value;

    return {
        mail,username,password,name,country
    };
}

function getUserLoginData(){
    var username = document.getElementById('usernameLogin').value;
    var password = document.getElementById('passwordLogin').value;

    return {
        username,password
    };
}
function displayGigs(){
    
    if(localStorage.getItem('gigs')!=null){
        var gigs = JSON.parse(localStorage.getItem('gigs'));
        var outerFrame = document.createElement('div');

        for(var i = 0;i<gigs.length;i++){
    
            var innerFrame = document.createElement('article');
            innerFrame.classList.add("feedBox");
            var title = document.createElement('h3');
            var description = document.createElement('p');
            var owner = document.createElement('p');
            var contact = document.createElement('p');

            var contactInformation = fetchUserFromUsername(gigs[i].owner).mail;

            owner.style.textAlign = "right";
    
            title.innerHTML = gigs[i].title;
            title.classList.add("prettyColorText");
            contact.innerHTML = "Contact from: " + contactInformation;
            description.innerHTML = gigs[i].description;
            owner.innerHTML = "Requested by: " +gigs[i].owner;
            owner.appendChild(displayProfilePictureOnNotices(gigs[i].owner));
            owner.appendChild(contact);

            innerFrame.appendChild(title);
            innerFrame.appendChild(description);
            innerFrame.appendChild(owner);
            outerFrame.appendChild(innerFrame);
            
        }
        document.getElementById('feed').appendChild(outerFrame);
    
    }
    else{
            var innerFrame = document.createElement('h1');
            innerFrame.classList.add("feedBox");
            innerFrame.innerHTML = "No notices to show! Be the first one to create one!"
            document.getElementById('feed').appendChild(innerFrame);

    }
    
    function createUserInfoEditField(user){

        var username = document.createElement('h2');
        username.innerHTML = "Username: "+ user.username;
        document.getElementById('username').appendChild(username);


        var br = document.createElement('h3');
        br.innerHTML= "Full Name";
        document.getElementById('fullname').appendChild(br);

        var changeName = document.createElement('input');
        changeName.type = "text";
        changeName.id = "name";
        changeName.maxLength = "30";
        changeName.value = user.name;
        document.getElementById('fullname').appendChild(changeName);


        var br = document.createElement('h3');
        br.innerHTML= "Country";
        document.getElementById('country').appendChild(br);


            var countryList = ["United States", "Turkey","New Zealand", "Germany"];
            var countryAbbr = ["Us","Tr","Nz","Gr"];
            var changeCountry = document.createElement('select');
            changeCountry.name = "country";
            changeCountry.id = "countryOption";
            for(var a = 0;a<countryList.length;a++){
                var option = document.createElement('option');
                option.value = countryList[a];
                option.innerHTML = countryAbbr[a];
                if(countryList[a]==user.country){
                    option.selected = "true";
                }
                changeCountry.add(option);
            }

        document.getElementById('country').appendChild(changeCountry);



        var br = document.createElement('h3');
        br.innerHTML= "Email";
        document.getElementById('email').appendChild(br);

        var changeEmail = document.createElement('input');
        changeEmail.type = "email";
        changeEmail.id = "mail";
        changeEmail.value = user.mail;
        document.getElementById('email').appendChild(changeEmail);



        var br = document.createElement('h3');
        br.innerHTML= "Password";
        document.getElementById('passwordBox').appendChild(br);

        var changePass = document.createElement('input');
        changePass.type = "password";
        changePass.id = "password";
        changePass.minLength = "6";
        changePass.value= user.password;
        document.getElementById('passwordBox').appendChild(changePass);


    }
    function displayTitleList(user){
        if(localStorage.getItem('gigs')!= null && getGigsByUsername(user.username).length>0){
                var gigs = JSON.parse(localStorage.getItem('gigs'));
                var sel = document.createElement('select');
                sel.id="titlesToDelete";
                sel.multiple="multiple";
                sel.size = 10;
                var count = 1;
                for(var i = 0;i<gigs.length;i++){
                    if(gigs[i].owner == user.username){
                        var title = document.createElement('option');
                        title.value = gigs[i].title;
                        title.innerHTML = gigs[i].title;
                        count++;
                        sel.appendChild(title);
                    }
                }
                document.getElementById('titleList').appendChild(sel);
        }
        else {
            var innerFrame = document.createElement('h1');
                innerFrame.classList.add("editProfileErrorBox");
                innerFrame.innerHTML = "You have no public notices to remove!";
                document.getElementById('titleList').appendChild(innerFrame);
        }
    }
    function createSubmitButton(){
        var button = document.createElement('input');
        button.type = "submit";
        button.classList.add("button");
        button.value="Save";
        button.id="editSubmit";
        document.getElementById('noticesform').appendChild(button);
    }
    function getSubmittedParameters(){
        var fullname = document.getElementById('name').value;
        var country = document.getElementById('countryOption').value;
        var mail = document.getElementById('mail').value;
        var password = document.getElementById('password').value;
        console.log(password);
        var titlesToDelete = $('#titlesToDelete').val();

        return {
            fullname,country,mail,password,mail,titlesToDelete
        };
    }
    function saveUpdates(){
        var newInfo = getSubmittedParameters();
            var user = fetchUserFromUsername(localStorage.getItem('currentUser'));

            var users = JSON.parse(localStorage.getItem('userList'));

            var userIndex = getUserIndex(user.username);


            users[userIndex].name = newInfo.fullname;
            users[userIndex].country = newInfo.country;
            users[userIndex].mail = newInfo.mail;
            users[userIndex].password = newInfo.password;


            if(newInfo.titlesToDelete !=null){
                var gigs = JSON.parse(localStorage.getItem('gigs'));
                for(var i = 0;i<gigs.length;i++){
                    if(gigs[i].owner == user.username && newInfo.titlesToDelete.includes(gigs[i].title)){
                        gigs.splice(i,1);
                    }
                }
                localStorage.setItem("gigs",JSON.stringify(gigs));
            }


            localStorage.setItem("userList",JSON.stringify(users));
    }
    
    function getRegisteredNotice(){
        var title = document.getElementById('title').value;
        var description = document.getElementById('description').value;
        return {
            title,description
        };
    }
    function storeNotice(title,description){
        var user = localStorage.getItem('currentUser');
        if(localStorage.getItem('gigs')!=null){
            var gigs = JSON.parse(localStorage.getItem('gigs'));
            var notice = {
                "id" : gigs[gigs.length-1].id + 1,
                "title": title,
                "owner": user,
                "description":description
            }
        }
        else {
            gigs = [];
            var notice = {
                "id" : 1,
                "title": title,
                "owner": user,
                "description":description
            }
        }
        console.log(notice);
        gigs.push(notice);
        gigs=JSON.stringify(gigs);
        localStorage.setItem('gigs',gigs);
    }
    function registerNotice(){
        var noticeInfo = getRegisteredNotice();
        storeNotice(noticeInfo.title,noticeInfo.description);
        alert("Notice uploaded successfully!");

    }

    function displayGigs(){
        
        if(localStorage.getItem('gigs')!=null){
            var gigs = JSON.parse(localStorage.getItem('gigs'));
            var outerFrame = document.createElement('div');

            for(var i = 0;i<gigs.length;i++){
        
                var innerFrame = document.createElement('article');
                innerFrame.classList.add("feedBox");
                var title = document.createElement('h3');
                var description = document.createElement('p');
                var owner = document.createElement('p');
                var contact = document.createElement('p');

                var contactInformation = fetchUserFromUsername(gigs[i].owner).mail;

                owner.style.textAlign = "right";
        
                title.innerHTML = gigs[i].title;
                title.classList.add("prettyColorText");
                contact.innerHTML = "Contact from: " + contactInformation;
                description.innerHTML = gigs[i].description;
                owner.innerHTML = "Requested by: " +gigs[i].owner;
                owner.appendChild(displayProfilePictureOnNotices(gigs[i].owner));
                owner.appendChild(contact);

                innerFrame.appendChild(title);
                innerFrame.appendChild(description);
                innerFrame.appendChild(owner);
                outerFrame.appendChild(innerFrame);
                
            }
            document.getElementById('feed').appendChild(outerFrame);
        
        }
        else{
                var innerFrame = document.createElement('h1');
                innerFrame.classList.add("feedBox");
                innerFrame.innerHTML = "No notices to show! Be the first one to create one!"
                document.getElementById('feed').appendChild(innerFrame);

        }
        
        
    }

    var balance = 500;

    function buyWebDesign() {
        var user = localStorage.getItem("currentUser");
        balance -= 30;
        if (user.balance > 30) {
            user.balance -= 30;
        }
        localStorage.setItem("currentUser",user);


        setBalanceText();
    }

    function buyMusicCover() {
        var user = localStorage.getItem("currentUser");
        balance -= 10;
        if (user.balance > 10) {
            user.balance -= 10;
        }
        localStorage.setItem("currentUser",user);

        setBalanceText();
    }
    function buyVoiceActing() {
        var user = localStorage.getItem("currentUser");
        balance -= 10;
        if (user.balance > 10) {
            user.balance -= 10;
        }
        localStorage.setItem("currentUser",user);

        setBalanceText();
    }


    function setBalanceText() {
        var user = localStorage.getItem("currentUser");
        
        document.getElementById('balanceText').innerHTML = balance + "$";
    }
    
    function displayUserGigs(user){

        if(localStorage.getItem('gigs')!=null && getGigsByUsername(user.username).length>0){
            var gigs = JSON.parse(localStorage.getItem('gigs'));
            var outerFrame = document.createElement('div');

            for(var i = 0;i<gigs.length;i++){
                if(gigs[i].owner == user.username){

                    var innerFrame = document.createElement('article');
                    innerFrame.classList.add("feedBox");
                    var title = document.createElement('h3');
                    var description = document.createElement('p');
                    var owner = document.createElement('p');
            
                    title.innerHTML = gigs[i].title;
                    description.innerHTML = gigs[i].description;
                    owner.innerHTML = "Requested by: " +gigs[i].owner;
            
                    innerFrame.appendChild(title);
                    innerFrame.appendChild(description);
                    innerFrame.appendChild(owner);
                    outerFrame.appendChild(innerFrame);
                }
                
            }
            document.getElementById('feed').appendChild(outerFrame);
        
        }
        else{

                var innerFrame = document.createElement('h1');
                innerFrame.classList.add("feedBox");
                innerFrame.innerHTML = "No notices to show! Create one!"
                document.getElementById('feed').appendChild(innerFrame);

        }
        
        
    }
    function displayUserInformation(user){

        var fullname = document.createElement('h2');
        fullname.innerHTML = "Welcome back " + user.name + "!";
        document.getElementById('fullname').appendChild(fullname);

        var username = document.createElement('h4');
        username.innerHTML = "Username: " + user.username;
        document.getElementById('username').appendChild(username);

        var email = document.createElement('email');
        email.innerHTML = "Mail: "+ user.mail;
        document.getElementById('email').appendChild(email);
    }
    function fetchUserFromUsername(username){
        var userIndex = getUserIndex(username);
        if(localStorage.getItem('userList')!=null){
            var users = JSON.parse(localStorage.getItem('userList'));
            return users[userIndex];
        }
    }
    function getUserIndex(username){
        var users = JSON.parse(localStorage.getItem('userList'));
        for(var i = 0;i<users.length;i++){
            if(users[i].username == username){
                return i;
            }
        }
            return -1;
    }
    function checkUsername(username){
        if(localStorage.getItem('userList') != null){
            var users = JSON.parse(localStorage.getItem('userList'));
            if(getUserIndex(username) == -1){
                return 0;
            }
            else {
                return 1;
            }
        }
        else{
            return 0;
        }
    }
    function getGigsByUsername(username){
        if(localStorage.getItem('gigs')!=null){
            var gigs = JSON.parse(localStorage.getItem('gigs'));
            var usergigs = [];
            for(var i = 0;i<gigs.length;i++){
                if(gigs[i].owner == username){
                    usergigs.push(gigs[i]);
                }
            }
        }
        return usergigs;
    }
    function displayProfilePictureProfile(user){
        var img = document.createElement('img');
        switch(user.country)
        {
            case "Turkey":
                img.src = "./res/tr.png";
                break;
            case "Germany":
                img.src = "./res/gr.png";
                break;
            case "United States":
                img.src = "./res/us.png";
                break;
            case "New Zealand":
                img.src = "./res/nz.png";
                break;

        }
        img.classList.add("profilePic");
        return img;
    }
    function displayProfilePictureOnNotices(username){
        var user = fetchUserFromUsername(username);
        var img = document.createElement('img');
        switch(user.country)
        {
            case "Turkey":
                img.src = "./res/tr.png";
                break;
            case "Germany":
                img.src = "./res/gr.png";
                break;
            case "United States":
                img.src = "./res/us.png";
                break;
            case "New Zealand":
                img.src = "./res/nz.png";
                break;

        }
        img.classList.add("smallProfilePic");
        return img;
    }
    function logOut(){
        localStorage.removeItem("currentUser");
    }
}
