$(document).ready(function () {
   if(localStorage.getItem('currentUser')==null){
        window.location.replace("mainpage.html");
   }
    $('#logoutform').submit(function(){
        logOut();
    });
    $("#createGigForm").submit(function(){
        registerNotice();
    });

});

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