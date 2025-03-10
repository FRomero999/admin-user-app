var temporal_data = [
    {
        "name": "Francisco",
        "email": "francisco@cesur.com",
        "bio": "Docente de informática con experiencia en desarrollo web y bases de datos."
    },
    {
        "name": "Victor",
        "email": "victor@cesur.com",
        "bio": "Apasionado por la ciberseguridad y la administración de sistemas."
    },
    {
        "name": "Laura",
        "email": "laura@cesur.com",
        "bio": "Especialista en diseño UX/UI y accesibilidad web."
    },
    {
        "name": "Carlos",
        "email": "carlos@cesur.com",
        "bio": "Desarrollador backend con experiencia en arquitecturas escalables."
    },
    {
        "name": "Ana",
        "email": "ana@cesur.com",
        "bio": "Ingeniera de software con enfoque en inteligencia artificial."
    },
    {
        "name": "Miguel",
        "email": "miguel@cesur.com",
        "bio": "Experto en bases de datos y optimización de consultas SQL."
    },
    {
        "name": "Sonia",
        "email": "sonia@cesur.com",
        "bio": "Full-stack developer con pasión por JavaScript y frameworks modernos."
    }
];



function findAll(){
    return temporal_data
}

function add(data){
    temporal_data.push(data)
}

function removeAt(pos){
    temporal_data.splice(pos,1)
}

module.exports = {
    findAll,
    add,
    removeAt
}