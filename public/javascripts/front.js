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

if(btnCargar) btnCargar.addEventListener("click",()=>{
    fetch("/api")
    .then( ( response )=>{ if(response.ok) return response.json() } )
    .then( ( content )=>{ 
        console.log(content) 
        const templateRow = document.querySelector("#templateRow");
        const tableUser = document.querySelector("tbody");
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
})