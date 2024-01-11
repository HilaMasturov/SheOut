$(document).ready(function () {
    // Extract the id from the query string
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Make a GET request to retrieve all contacts
    $.get('/api/contact/', function (contacts) {
        // Find the contact with the matching _id
        const contact = contacts.find(c => c._id === id);

        if (contact) {
            // Populate the form with the retrieved contact data
            $('#name').val(contact.name);
            $('#email').val(contact.email);
            $('#subject').val(contact.subject);
            $('#message').val(contact.message);
        } else {
            console.error('Contact not found');
        }
    });

    // Handle the form submission for updating the contact
    $('#contactForm').submit(function (e) {
        e.preventDefault();

        // Serialize the form data to JSON
        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            subject: $('#subject').val(),
            message: $('#message').val()
        };

        // Send the JSON data to the API as a PUT request
        $.ajax({
            type: 'PUT',
            url: `/api/contact/${id}`,
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (response) {
                // Redirect to a success page or handle success as needed
                window.location.href = './contactTable.html';
            },
            error: function (error) {
                // Handle error
                console.error('Error updating contact:', error);
            }
        });
    });
});