const socket = new io()
let textarea =  document.querySelector("#textarea")
let messageArea = document.querySelector('.message_area')
let username;
do {
    username = prompt("Enter usename")
} while (!username);

textarea.addEventListener('keyup',(e)=>{
if(e.key=="Enter")
{
      let text = e.target.value;
      if(text.trim()!="")
        sendmessage(text.trim());
}
})

function sendmessage(message){
    let msg={
         user:username,
         message:message.trim()         
    }

    appendmessage(msg,'outgoing')
    textarea.value=""

    //send to server
    socket.emit("message",msg);
}
function appendmessage(msg,type)
{
   let maindiv=document.createElement("div");
   let classname=type;
   maindiv.classList.add("message",classname)
   let markup=`<h4>${msg.user}</h4>${msg.message}</p>`

   maindiv.innerHTML=markup
   messageArea.appendChild(maindiv)
}

//recieve from server
socket.on("messageFromServer",(msg)=>{
    appendmessage(msg,'incoming')
})
