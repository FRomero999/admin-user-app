document.querySelectorAll(".delete-button").forEach(
    (button)=>{
        button.addEventListener("click", function(ev){

            console.log(this);

            if(!confirm("¿Desea borrar?")) {
                ev.preventDefault();
                return false;
            } else {
                return true;
            }
        })
    }
)

var btnCargar = document.querySelector("#cargarDatos")
const templateRow = document.querySelector("#templateRow");
const tableUser = document.querySelector("tbody");

if(btnCargar) btnCargar.addEventListener("click",()=>{
    document.querySelector(".loading").classList.remove("d-none");    
    loadTable();
    document.querySelector(".loading").classList.add("d-none");    
})

function loadTable(){
    fetch("/api")
    .then( ( response )=>{ if(response.ok) return response.json() } )
    .then( ( content )=>{ 
        console.log(content) 
        tableUser.innerHTML = "";
        content.forEach( (el,pos) => {
            let newRow = templateRow.content.cloneNode(true);
            newRow.querySelector(".index").textContent = pos;
            newRow.querySelector(".name").textContent = el.name;
            newRow.querySelector(".email").textContent = el.email;
            newRow.querySelector("a").href = "delete/"+pos;
            tableUser.appendChild(newRow);
        })
    })
    .catch( (err) => { console.log(err) })
}


loadTable();


const formulario = document.querySelector("form")

if(formulario) formulario.addEventListener("submit",(ev)=>{
    ev.preventDefault();

    //const formData = new FormData(formulario);

    formData = {
        nombre : document.querySelector("input[name=nombre]").value,
        email : document.querySelector("input[name=email]").value
    }

    fetch(".",{
        method: "POST",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(formData)
    })
})

const btnColor = document.querySelector(".btn-color")
if(btnColor) btnColor.addEventListener("click",()=>{
    if(window.localStorage.getItem("color") ) {
        window.localStorage.removeItem("color");
        document.querySelector("body").classList.remove("bg-primary")
    }
    else {
        window.localStorage.setItem("color","azul");
        document.querySelector("body").classList.add("bg-primary")
    }
})

if(window.localStorage.getItem("color")==="azul"){
    document.querySelector("body").classList.add("bg-primary")
}