<?php 
    /* Author: John Roland Octavio
    *  fetch_invetory.php 
    *  Fetches paginated inventory data, appends image URLs, and returns JSON response.
    */
    header("Content-Type: application/json");

    include_once __DIR__ . '/../../includes/config/_init.php';  
    SessionManager::checkSession();

    $Conn = DatabaseConnection::getInstance()->getConnection();
    try {
        $Inventory = new Inventory($Conn);

        $Limit = isset($_GET['limit']) ? (int)$_GET['limit'] : null;
        $Page  = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $Offset = ($Limit !== null) ? ($Page - 1) * $Limit : 0;

        $InventoryData = $Inventory->fetchInventory($Limit, $Offset);
        
        if (!$InventoryData['success']) {
            throw new Exception($InventoryData['message']);
        }
        // Append base path for js to display
        foreach($InventoryData['data'] as &$Product) {
            $Product['product_img_url'] = $BASE_IMAGE_URL . $Product['product_img_url'];
        }

        $Response = [
            'success' => true,
            'inventory' => $InventoryData['data']
        ];

        if ($Limit !== null) {
            $TotalProducts = $Inventory->getInventoryCount();
            $Response['totalPages'] = ceil($TotalProducts / $Limit);
            $Response['currentPage'] = $Page;
        }

        echo json_encode($Response);
    } catch (Exception $E) {
        error_log("Error: " . $E->getMessage());
        error_log("Trace: " . $E->getTraceAsString());
        echo json_encode([
            'success' => false,
            'message' => $E->getMessage()
        ]);
    }
?>