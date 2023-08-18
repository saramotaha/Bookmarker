var webSiteName = document.getElementById("SiteName");
var webSiteURL = document.getElementById("SiteURL");
var allWebsites = [];
if (localStorage.getItem("AllSites") != null) {
    var allWebsites = JSON.parse(localStorage.getItem("AllSites"));
    Display();
}
function Validation() {
    var newArrUrl = [];
    var NameRegex = /^[a-zA-Z0-9]{3,}$/;
    var UrlRegex =/^(http:\/\/www\.|https:\/\/www\.|https:\/\/|http:\/\/)[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9])?$/ ;
    for (var i = 0; i < allWebsites.length; i++) { 
       newArrUrl=allWebsites[i].url
    }
    if (NameRegex.test(webSiteName.value) == false) {
        return "Name is wrong,to write the correct name follow this rules [a-zA-Z0-9]{3,}"
    }
    else if (UrlRegex.test(webSiteURL.value) == false) {
        return "Url is wrong,to write the correct url follow this rules(http:\/\/www\.|https:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9])?"
    } 
    else if(newArrUrl.includes(webSiteURL.value)==true){
         return "Used Url , write another url"
    }
    return true;
}

function AddE() {
    var err = Validation()
        if (Validation()==true) {
        var website = {
            name: webSiteName.value,
            url: webSiteURL.value
        };
        allWebsites.push(website);
        localStorage.setItem("AllSites", JSON.stringify(allWebsites));
        Display();
        ClearInfo();
        }
        else {
            var err = Validation()
            document.getElementById("error").innerHTML=err;
        }
    
}
function Display(){
    var Content=""
    for (var i = 0; i < allWebsites.length; i++){
            Content += ` <tr>
                    <td>${i + 1}</td>
                    <td>${allWebsites[i].name}</td>
                    <td>
                    <form action=${allWebsites[i].url} target="_blank">
                    <button class="px-3 py-2 rounded-3 backGroSuccess text-light"><i class="fa fa-eye px-1"></i>Visit</button>
                    </form>
                    </td>
                    <td><button onclick='Delete(${i})' class="px-3 py-2 rounded-3 backGroDanger  text-light"><i class="fa-solid fa-trash px-1"></i>Delete</button></td>
                </tr>` }
    document.getElementById("tbody").innerHTML = Content;
    
}
function ClearInfo() {
    webSiteName.value = "";
    webSiteURL.value = "";
}
function Delete(indx) {
    allWebsites.splice(indx, 1);
    localStorage.setItem("AllSites", JSON.stringify(allWebsites));
    Display();
}
       
