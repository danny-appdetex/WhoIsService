function search() {
    let input = document.getElementById("domain_search").value;
    let domainList = input.split("\n")
    for (let i = 0; i < domainList.length; i++) {
        domainList[i] = "http://www.whoisxmlapi.com/whoisserver/WhoisService?domainName=" + domainList[i] + "&username=AppDetex&password=Aes6rA7P&outputFormat=JSON"
        loadDoc(domainList[i])
    }
}

function loadDoc(url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json"; // xhr.response will be parsed into a JSON object
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onload = processRequest;

    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(JSON.stringify(xhr.response))
            let response = JSON.stringify(xhr.response)
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(response));
            document.getElementById("dynamic-list").appendChild(li);
        }
    }
}

function clearList(){
    let root = document.getElementById("dynamic-list")
    while( root.firstChild ){
        root.removeChild(root.firstChild);
    }
}