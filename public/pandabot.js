document.addEventListener("DOMContentLoaded", function (e) {
    let chatLog = document.getElementById("chat-log");
    let scrollPosition = 0;
    let sendBtn = document.getElementById("send-btn");
    let userInput = document.querySelector(".user-input");
    let apiKey = "sk-proj-nekmXcqDMhCmdU3saVsNT3BlbkFJEElfkX9t1CB0NuiebtUY";
    let apiUrl = "https://api.openai.com/v1/chat/completions";

    // Load chat history from localStorage (bin add for chat history)
    function loadChatHistory() {
        let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatHistory.forEach(message => {
            displayMessage(message.type, message.content);
        });
    }

    // Save chat history to localStorage (bin add for chat history)
    function saveChatHistory(type, message) {
        let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatHistory.push({ type, content: message });
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }

    // Load chat history on page load (bin add for chat history)
    loadChatHistory();

    //Prints the welcome message
    function showWelcomeMessage() {
        const welcomeMessage = document.getElementById("welcome-message");
        welcomeMessage.textContent = 'Welcome to Panda Chatbot! How can I assist you today?';
    }

    //event listener when pressed enter
    userInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    })

    //Event listener when click send
    sendBtn.addEventListener("click", sendMessage);

    //send message code
    async function sendMessage() {

        //trim user input message
        let userMessage = userInput.value.trim();
        console.log(userMessage);
        if (userMessage !== "") {
            //check for internet connection
            if (!checkInternetConnection()) {
                displayMessage("error", "Sorry, you are offline. Please check your internet connection");
                return;
            }
            if (userMessage.startsWith("/")) {
                const command = userMessage.toLowerCase();
                processSpecialCommand(command);
            } else {
                //PandaBot should respond
                if (apiKey) { //check if API Key is available
                    try {
                        displayMessage("sent", userMessage);
                        let response = await sendChatMessage(userMessage);
                        if (response) {
                            displayMessage("received", response);
                            scrollChatLog();
                            saveChatToDatabase(userMessage, response);//save chat to the database;
                        }
                    } catch (error) {
                        console.error(error);
                        displayMessage("error", "Invalid or missing API key.");
                    }
                    userInput.value = "";
                } else {
                    displayMessage("error", "No API key is provided. Unable to send message.");
                    userInput.value = "";
                }
            }
        }
    }

    async function sendChatMessage(userMessage) {
        let data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                { role: "system", "content": "Welcome to PandaBot, How may I assist you today?" },
                { role: "user", content: userMessage }
            ]
        };
        showLoadingIndicator();
        try {
            let response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorText = await response.text();  // To get more detail about the error response
                throw new Error(`HTTP error ${response.status}: ${errorText}`);//line 79
            }

            let responseData = await response.json();
            if (responseData && responseData.choices && responseData.choices.length > 0) {
                let botResponse = responseData.choices[0].message.content;
                hideLoadingIndicator();
                displayMessage("received", botResponse);
            } else {
                handleAPIError(responseData);
            }
        } catch (error) {
            console.error(error);//line 91
            displayMessage("error", "Sorry, an error occurred while communicating with the API.")
        }
        hideLoadingIndicator();
    }

    const handleAPIError = (responseData) => {
        if (responseData && responseData.error && responseData.error.message) {
            displayMessage("error", "API ERROR: " + responseData.error.message + "");
        } else {
            displayMessage("error", "Sorry, an error occurred. Please try again!");
        }
    }

    function displayMessage(type, message) {
        let messageContainer = document.createElement("div");
        messageContainer.classList.add("message", type);
        let messageText = document.createElement("p");
        messageText.textContent = message;
        messageContainer.appendChild(messageText);

        // Attaching the chat message in the chat log
        chatLog.appendChild(messageContainer);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function checkInternetConnection() {
        return navigator.onLine;
    }

    function processSpecialCommand(command) {
        switch (command) {
            case "/help":
                displayMessage("sent", "You can ask PandaBot any questions or seek assistance. How can I help you?");
                break;
            case "/about":
                displayMessage("sent", "If you wish to learn more about PandaBot, please return to the homepage.");
                break;
            default:
                displayMessage("sent", "I don't understand that command. Please try again.");
                break;
        }
    }

    function showLoadingIndicator() {
        document.getElementById("loading-indicator").style.display = "flex";
    }

    function hideLoadingIndicator() {
        document.getElementById("loading-indicator").style.display = "none";
    }

    // Automatically scrolls down when the chat
    function scrollChatLog() {
        chatLog.scrollTop = chatLog.scrollHeight;
    }
});


// update may 20 ,save the chat history


async function saveChatToDatabase(userMessage, botResponse) {
    const token = localStorage.getItem('token');
    const data = {
        userId: jwt_decode(token).id,
        userMessage: userMessage,
        botResponse: botResponse
    };

    fetch('/save-chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => console.log('Chat saved:', data))
        .catch(error => {
            console.error('Error saving chat:', error);
            displayMessage("error", "Failed to save chat. Please try again later.");
        });

}
