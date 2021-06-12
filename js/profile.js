$(document).ready(function () {
    if(localStorage.getItem('currentUser')!= null){
        var user = fetchUserFromUsername(localStorage.getItem('currentUser'));
        document.getElementById('pic').appendChild(displayProfilePictureProfile(user));
        displayUserInformation(user);
        displayUserGigs(user);
    }
    //var notices = getUserNoticeInfo(user);
    else{
        window.location.replace("mainpage.html");
   }
    $('#logoutform').submit(function(){
        logOut();
    });
    $('#edit').click(function(){
        document.location.href = "editprofile.html";
    });
});


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
