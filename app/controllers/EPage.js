document.addEventListener("DOMContentLoaded",function(){
    setEntityInformation(getURLParameter("dlid"));
    console.log(getURLParameter("dlid"));
    if(isToken()) {
        var stream=getStream('message',getURLParameter("dlid"));
        $("#thelist").append( stream.join('') );
    } else {
        alert("UNAUTHORISED");
    }
});

function setEntityInformation(dl_id){
    var opts={'dl_id':dl_id,'auth':getToken(),'uid':getDL_id()};
    var url="dlid"
    var info=rest(opts,url,
		function(data) {
			result = data;
			success(data);
		},
		function(data) {
			result = data; 
			error(data);
		});
    $("#entityImg").attr('src',info.img);
    $("#entityImg").attr('alt',info.name);
    $("#entityRole").text(info.type);
    $("#entityName").text(info.name);
}