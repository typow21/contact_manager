

function importVcard(){
    var input = document.getElementById("file");
    var file  = input.files[0];
    const fd = new FormData();
    fd.append('file', file)
    console.log(file)
    var util = require('util')
    var vCard = require('vcard');
    var card = new vCard();
    /* Use readFile() if the file is on disk. */
    card.readFile("path/to/file.vcf", function(err, json) {
        console.log(util.inspect(json));
    });
    /* Use readData() otherwise. */
    card.readData(String_with_vCard_data, function(err, json) {
        console.log(util.inspect(json));
    });
    // fetch("http://127.0.0.1:8080/vCard-to-contact)
    // .then(res => res.json())
    // .then(json => console.log(json))
    // .catch(err => console.error(err))
}