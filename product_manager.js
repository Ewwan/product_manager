"use strict";
{
    const init = () => {
        $('#add_product').on('click', addProductFromInput);
        addExistingProducts(PRODUCTS);
        addRowName();
    };
    const addExistingProducts = productList => productList.forEach(addProduct);

    const addRowName = () => $('#products > thead > tr').appendChild(th());

    const addProductFromInput = () => addProduct({name: $('#new_product input.name').value, price: $('#new_product input.price').value});

    const addProduct = product => {
        $('#products > tbody').appendChild(
            tr([td(product.name), td(product.price), tdWithActionButtons()
            ])
        );
        disableNonFunctionalButtons();
    };

    const tdWithActionButtons = () => {
        const td = document.createElement("td");
        td.appendChild(removeButton());
        td.appendChild(moveUpButton());
        td.appendChild(moveDownButton());
        return td;
    };
    const removeButton = () => buildButton("x", "remove_product", removeProduct);
    const moveUpButton = () => buildButton("↑", "move_product_up", moveProductUp);
    const moveDownButton = () => buildButton("↓", "move_product_down", moveProductDown);

    const removeProduct = e => productRowForAction(e.target).remove();
    const moveProductUp = e => moveProduct(e, up);
    const moveProductDown = e => moveProduct(e, down);

    const moveProduct = (e, direction) => {
        const currentProductRow = productRowForAction(e.target);
        currentProductRow.parentNode.insertBefore(currentProductRow, direction(currentProductRow)); 
    };

    const up = element => element.previousElementSibling;
    const down = element => element.nextElementSibling.nextElementSibling;

    const productRowForAction = button => button.parentNode.parentNode;

    const buildButton = (symbol, cssClass, action) => {
        const button = document.createElement("button");
        button.textContent = symbol;
        button.classList.add(cssClass);
        button.on("click", action).on("click", disableNonFunctionalButtons);
        return button;
    };

    const disableNonFunctionalButtons = () => $$('#products > tbody > tr').forEach(tr => {
        tr.querySelector(".move_product_up").disabled = !tr.previousElementSibling;
        tr.querySelector(".move_product_down").disabled = !tr.nextElementSibling;
    });

    const td = text => {
        const tdNode = document.createElement("td");
        tdNode.textContent = text;
        return tdNode;
    }; 
    const tr = tds => {
        const trNode = document.createElement("tr");
        tds.forEach(td => trNode.appendChild(td));
        return trNode;
    };
    const th = () => {
        const thNode = document.createElement("th");
        thNode.textContent = "Actions";
        return thNode;
    }
    
    init();
}