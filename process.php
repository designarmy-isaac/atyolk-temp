<?php
$data_email = $_POST['subscribe_email'];
function syncMailchimp($data_email) {
    $apiKey = '9b35ebc31953582b19474ed6db6ce3b1-us12';
    $listId = '6f31dcc124';
    $memberId = md5(strtolower($data_email));
    $dataCenter = substr($apiKey,strpos($apiKey,'-')+1);
    $url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $listId . '/members/' . $memberId;
    $json = json_encode(array(
      'email_address' => $data_email,
      'status'        => 'subscribed'
    ));
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json);                                                                                                                 
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    header('Content-Type: application/json');
    exit(json_encode($httpCode));
}
syncMailchimp($data_email);
?>