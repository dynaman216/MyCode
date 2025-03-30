document.addEventListener("DOMContentLoaded", function () {
    const dropdownBtn = document.querySelector(".dropbtn");
    const dropdownContent = document.querySelector(".dropdown-content");

    // Ensure the dropdown is hidden on load
    dropdownContent.style.display = "none";

    // Toggle dropdown on button click
    dropdownBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents the event from bubbling up
        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    });

    // Close dropdown when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.style.display = "none";
        }
    });

    // Keep other functionality (color button)
    const colorButton = document.getElementById('colorButton');
    colorButton.addEventListener('click', function() {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F4FF33', '#FF33A1'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
    });
});
