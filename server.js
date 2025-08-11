const express = require('express');
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');
const port = 3000;
let users = {};

try{
    app.use(express.static(path.join(__dirname , "templates")));
    app.get('/' , function (req ,res){
        res.sendFile(path.join(__dirname,"/templates/chat.html"));
    })
    
    io.on('connection', (socket) =>{
        socket.on('user_name' , (names) =>{
            users[socket.id] = names;
            console.log(users);
            
            io.emit('user-joined', names);
            // console.log(`${names} : ${socket.id}`);
        })

        socket.on('send_msg' , (messages) =>{
            app.post("/submit",(req,res)=>{});
            io.emit('receive_msg' , {"message": messages , "names":users[socket.id]})
            console.log(`${users[socket.id]} : ${messages}`); 
        })
        
        socket.on('disconnect',()=>{            
            io.emit('user_disconnect', users[socket.id]);
            // delete users.socket.id;
            console.log(users[socket.id]+" leave the group");
            
        });
    })

}catch(err){
    console.log(err);
}
server.listen(port , ()=>{
    console.log(`app is listening in this port http://localhost:${port}`)
})