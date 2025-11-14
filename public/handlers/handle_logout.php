<?php 
    /* Author: John Roland Octavio
    * Logs out the current user by destroying the session and redirects to the login page.
    */
    include_once __DIR__ . '/../../includes/config/_init.php';
    SessionManager::checkSession();
    SessionManager::destroy();
    header('Location: /nixar-pos/public/index.php');
    exit;
?>