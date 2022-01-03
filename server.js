// Initializing the app 
const app = require("./app");
// Initializing the http
const http = require("http");
// Initializing the PORT
const PORT = process.env.PORT || 5000;
/** Initializing the server for app */
const server = http.createServer(app)
/** Addings cors to allow data to be sent and received  */
const io = require("socket.io")(server, {
	cors: {
		origin: process.env.ClientURL,
		methods: [ "GET", "POST" ]
	}
})


// Video Chat//////////////////////////////////////////////////////////////////
// On the connection, once connected
io.on("connection", (socket) => {
	// emitting the id to the video component in react
	socket.emit("id", socket.id)
    /** on the callUser emit the signal data, from and name coming from the 
	 *  video component in react
	 */
	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { 
			signal: data.signalData, 
			from: data.from, 
			name: data.name 
		})
	})
    
	/** on the answerCall, emit the callAccepted and the data.signal value*/
	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})

	// on call disconnected, emit callEnded
	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})
})

//////////////////////////////////////////////////////////////////////////////////


// Chat/////////////////////////////////////////////////////////////////////////
// On connection
io.on("connection", (socket) => {

	// on join_room, create the room
	socket.on("join_room", (data) => {
	  socket.join(data);
	});
  
	// on send_message, emit the message in the chat box
	socket.on("send_message", (data) => {
	  socket.to(data.room).emit("receive_message", data);
	});
  
	// on disconnect, disconnect the room
	socket.on("disconnect", () => {
	  socket.broadcast.emit("User disconnected");
	});
  });


/////////////////////////////////////////////////////////////////////////////////
// start the server and listen for the PORT for socket io
server.listen(PORT, () => {
	console.log(`Started on Port: ${PORT}`);
});


