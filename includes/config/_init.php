<?php 
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    ini_set('log_errors', 1);
    ini_set('error_log', __DIR__ . '/../../logs/php-error.log');
    // Import all config and utils
    require_once __DIR__ . '/DatabaseConnection.php';
    require_once __DIR__ . '/SessionManager.php';
    require_once __DIR__ . '/InputValidator.php';
    require_once __DIR__ . '/NixarProduct.php';
    require_once __DIR__ . '/Inventory.php';
    require_once __DIR__ . '/Supplier.php';
    require_once __DIR__ . '/CarModel.php';

    $BASE_IMAGE_URL = 'http://localhost/nixar-pos/public/assets/img/uploads/';
    
?>