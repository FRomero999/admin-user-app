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

let table = new DataTable('#tabla', {
    searching: false,
    ordering:  false,
    language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
    },
});


if(document.querySelector("#mapa")){

    var map = L.map('mapa').setView([36.73, -4.42], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);



    const sonidoZoom = new Audio("riser-hit-sfx-001-289802.mp3");
    const sonidofondo = new Audio("relaxing-guitar-loop-v5-245859.mp3");
    
    
    fetch("capitales.geojson")
    .then( response => {
            if(response.ok) return response.json();
        })
    .then( data => {
        data.features.forEach( (el)=>{
            console.log(el.properties.nombre);
            let marker = L.marker( [el.geometry.coordinates[1],el.geometry.coordinates[0]]  ).addTo(map);
            marker.addEventListener("click",()=>{
                Swal.fire({
                    title: el.properties.nombre,
                    text: "Población de "+el.properties.poblacion,
                    icon: "info"
                })
                .then( ()=>{
                    Swal.fire({
                        title: el.properties.nombre,
                        text: "Se llaman "+el.properties.gentilicio,
                        icon: "info",
                        timer: 2000                  
                    })
                })
            })
            
        })
    })
    .catch( err => console.log(err) )
    
    
    const btnLocalizar = document.querySelector("#localizar")
    btnLocalizar?.addEventListener("click",()=>{
        if(!map) return;
        if(window.navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition( 
                (pos)=>{
                    sonidoZoom.currentTime=0;
                    sonidoZoom.volume=0.5;
                    sonidoZoom.playbackRate=2;
                    sonidoZoom.play();
    
                    sonidofondo.volume=0.2;
                    sonidofondo.loop = true;
                    sonidofondo.play()
    
                    const position = [pos.coords.latitude, pos.coords.longitude]
                    var circle = L.circle(position, {
                        color: 'green',
                        fillColor: '#f03',
                        fillOpacity: 0.5,
                        radius: 300
                    }).addTo(map);
    
                    var marker = L.marker(position).addTo(map);
                    marker.bindPopup("<h4>Posicion actual</h4>");
                    marker.addEventListener("click",()=>{
                        console.log("click!")
                    })
                    map.setView(position,16);
    
                }
            )
        }
    })
    



}

