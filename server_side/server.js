const http = require("http");
const fs = require("fs");
const url = require("url");
const queryString = require("querystring");
const { MongoClient, ObjectId } = require("mongodb");
const {collection} = require("mongodb");
const {log} = require("console");

const client = new MongoClient("mongodb://127.0.0.1:27017/");

const app = http.createServer(async(req, res) => {
    const db = client.db("Blood_bank");
    const collection = db.collection("doners");



    const path = url.parse(req.url);
    console.log(path);
    console.log(req.method);

    if (path.pathname == "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(fs.readFileSync("../client_side/index.html"));
    } else if (path.pathname == "/client.js") {
        res.writeHead(200, { "content-Type": "text/js" });
        res.end(fs.readFileSync("../client_side/client.js"));
    } else if (path.pathname == "/style.css") {
        res.writeHead(200, { "content-Type": "text/css" });
        res.end(fs.readFileSync("../client_side/style.css"));
    } else if (path.pathname == "/donor.html") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(fs.readFileSync("../client_side/donor.html"));
    } else if (path.pathname == "/donor.css") {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(fs.readFileSync("../client_side/donor.css"));
    }


    if (path.pathname == "/submit" && req.method == "POST") {
        let body = "";
        req.on("data", (chunks) => {
            body += chunks.toString();
            console.log(body);
        })
        req.on("end", async () => {
            const formData = queryString.parse(body);
            console.log(formData);
            collection.insertOne(formData)
                .then(() => {
                    console.log("success");
                })
                .catch((error) => {
                    console.log(error);
                });
        });

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(fs.readFileSync("../client_side/index.html"));
    }
  
    if(path.pathname == "/getdonor" && req.method == "GET"){
        const data = await collection.find().toArray();
        const jsonData = JSON.stringify(data);
        console.log(jsonData);
        res.writeHead(200,{"Content-Type":"text/json"});
        res.end(jsonData);
    }

    if(path.pathname == "/delete" && req.method=="DELETE"){
        console.log("reached delete route");
        let body="";
        req.on("data",(chunks)=>{
            body+=chunks.toString();
            console.log(body);
            
        })
        req.on("end",async()=>{
            let _id= new ObjectId(body)
            console.log(_id);
            collection.deleteOne({_id}).then(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("success")
            }).catch(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("Fail")
            })
            
        })
        
    }

    if(req.method="PUT"&&path.pathname=="/updates"){
        console.log("reached to update route");
        let body="";
        req.on("data",(chunks)=>{
            body+=chunks.toString();
            console.log(body);
        })
        req.on("end",async()=>{
            let data=JSON.parse(body);
            console.log(data);
            let _id=new ObjectId(data.id);
            let updateData={
                name:data.name,
                email:data.email,
                phone:data.phone,
                bloodgroup:data.bloodgroup,
                gender:data.gender
            }
            await collection.updateOne({_id},{$set:updateData}).then(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("success")
            }).catch(()=>{
                res.writeHead(400,{"Content-Type":"text/plain"});
                res.end("failed")
            })
        });
    }
    


});

app.listen(3006);
