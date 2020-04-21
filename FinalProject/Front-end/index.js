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
}

function test(cardInd){
    console.log(cardInd);
}

async function loadContacts(){
    const resp =  await fetch("http://52.14.251.131:8080/load-contacts");
    contacts = await resp.json();
    console.log(contacts);
    loadPage();
}

