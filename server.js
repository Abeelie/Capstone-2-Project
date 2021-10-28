const app = require("./app");
const http = require("http")
const PORT = process.env.PORT || 5000;
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: process.env.ClientURL,
		methods: [ "GET", "POST" ]
	}
})


// Video Chat//////////////////////////////////////////////////////////////////

io.on("connection", (socket) => {
	socket.emit("id", socket.id)

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { 
			signal: data.signalData, 
			from: data.from, 
			name: data.name 
		})
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})
})

//////////////////////////////////////////////////////////////////////////////////


// Chat/////////////////////////////////////////////////////////////////////////
io.on("connection", (socket) => {

	socket.on("join_room", (data) => {
	  socket.join(data);
	});
  
	socket.on("send_message", (data) => {
	  socket.to(data.room).emit("receive_message", data);
	});
  
	socket.on("disconnect", () => {
	  socket.broadcast.emit("User disconnected");
	});
  });


/////////////////////////////////////////////////////////////////////////////////

server.listen(PORT, () => {
	console.log(`Started on Port: ${PORT}`);
});


