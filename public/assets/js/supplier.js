/*
 * Author: John Roland Octavio
 * supplier.js contains ALL data fetching logic and DOM Manipulation for dynamic rendering for supplier page.
*/
const supplierTbl = document.getElementById('container-supplier-data');
const pagination = document.getElementById('pagination-container');
let currentSupplierId = null; // track of the supplier_id for refetching logic of products from suppliers

const LIMIT = 10;
let currentPage = 1;
const fetchSuppliers = async (page = 1) => {
    try {
        const response = await fetch(`handlers/fetch_suppliers.php?limit=${ LIMIT }&page=${ page }`)
        const data = await response.json();
        
        if(data.suppliers.length === 0) {
            supplierTbl.innerHTML = `
                <tr><td colspan="7" style="text-align:center;">No suppliers found in the database.</td></tr>
            `;
            return;
        }

        currentPage = data.currentPage;
        console.log(data);
        renderRows(data.suppliers);
        updatePagination(data.totalPages, data.currentPage)
    } catch (err) {
        showToast("Failed to load supplier list", err.message, 'error');
        console.error(err.message);
    }
}

const createSupplierRow = (supplier) => {
    return `
        <tr data-supplier-id="${supplier.supplier_id}">
            <td>
                <input type="text" name="supplier_name" class="form-control-plaintext" value="${supplier.supplier_name}" disabled />
            </td>
            <td>
                <input type="tel" name="contact_no" pattern="^09\\d{9}$" class="form-control-plaintext" value="${supplier.contact_no}" disabled />
            </td>
            <td>${supplier.product_supply_count}</td>
            <td>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-role='view'
                  data-bs-target="#supplierProductsModal"
                  onclick="fetchSupplierProducts(${supplier.supplier_id})"
                  class="btn"
                >
                    <i class="fa-solid fa-eye"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-edit"
                  data-supplier="${JSON.stringify(supplier)}"
                  onclick="toggleEditSupplierButton(this)"
                >
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
            
            </td>
        </tr>
    `;
}

const renderRows = (suppliers) => {
    supplierTbl.innerHTML = suppliers.map(supplier => createSupplierRow(supplier)).join('\n');
};

const fetchSupplierProducts = async (supplierId) => {
    currentSupplierId = supplierId;
    try {
        const response = await fetch(`handlers/fetch_supplier_products.php?supplier_id=${supplierId}`);
        const data = await response.json();

        console.log('Products for supplier:', supplierId, data);
        populateSupplierProductForms(data.supplier_products);
    } catch (error) {
        showToast("Failed to load products for this supplier", error.message, 'error');
        console.error(error.message);
    }
}

const resetViewButton = (viewBtn, supplierId) => {
    // Reset view button to original Bootstrap modal
    viewBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
    viewBtn.setAttribute('data-bs-toggle', 'modal');
    viewBtn.setAttribute('data-bs-target', '#supplierProductsModal');
    viewBtn.onclick = () => fetchSupplierProducts(supplierId);
}

const resetButtons = (editBtn, viewBtn, supplierId) => {
    // Reset edit/cancel button to default edit state
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.onclick = () => toggleEditSupplierButton(editBtn);

    // Also ensure the view button is in its default state
    resetViewButton(viewBtn, supplierId);
}

const toggleEditSupplierButton = (button) => {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('input');
    const isEditing = inputs[0].disabled;
    const viewBtn = row.querySelector('button[data-role="view"]');

    if (isEditing) {
        // Enter edit mode
        row.dataset.cachedValues = JSON.stringify(Array.from(inputs).map(i => i.value));
        inputs.forEach(input => {
            input.disabled = false;
            input.className = "form-control";
        });
        inputs[0].focus();

        // Temporarily remove Bootstrap modal attributes
        viewBtn.removeAttribute('data-bs-toggle');
        viewBtn.removeAttribute('data-bs-target');

        // Set view button to act as "save"
        viewBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        viewBtn.onclick = () => handleUpdateSupplier(inputs, viewBtn, button);
        
        // Change edit button to cancel
        button.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        button.onclick = () => cancelSupplierEdit(inputs, button , viewBtn, row);
    }
}

const cancelSupplierEdit = (inputs, editBtn, viewBtn, row) => {
    const cachedValues = JSON.parse(row.dataset.cachedValues);
    inputs.forEach((input, i) => {
        input.value = cachedValues[i];
        input.disabled = true;
        input.className = "form-control-plaintext";
    });

    resetButtons(editBtn, viewBtn, row.dataset.supplierId);
}

const handleUpdateSupplier = async (inputs, viewBtn, editBtn) => {
    const supplierId = inputs[0].closest('tr').dataset.supplierId; // Extract supplier_id from input by getting the closest <tr>
    // Convert all inputs in the row into a single object
    const updatedSupplierData = Array.from(inputs).reduce((object, input) => {
        object[input.name] = input.value;
        return object;
    }, {})
    inputs.forEach(input => {
        input.disabled = true;
        input.className = "form-control-plaintext";
    });
    
    try {
        const response = await fetch('handlers/update_supplier_info.php', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...updatedSupplierData, 'supplier_id': supplierId})
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message);

        showToast("Supplier details updated successfully", result.message);
        resetButtons(editBtn, viewBtn, supplierId);
    } catch (error) {
        showToast("Failed to update supplier details", error.message, 'error');
        console.error(error.message);
    }
    
}

