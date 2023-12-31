document.addEventListener('DOMContentLoaded', function () {
  const createFormButton = document.getElementById('createFormButton');
  const createForm = document.getElementById('createProductForm');
  const productListContainer = document.getElementById('productListContainer');
  const productForm = document.getElementById('productForm');
  const saveProductButton = document.getElementById('saveButton');
  const cancelButton = document.getElementById('cancelButton');

  createFormButton.addEventListener('click', function () {
    productListContainer.classList.add('hidden');
    createForm.classList.remove('hidden');
  });

  cancelButton.addEventListener('click', function () {
    //productListContainer.classList.remove('hidden');
    createForm.classList.add('hidden');
    location.reload();
  });

  saveProductButton.addEventListener('click', function () {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productCategory = document.getElementById('productCategory').value;
    const productDescription = document.getElementById('productDescription').value;
    const productImgUrl = document.getElementById('productImage').value;

    const data = {
      name: productName,
      price: productPrice,
      category: productCategory,
      description:productDescription,
      imgurl: productImgUrl
    };
    saveProductData(data);
  });

  async function saveProductData(data) {

    const createFormButton = document.getElementById('createFormButton');
    const createForm = document.getElementById('createProductForm');
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const res = await response.json()
      if (!response.ok) {
        console.log(res)
        showAlert(res.type, res.error)
        createForm.classList.add('hidden');
        createForm.classList.remove('hidden');
      }else{
        location.reload();
        console.log(res)
      }
    } catch (error) {
        console.log(error)
      throw error;
    }
  }
});
