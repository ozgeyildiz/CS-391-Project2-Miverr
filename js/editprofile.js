$(document).ready(function () {
    if(localStorage.getItem('currentUser')!= null){
        var user = fetchUserFromUsername(localStorage.getItem('currentUser'));
        document.getElementById('pic').appendChild(displayProfilePictureProfile(user));
        createUserInfoEditField(user);
        displayTitleList(user);
        createSubmitButton();
    }
    //var notices = getUserNoticeInfo(user);
    else{
        window.location.replace("mainpage.html");
   }
   $('#logoutform').submit(function(){
    logOut();
    });
   $('#noticesform').submit(function(){
        saveUpdates();
   });

});
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
