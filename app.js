// api key : 82005d27a116c2880c8f0fcb866998a0

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
}

function showPosition(position) {
  console.log(position);
}

function showError(error) {
  console.log(error);
}

getLocation();
