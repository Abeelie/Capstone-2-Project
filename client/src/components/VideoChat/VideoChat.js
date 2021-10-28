import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import Video from "./Video";
import swal from "sweetalert";
// import Errors from "../Errors/Errors";

const socket = io.connect(process.env.REACT_APP_BASE_URL);

const VideoChat = () =>{
	const [ me, setMe ] = useState("");
	const [ stream, setStream ] = useState();
	const [ receivingCall, setReceivingCall ] = useState(false);
	const [ caller, setCaller ] = useState("");
	const [ callerSignal, setCallerSignal ] = useState();
	const [ callAccepted, setCallAccepted ] = useState(false);
	const [ idToCall, setIdToCall ] = useState("");
	const [ callEnded, setCallEnded] = useState(false);
	const [ name, setName ] = useState("");
	const myVideo = useRef();
	const userVideo = useRef();
	const connectionRef= useRef();
	// const [socketError, setSocketError] = useState(false);

	useEffect(() => {
		navigator?.mediaDevices?.getUserMedia({ video: true, audio: true })
        .then((stream) => {
			setStream(stream)
			myVideo.current.srcObject = stream
		}).catch(error => {
			swal({
				title: error,
				text: "Please enable video and audio to chat with a friend.",
				icon: "error",
			  });
			// console.error(error)
		})

		socket.on("id", (id) => {
			setMe(id)
			// console.log(id)
		})

		socket.on("callUser", (data) => {
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
			// console.log(data)
		})
	}, [])

	const callUser = (id) => {
		const peer = new Peer({ initiator: true, trickle: false, stream: stream })
		
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})

		peer.on("stream", (stream) => { userVideo.current.srcObject = stream })

		socket.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})
		connectionRef.current = peer
	}

	const answerCall =() =>  {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})

		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})

		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
	}


	// socket.on("connect_error", (err) => {
	// 	setSocketError(true);
	// 	// console.log(err.message); 
	// });

	return (
		<>
		{/* {socketError ? <Errors title="Sorry, your machine websocket connection is not enabled"/> : null} */}
		<Video 
			stream={stream}
			myVideo={myVideo}
			me={me}
			callAccepted={callAccepted}
			callEnded={callEnded}
			userVideo={userVideo}
			name={name}
			setName={setName}
			idToCall={idToCall}
			setIdToCall={setIdToCall}
			leaveCall={leaveCall}
			callUser={callUser}
			answerCall={answerCall}
			receivingCall={receivingCall}
		/>
		</>
	)
}



export default VideoChat