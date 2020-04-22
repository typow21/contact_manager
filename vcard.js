

function importVcard(){

    //  code from dcode "Upload files with Fetch - JavaScript Tutorial" on YouTube
    const myForm = document.getElementById("form")
    const file = document.getElementById("file")

    myForm.addEventListener("submit", e =>{
        e.preventDefault();
        const endpoint = "http://52.14.251.131:8080/vCard-to-contact";
        const formData = new FormData();

        formData.append("vCard_multiFile", file.files[0]);
        console.log(file.files[0])
        fetch(endpoint, {
            method: "post",
            body: formData
        }).catch(console.error);
        alert("Contact added!");
        // window.location = "./index.html"
    });
}