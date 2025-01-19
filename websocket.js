url = "ws://127.0.0.1:8000/ws"
// url = "wss://echo.websocket.org/"
var ws, playerID, playerList = [];

ws = new WebSocket(url)
ws.onopen = function() {
	console.log("WebSocket connection opened")
	// ws.send("Hello, WebSocket!")
}

ws.onmessage = function(event) {
	console.log(event.data)
	const jsonOutput = JSON.parse(event.data);
	console.log(jsonOutput.message.focus);
	if (jsonOutput.message.focus <= 45) {
		WebSocketData.startCountdown(20);
	} else if (jsonOutput.message.focus <= 70) {
		WebSocketData.startCountdown(10);
	}
}

ws.onclose = function() {
	console.log("WebSocket connection closed")
}

ws.onerror = function(event) {
	console.log("WebSocket error")
}

// send me the data in a json format 
// ws.send(JSON.stringify({ "name": "John", "age": 30 }));

setInterval(function() {
	const average = WebSocketData.rightChoice / (WebSocketData.rightChoice + WebSocketData.wrongChoice);
	// console.log("AVERAGE BEING SEND: " + average);
	string = JSON.stringify({ "endpoint": "sendAverage", "message": average});
	ws.send(string);
}, 1000);


setInterval(function() {
	const linesPerMin = WebSocketData.currentNumLines - WebSocketData.lastNumLines;
	WebSocketData.lastNumLines = WebSocketData.currentNumLines;
	ws.send(JSON.stringify({ "endpoint": "sendLineGrowth", "message": linesPerMin}));
}, 50000);

setInterval(function() {
	ws.send(JSON.stringify({ "endpoint": "getFocus", "message": ""}));
	// console.log(output);
	// const jsonOutput = JSON.parse(output);
	// if (jsonOutput.focus <= 45) {
	// 	WebSocketData.startCountdown(30);
	// } else if (jsonOutput.focus <= 70) {
	// 	WebSocketData.startCountdown(15);
	// }
}, 2000);
