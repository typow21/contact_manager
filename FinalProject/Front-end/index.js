let contacts = []

//fills the contacts ds
loadContacts();

//creates a card for each contact that exists
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

        document.getElementById("name"+cardInd).innerHTML = contacts[cardInd].firstName + " " + contacts[cardInd].lastName;
    }
}

function cardLink(id){
    window.location.href = "./contactcard.html?id="+id+"";
}

//fills the contacts ds
async function loadContacts(){
    const resp =  await fetch("http://52.14.251.131:8080/load-contacts");
    contacts = await resp.json();
    console.log(contacts);
    loadPage();
}

