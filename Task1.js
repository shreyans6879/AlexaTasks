const fs = require("fs");
fs.readFileSync;
const readline = require("readline");
const rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout,
});
let addobj=
{
    name:null,
    address:null
}
function menu()
{
    rl.question("add(1)/delete(2)/view(3): ", (answer) => {
        switch(answer){
            case "1": add();
            break;
            case "2": del();
            break;
            case "3": view();
            break;
            default: console.log("Invalid input! Try again."); menu();
            break;
        }
    })
}
function add()
{
    rl.question("Whats your name?",(nm)=>{
        rl.question("Whats your address?",(ad)=>{
        addobj.name=nm;
        addobj.address=ad;
        let dataBuffer = fs.readFileSync("address.json");
        let reg = JSON.parse(dataBuffer);
        reg.push(addobj);
        let jsonString = JSON.stringify(reg);
        fs.writeFileSync("registry.json", jsonString);
        console.log("Added!");
        menu();
        })
    })
}
function del()
{
    let dataBuffer = fs.readFileSync("address.json");
    let reg = JSON.parse(dataBuffer);
    let arr = [];

    rl.question("Name of entry to be deleted:", (nm) => {
        for(let i=0 ; i < reg.length; i++)
        {
            if(reg[i].name !== nm) 
            {
                arr.push(reg[i]);
            }
            else
            {
                arr.splice(i,1);
            }
        }
        console.log("Deleted!");
        let jsonString = JSON.stringify(arr);
        fs.writeFileSync("address.json", jsonString)
        menu();
    })
}
function view()
{
    const dataBuffer = fs.readFileSync("address.json");
    console.table(JSON.parse(dataBuffer.toString()));
    menu();
}
menu();
