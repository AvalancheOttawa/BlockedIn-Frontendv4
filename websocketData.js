class WebSocketData {
    static rightChoice = 0;
    static wrongChoice = 0;
    static lastNumLines = 0;
    static currentNumLines = 0;

    static resetGame() {
        WebSocketData.rightChoice = 0;
        WebSocketData.wrongChoice = 0;
        WebSocketData.lastNumLines = 0;
        WebSocketData.currentNumLines = 0;
    }
}
