document.addEventListener("DOMContentLoaded", function (e) {
    let historyLog = document.getElementById("history-log");

    function loadChatHistory() {
        let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatHistory.forEach(message => {
            displayMessage(message.type, message.content);
        });
    }

    function displayMessage(type, message) {
        let messageContainer = document.createElement("div");
        messageContainer.classList.add("message", type);
        let messageText = document.createElement("p");
        messageText.textContent = message;
        messageContainer.appendChild(messageText);
        historyLog.appendChild(messageContainer);
        historyLog.scrollTop = historyLog.scrollHeight;
    }

    // Load chat history when the page is loaded
    loadChatHistory();
});


