const BASE_URL = 'http://localhost:5000'

function showAlert(type, message) {
  const alertDiv = document.getElementById('alert')
  const alertMessageDiv = document.getElementById('alertMessage')

  // Set alert type-specific classes
  alertDiv.classList.remove('hidden')
  alertMessageDiv.classList.remove('bg-red-500', 'bg-green-500')
  const classname = type === 'success' ? 'bg-green-500' : 'bg-red-500'
  alertMessageDiv.classList.add(classname)

  // Set alert message
  alertMessageDiv.innerText = message

  // Hide alert after 3 seconds (adjust as needed)
  setTimeout(() => {
    alertDiv.classList.add('hidden')
  }, 5000)
}
