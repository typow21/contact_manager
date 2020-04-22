let contacts = []
let relationships = []
var id = window.location.search.split('?')[1].split('=')[1];

//fetches card data
async function fetchCard(){
    console.log(id);
    const resp =  await fetch("http://52.14.251.131:8080/load-contacts");
    contacts = await resp.json();
    console.log(contacts);
    console.log(contacts[id])
    contact= contacts[id]
    relationships = contact.relationships;
    prefillInfo();
}
fetchCard();

//prefills the contact form so that you only edit what you want to edit not recreate the entire form
function prefillInfo(){
    addRelations();
    document.getElementById("firstName").setAttribute('value', contacts[id].firstName);
    document.getElementById("lastName").setAttribute('value', contacts[id].lastName);
    document.getElementById("phoneNumber").setAttribute('value', contacts[id].phoneNumber);
    document.getElementById("address").setAttribute('value', contacts[id].address);
}

// resends the form to the server and edits the existing card.
async function editContact(){
    var mother = document.getElementById("mother").value
    console.log(mother)
    var father = document.getElementById("father").value
    console.log(father)
    var brother = document.getElementById("brother").value
    console.log(brother)
    var sister = document.getElementById('sister').value
    console.log(sister)
    console.log("reached")
    const resp = await fetch("http://52.14.251.131:8080/edit-contact",{
        method:"POST",
        body: JSON.stringify({  id : id,
                                firstName: document.getElementById("firstName").value,
                                lastName : document.getElementById("lastName").value, 
                                phoneNumber : document.getElementById("phoneNumber").value,
                                address : document.getElementById("address").value,
                                relationships : [mother, father, brother, sister]
        }),
        headers: {"Content-Type": "application/json"}
    });
    alert("Contact edited!");
    window.location.href = "./index.html";
}

// creates the options for the relationships based on the contacts that exist
function addRelations(){

    for(contact in contacts){
        console.log(contact)
        var motherOption = document.createElement('option')
        motherOption.setAttribute('value', contacts[contact].id);
        motherOption.innerHTML = contacts[contact].firstName+ " " + contacts[contact].lastName;
        console.log(document.getElementById('mother'))
        document.getElementById('mother').append(motherOption)

        var fatherOption = document.createElement('option')
        fatherOption.setAttribute('value', contacts[contact].id);
        fatherOption.innerHTML = contacts[contact].firstName+ " " + contacts[contact].lastName;
        console.log(document.getElementById('father'))
        document.getElementById('father').append(fatherOption)

        var brotherOption = document.createElement('option')
        brotherOption.setAttribute('value', contacts[contact].id);
        brotherOption.innerHTML = contacts[contact].firstName+ " " + contacts[contact].lastName;
        console.log(document.getElementById('brother'))
        document.getElementById('brother').append(brotherOption)

        var sisterOption = document.createElement('option')
        sisterOption.setAttribute('value', contacts[contact].id);
        sisterOption.innerHTML = contacts[contact].firstName+ " " + contacts[contact].lastName;
        console.log(document.getElementById('sister'))
        document.getElementById('sister').append(sisterOption)
    }
    document.getElementById('mother').value = relationships[0];
    document.getElementById('father').value = relationships[1];
    document.getElementById('brother').value = relationships[2];
    document.getElementById('sister').value = relationships[3];
}