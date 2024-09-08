
let arr=[];
async function getdonors() {
const res =await fetch("http://localhost:3006/getdonor");
const data = await res.json();
console.log(data);

str=``
data.map((dt)=>{
    console.log(dt);
    
    str+=`
        <div class="container">
        <div class="txt">
      
           <div class="txt1"><input type="text" disabled=true value=${dt.name} name="name" id="name-${dt._id}"></div>
           <div class="txt1"><input type="text" disabled=true value=${dt.email} name="email" id="email-${dt._id}"></div>
           <div class="txt1"><input type="text" disabled=true value=${dt.phone} name="phone" id="phone-${dt._id}"></div>
            <div class="txt1"><input type="text" disabled=true value=${dt.bloodgroup} name="blood" id="blood-${dt._id}"></div>
           <div class="txt1"><input type="text" disabled=true value=${dt.gender} name="gender" id="gender-${dt._id}"></div>
        </div>

        <div class="btns">
            <button style="background-color: blue; color: white;" onclick="handleEdit('${dt._id}')">Edit</button>
            <button style="background-color:green ;color: white;" onclick="handleSave('${dt._id}')">Save</button>
            <button style="background-color: red; color: white;" onclick="handleDelete('${dt._id}')">Delete</button>
        </div>
        </div>

    
    `
    arr.push(dt);

})
document.getElementById("container").innerHTML=str;
console.log(arr);

}
getdonors()

async function handleEdit(id) {
    // console.log("dasdad");
    
    let name =document.getElementById(`name-${id}`);
    name.disabled= false;
    let email =document.getElementById(`email-${id}`);
    email.disabled= false;
     let phone =document.getElementById(`phone-${id}`);
     phone.disabled= false;
     let blood =document.getElementById(`blood-${id}`);
     blood.disabled= false;
     let gender =document.getElementById(`gender-${id}`);
     gender.disabled= false;
    
}
async function handleSave(id) {
    let name=document.getElementById(`name-${id}`).value
    let email=document.getElementById(`email-${id}`).value
    let phone=document.getElementById(`phone-${id}`).value
    let bloodgroup=document.getElementById(`blood-${id}`).value
    let gender=document.getElementById(`gender-${id}`).value
    console.log(name,email,phone,bloodgroup,gender);
    let data={id,name,email,phone,bloodgroup,gender}
    console.log(data);
    const jsonData=JSON.stringify(data);
    const res=await fetch("http://localhost:3006/updates",{
        "method":"put",
        "Content-Type":"text/json",
        "body":jsonData
    });
    console.log(res);
    const result=await res.text();
    console.log(result);
    if(result=="success"){
        alert("updated successfully")
        getdonors()
    }
    else{
        alert("not updated")
    } 
}
    async function handleDelete(id) {
        console.log(id);
        
        const res = await fetch("http://localhost:3006/delete",{
            method:"DELETE",
            headers:{"ContentType":"text/plain"},
            "body":id
        });
        console.log(res);
        const data=await res.text();
        if(data=="success"){
            alert("successfully deleted");
            getdonors();
        }
        else{
            alert("Deletion Failed");
        }
    }
    

document.getElementById("search").addEventListener('keyup',(e)=>{
    str=``;
    arr.filter((i)=>i.name.toLowerCase().includes(e.target.value.toLowerCase())).map((dt)=>{
        str+=`<div class="container">
        <div class="txt">
      
           <div class="txt1"><input type="text" disabled=true value=${dt.name} name="name" id="name-${dt._id}"></div>
           <div class="txt1"><input type="text" disabled=true value=${dt.email} name="email" id="email-${dt._id}"></div>
           <div class="txt1"><input type="text" disabled=true value=${dt.phone} name="phone" id="phone-${dt._id}"></div>
            <div class="txt1"><input type="text" disabled=true value=${dt.bloodgroup} name="blood" id="blood-${dt._id}"></div>
           <div class="txt1"><input type="text" disabled=true value=${dt.gender} name="gender" id="gender-${dt._id}"></div>
        </div>

        <div class="btns">
            <button style="background-color: blue; color: white;" onclick="handleEdit('${dt._id}')">Edit</button>
            <button style="background-color:green ;color: white;" onclick="handleSave('${dt._id}')">Save</button>
            <button style="background-color: red; color: white;" onclick="handleDelete('${dt._id}')">Delete</button>
        </div>
        </div>`
    })
    document.getElementById("container").innerHTML=str;

})