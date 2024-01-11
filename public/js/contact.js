$(document).ready(function () {

    // Handle form submission
    $("#contactForm").submit(function (e) {
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

        // Send the JSON data via AJAX POST request
        $.ajax({
            type: "POST",
            url: "/api/contact", // Replace with your actual API endpoint
            data: JSON.stringify(formData),
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                alert("ההודעה נשלחה");
                location.reload();
            },
            error: function (error) {

            }
        });
    });
});