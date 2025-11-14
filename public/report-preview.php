<!-- AUTHOR: John Roland Octavio -->
<?php
  include_once __DIR__ . '/../includes/config/_init.php';  
  $Role = ucwords(strtolower(SessionManager::get('role')));
  $PageTitle = "{$Role} - Preview | NIXAR POS";
  $CssPath = "assets/css/styles.css";
  $JSPath = "assets/js/scripts.js";

  include_once '../includes/head.php'; 
  SessionManager::checkSession();
?>

<div class="container-fluid p-0 m-0 h-100 px-4 py-3 d-flex flex-column overflow-x-hidden" id="report-preview">
    <div class="w-50 mx-auto d-flex flex-column gap-4 p-3 border border-2">
        <!--=================  RECEIPT HEADER  =================-->
        <div class="d-flex justify-content-between align-items-center px-3 py-2 report-section">
            <img src="assets/svg/nixar-logo-red.svg" alt="nixar-logo-red" width="150px">
            <div class="d-flex flex-column report-table-header text-danger text-end">
                <p class="p-0 m-0 report-header-info fw-semibold">26 Lizares St, Bacolod, 6100 Negros Occidental</p>
                <p class="p-0 m-0 report-header-info fw-semibold">TIN: 431-132-312-312</p>
                <p class="p-0 m-0 report-header-info fw-semibold">Tel. No: (032) 432 3761</p>
            </div>
        </div>
        <div class="d-flex flex-column report-section">
            <h4 class="fw-bold fs-3 mb-4 text-center" style="margin:0 !important;">Nixar POS Report</h4>
            <p class="fs-6 text-center">Report Period: <span id="date-range"></span></p>
        </div>
        <!--=================  SALES METRIC TABLE  =================-->
        <div class="d-flex flex-column gap-2 report-section">
            <h4 class="fw-semibold fs-6 mb-4 px-2" style="margin:0 !important;">A. Sales Report Numerical Metrics</h4>
            <div class="table-responsive" id="container-sales-numerical">
              <table class="table table-striped bg-white">
                <thead>
                <tr>
                  <th class="fw-semibold report-table-header">Total Revenue</th>
                  <th class="fw-semibold report-table-header">Transaction Count</th>
                  <th class="fw-semibold report-table-header">Average Transaction</th>
                  <th class="fw-semibold report-table-header">Profit Performance</th>
                </tr>
                </thead>
                <tbody id="sales-numerical-data">
                  <!-- ===== HOST ALL SALES REPORT ROWS FETCHED FROM JS ===== -->
                </tbody>
              </table>
            </div>
        </div>
        <!--=================  SALES LIST METRIC TABLE  =================-->
        <div class="d-flex flex-column gap-2 report-section">
            <h4 class="fw-semibold fs-6 mb-4 px-2" style="margin:0 !important;">B. Sales Report List Metrics</h4>
            <div class="table-responsive" id="container-sales-list">
              <table class="table table-striped bg-white">
                <thead>
                <tr>
                  <th class="fw-semibold report-table-header">Category Performance</th>
                  <th class="fw-semibold report-table-header">Total</th>
                  <th class="fw-semibold report-table-header">Sales by Time of Day</th>
                  <th class="fw-semibold report-table-header">Total</th>
                </tr>
                </thead>
                <tbody id="sales-list-data">
                  <!-- ===== HOST ALL SALES METRICS ROWS FETCHED FROM JS ===== -->
                </tbody>
              </table>
            </div>
        </div>
        <!--=================  INVENTORY METRIC TABLE  =================-->
        <div class="d-flex flex-column gap-2 report-section">
            <h4 class="fw-semibold fs-6 mb-4 px-2" style="margin:0 !important;">C. Inventory Report Numerical Metrics</h4>
            <div class="table-responsive" id="container-inventory-metrics">
              <table class="table table-striped bg-white">
                <thead>
                <tr>
                  <th class="fw-semibold report-table-header">Most Sold</th>
                  <th class="fw-semibold report-table-header">Best Selling (Revenue)</th>
                  <th class="fw-semibold report-table-header">Best Selling (Category)</th>
                  <th class="fw-semibold report-table-header">Low Stock Item Count</th>
                </tr>
                </thead>
                <tbody id="inventory-metric-data">
                  <!-- ===== HOST ALL SALES METRICS ROWS FETCHED FROM JS ===== -->
                </tbody>
              </table>
            </div>
        </div>
        <!--=================  INVENTORY LIST METRIC TABLE  =================-->
        <div class="d-flex flex-column gap-2 report-section">
            <h4 class="fw-semibold fs-6 mb-4 px-2" style="margin:0 !important;">D. Inventory Report List Metrics</h4>
            <div class="table-responsive" id="container-inventory-list">
              <table class="table table-striped bg-white">
                <thead>
                <tr>
                  <th class="fw-semibold report-table-header">Best Selling (Revenue)</th>
                  <th class="fw-semibold report-table-header">Total Price</th>
                  <th class="fw-semibold report-table-header">Best Selling (Quantity)</th>
                  <th class="fw-semibold report-table-header">Total Price</th>
                </tr>
                </thead>
                <tbody id="inventory-list-data">
                  <!-- ===== HOST ALL SALES METRICS ROWS FETCHED FROM JS ===== -->
                </tbody>
              </table>
            </div>
        </div>
        <!--=================  TRANSACTION TABLE  =================-->
        <div class="d-flex flex-column gap-2 report-section">
            <h4 class="fw-semibold fs-6 mb-4 px-2" style="margin:0 !important;">E. All Transactions <span id="transaction-range"></span></h4>
            <div class="table-responsive" id="container-transactions">
              <table class="table table-striped bg-white">
                <thead>
                <tr>
                  <th class="fw-semibold report-table-header">Transaction ID</th>
                  <th class="fw-semibold report-table-header">Customer ID</th>
                  <th class="fw-semibold report-table-header">Created At</th>
                  <th class="fw-semibold report-table-header">Payment Method</th>
                  <th class="fw-semibold report-table-header">Issuer</th>
                  <th class="fw-semibold report-table-header">Receipt ID</th>
                  <th class="fw-semibold report-table-header">Issued At</th>
                  <th class="fw-semibold report-table-header">Total Amount</th>
                  <th class="fw-semibold report-table-header">Discount</th>
                  <th class="fw-semibold report-table-header">Quantity</th>
                </tr>
                </thead>
                <tbody id="transaction-data">
                  <!-- ===== HOST ALL TRANSACTION FETCHED FROM JS ===== -->
                </tbody>
              </table>
            </div>
        </div>
        <!--=================  INVENTORY TABLE  =================-->
        <div class="d-flex flex-column gap-2 report-section">
            <h4 class="fw-semibold fs-6 mb-4 px-2" style="margin:0 !important;">F. Inventory Status</h4>
            <div class="table-responsive" id="container-inventory">
              <table class="table table-striped bg-white">
                <thead>
                <tr>
                  <th class="fw-semibold report-table-header">Product Name</th>
                  <th class="fw-semibold report-table-header">SKU</th>
                  <th class="fw-semibold report-table-header">Category</th>
                  <th class="fw-semibold report-table-header">Material Name</th>
                  <th class="fw-semibold report-table-header">Minimum Stock</th>
                  <th class="fw-semibold report-table-header">Stocks Available</th>
                  <th class="fw-semibold report-table-header">Base Price</th>
                  <th class="fw-semibold report-table-header">Supplier Name</th>
                  <th class="fw-semibold report-table-header">Mark Up (%)</th>
                  <th class="fw-semibold report-table-header">Final Price</th>
                </tr>
                </thead>
                <tbody id="inventory-data">
                  <!-- ===== HOST ALL INVENTORY FETCHED FROM JS ===== -->
                </tbody>
              </table>
            </div>
        </div>
        <div>
            <button type="button" onclick="window.location.href='reports.php'" class="btn bg-danger">&larr; Back</button>
        </div>
    </div>
</div>

<script src="assets/js/preview.js?v=<?=filemtime('assets/js/preview.js')?>"></script>
<?php include_once "../includes/footer.php" ?>