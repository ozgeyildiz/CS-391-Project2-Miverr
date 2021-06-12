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
