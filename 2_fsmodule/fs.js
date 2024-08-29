const { error } = require("console");
const fs = require("fs");

// // write file
// fs.writeFile("message.txt","have a good day",(error)=>{
//     if(error) {
//         console.log("unable to write data");
//     }
// });

// //appendfile
// fs.appendFile("message.txt","today is rainy day",(error) =>{
//     if(error) {
//         console.log("unable to write data");
//     }
// });

// //readfile
// fs.readFile("message.txt","utf-8",(error,data) =>{
//     if(error) {
//         console.log("unable to write data");
//     } else {
//         console.log(data);
//     }
// });

//unlink

fs.unlink("message.txt",(error)=>{
    if(error) {
        console.log("unable to delete");
    }
})

//create folder
fs.mkdir("pages",(error)=>{
    if(error) {
        console.log("unable to delete");
    }
})

//get all file from folder
fs.readdir("pages",(error,data)=>{
    if(error){
        console.log("unable to delete")
    }else{
        console.log(data);
    }
});