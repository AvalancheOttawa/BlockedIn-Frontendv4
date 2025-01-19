class WebSocketData {
    static rightChoice = 0;
    static wrongChoice = 0;
    static lastNumLines = 0;
    static currentNumLines = 0;
    static isFocusMode = false;
    static timer = null;

    static resetGame() {
        WebSocketData.rightChoice = 0;
        WebSocketData.wrongChoice = 0;
        WebSocketData.lastNumLines = 0;
        WebSocketData.currentNumLines = 0;
        WebSocketData.isFocusMode = false;
        if (WebSocketData.timer) {
            clearInterval(WebSocketData.timer);
            WebSocketData.timer = null;
        }
    }

    static startCountdown(duration) {
        if (WebSocketData.timer) return; // Prevent multiple timers
        WebSocketData.countdown = duration;
        WebSocketData.isFocusMode = true;

        WebSocketData.timer = setInterval(() => {
            if (WebSocketData.countdown > 0) {
                WebSocketData.countdown--;
                console.log(`Time remaining: ${WebSocketData.countdown} seconds`);
            } else {
                clearInterval(WebSocketData.timer);
                WebSocketData.timer = null;
                WebSocketData.isFocusMode = false;
                console.log("Countdown complete!");
            }
        }, 1000);
    }
}
