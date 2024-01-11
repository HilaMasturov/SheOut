$(document).ready(function () {
    // Function to load orders from the API
    function loadOrders() {
        $.get('/api/order', function (data) {
            // Clear existing table rows
            $('#ordersTable tbody').empty();

            // Populate the table with orders
            data.forEach(function (order) {
                const editButton = `<button class="edit-btn" data-id="${order._id}">ערוך</button>`;
                const deleteButton = `<button class="delete-btn" data-id="${order._id}">מחק</button>`;
                const actions = `<td>${editButton} | ${deleteButton}</td>`;
                $('#ordersTable tbody').append(
                    `<tr>
                        <td>${order.product.name}</td>
                        <td>${order.count}</td>
                        ${actions}
                    </tr>`
                );
            });

            // Attach click handlers for edit and delete buttons
            $('.edit-btn').click(function () {
                const orderId = $(this).data('id');
                const newCount = prompt('הזן את הכמות החדשה:');
                if (newCount !== null) {
                    $.ajax({
                        url: `/api/order/${orderId}`,
                        type: 'PUT',
                        contentType: 'application/json',
                        data: JSON.stringify({ count: newCount }),
                        success: function () {
                            // Reload the orders table after updating
                            loadOrders();
                        },
                    });
                }
            });

            $('.delete-btn').click(function () {
                const orderId = $(this).data('id');
                if (confirm('האם אתה בטוח שברצונך למחוק את ההזמנה?')) {
                    $.ajax({
                        url: `/api/order/${orderId}`,
                        type: 'DELETE',
                        success: function () {
                            // Reload the orders table after deleting
                            loadOrders();
                        },
                    });
                }
            });
        });
    }

    // Load orders when the page loads
    loadOrders();
});