const createProductRows = (product) => {
    console.log(product);
    return `
        <tr data-product-supplier-id="${product.product_supplier_id}">
            <td>${product.nixar_product_sku}</td>
            <td>${product.product_name}</td>
            <td>
                <input type="number" class="form-control-plaintext" min="0" max="999999" value="${product.base_price}" disabled/>
            </td>
            <td>
                <button
                  type="button"
                  onclick="toggleEditProductButton(this)"
                  class="btn"
                >
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  type="button"
                  class="btn"
                  data-product-supplier-id="${product.product_supplier_id}"
                  onclick="handleDelete(this)"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `;
}

const toggleEditProductButton = (button) => {
    const row = button.closest('tr');
    const input = row.querySelector('input');
    const isEditing = input.disabled; // editing only if input is enabled
    const deleteBtn = row.querySelector('button[data-product-supplier-id]');

    if (isEditing) {
        row.dataset.cachedValue = input.value; // cache the fetched data to the DOM in case the user cancels - persistent
        input.disabled = false;
        input.focus();
    } else {
        const updatedPrice = parseFloat(input.value);
        input.value = updatedPrice;
        input.disabled = true;
        // Update database
        const productSupplierId = row.dataset.productSupplierId;
        updateBasePrice(productSupplierId, updatedPrice);
    }

    input.className = isEditing ? "form-control": "form-control-plaintext";
    button.innerHTML = isEditing ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-pen-to-square"></i>';
    deleteBtn.innerHTML = isEditing ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-trash"></i>';
    // Transform the delete button to cancel button if user enters into editing mode
    deleteBtn.onclick = isEditing ? 
        () => { 
            input.disabled = true; 
            input.value = row.dataset.cachedValue; // revert input back to the cached value
            input.className = "form-control-plaintext"
            button.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteBtn.onclick = () => handleDelete(deleteBtn);
        }: () => handleDelete(deleteBtn);
}

const handleDelete = async (button) => {
    // user cancels the deletion - nothing happens
    if (!confirm('Are you sure you want to delete this product?')) return;
    const productSupplierId = button.dataset.productSupplierId;
    try {
        const response = await fetch(`handlers/delete_product_supplier.php?product_supplier_id=${productSupplierId}`)
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        const modalEl = document.getElementById('supplierProductsModal');
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) {
            modalInstance.hide();
        }

        if (currentSupplierId) fetchSupplierProducts(currentSupplierId);
        await fetchSuppliers();

        alert(data.message);
    } catch (error) {
        showToast("Failed to delete product from supplier list", error.message, 'error');
        console.error(error.message);
    }
}

const updateBasePrice = async (id, updatedPrice) => {
    try {
        const response = await fetch('handlers/update_price.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ 'product_supplier_id': id, 'base_price': updatedPrice })
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.message);

        // Re-fetch supplier products
        if (currentSupplierId) {
            fetchSupplierProducts(currentSupplierId);
        }
        showToast("Base price updates successfully", data.message, 'info');
    } catch (error) {
        showToast("Failed to update base price", error.message, 'error');
        console.error(error.message);
    }
}

const populateSupplierProductForms = (supplierProducts) => {
    const supplierProductsContainer = document.getElementById('container-supplier-products');
    supplierProductsContainer.innerHTML = supplierProducts.map(product => createProductRows(product)).join('\n');
}

const updatePagination = (totalPages, currentPage) => {
    let htmlString = '';
    // Render Previous button if current page is not the first page
    if (currentPage > 1) {
        htmlString += `
        <li class="page-item me-2">
            <a class="page-link" href="#" data-page="${ currentPage - 1 }">
            ← Previous
            </a>
        </li>`;
    }
    
    const MAX_ICONS_VISIBLE = 3;
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + MAX_ICONS_VISIBLE - 1);
    // Adjust starting value if it is nearing the end page
    if (end - start < MAX_ICONS_VISIBLE - 1) {
        start = Math.max(1, end - MAX_ICONS_VISIBLE + 1);
    }
    // Render all page icons
    for (let i = start; i <= end; i++) {
        htmlString += `
            <li class="page-item ${ i === currentPage ? 'active' : '' }">
                <a class="page-link" href="#" data-page="${ i }">${ i }</a>
            </li>
        `;
    }
    // Render Next button if current page is not the last page
    if (currentPage < totalPages) {
      htmlString += `
        <li class="page-item ms-2">
            <a class="page-link" href="#" data-page="${ currentPage + 1 }">
                Next →
            </a>
        </li>`;
    }
    // Embed pagination buttons into pagination controller
    pagination.innerHTML = htmlString;
    const pageLinks = pagination.querySelectorAll('.page-link');

    pageLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const page = parseInt(e.target.dataset.page);
            if(isNaN(page)) {
                return;
            }
            fetchSuppliers(page)
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    fetchSuppliers();
})