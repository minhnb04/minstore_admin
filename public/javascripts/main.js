// handle user---------------------------------------------------------

function show_form_add_user(){
    const form_add_user = document.querySelector('#form_add_user')
    form_add_user.classList.remove('d-none')
    form_add_user.classList.add('d-lock')
}

function cacel_add_user(){
    const form_add_user = document.querySelector('#form_add_user')
    form_add_user.classList.remove('d-block')
    form_add_user.classList.add('d-none')
}

// handle product---------------------------------------------------------

function show_form_add_product(){
    const form_add_user = document.querySelector('#form_add_product')
    form_add_product.classList.remove('d-none')
    form_add_product.classList.add('d-lock')
}

function cacel_add_product(){
    const form_add_user = document.querySelector('#form_add_product')
    form_add_user.classList.remove('d-block')
    form_add_user.classList.add('d-none')
}

