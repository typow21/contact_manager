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
    relationships = contact.relationships;
    prefillInfo();
}
fetchCard();

function prefillInfo(){
    addRelations();
    document.getElementById("firstName").setAttribute('value', contacts[id].firstName);
    document.getElementById("lastName").setAttribute('value', contacts[id].lastName);
    document.getElementById("phoneNumber").setAttribute('value', contacts[id].phoneNumber);
    document.getElementById("address").setAttribute('value', contacts[id].address);
}

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
    const resp = await fetch("http://127.0.0.1:8080/edit-contact",{
        method:"POST",
        body: JSON.stringify({  id : id,
                                firstName: document.getElementById("firstName").value,
                                lastName : document.getElementById("lastName").value, 
                                phoneNumber : document.getElementById("phoneNumber").value,
                                address : document.getElementById("address").value,
                                relationships : [mother, father, brother, sister]
                                // relationships : {"Mother": 1, "Father": 2}
                                // relationships : document.getElementById("relationships").value
        }),
        headers: {"Content-Type": "application/json"}
    });
    // console.log(resp)
    // const newContact = await resp.json();
    // JSON.parse(resp)
    alert("Contact edited!");
    window.location.href = "./index.html";
}

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
    // var relationInput = document.createElement('input');
    // relationInput.setAttribute('type', 'text');
    // relationInput.setAttribute('id', 'relationsInput');
    // relationInput.setAttribute('name', 'relationsInput');
    // relationSelect32.append(relationInput);
}