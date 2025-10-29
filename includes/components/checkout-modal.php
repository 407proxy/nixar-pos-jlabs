<div class="modal fade" id="checkoutModal" tabindex="-1" aria-labelledby="checkoutModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header w-100 d-flex justify-content-between align-items-center py-2 px-3">
                <h1 class="modal-title fs-4">Create Invoice</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body w-100">
                <div class="row">
                    <div class="col-12 col-lg-5 d-flex flex-column justify-content-start align-items-start gap-1">
                        <!-- Order Details -->
                        <h6>Order Details</h6>
                        <table class="table table-bordered rounded-4 table-fixed">
                            <thead>
                            <tr>
                                <th class="fw-normal text-muted" style="width: 40%;">Item</th>
                                <th class="text-center fw-normal text-muted" style="width: 20%;">Qty</th>
                                <th class="text-center fw-normal text-muted" style="width: 20%;">Unit Price</th>
                                <th class="text-end fw-normal text-muted" style="width: 20%;">Total</th>
                            </tr>
                            </thead>
                            <tbody id="checkout-table-body">
                            <!-- Populated dynamically via JS -->
                            </tbody>
                        </table>
                        <div class="w-100 d-flex justify-content-between align-items-center">
                            <p class="text-muted">Subtotal</p>
                            <p class="subtotal-display">₱0</p>
                        </div>
                        <div class="w-100 d-flex justify-content-between align-items-center">
                            <p class="text-danger">Discount</p>
                            <input type="number" class="text-end text-input discount-input" style="width: 30%;"/>
                        </div>
                        <div class="w-100 d-flex justify-content-between align-items-center">
                            <p class="fw-medium">Total</p>
                            <p class="total-display">₱0</p>
                        </div>

                        <!-- Customer Details -->
                        <h6 class="mt-4">Customer Details</h6>
                        <div class="w-100 d-flex flex-column gap-2">
                            <div>
                                <label for="customer-name" class="form-label text-muted small">Full Name</label>
                                <input
                                        type="text"
                                        id="customer-name"
                                        class="text-input w-100"
                                        placeholder="Enter customer name"
                                />
                            </div>
                            <div>
                                <label for="customer-email" class="form-label text-muted small">Email Address</label>
                                <input
                                        type="email"
                                        id="customer-email"
                                        class="text-input w-100"
                                        placeholder="customer@example.com"
                                />
                            </div>
                            <div>
                                <label for="customer-address" class="form-label text-muted small">Address</label>
                                <input
                                        type="text"
                                        id="customer-address"
                                        class="text-input w-100"
                                        placeholder="Street, City, Province"
                                />
                            </div>
                            <div>
                                <label for="customer-phone" class="form-label text-muted small">Phone Number</label>
                                <input
                                        type="tel"
                                        id="customer-phone"
                                        class="text-input w-100"
                                        placeholder="09XX XXX XXXX"
                                />
                            </div>
                        </div>

                        <div class="w-100 my-4">
                            <h6 class="fw-semibold">Payment Method</h6>
                            <select class="form-select mt-2">
                                <option>G-Cash</option>
                                <option>Cash</option>
                                <option>Card</option>
                            </select>
                        </div>
                        <button class="generate-btn btn w-100">Confirm</button>
                    </div>
                    <div class="d-none col-7 color-placeholder-gray rounded-3 d-lg-flex justify-content-center align-items-center">
                        <div class="bg-white w-50 rounded-3 p-2">
                            <div class="w-100 text-center mb-3">
                                <h6>Nixar Auto Glass & Car Tint</h6>
                                <p class="text-muted fs-6">26 Lizares St, Bacolod, 6100 Negros Occidental</p>
                                <p class="text-muted">(032) 432 3761</p>
                                <p class="text-muted">ByteMe! point of sale & inventory solutions - Bacolod City</p>
                            </div>
                            <div id="receipt" class="mb-3"></div>
                            <div class="w-100 d-flex justify-content-between align-items-center">
                                <p class="fw-semibold">Sub Total</p>
                                <p class="receipt-subtotal"></p>
                            </div>
                            <div class="w-100 d-flex justify-content-between align-items-center">
                                <p class="fw-semibold">Discount</p>
                                <p class="receipt-discount">₱0</p>
                            </div>
                            <div class="w-100 d-flex justify-content-between align-items-center">
                                <p class="fw-semibold">Total</p>
                                <p class="receipt-total"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
