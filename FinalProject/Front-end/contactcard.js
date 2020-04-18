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
    document.getElementById("name").innerHTML = contact.firstName + " " + contacts[id].lastName;
    document.getElementById("phoneNumber").innerHTML = contact.phoneNumber;
    document.getElementById("address").innerHTML = contact.address;
    document.getElementById("edit").setAttribute('onclick', 'cardLink('+id+')')
}
fetchCard();

async function deleteContact(){
    console.log("Reached")
    id = parseInt(id)
    console.log(id)
    if(confirm("Are you sure you want to delete contact?") == true){
        await fetch('http://127.0.0.1:8080/delete-contact/'+id+'', {
        method: "DELETE"
        })
        window.location.href = "./index.html";
    }
}

function cardLink(id){
    window.location.href = "./edit-contact.html?id="+id+"";
}