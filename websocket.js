var WebSocketConnector = function(url) {
	this.socket = new WebSocket(url);
	this.socket.onmessage = function(event) {
		console.log(event.data);
	};
	this.socket.onopen = function(event) {
		console.log("connected");
	};
	this.socket.onclose = function(event) {
		console.log("disconnected");
	};
	this.socket.onerror = function(event) {
		console.log("error");
	};
};

WebSocketConnector.prototype.send = function(data) {
	this.socket.send(data);
};
