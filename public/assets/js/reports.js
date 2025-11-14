/* Author: Ignatius Warren Benjamin D. Javelona, Jared Ramon Elizan */

/* ================= METRICS REFERENCES ================= */
const totalRevenue = document.getElementById('totalRevenue');
const numOfTransactions = document.getElementById('numOfTransactions');
const avgTranValue = document.getElementById('avgTransactionValue');
const profitPerformance = document.getElementById('profitPerformance')
const bestSellingRev = document.getElementById('best-selling-revenue');
const bestSellingCat = document.getElementById('best-selling-category');
const lowStock = document.getElementById('low-stock');
const mostSoldItem = document.getElementById('most-sold-item');

const metric_config = [
{ key: 'all_sales_metric', 
  reference: {
      total_revenue: totalRevenue,
      total_transactions: numOfTransactions,
      avg_transaction_value: avgTranValue,
      profit_performance: profitPerformance
    },
  prefix: { 
      total_revenue: '₱', 
      avg_transaction_value: '₱' 
    },
  suffix: { 
      profit_performance: '%' 
    }
  },
{ key: 'inv_metric_best_item_category', 
  reference: {
      product_name: bestSellingRev,
      category: bestSellingCat
    }
  },
{ key: 'inv_metric_low_stock', 
  reference: {
      low_stock: lowStock 
    } 
  },
{ key: 'inv_metric_most_sold',
  reference: { 
    product_name: mostSoldItem 
  } 
}
];

/* ================= LIST METRICS REFERENCES ================= */
const categoryTable = document.getElementById('sales-table-category');
const timeTable = document.getElementById('sales-table-time');
const soldTable = document.getElementById('inventory-table-sold');
const sellingTable = document.getElementById('inventory-table-selling');
const stockTable = document.getElementById('inventory-table-stock');

const list_metric_config = [
  { key: 'sales_limetric_time', 
    table: timeTable, 
    value: [
      'hour_label',
      'total_orders'
    ] 
  },
  { key: 'sales_limetric_category', 
    table: categoryTable, 
    value: [
      'category', 
      'category_performance'
    ] 
  },
  { key: 'inv_limetric_most_sold', 
    table: soldTable, 
    value: [
      'product_name', 
      'total_quantity_sold'
    ] 
  },
  { key: 'inv_limetric_best_selling', 
    table: sellingTable,
    value: [
      'product_name', 
      'grouped_price'
    ] 
  },
  { key: 'inv_limetric_low_stock', 
    table: stockTable, 
    value: [
      'product_name', 
      'current_stock'
    ] 
  }
];

//for switching from inventory to sales(in dropdown)/vice versa
document.getElementById('reportType').addEventListener('change', function() {
    const sales = document.getElementById('salesReport');
    const inventory = document.getElementById('inventoryReport');
    if (this.value === 'sales') {
        sales.style.display = 'block';
        inventory.style.display = 'none';
    } else {
        sales.style.display = 'none';
        inventory.style.display = 'block';
    }
});

const populateMetrics = (data) => {
  metric_config.forEach(({ key, reference, prefix = {}, suffix = {} }) => {
    const metricData = data[key] ?? {};

    if (Object.keys(metricData).length === 0) {
      console.log(`No data found for ${key}`);
      Object.values(reference).forEach(i => i.innerText = 'No data');
      return;
    }

    Object.entries(reference).forEach(([key, ref]) => {
      const value = metricData[key];
      const isNumeric = !isNaN(value) && value && value !== '';
      ref.innerText = !value ? 'No data found.' : `${prefix[key] ?? ''}${isNumeric ? Number(value).toLocaleString() : value}${suffix[key] ?? ''}`;
    })
  });
};

const fetchSalesInventoryMetrics = async () => {
  try {
    const response = await fetch('handlers/fetch_inventory_sales_metrics.php');
    const data = await response.json();

    populateMetrics(data);  

    console.log(data); 
  } catch (err) {
    showToast("Failed to load key metrics", err.message, 'error');
    console.error(err.message);
  }
};


const generateTableRows = (data, keys) => {
  return data.map(item => `
    <tr>
      ${keys.map(i => `<td>${item[i] ?? ''}</td>`).join('')}
    </tr>
  `).join('\n');
};

const renderTable = (tableElement, data, keys) => {
  tableElement.innerHTML = generateTableRows(data, keys);
};

const fetchSalesInventoryListMetrics = async () => {
  try {
    const response = await fetch('handlers/fetch_inventory_sales_list_metrics.php');
    const data = await response.json();

    list_metric_config.forEach(({ key, table, value }) => {
      const metricData = data[key] ?? [];
      if (table === stockTable && metricData.length === 0) {
        table.innerHTML = 
        `
          <tr>
            <td colspan="${value.length}" class="text-center"> All products are above minimum threshold. </td>
          </tr>
        `;
      } else {
        renderTable(table, metricData, value);
      }
    });

  } catch (err) {
    showToast("Failed to load detailed reports", err.message, 'error');
    console.error(err);
    list_metric_config.forEach(({ table, value }) => {
      table.innerHTML = `<tr><td colspan="${value.length}" style="text-align:center;">Error loading data</td></tr>`;
    });
  }
};

/* ================= GENERATE REPORT REFERENCES ================= */
const handleGenerateReport = async () => {
  const start = document.getElementById('startDate').value.trim();
  const end = document.getElementById('endDate').value.trim();

  console.log(`start: ${start}, end: ${end}`)
  try {
    const response = await fetch(`handlers/handle_generate_report.php?start=${start}&end=${end}`);
    const data = await response.json();

    if(!data.success) {
      throw new Error(data.message);
    }

    // Save data in sessionStorage - temporary only until tab is closed
    sessionStorage.setItem('reportData', JSON.stringify(data));
    console.log('reportData in reports: ' + JSON.stringify(data))
    sessionStorage.setItem('reportPeriod', JSON.stringify({'start': start, 'end': end }));
    // redirect to 'report-preview.php' for reporting data preview
    window.location.href = 'report-preview.php';
    console.log(data);

  } catch (error) {
    showToast(error.message, 'error');
  }
}

document.addEventListener('DOMContentLoaded', () =>{
    fetchSalesInventoryMetrics();
    fetchSalesInventoryListMetrics();
});
