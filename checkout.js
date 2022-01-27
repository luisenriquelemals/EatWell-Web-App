/* Collaborators in this project:
Luis Lema, Brian Yi, Judy Park and Robert Finedore */

/*constants*/
var taxRate = 0.0625;
var shippingRate = 1.0;
var fadeTime = 300;

$(".product-quantity input").change(function () {
  updateQuantity(this);
});

$(".product-removal button").click(function () {
  deleteItem(this);
});

/*Update Cart */
function recalculateCart() {
  var subtotal = 0;
  /* Add row total */
  $(".product").each(function () {
    subtotal += parseFloat($(this).children(".product-line-price").text());
  });

  /*calculate total */
  var tax = subtotal * taxRate;
  var shipping = subtotal > 0 ? shippingRate : 0;
  var total = subtotal + tax + shipping;

  /* Update totals display */
  $(".totals-value").fadeOut(fadeTime, function () {
    $("#subtotal").html(subtotal.toFixed(2));
    $("#tax").html(tax.toFixed(2));
    $("#shipping").html(shipping.toFixed(2));
    $("#total").html(total.toFixed(2));
    $(".totals-value").fadeIn(fadeTime);
  });
}

/*Delete items*/
function deleteItem(removeButton) {
  /* Remove row and recalculate total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function () {
    productRow.remove();
    recalculateCart();
  });
}

/* updating quantity/total */
function updateQuantity(quantityInput) {
  /* Update row price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children(".product-price").text());
  var quantity = $(quantityInput).val();
  var rowPrice = price * quantity;

  /* Update row price and recalculate total */
  productRow.children(".product-line-price").each(function () {
    $(this).fadeOut(fadeTime, function () {
      $(this).text(rowPrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });
}

// Checkout and send new items to kitchen manager
function checkout() {
  // Object to hold items to send
  var data1 = {};

  // Check if item1 is there. If so, add to data1
  if (document.getElementById("item1") != null) {
    var item_1 = document.getElementById("item1").textContent;
    var quantity_1 = document.getElementById("quantity1").querySelector("input").value;
    data1[[item_1]] = quantity_1;
  }

  // Check if item2 is there. If so, add to data1
  if (document.getElementById("item2") != null) {
    var item_2 = document.getElementById("item2").textContent;
    var quantity_2 = document.getElementById("quantity2").querySelector("input").value;
    data1[[item_2]] = quantity_2;
  }

  // Pass information to kitchen manager
  localStorage.setItem("myValue", JSON.stringify(data1));

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // Show modal
  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";

    // Delete checked out items from cart
    var btn1 = document.getElementById("item1DeleteBtn");
    var btn2 = document.getElementById("item2DeleteBtn");

    if (btn1 != null) {
      deleteItem(btn1);
    }

    if (btn2 != null) {
      deleteItem(btn2);
    }
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";

      // Delete checked out items from cart
      var btn1 = document.getElementById("item1DeleteBtn");
      var btn2 = document.getElementById("item2DeleteBtn");

      if (btn1 != null) {
        deleteItem(btn1);
      }

      if (btn2 != null) {
        deleteItem(btn2);
      }
    }
  };
}
