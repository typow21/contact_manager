async function createContact(){
    const resp = await fetch("http://127.0.0.1:8080/new-contact",{
        method:"POST",
        body: JSON.stringify({firstName: document.getElementById("firstName").value,
                                lastName : document.getElementById("lastName").value, 
                                phoneNumber : document.getElementById("phoneNumber").value
        }),
        headers: {"Content-Type": "application/json"}
    });
    console.log(resp)
    const newContact = await resp.json();
    
    // JSON.parse(resp)
}