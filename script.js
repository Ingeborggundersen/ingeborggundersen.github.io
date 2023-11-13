document.addEventListener('DOMContentLoaded', function () {
    var infoButton = document.querySelector('.infoButton');
    var bigBox = document.querySelector('.bigBox');

    infoButton.addEventListener('click', function () {
      if (bigBox.style.display === 'none' || bigBox.style.display === '') {
        bigBox.style.display = 'block';
      } else {
        bigBox.style.display = 'none';
      }
    });

    document.addEventListener('click', function (event) {
        if (!bigBox.contains(event.target) && event.target !== infoButton) {
          bigBox.style.display = 'none';
        }
      });
    });


  
    function startSpinEffect() {
      var image = document.getElementById("coolImage");
      var overlay = document.createElement("div");
      overlay.className = "overlay";
      document.getElementById("CoolMeBox").appendChild(overlay);
    
      // Add a class to trigger the spin effect
      image.classList.add("spinEffect");
    
      // Add a class to show the overlay
      overlay.style.opacity = "0.2";
    
      // Remove the classes after the animation completes
      setTimeout(function () {
        image.classList.remove("spinEffect");
        overlay.style.opacity = "1";
        // Remove the overlay element from the DOM after the animation completes
        setTimeout(function () {
          overlay.remove();
        }, 500);
      }, 500);
    }
    