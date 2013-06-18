var bPageID;
function initBPage() {

    setupPage({
        bar: true,
        barBackButton: false
    });
    
    setupPage({bar : true, barBackButton : true});

    if(isToken()) {
        setbPageID(getURLParameter("dlid"));
        getInfo(bPageID, function(perusData){
            setPageTitle(perusData);
            appendImageAndUsername(perusData);
        });

        getUserData(bPageID,function(userInfo){
            //console.log(userInfo);
            parseBasicInfoPage(userInfo);
        }, function(){
            $("#userData").hide();
        });      
    } else {
        alert("UNAUTHORISED");
    }
}


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

    var image = "";
    if(info.img == "") {
        image = '../../resources/images/tyhja.png';
    } else {
        image = info.img
    }

    $("#profileImage").attr('src', image);
    $("#Username").text(info.name); 
    $("#Role").text(info.type);
}
function wordFrom(a){
    if (a==undefined){
        return "-";
    } 
    return a;
}
function textFrom(a,b,c){
    if (a==undefined && b == undefined && c==undefined){
        return "-";
    }
    var text= wordFrom(a) + ' ' + wordFrom(b) + ' ' + wordFrom(c);
    return text
}

function appendInto(element, text){
    if (text=='-'){
        $(element).parents('tr').hide();
        return '';
    } 
    $(element).html(text);
    return 'not empty';
}

function setVisibilityOf(element, rowsContent){
    if (rowsContent == ''){
        $(element).hide();
    }
}

function appendInformation(info){
    var rowsContent = appendInto("#infoName", textFrom(info.first_name, info.middle_name, info.last_name));
    rowsContent += appendInto("#infoSex", wordFrom(info.sex));
    rowsContent += appendInto("#infoBirthday", textFrom(info.birthday_day, info.birthday_month, info.birthday_year));
    rowsContent += appendInto("#infoLanguage", wordFrom(info.lang));
    rowsContent += appendInto("#infoEducation", wordFrom(info.education));
    setVisibilityOf("#informations", rowsContent);
}

function appendPlace(info){
    var rowsContent = appendInto("#infoAddress", wordFrom(info.address));
    rowsContent += appendInto("#infoSityState", textFrom(info.postal_code, info.city, info.country));
    rowsContent += appendInto("#infoLongitude", wordFrom(info.long));
    rowsContent += appendInto("#infoLatitude", wordFrom(info.lat));
    setVisibilityOf("#places", rowsContent);
}

function appendLinks(info){
    $("#infoFacebook").attr('href',info.facebook_page);
    var rowsContent = appendInto("#infoFacebook", wordFrom(info.facebook_page));
    $("#infoTwitter").attr('href',info.twitter_page);    
    rowsContent += appendInto("#infoTwitter", wordFrom(info.twitter_page));
    $("#infoLinkpage").attr('href',info.linkedin_page);
    rowsContent += appendInto("#infoLinkpage", wordFrom(info.linkedin_page));
    setVisibilityOf("#links", rowsContent);
}
 function appendContact(info){
    var rowsContent = appendInto("#infoPhone", wordFrom(info.phone));
    $("#infoEmail").attr('href', 'mailto:' + info.email);
    rowsContent += appendInto("#infoEmail", wordFrom(info.email));
    $("#infoHomePage").attr('href',info.home_page);
    rowsContent += appendInto("#infoHomePage", wordFrom(info.home_page));
    setVisibilityOf("#contact", rowsContent);
 }




