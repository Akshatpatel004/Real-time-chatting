document.addEventListener("DOMContentLoaded", function() {
    const socket = io();
    const txtmessage=document.getElementById("txtmessage")
    const form = document.getElementById("form");
    const messagebox = document.getElementById("messagebox");

try{
    function post(msg , position){
        const p = document.createElement("p");
        p.innerText=msg;
        p.classList.add("message");
        p.classList.add(position);
        messagebox.appendChild(p);
        messagebox.scrollTop = messagebox.scrollHeight;
    }

    const pro_name = prompt("Enter your user name");
    socket.emit('user_name' , pro_name);
    
    form.addEventListener('submit',(e)=>{
        e.preventDefault;
        if (txtmessage.value) {
            post(`you : ${txtmessage.value}`,'right');
            socket.emit('send_msg', txtmessage.value);   
            txtmessage.value="";
        }
    })

    socket.on('user-joined', (names) =>{
        post(`${names} joined the chat` , 'center');
    })
    socket.on('user_disconnect', (names) =>{
        console.log(`${names} leave the chat`);
        post(`${names} leave the chat` , 'center');
    })

    socket.on('receive_msg', (data) =>{
        if (data.names!==pro_name) {
            post(`${data.names} : ${data.message}` , 'left');
        }
    })
}catch(err){
    console.log(err);
}

})