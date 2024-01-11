$(document).ready(function () {
    // Extract the id from the query string
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Make a GET request to retrieve all products
    $.get('/api/product', function (products) {
        // Find the product with the matching _id
        const product = products.find(p => p._id === id);

        if (product) {
            // Populate the form with the retrieved product data
            $('#name').val(product.name);
            $('#description').val(product.description);
            $('#price').val(product.price);
            $('#image').val(product.image);
        } else {
            console.error('Product not found');
        }
    });

    $('#productForm').submit(function (e) {
        e.preventDefault();

        // Serialize the form data to JSON
        var formData = {};
        $(this).serializeArray().map(function (item) {
            if (formData[item.name]) {
                if (formData[item.name] instanceof Array) {
                    formData[item.name].push(item.value);
                } else {
                    formData[item.name] = [formData[item.name], item.value];
                }
            } else {
                formData[item.name] = item.value;
            }
        });

        // Send the JSON data to the API as a PUT request
        $.ajax({
            type: 'PUT',
            url: `/api/product/${id}`,
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (response) {
                window.location.href = './products.html'
            },
            error: function (error) {
                // Handle error
                console.error('Error updating product:', error);
            }
        });
    });
});