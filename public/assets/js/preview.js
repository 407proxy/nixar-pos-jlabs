/* 
    Author: John Roland Octavio 
    `preview.js` handles the display of report data for a sales and inventory dashboard. 
    It retrieves pre-fetched report data from the browser's sessionStorage and populates 
    various HTML tables with metrics including:

    1. Sales numerical metrics (total sales, best items, low stock, etc.)
    2. Inventory metrics (most sold products, low stock items, best selling products)
    3. Transaction history
    4. Sales performance by category and time of day

    Key Functions:
    - createRows: Wraps <td> cells into a <tr> row for tables
    - createTd: Converts an object's values into table cells
    - removeFromInventory: Filters out unnecessary keys from inventory data
    - formatReportPeriodDisplay: Formats the report period for display depending on available dates
    - mergeIntoRow: Combines two arrays of objects into a single table row per index
    - populateReportData: Main function that reads sessionStorage, transforms data, and injects it into HTML tables

*/

const datePeriodRef = document.getElementById('date-range');
const transactionPeriodRef = document.getElementById('transaction-range');
const salesNumericalContainer = document.getElementById('sales-numerical-data');
const inventoryMetricContainer = document.getElementById('inventory-metric-data');
const transactionContainer = document.getElementById('transaction-data');
const inventoryContainer = document.getElementById('inventory-data');
const salesListContainer = document.getElementById('sales-list-data');
const inventoryListContainer = document.getElementById('inventory-list-data');

const createRows = (tds) => {
    return `<tr class="report-table-items">${tds}</tr>`;
}

const createTd = (data) => {
    return tds = Object.values(data).map(d => `<td>${d}</td>`).join(' ');
}

const removeFromInventory = (object) => {
    KEYS_TO_REMOVE = ['compatible_cars', 'inventory_id', 'product_img_url', 'product_material_id', 'product_supplier_id', 'supplier_id'];
    const filtered = Object.entries(object).filter(([key, _]) => !KEYS_TO_REMOVE.includes(key));
    return Object.fromEntries(filtered);
}

const formatReportPeriodDisplay = (reportPeriod) => {
    const { start, end } = reportPeriod;
    if (start && end) {
        return `(${start} to ${end})`;
    }
    if (start) {
        return `From ${start}`;
    }
    if (end) {
        return `Up to ${end}`;
    }
    return `As of ${new Date().toLocaleDateString()}`;
}

const mergeIntoRow = (arr1, arr2) => {
    const maxLen = Math.max(arr1.length, arr2.length);
    const convertedRows = [];
    
    for (let i = 0; i < maxLen; i++) {
        const v1 = Object.values(arr1[i]);
        const v2 = Object.values(arr2[i]);

        // Merge and create a table row
        const merged = [...v1, ...v2];
        convertedRows.push(createRows(createTd(merged)));
    }

    return convertedRows.join(' ');
}

const populateReportData = () => {
  const reportData = JSON.parse(sessionStorage.getItem("reportData"));
  const reportPeriod = JSON.parse(sessionStorage.getItem("reportPeriod"));
  const { transactions, inventory, list_metrics, sales_metrics } = reportData.result;
  const inventoryTransformed = inventory.map(removeFromInventory);
  
  console.log(reportData);
  console.log(reportPeriod);
  // Extract sales_metric from JSON data and transform into a row entry
  const { best_item_category, low_stock: { low_stock } = low_stock, most_sold } = sales_metrics;
  const inventoryMetricRow = [
    `${most_sold.product_name} (${most_sold.total_quantity_sold})`,
    best_item_category.product_name,
    best_item_category.category,
    low_stock
  ];

  // Extract list_metrics from JSON data and transform into a row entry
  const { sales_category, sales_time_of_day, best_selling, most_sold: most_sold_qty } = list_metrics;
  const salesReportMetricRow = mergeIntoRow(sales_category, sales_time_of_day);
  const inventoryReportMetricRow = mergeIntoRow(
    best_selling.map(item => {
        const { category, ...rest } = item; // Filter out category from the data
        return rest; 
    }), 
    most_sold_qty
  );
  // console.log(salesReportMetricRow);
  // console.log(inventoryReportMetricRow);

  // Create an HTML string for the table entries
  const salesNumericString = createRows(createTd(sales_metrics.all_sales));
  const transactionString = transactions.map(transaction => createRows(createTd(transaction))).join(' ');
  const inventoryMetricString = createRows(createTd(inventoryMetricRow));
  datePeriodRef.innerText = formatReportPeriodDisplay(reportPeriod);
  transactionPeriodRef.innerText = formatReportPeriodDisplay(reportPeriod);
  
  // Embed each HTML strings in their corresponding table
  salesNumericalContainer.innerHTML = salesNumericString;
  transactionContainer.innerHTML = transactionString;
  inventoryMetricContainer.innerHTML = inventoryMetricString;
  salesListContainer.innerHTML = salesReportMetricRow;
  inventoryListContainer.innerHTML = inventoryReportMetricRow;
  inventoryContainer.innerHTML = inventoryTransformed.map(inventory => createRows(createTd(inventory))).join(' ');
}

document.addEventListener('DOMContentLoaded', () => {
    populateReportData();
})