$(document).ready(function () {
    $('#productForm').submit(function (e) {
        e.preventDefault();


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


        $.ajax({
            type: 'POST',
            url: '/api/product',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (response) {
                window.location.href = './products.html'
            },
            error: function (error) {

                console.error('Error adding product:', error);
            }
        });
    });
});