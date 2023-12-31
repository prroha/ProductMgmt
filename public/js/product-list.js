document.addEventListener("DOMContentLoaded", function () {
  const editableContents = document.querySelectorAll(".editable-content");

  editableContents.forEach((content) => {
    const inputElement = content.querySelector("input");

    if (inputElement) {
      inputElement.addEventListener("keydown", updateOnChange);
    }
  });

  function updateOnChange(e) {
    if (e.key === "Enter" || e.key === "Tab") {
      const element = event.target;
      updateValue(element);
    }
  }

  async function updateValue(element) {
    const key = element.getAttribute("data-key");
    console.log(key);
    console.log(element.name + " : " + element.value);
    if (!key) return;
    const type = element.name;
    const data = {
      [type]: element.value,
    };

    try {
      const response = await fetch(`${BASE_URL}/products/${key}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      if (!response.ok) {
        if (type === "imgurl") location.reload();
        console.log(res);
      } else {
        console.log(res);
        showAlert(res.status, res.result?.message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  function handleMouseDown(event) {
    const inputContainer = event.currentTarget;
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(inputContainer);
    selection.removeAllRanges();
    selection.addRange(range);
  }
});

async function deleteProduct(index, event, id) {
  event.preventDefault();
  if (!id) return;

  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    if (!response.ok) {
      console.log(res);
      showAlert(res.type, res.error);
    } else {
      console.log(res);
      location.reload();
    }
  } catch (error) {
    // Log or handle the error as needed
    console.log(res);
    throw error;
  }
}
function showAlert(type, message) {
  const alertDiv = document.getElementById("alert");
  const alertMessageDiv = document.getElementById("alertMessage");

  // Set alert type-specific classes
  alertDiv.classList.remove("hidden");
  alertMessageDiv.classList.remove("bg-red-500", "bg-green-500");
  alertMessageDiv.classList.add(type === "success" ? "bg-green-500" : "bg-red-500");

  // Set alert message
  alertMessageDiv.innerText = message;

  // Hide alert after 3 seconds (adjust as needed)
  setTimeout(() => {
    alertDiv.classList.add("hidden");
  }, 5000);
}
document.addEventListener("click", function (event) {
  const clickedElement = event.target;
  const isEditableContent = clickedElement.closest(".editable-content");

  if (!isEditableContent) {
    const activeElement = document.activeElement;

    // Check if the active element is an editable content
    if (activeElement.classList.contains("editable-content")) {
      // Prevent hiding when clicking outside an editable content
      return;
    }
    return;
    const editableContents = document.querySelectorAll(".editable-content");
    const images = document.querySelectorAll(".group img");

    editableContents.forEach((content) => {
      content.setAttribute("contenteditable", "false");
      content.classList.add("hidden");
    });

    images.forEach((image) => {
      image.classList.remove("hidden");
    });
  }
});
function toggleDescription(event, index) {
  const descriptionElement = document.getElementById(`description${index}`);
  const imageElement = document.querySelector(
    `.group:nth-child(${parseInt(index) + 1}) img`
  );

  if (descriptionElement.classList.contains("hidden")) {
    // Show description and make it editable
    descriptionElement.classList.remove("hidden");
    descriptionElement.setAttribute("contenteditable", "true");
    imageElement.classList.add("hidden");
  } else {
    // Hide description and make it non-editable
    descriptionElement.classList.add("hidden");
    descriptionElement.setAttribute("contenteditable", "false");
    imageElement.classList.remove("hidden");
  }

  // Add this line to prevent event propagation
  event.stopPropagation();
}
function updateNumericPrice(input, index) {
  // Extract numeric part without the dollar sign
  const numericValue = input.value.replace(/\$/g, "");

  // Update the hidden input
  document.getElementById(`numericPrice_${index}`).value = numericValue;
}

function toggleImageUpload(index, event) {
  // Prevent the click event from propagating to the parent element
  event.stopPropagation();

  const imageUpload = document.getElementById(`image-upload${index}`);
  if (imageUpload.classList.contains("hidden")) {
    imageUpload.classList.remove("hidden");
  } else {
    imageUpload.classList.add("hidden");
  }
}

function handleImageUpload(input, index) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageElement = document.querySelector(
        `.group:nth-child(${parseInt(index) + 1}) img`
      );
      imageElement.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
