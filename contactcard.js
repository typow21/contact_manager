let contacts = []
let relationships = []
var id = window.location.search.split('?')[1].split('=')[1];

async function fetchCard(){
    console.log(id);
    const resp =  await fetch("http://52.14.251.131:8080/load-contacts");
    contacts = await resp.json();

    console.log("Array of contacts: "+contacts);
    console.log("Selected contact: "+contacts[id])

    contact= contacts[id] //uses id to get index of contacts

    // this prints and formats the contact information to the page
    document.getElementById("name").innerHTML = contact.firstName + " " + contact.lastName;
    document.getElementById("phoneNumber").innerHTML = contact.phoneNumber;
    document.getElementById("address").innerHTML = contact.address;

    // Sets data for global variable
    relationships = contact.relationships;

    // -1 in an index means no relationship has been set.
    //if it does have a relationship it sets the link to the page that is related
    // adds the id of that contact to the link
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
    // links to an edit page with the id of the card as the parameter
    document.getElementById("edit").setAttribute('onclick', 'cardLink('+id+')');
}
fetchCard();

async function deleteContact(){
    console.log("Reached")
    id = parseInt(id)
    console.log(id)
    if(confirm("Are you sure you want to delete contact?") == true){
        await fetch('http://52.14.251.131:8080/delete-contact/'+id+'', {
        method: "DELETE"
        })
        window.location.href = "./index.html";
    }
}

// calls the edit-contact page with id as a parameter
function cardLink(id){
    window.location.href = "./edit-contact.html?id="+id+"";
}

// sends the current contact card to the server
// recieves back a vcf file 
// automatically downloads card
async function exportVcard(){
    var mother = contacts[id].mother
    var father = contacts[id].father
    var brother = contacts[id].brother
    var sister = contacts[id].sister

    const resp = await fetch("http://52.14.251.131:8080/contact-to-vCard",{
        method:"POST",
        body: JSON.stringify({firstName: contacts[id].firstName,
                                lastName : contacts[id].lastName, 
                                phoneNumber : contacts[id].phoneNumber,
                                address : contacts[id].address,
                                relationships : [mother, father, brother, sister]
        }),
        headers: {"Content-Type": "application/json"}
    });

    
    const resp2 =  await fetch("http://52.14.251.131:8080/download-contact");
    var downloadfile = await resp2.blob();
    // console.log(downloadfile);
    // window.open(downloadfile);
    saveBlob(downloadfile, "vCard.vcf") 
    alert("vCard Downloaded!");
}

// creates a link 
// sets the link to the url of the file 
// downloads the file
function saveBlob(blob, fileName) {
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    a.dispatchEvent(new MouseEvent('click'));
}