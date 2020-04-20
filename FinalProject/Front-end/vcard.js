

function importVcard(){

    //  code from dcode "Upload files with Fetch - JavaScript Tutorial" on YouTube
    const myForm = document.getElementById("form")
    const file = document.getElementById("file")

    myForm.addEventListener("submit", e =>{
        e.preventDefault();
        const endpoint = "http://127.0.0.1:8080/vCard-to-contact";
        const formData = new FormData();

        formData.append("file", file.files[0]);

        fetch(endpoint, {
            method: "post",
            body: formData
        }).catch(console.error);
    });
}