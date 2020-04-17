async function fetchCard(){
    
    var url = window.location.search.split('?')[1].split('=')[1];
    console.log(url);
    let contacts = []
    const resp =  await fetch("http://127.0.0.1:8080/load-contacts");
    contacts = await resp.json();
    console.log(contacts);
    console.log(contacts[url])
    document.getElementById("name").innerHTML = contacts[url].firstName + " " + contacts[url].lastName;
    document.getElementById("phoneNumber").innerHTML = contacts[url].phoneNumber;
    document.getElementById("address").innerHTML = contacts[url].address;
}
   
fetchCard();