<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  header('Content-Type: application/json');

  // SMTP Configuration
  $smtp_host = 'smtp.gmail.com'; // Replace with your SMTP host
  $smtp_username = 'your-email@gmail.com'; // Replace with your email
  $smtp_password = 'your-app-password'; // Replace with your app password
  $smtp_port = 587;
  $smtp_secure = 'tls';

  // Recipient email
  $receiving_email_address = 'info@bssconnects.com';

  // Get form data
  $name = $_POST['name'] ?? '';
  $email = $_POST['email'] ?? '';
  $subject = $_POST['subject'] ?? '';
  $message = $_POST['message'] ?? '';

  // Basic validation
  if (empty($name) || empty($email) || empty($subject) || empty($message)) {
      echo json_encode([
          'success' => false,
          'message' => 'Please fill in all required fields.'
      ]);
      exit;
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      echo json_encode([
          'success' => false,
          'message' => 'Please enter a valid email address.'
      ]);
      exit;
  }

  try {
      // Create the email body
      $email_body = "
      <html>
      <head>
          <title>New Contact Form Submission</title>
      </head>
      <body>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> {$name}</p>
          <p><strong>Email:</strong> {$email}</p>
          <p><strong>Subject:</strong> {$subject}</p>
          <h3>Message:</h3>
          <p>" . nl2br(htmlspecialchars($message)) . "</p>
      </body>
      </html>";

      // Set up email headers
      $headers = "MIME-Version: 1.0\r\n";
      $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
      $headers .= "From: {$name} <{$email}>\r\n";
      $headers .= "Reply-To: {$email}\r\n";
      $headers .= "X-Mailer: PHP/" . phpversion();

      // Send email using SMTP
      require_once 'smtp.php';
      $smtp = new SMTP($smtp_host, $smtp_port, $smtp_secure);
      $smtp->authenticate($smtp_username, $smtp_password);
      $smtp->sendEmail($email, $name, $receiving_email_address, $subject, $email_body);

      echo json_encode([
          'success' => true,
          'message' => 'Your message has been sent. Thank you!'
      ]);

  } catch (Exception $e) {
      echo json_encode([
          'success' => false,
          'message' => 'Sorry, there was an error sending your message: ' . $e->getMessage()
      ]);
  }
?>
