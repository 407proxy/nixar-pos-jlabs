/*
    Author: Ignatius Warren Benjamin Javelons
*/

ALTER TABLE nixar_products
ADD COLUMN product_supplier_id INT NOT NULL
AFTER product_material_id;

UPDATE nixar_products
SET product_supplier_id = 1
WHERE nixar_product_sku = 'NX-GLS-001';

UPDATE nixar_products
SET product_supplier_id = 3
WHERE nixar_product_sku = 'NX-GLS-002';

UPDATE nixar_products
SET product_supplier_id = 4
WHERE nixar_product_sku = 'NX-GLS-003';

UPDATE nixar_products
SET product_supplier_id = 5
WHERE nixar_product_sku = 'NX-GLS-004';

UPDATE nixar_products
SET product_supplier_id = 6
WHERE nixar_product_sku = 'NX-GLS-005';

UPDATE nixar_products
SET product_supplier_id = 7
WHERE nixar_product_sku = 'NX-GLS-006';

UPDATE nixar_products
SET product_supplier_id = 8
WHERE nixar_product_sku = 'NX-GLS-007';

UPDATE nixar_products
SET product_supplier_id = 11
WHERE nixar_product_sku = 'NX-MIR-001';

UPDATE nixar_products
SET product_supplier_id = 12
WHERE nixar_product_sku = 'NX-MIR-002';

UPDATE nixar_products
SET product_supplier_id = 13
WHERE nixar_product_sku = 'NX-MIR-003';

UPDATE nixar_products
SET product_supplier_id = 14
WHERE nixar_product_sku = 'NX-MIR-004';

UPDATE nixar_products
SET product_supplier_id = 17
WHERE nixar_product_sku = 'NX-TNT-001';

UPDATE nixar_products
SET product_supplier_id = 19
WHERE nixar_product_sku = 'NX-TNT-002';

UPDATE nixar_products
SET product_supplier_id = 20
WHERE nixar_product_sku = 'NX-TNT-003';

UPDATE nixar_products
SET product_supplier_id = 21
WHERE nixar_product_sku = 'NX-TNT-004';

UPDATE nixar_products
SET product_supplier_id = 23
WHERE nixar_product_sku = 'NX-ACC-001';

UPDATE nixar_products
SET product_supplier_id = 24
WHERE nixar_product_sku = 'NX-ACC-002';

ALTER TABLE nixar_products
ADD CONSTRAINT fk_product_supplier
FOREIGN KEY (product_supplier_id) REFERENCES product_suppliers(product_supplier_id);

UPDATE receipts
SET total_amount = 13200.00
WHERE receipt_id = 1001;

UPDATE receipts
SET total_amount = 6790.00
WHERE receipt_id = 1002;

UPDATE receipts
SET total_amount = 6520.00
WHERE receipt_id = 1003;

UPDATE receipts
SET total_amount = 4232.00
WHERE receipt_id = 1004;

UPDATE receipts
SET total_amount = 4527.50
WHERE receipt_id = 1005;

UPDATE receipts
SET total_amount = 11580.00
WHERE receipt_id = 1006;

UPDATE receipts
SET total_amount = 6870.00
WHERE receipt_id = 1007;

UPDATE receipts
SET total_amount = 7060.00
WHERE receipt_id = 1008;

UPDATE receipts
SET total_amount = 7060.00
WHERE receipt_id = 1009;

UPDATE receipts
SET total_amount = 3667.00
WHERE receipt_id = 1010;

UPDATE receipts
SET total_amount = 10580.00
WHERE receipt_id = 1011;

UPDATE receipts
SET total_amount = 3300.00
WHERE receipt_id = 1012;

UPDATE receipts
SET total_amount = 14040.00
WHERE receipt_id = 1013;

UPDATE receipts
SET total_amount = 3565.00
WHERE receipt_id = 1014;

UPDATE receipts
SET total_amount = 4357.50
WHERE receipt_id = 1015;