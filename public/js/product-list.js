const BASE_URL = window.API_URL
document.addEventListener('DOMContentLoaded', function () {
  const editableContents = document.querySelectorAll('.editable-content')

  editableContents.forEach((content) => {
    const inputElement = content.querySelector('input')

    if (inputElement) {
      inputElement.addEventListener('keydown', updateOnChange)
    }
  })

  function updateOnChange(e) {
    if (e.key === 'Enter' || e.key === 'Tab') {
      const element = event.target
      updateValue(element)
    }
  }

  async function updateValue(element) {
    const key = element.getAttribute('data-key')
    console.log(key)
    console.log(element.name + ' : ' + element.value)
    if (!key) return
    const type = element.name
    const data = {
      [type]: element.value,
    }

    try {
      const response = await fetch(`${BASE_URL}/products/${key}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const res = await response.json()
      if (!response.ok) {
        console.log(res)
      } else {
        console.log(res)
        if (type === 'imgurl') location.reload()
        showAlert(res.status, res.result?.message)
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  function handleMouseDown(event) {
    const inputContainer = event.currentTarget
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(inputContainer)
    selection.removeAllRanges()
    selection.addRange(range)
  }
})

async function deleteProduct(index, event, id) {
  event.preventDefault()
  if (!id) return

  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const res = await response.json()
    if (!response.ok) {
      console.log(res)
      showAlert(res.type, res.error)
    } else {
      console.log(res)
      location.reload()
    }
  } catch (error) {
    // Log or handle the error as needed
    console.log(res)
    throw error
  }
}
