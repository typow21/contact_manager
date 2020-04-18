let relationships = []
let contacts = []
loadContacts();
async function createContact(){
    const resp = await fetch("http://127.0.0.1:8080/new-contact",{
        method:"POST",
        body: JSON.stringify({firstName: document.getElementById("firstName").value,
                                lastName : document.getElementById("lastName").value, 
                                phoneNumber : document.getElementById("phoneNumber").value,
                                address : document.getElementById("address").value,
                                // relationships : {"Mother": 1, "Father": 2}
                                // relationships : document.getElementById("relationships").value
        }),
        headers: {"Content-Type": "application/json"}
    });
    // console.log(resp)
    // const newContact = await resp.json();
    // JSON.parse(resp)
}

function addRelation(){
    console.log("reached")
    var relationLabel = document.createElement('label');
    relationLabel.setAttribute('for', 'relationsOptions');
    relationLabel.innerHTML = "Relationships";
    document.getElementById('append').append(relationLabel);

    var relationSelect = document.createElement('select');
    relationSelect.setAttribute('id', 'relationsOptions');
    document.getElementById('append').append(relationSelect);

    var mother = document.createElement('option');
    mother.setAttribute('value', 'mother');
    mother.innerHTML = "Mother";
    relationSelect.append(mother)

    var father = document.createElement('option')
    father.setAttribute('value', 'father');
    father.innerHTML = "Father";
    relationSelect.append(father)

    var brother = document.createElement('option')
    brother.setAttribute('value', 'brother')
    brother.innerHTML = "Brother";
    relationSelect.append(brother)

    var sister = document.createElement('option')
    sister.setAttribute('value', 'sister');
    sister.innerHTML = "Sister";
    relationSelect.append(sister)

    var aunt = document.createElement('option');
    aunt.setAttribute('value', 'aunt');
    aunt.innerHTML = "Aunt"
    relationSelect.append(aunt)

    var uncle = document.createElement('option');
    uncle.setAttribute('value', 'uncle');
    uncle.innerHTML = "Uncle"
    relationSelect.append(uncle)

    var cousin = document.createElement('option');
    cousin.setAttribute('value', 'cousin');
    cousin.innerHTML = "Cousin"
    relationSelect.append(cousin)

    var other = document.createElement('option');
    other.setAttribute('value', 'other');
    other.innerHTML = "Other"
    relationSelect.append(other)

    var contactsOptions = document.createElement('select')
    contactsOptions.setAttribute('id', 'contactsSelect');
    document.getElementById('form').append(contactsOptions);
    for(contact in contacts){
        var option = document.createElement('option')
        option.setAttribute('value', contact.id);
        option.innerHTML = contact.firstName+ " " + contact.lastName;
        contactsOptions.append(option)
    }

    // var relationInput = document.createElement('input');
    // relationInput.setAttribute('type', 'text');
    // relationInput.setAttribute('id', 'relationsInput');
    // relationInput.setAttribute('name', 'relationsInput');
    // relationSelect32.append(relationInput);
}

async function loadContacts(){
    const resp =  await fetch("http://127.0.0.1:8080/load-contacts");
    contacts = await resp.json();
    console.log(contacts);
}