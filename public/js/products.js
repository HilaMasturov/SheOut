
const items = [];

$.ajax({
    url: '/api/product',
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function (data) {
        console.log(data)
        for (const item of data) {
            items.push(item);
        }
        renderItems();
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
    }
});

const renderItems = () => {
    $('.container').empty();
    const searchInput = $('.search').val().trim();
    for (const item of items) {
        if (searchInput && item.name.indexOf(searchInput) < 0) continue;
        var newItem = $('<div class="item"></div>');
        var newImg = $('<img>').attr('src', item.image).click(function () {
            window.location.href = item.image;
        });
        var newDetails = $('<div class="details"></div>');
        var newName = $('<span class="name"></span>').text(item.name);
        var newDescription = $('<span class="description"></span>').text(item.description);
        var newPrice = $('<span class="price"></span>').text((item.price).toFixed(2) + "₪");

        // Create edit and delete buttons with FontAwesome icons
        var addButton = $('<button class="add-button"><i class="fas fa-cart-plus"></i></button>');
        var editButton = $('<button class="edit-button"><i class="fas fa-edit"></i></button>');
        var deleteButton = $('<button class="delete-button"><i class="fas fa-trash-alt"></i></button>');
        var buttonsContainer = $('<div class="buttons"></div>')

        // Add click handlers for edit and delete buttons (customize these as needed)
        addButton.click(function () {
            $.ajax({
                type: 'POST',
                url: `/api/order/`,
                data: JSON.stringify({ product: item._id, count: 1 }),
                contentType: 'application/json',
                success: function (response) {
                    alert('הפריט נוסף להזמנה בהצלחה');
                },
                error: function (error) {

                    console.error('Error deleting product:', error);
                }
            });
        });

        // Add click handlers for edit and delete buttons (customize these as needed)
        editButton.click(function () {
            window.location.href = './editProduct.html?id=' + item._id
        });

        deleteButton.click(function () {
            $.ajax({
                type: 'DELETE',
                url: `/api/product/${item._id}`,
                success: function (response) {
                    location.reload();
                },
                error: function (error) {

                    console.error('Error deleting product:', error);
                }
            });
        });

        // Append buttons and details to the item
        buttonsContainer.append(addButton).append(editButton).append(deleteButton);
        newDetails.append(newName).append(newDescription).append(newPrice).append(buttonsContainer);
        newItem.append(newImg).append(newDetails);
        $('.container').append(newItem);
    }

    if (!items.length) {
        $('.container').text("לא נמצאו פריטים");
    }
}

$(document).ready(function () {
    $('.search').keyup(function () {
        renderItems();
    })
});