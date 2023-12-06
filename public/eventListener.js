
document.addEventListener('DOMContentLoaded', function() {
  // Get the button element
  var viewAllUsersButton = document.getElementById('viewAllUsersButton');

  viewAllUsersButton.addEventListener('click', function() {
      window.location.href = '/users';
  });
});