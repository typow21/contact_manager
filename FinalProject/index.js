let contacts = []

loadContacts();
function loadPage(){
    for (var cardInd in contacts){
        var cardDiv = document.createElement('div');
        cardDiv.setAttribute('class', 'card');
        cardDiv.setAttribute('id', 'card'+cardInd);
        cardDiv.setAttribute('name', contacts[cardInd].id + '')
        document.getElementById("grid-container").appendChild(cardDiv);
        cardDiv.setAttribute('onclick', 'cardLink('+contacts[cardInd].id+')')
        

        var name = document.createElement('p');
        name.setAttribute('class', 'name');
        name.setAttribute('id', 'name'+cardInd);
        document.getElementById('card'+cardInd).appendChild(name);
        
        var img = document.createElement('img');
        img.setAttribute('src', 'profile.png');
        img.setAttribute('alt','Profile picture');
        document.getElementById('card'+cardInd).appendChild(img);

        // var phonenumber = document.createElement('p');
        // phonenumber.setAttribute('id', 'phonenumber'+cardInd);
        // phonenumber.setAttribute('class', 'name');
        // document.getElementById('card'+cardInd).appendChild(phonenumber);

        // var address = document.createElement('p');
        // address.setAttribute('id', 'address'+cardInd);
        // address.setAttribute('class', 'name');
        // document.getElementById('card'+cardInd).appendChild(address);

        // var relationship = document.createElement('p');
        // relationship.setAttribute('id', 'relationship'+cardInd);
        // relationship.setAttribute('class', 'name');
        // document.getElementById('card'+cardInd).appendChild(relationship);

        document.getElementById("name"+cardInd).innerHTML = contacts[cardInd].firstName + " " + contacts[cardInd].lastName;
        // document.getElementById("phonenumber"+cardInd).innerHTML = contacts[cardInd].phoneNumber;
        // document.getElementById("address"+ cardInd).innerHTML = contacts[cardInd].address;
    }
}

function cardLink(id){
    window.location.href = "./contactcard.html?id="+id+"";
    test(id);
}

function test(cardInd){
    console.log(cardInd);
}

async function loadContacts(){
    const resp =  await fetch("http://127.0.0.1:8080/load-contacts");
    contacts = await resp.json();
    console.log(contacts);
    loadPage();
}

// function createCard(index){
//     console.log(contacts);
//     document.getElementById("name"+index).innerHTML = contacts[index].FirstName + " " + contacts[index].LastName;
//     document.getElementById("number"+index).innerHTML = contacts[index].phone;
//     document.getElementById("address"+ index).innerHTML = contacts[index].address;
// }

// createCard(0);
// createCard(1);
// createCard(0);
// createCard(1);

// console.log(contacts.FirstName);

// fetch("http://127.0.0.1:8080/test/")
//     .then((response) => {
//         return response.json();
//     })
//     .then((myJson) =>{
//         console.log(myJson)
//         // document.getElementById("attack_name").innerHTML = myJson.name
//         // var flavorArr = myJson.flavor_text_entries //what is flavor text?
//         // document.getElementById("flavor_text").innerHTML = myJson.flavor_text_entries[2].flavor_text
//         // console.log("Flavor text: "+myJson.flavor_text_entries[2].flavor_text)
//         // document.getElementById("accuracy").innerHTML = myJson.accuracy;
//         // document.getElementById("pp").innerHTML = myJson.pp
//         // document.getElementById("power").innerHTML = myJson.power
//         // // console.log(myJson.type.name)
//         // document.getElementById("attack_type").innerHTML = myJson.type.name
//     })