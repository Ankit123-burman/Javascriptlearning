// Function to toggle menu bar animation
function myFunction(x) {
  x.classList.toggle("change"); // Toggles the "change" class for animation
}

// Function to toggle the display of the menu
function toggleMenu() {
  var menu = document.getElementById('nav-menu');
  if (menu.style.display === 'block') {
    menu.style.display = 'none'; // Hides the menu if it's currently displayed
  } else {
    menu.style.display = 'block'; // Shows the menu if it's currently hidden
  }
}

// Select all buttons that add items and the table body for items
const buttons = document.querySelectorAll('.add-item');
const tbody = document.querySelector('.tbody');
const totalAmountElement = document.getElementById('total-amount');

let totalAmount = 0; // Variable to keep track of the total amount

// Add event listeners to each button
buttons.forEach(button => {
  button.addEventListener('click', function () {
    const serviceName = this.getAttribute('data-service');
    const servicePrice = parseFloat(this.getAttribute('data-price'));
    const serviceNo = parseFloat(this.getAttribute('data-index'));

    // Check if the item is being added
    if (this.textContent === 'Add Item') {     
      const row = document.createElement('tr'); // Create a new table row
      row.setAttribute('data-service', serviceName); 
      row.innerHTML = `
       <td>${serviceNo}</td>
        <td>${serviceName}</td>
        <td>₹${servicePrice}</td>
      `;
      
      tbody.appendChild(row); // Append the new row to the table body
      toggleDisplay(); // Update the display of the total amount

      this.textContent = 'Remove Item'; // Change button text to indicate removal option
      button.style.backgroundColor = 'red'; // Change button color
      totalAmount += servicePrice; // Update the total amount
    } else {
      // Check if the item is being removed
      const rowToRemove = document.querySelector(`tr[data-service="${serviceName}"]`);
      if (rowToRemove) {
        rowToRemove.remove(); // Remove the corresponding row from the table
        toggleDisplay(); // Update the display of the total amount
      }
      this.textContent = 'Add Item'; // Change button text back to add
      button.style.backgroundColor = 'green'; // Change button color back
      totalAmount -= servicePrice; // Update the total amount
    }

    // Display the total amount
    totalAmountElement.textContent = `Total: ₹${totalAmount.toFixed(2)}`;
  });
});

// Function to toggle display of total amount and no-item message
function toggleDisplay() {
  if (tbody.childElementCount > 0) {
    document.querySelector('.total-amount').style.display = 'block'; // Show total amount
    document.querySelector(".no-item-added").style.display = 'none'; // Hide no-item message
  } else {
    // If no items, show the no-item message
    document.querySelector(".no-item-added").style.display = 'block';
  }
}

// Initial display state check
toggleDisplay();

// Smooth scroll to a specific section when "Book Now" button is clicked
let bookNow = document.getElementById("button1");
bookNow.addEventListener('click', () => {
  window.scrollTo({
    top: window.innerHeight, // Scroll to the height of the window
    behavior: 'smooth' // Smooth scrolling
  });
});

// Handle form submission
let submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default form submission
  console.log("Button clicked");

  // Gather input values
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var number = document.getElementById("number").value;
  var message = document.getElementById("message").value;
  console.log(message);

  // Prepare parameters for email sending
  var templateParams = {
    from_name: name,
    to_email: email,
    number: number,
    message: message,
    to_name: "Email Js demo"
  };

  console.log(templateParams);

  // Send email using EmailJS
  emailjs.send("service_x4r9mna", "template_0ohygs9", templateParams)
    .then(function(response) {
      console.log('SUCCESS!!', response.status, response.text);
      alert('You Have Successfully Booked Your Service!!'); // Success message
      location.reload(true); // Reload the page
    }, function(error) {
      console.log('FAILED...', error);
      alert('Message failed to send.'); // Error message
    });

  // Clear form fields after submission
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("number").value = "";
  document.getElementById("message").value = "";
  document.querySelector(".tbody").innerHTML = ""; // Clear the table
  // Reset total amount display (optional)
  // document.querySelector("#total-amount").textContent = "Total : 0";
  // window.location.reload(); // Optional: Reload page
});
