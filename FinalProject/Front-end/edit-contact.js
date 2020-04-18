let contacts = []
let relationships = []
var id = window.location.search.split('?')[1].split('=')[1];

async function fetchCard(){
    console.log(id);
    const resp =  await fetch("http://127.0.0.1:8080/load-contacts");
    contacts = await resp.json();
    console.log(contacts);
    console.log(contacts[id])
    contact= contacts[id]
    prefillInfo();
    // document.getElementById("name").innerHTML = contact.firstName + " " + contacts[id].lastName;
    // document.getElementById("phoneNumber").innerHTML = contact.phoneNumber;
    // document.getElementById("address").innerHTML = contact.address;
    // document.getElementById("edit").setAttribute('onclick', 'cardLink('+id+')')
}
fetchCard();

function prefillInfo(){
    document.getElementById("firstName").setAttribute('value', contacts[id].firstName);
    document.getElementById("lastName").setAttribute('value', contacts[id].lastName);
    document.getElementById("phoneNumber").setAttribute('value', contacts[id].phoneNumber);
    document.getElementById("address").setAttribute('value', contacts[id].address);
}

async function editContact(){
    console.log("reached")
    const resp = await fetch("http://127.0.0.1:8080/edit-contact",{
        method:"POST",
        body: JSON.stringify({  id : id,
                                firstName: document.getElementById("firstName").value,
                                lastName : document.getElementById("lastName").value, 
                                phoneNumber : document.getElementById("phoneNumber").value,
                                address : document.getElementById("address").value
                                // relationships : {"Mother": 1, "Father": 2}
                                // relationships : document.getElementById("relationships").value
        }),
        headers: {"Content-Type": "application/json"}
    });
    // console.log(resp)
    // const newContact = await resp.json();
    // JSON.parse(resp)
    window.location.href = "./index.html";
}