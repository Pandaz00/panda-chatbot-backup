<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Prepare data to be written
    $data = "Email: " . $email . "\nMessage: " . $message . "\n\n";

    // Specify the file to write to
    $file = 'contact.txt';

    // Use file_put_contents to write the data to the file
    // FILE_APPEND flag is used to append data to the file instead of overwriting it
    if (file_put_contents($file, $data, FILE_APPEND)) {
        echo "Thank you for contacting us!";
    } else {
        echo "There was an error saving your message. Please try again.";
    }
}
?>
