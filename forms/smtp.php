<?php
class SMTP {
    private $host;
    private $port;
    private $secure;
    private $username;
    private $password;
    private $socket;
    private $debug = false;

    public function __construct($host, $port, $secure = 'tls') {
        $this->host = $host;
        $this->port = $port;
        $this->secure = $secure;
    }

    public function authenticate($username, $password) {
        $this->username = $username;
        $this->password = $password;
    }

    private function connect() {
        $this->socket = fsockopen(
            ($this->secure === 'ssl' ? 'ssl://' : '') . $this->host,
            $this->port,
            $errno,
            $errstr,
            15
        );

        if (!$this->socket) {
            throw new Exception("Could not connect to SMTP host: $errstr ($errno)");
        }

        $this->getResponse();
        $this->sendCommand("EHLO " . gethostname());

        if ($this->secure === 'tls') {
            $this->sendCommand("STARTTLS");
            stream_socket_enable_crypto($this->socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
            $this->sendCommand("EHLO " . gethostname());
        }

        $this->sendCommand("AUTH LOGIN");
        $this->sendCommand(base64_encode($this->username));
        $this->sendCommand(base64_encode($this->password));
    }

    private function sendCommand($command) {
        fwrite($this->socket, $command . "\r\n");
        return $this->getResponse();
    }

    private function getResponse() {
        $response = '';
        while ($str = fgets($this->socket, 515)) {
            $response .= $str;
            if (substr($str, 3, 1) == ' ') break;
        }
        if ($this->debug) {
            echo $response . "\n";
        }
        if (substr($response, 0, 3) >= 400) {
            throw new Exception("SMTP Error: " . trim($response));
        }
        return $response;
    }

    public function sendEmail($from_email, $from_name, $to_email, $subject, $body) {
        $this->connect();

        $this->sendCommand("MAIL FROM:<$from_email>");
        $this->sendCommand("RCPT TO:<$to_email>");
        $this->sendCommand("DATA");

        $message = "From: $from_name <$from_email>\r\n";
        $message .= "To: <$to_email>\r\n";
        $message .= "Subject: $subject\r\n";
        $message .= "MIME-Version: 1.0\r\n";
        $message .= "Content-Type: text/html; charset=UTF-8\r\n";
        $message .= "\r\n";
        $message .= $body;
        $message .= "\r\n.";

        $this->sendCommand($message);
        $this->sendCommand("QUIT");

        fclose($this->socket);
    }

    public function setDebug($debug) {
        $this->debug = $debug;
    }
}
?>
