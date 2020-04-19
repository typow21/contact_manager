function importVcard(){
    var input = document.getElementById("file");
    var file  = input.files[0];
    const fd = new FormData();
    fd.append('file', file)
    fetch("http://127.0.0.1:8080/vcard-to-contact",{
        method:"POST",
        body: fd
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err))
}