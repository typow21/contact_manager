let relationships = []
let contacts = []

loadContacts();
async function createContact(){
    var mother = document.getElementById("mother").value
    console.log(mother)
    var father = document.getElementById("father").value
    console.log(father)
    var brother = document.getElementById("brother").value
    console.log(brother)
    var sister = document.getElementById('sister').value
    console.log(sister)
    
    const resp = await fetch("http://52.14.251.131:8080/new-contact",{
        method:"POST",
        body: JSON.stringify({  firstName: document.getElementById("firstName").value,
                                lastName : document.getElementById("lastName").value, 
                                phoneNumber : document.getElementById("phoneNumber").value,
                                address : document.getElementById("address").value,
                                relationships : [mother, father, brother, sister]
                                // relationships : document.getElementById("relationships").value
        }),
        headers: {"Content-Type": "application/json"}
    });
    window.location.href = "./index.html";
}

async function loadContacts(){
    const resp =  await fetch("http://52.14.251.131:8080/load-contacts");
    contacts = await resp.json();
    // console.log(contacts);
    addRelations();
}

function addRelations(){
    console.log(contacts)

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
    // var relationInput = document.createElement('input');
    // relationInput.setAttribute('type', 'text');
    // relationInput.setAttribute('id', 'relationsInput');
    // relationInput.setAttribute('name', 'relationsInput');
    // relationSelect32.append(relationInput);
}