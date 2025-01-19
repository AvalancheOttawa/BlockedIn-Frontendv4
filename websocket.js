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
	let focus = jsonOutput.message.focus;
	console.log(focus);
	if (focus < 1) {
		focus *= 100;
	}
	if (focus <= 20) {
		WebSocketData.startCountdown(17);
	} else if (focus <= 40) {
		WebSocketData.startCountdown(7);
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

setTimeout(function() {
    ws.send(JSON.stringify({ "endpoint": "getFocus", "message": "" }));
    
    // Start the interval after the timeout completes
    setInterval(function() {
        ws.send(JSON.stringify({ "endpoint": "getFocus", "message": "" }));
    }, 3000);
}, 8000);
