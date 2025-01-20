var temporal_data = [
    {
        name:"Francisco",
        email: "francisco@cesur.com"
    },
    {
        name:"Victor",
        email: "victor@cesur.com"
    }
]

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