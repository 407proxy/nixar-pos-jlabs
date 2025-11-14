<!-- AUTHORS: Raean Chrissean R. Tamayo, John Roland Octavio -->
<?php
    header('Content-Type: application/json');
    include_once __DIR__ . '/../../includes/config/_init.php';
    SessionManager::checkSession();

    $Conn = DatabaseConnection::getInstance()->getConnection();

    if (!isset($_GET['sku']) || empty(trim($_GET['sku']))) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'No SKU provided.']);
        exit;
    }

    $Sku = InputValidator::sanitizeData($_GET['sku']);
    $Product = new NixarProduct($Conn);
    $FetchResult = $Product->fetchCompatible($Sku);

    if (!$FetchResult) {
        echo json_encode(['success' => false, 'message' => 'Error fetching data.']);
        exit;
    }

    echo json_encode(['success' => true, 'data' => $fetchResult]);
?>
