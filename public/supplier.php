<!-- Author: John Roland L. Octavio -->
<?php 
include_once __DIR__ . '/../includes/config/_init.php'; 
  $Role = ucwords(strtolower(SessionManager::get('role')));
  $PageTitle = "{$Role} - Suppliers | NIXAR POS";
  $CssPath = "assets/css/styles.css";
  $JSPath = "assets/js/scripts.js";  

  include_once '../includes/head.php';
  SessionManager::checkSession()
?>

 <div class="container-fluid p-0 m-0 h-100 px-4 py-3 d-flex flex-column overflow-x-hidden">
    <?php include_once '../includes/components/nav.php'; ?>
    <div class="row container-fluid p-0 m-0 mt-3 mb-3 gap-4">
        <h2 class="px-0">Supplier Information</h2>
        <!--=================  SUPPLIER TABLE  =================-->
        <div class="table-responsive px-0" id="container-supplier-tbl">
          <table class="table table-striped bg-white">
            <thead class="color-primary-red">
            <tr>
              <th>Supplier Name</th>
              <th>Contact Number</th>
              <th>Product Supply Count</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody id="container-supplier-data">
              <!-- ===== HOST ALL INVENTORY ROWS FETCHED FROM JS ===== -->
            </tbody>
          </table>
        </div>
        <!-- =============== PAGINATION CONTROLS =============== -->
        <nav>
          <ul class="pagination justify-content-center" id="pagination-container"></ul>
        </nav>
    </div>
 </div>

<?php include_once '../includes/components/supplier-products-modal.php'; ?>
<?php include_once '../includes/components/toast-container.php'; ?>
<!-- =============== SUPPLIER PAGE SPECIFIC SCRIPT =============== -->
<script src="assets/js/supplier.js?v=<?=filemtime('assets/js/supplier.js')?>"></script>
<?php include_once '../includes/footer.php'; ?>