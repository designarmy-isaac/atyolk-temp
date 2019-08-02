import $ from 'jquery';
import 'what-input';
import stickybits from './lib/stickybits.min.js';

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

$(document).foundation();
$(document).ready( fn );

function fn() {
  
  stickybits('.section-content-container');
  
  var $cover = $('#cover'),
      $sections = $('section'),
      $sectionContents = $('.section-content-container');
  
  function sectionHeights() {
    var sumHeights = $cover.height() + 200,
        i = 0;
    $sectionContents.each(function() {
      sumHeights += $(this).outerHeight();
      console.log(i);
//      console.log(sumHeights.toFixed(0));
//      console.log($sections[i]);
      $sections.eq(i).height(sumHeights);
      i += 1;
      sumHeights += 200;
    });
    
  }
  
  sectionHeights();
  $(window).resize( function() { sectionHeights(); });
  
//  var sumHeights = 0;
//  $('section').each(function() {
//    sumHeights += $(this).outerHeight();
//  });
//  $('body').height(sumHeights);
}
