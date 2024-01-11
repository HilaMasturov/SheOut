
$(document).ready(function () {
    // Function to load contacts from the API
    function loadContacts() {
        $.get('/api/contact', function (data) {
            // Clear existing table rows
            $('#contactsTable tbody').empty();

            // Populate the table with contactsÏ
            data.forEach(function (contact) {
                const editButton = `<button class="edit-btn" data-id="${contact._id}">ערוך</button>`;
                const deleteButton = `<button class="delete-btn" data-id="${contact._id}">מחק</button>`;
                const actions = `<td>${editButton} | ${deleteButton}</td>`;

                $('#contactsTable tbody').append(
                    `<tr>
                                <td>${contact.name}</td>
                                <td>${contact.email}</td>
                                <td>${contact.subject}</td>
                                <td>${contact.message}</td>
                                ${actions}
                            </tr>`
                );
            });

            // Attach click handlers for edit and delete buttons
            $('.edit-btn').click(function () {
                // Add your edit logic here
                const contactId = $(this).data('id');
                window.location = './editContact.html?id=' + contactId;
            });

            $('.delete-btn').click(function () {
                const contactId = $(this).data('id');
                if (confirm('האם אתה בטוח שברצונך למחוק את הצור קשר?')) {
                    $.ajax({
                        url: `/api/contact/${contactId}`,
                        type: 'DELETE',
                        success: function () {
                            // Reload the contacts table after deleting
                            loadContacts();
                        },
                    });
                }
            });
        });
    }

    // Load contacts when the page loads
    loadContacts();
});
