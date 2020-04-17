
const data = [{
    FirstName : "Tyler",
    LastName : "Powell",
    phonenumber: "570-460-0704",
    address : "2029 N Broad st."
}, {
    FirstName : "And",
    LastName : "Pij",
    phonenumber: "215-548-3587",
    address : "2029 N Broad st."
},{
    FirstName : "And",
    LastName : "Pij",
    phonenumber: "215-548-3587",
    address : "2029 N Broad st."
},{
    FirstName : "And",
    LastName : "Pij",
    phonenumber: "215-548-3587",
    address : "2029 N Broad st."
},{
    FirstName : "Tyler",
    LastName : "Powell",
    phonenumber: "570-460-0704",
    address : "2029 N Broad st."
}, {
    FirstName : "And",
    LastName : "Pij",
    phonenumber: "215-548-3587",
    address : "2029 N Broad st."
},{
    FirstName : "And",
    LastName : "Pij",
    phonenumber: "215-548-3587",
    address : "2029 N Broad st."
},{
    FirstName : "And",
    LastName : "Pij",
    phonenumber: "215-548-3587",
    address : "2029 N Broad st."
}]

function loadPage(){
    for (var cardInd in data){
        var cardDiv = document.createElement('div');
        cardDiv.setAttribute('class', 'card');
        cardDiv.setAttribute('id', 'card'+cardInd);
        document.getElementById("grid-container").appendChild(cardDiv);
        cardDiv.onclick = cardLink;
        // console.log()

        var name = document.createElement('p');
        name.setAttribute('class', 'name');
        name.setAttribute('id', 'name'+cardInd);
        document.getElementById('card'+cardInd).appendChild(name);

        var phonenumber = document.createElement('p');
        phonenumber.setAttribute('id', 'phonenumber'+cardInd);
        phonenumber.setAttribute('class', 'name');
        document.getElementById('card'+cardInd).appendChild(phonenumber);

        var address = document.createElement('p');
        address.setAttribute('id', 'address'+cardInd);
        address.setAttribute('class', 'name');
        document.getElementById('card'+cardInd).appendChild(address);

        document.getElementById("name"+cardInd).innerHTML = data[cardInd].FirstName + " " + data[cardInd].LastName;
        document.getElementById("phonenumber"+cardInd).innerHTML = data[cardInd].phonenumber;
        document.getElementById("address"+ cardInd).innerHTML = data[cardInd].address;
    }
}
loadPage();

function cardLink(){
    window.location.href = "./newcontact.html";
}

// function createCard(index){
//     console.log(data);
//     document.getElementById("name"+index).innerHTML = data[index].FirstName + " " + data[index].LastName;
//     document.getElementById("number"+index).innerHTML = data[index].phone;
//     document.getElementById("address"+ index).innerHTML = data[index].address;
// }

// createCard(0);
// createCard(1);
// createCard(0);
// createCard(1);

// console.log(data.FirstName);

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