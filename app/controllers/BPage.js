
var bPageID;
document.addEventListener("DOMContentLoaded",function(){
    setupPage({bar : true, barBackButton : true});

    if(isToken()) {
        setbPageID(getURLParameter("dlid"));
        var perusData = getInfo(bPageID);
        alert(peruData.name);
        setPageTitle(perusData);
        appendImageAndUsername(perusData);

        var userInfo;
        getUserData(bPageID,function(userInfo){
            console.log(userInfo);
            parseBasicInfoPage(userInfo);
        });
       
        

    } else {
        alert("UNAUTHORISED");
    }
});


function setbPageID(id){
    bPageID = id;
}

function setPageTitle(info){
    $("#appTitle").text(info.name + ' - info');
}

function getUserInfo(bPageID) {
    return getOtherStream('perus',bPageID);
}

function parseBasicInfoPage(info){
    if(info==undefined){return;};
    
    appendInformation(info);
    appendPlace(info);
    appendLinks(info);
    appendContact(info);
}

function appendImageAndUsername(info){   
    $("#profileImage").attr('src', info.img);
    $("#Username").text(info.name); 
}


function appendInformation(info){
    $("#infoName").html(info.first_name + ' ' + info.middle_name + ' ' + info.last_name);
    $("#infoSex").html(info.sex);
    $("#infoBirthday").html(info.birthday_day + '.' + info.birthday_month + '.' + info.birthday_year);
    $("#infoLanguage").html(info.lang);
    $("#infoEducation").html(info.education);
}

function appendPlace(info){
    $("#infoAddress").html(info.address);
    $("#infoSityState").html(info.postal_code + ' ' + info.city + ' ' + info.country);
    $("#infoLongitude").html(info.long + '°');
    $("#infoLatitude").html(info.lat + '°');
}

function appendLinks(info){
    $("#infoFacebook").html(info.facebook_page);
        $("#infoFacebook").attr('href',info.facebook_page);
    $("#infoTwitter").html(info.twitter_page);
        $("#infoTwitter").attr('href',info.twitter_page);
    $("#infoLinkpage").html(info.linkedin_page);
        $("#infoLinkpage").attr('href',info.linkedin_page);
}
 function appendContact(info){
    $("#infoPhone").html(info.phone);
    $("#infoEmail").html(info.email);
        $("#infoEmail").attr('href', 'mailto:' + info.email);
    $("#infoHomePage").html(info.home_page);
        $("#infoHomePage").attr('href',info.home_page);
 }




