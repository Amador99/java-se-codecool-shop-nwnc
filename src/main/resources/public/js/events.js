function addToCart(id) {
    $.ajax({
        method: 'POST',
        url: '/add-to-cart',
        data: {'id': id},
        success: function () {
            $("#cart-count").text(parseInt($("#cart-count").html()) + 1);
        }
    });
}

function removeFromCart(id) {
    $.ajax({
        method: 'POST',
        url: '/remove-from-cart',
        data: {'id': id},
        success: function () {
            $("#cart-count").text(parseInt($("#cart-count").html()) - 1);
        }
    });
}

function deleteFromCart(id) {
    $.ajax({
        method: 'POST',
        url: '/delete-from-cart',
        data: {'id': id}
    });
}

function plusAmount(id) {
    $("#amount-count"+id).val(parseInt($("#amount-count"+id).val()) + 1);
    addToCart(id);
    setTotalPrice();
}

function minusAmount(id) {
    $("#amount-count"+id).val(parseInt($("#amount-count"+id).val()) - 1);
    if (parseInt($("#amount-count"+id).val()) <= 0) {
        deleteItem(id);
    }
    removeFromCart(id);
    setTotalPrice();
}

function deleteItem(id) {
    $("#shopping-cart-"+id.toString()).empty().remove();
    $("#shopping-cart-row-"+id.toString()).empty().remove();
    setTotalPrice();
    deleteFromCart(id);
}

function setTotalPrice () {
    var total = 0;
    $('#cart-items tr').each(function () {
        //the value of sum needs to be reset for each row, so it has to be set inside the row loop
        //find the combat elements in the current row and sum it
        var price = parseFloat($(this).find('#price').text());
        var amount = parseFloat($(this).find('.counter').val());
        if (!isNaN(price) && !isNaN(amount)) {
            total += parseFloat(price) * parseFloat(amount);
        }
    });
    //set the value of currents rows sum to the total-combat element in the current row
    $('#total-price-price').text(total + ' USD');
}