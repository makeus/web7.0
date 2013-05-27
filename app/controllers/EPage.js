document.addEventListener("DOMContentLoaded",function(){
    setEntityInformation(getDL_id(),getURLParameter("dlid"),getToken());
});

function setEntityInformation(own_id, dl_id,authToken){
    var opts={'dl_id':dl_id,'auth':authToken,'uid':own_id};
    var info=getUserInfoRest(opts);
    //$("#entityImg").attr('src',info.img);
    //$("#entityImg").attr('alt',info.name);
    $("#entityRole").text(info.type);
    $("#entityName").text(info.name);
}