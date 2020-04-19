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
    relationships = contact.relationships;
    console.log(relationships)
    if(relationships[0] != -1){
        console.log(contacts[relationships[0]].firstName )
        document.getElementById('mother').innerHTML += contacts[relationships[0]].firstName + " "+ contacts[relationships[0]].lastName
        document.getElementById('mother').setAttribute('href',"./contactcard.html?id="+contacts[relationships[0]].id+"")
    }
    if(relationships[1] != -1){
        document.getElementById('father').innerHTML += contacts[relationships[1]].firstName + " " + contacts[relationships[1]].lastName
        document.getElementById('father').setAttribute('href',"./contactcard.html?id="+contacts[relationships[1]].id+"")
    }
    if(relationships[2] != -1){
        document.getElementById('brother').innerHTML += contacts[relationships[2]].firstName + " " + contacts[relationships[2]].lastName
        document.getElementById('brother').setAttribute('href',"./contactcard.html?id="+contacts[relationships[2]].id+"")
    }
    if(relationships[3] != -1){
        document.getElementById('sister').innerHTML += contacts[relationships[3]].firstName + " " + contacts[relationships[3]].lastName
        document.getElementById('sister').setAttribute('href',"./contactcard.html?id="+contacts[relationships[3]].id+"")
    }
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