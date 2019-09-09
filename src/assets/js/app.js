import $ from 'jquery';
import 'what-input';
import validate from 'jquery-validation';

// Foundation JS relies on a global varaible. In ES6, all imports are hoisted
// to the top of the file so if we used`import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

$(document).ready( fn );

function fn() {
  
  $(document).foundation();
  
  AOS.init({
    duration: 1000,
    easing: 'ease-out',
    delay: 100,
    disable: 'mobile',
  });
  
  // sign-up form
  $('.sign-up').validate({
    highlight: function(element, errorClass) {
      $(element).parent().addClass(errorClass);
//      console.log('highlight');
    },
    unhighlight: function(element, errorClass) {
      $(element).parent().removeClass(errorClass);
//      console.log('unhighlight');
    },
    submitHandler: function(form, event) {
//      console.log('submit');
      event.preventDefault();
      $.ajax({
        url: '/process.php',
        type: 'POST',
        data: $(form).serialize(),
        success: function(response) {
          if(response === 200) {
//            console.log('success');
            var height = $('.sign-up').height();
            $('.sign-up').height(height);
            $('.sign-up .form-controls').addClass('done');
            $('.sign-up .success-message').addClass('show');
            $('.sign-up .error-message').removeClass('show');
          } else {
            $('.sign-up .error-message').addClass('show');
          }
        },
        error: function() {
          $('.sign-up .error-message').text('Error! Try again');
        }
      });
      return false;
    },
    // all fields are required
    rules: {
      subscribe_email: {
        required: true,
        email: true,
      }
    }
  });
}
