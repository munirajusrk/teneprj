// Responsive-menu
$(document).ready(function() {
    $('.desk-resp-ham ul.toggle-desk').click(function() {
        $(this).toggleClass('active');
        $('.desk-resp-ham .sidebar').toggleClass('active');
        $('.section-new').toggleClass('act-section');
    })
  });
  
  $('.section-new').click(function() {
    $('.desk-resp-ham ul.toggle-desk').toggleClass('active');
    $('.desk-resp-ham .sidebar').toggleClass('active');
    $('.section-new').toggleClass('act-section');
  });
  
  (function($) { 
    $(function() {
        $('.desk-ham-menu > li > span:not(:only-child)').click(function(e) {
            $(this).siblings('.nav-dropdown').toggle(200);
            
            $('.nav-dropdown').not($(this).siblings()).hide(300);
            e.stopPropagation();
        });
  
        $('.nav-dropdown li span:not(:only-child)').click(function(e) {
          $(this).siblings('.nav-dropdown-1').toggle(200);
          $('.desk-ham-menu > li a:not(:only-child)').show()
          $('.nav-dropdown-1').not($(this).siblings()).hide(300);
          e.stopPropagation();
        });
        
        $('html').click(function() {
            $('.nav-dropdown').hide(200);
            $('.nav-dropdown-1').hide(); 
        });
    }); 
  })(jQuery);
// Responsive-menu


// active link
// active links code 
function getAbsoluteFile() {
  {
      // return $(location).attr('href');
      // return $(location).attr('pathname');
      return window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  }
}
$(document).ready(function() {
  var page = getAbsoluteFile();
  if (page == '' || page == 'index') {
      $('.home').addClass("act-link");
      $('.footer-home').addClass("act-link");
  }
  // conditions for home page

  // conditions for inner pages
  else {
        // nav active links
        $('.nav-menu li a[href="' + page + '"]').addClass('act-link');
        $('.nav-menu li a[href="' + page + '"]').parent().addClass('act-link');
        $('.nav-menu li a[href="' + page + '"]').parent().parent().parent().addClass('act-link');
        $('.nav-menu li a[href="' + page + '"]').parent().parent().prev().addClass('act-link');
        $('.nav-menu li a[href="' + page + '"]').parent().parent().parent().prev().addClass('act-link');
        $('.nav-menu li a[href="' + page + '"]').parent().parent().parent().parent().parent().addClass('act-link');
        $('.nav-menu li a[href="' + page + '"]').parent().parent().parent().parent().parent().parent().parent().addClass('act-link');
        $('.nav-menu li a[href="' + page + '"]').parent().parent().parent().parent().parent().parent().parent().parent().parent().addClass('act-link');
        // nav active links

        // footer nav active links
        $('.footer-nav li a[href="' + page + '"]').addClass('act-link');
        $('.footer-nav li a[href="' + page + '"]').parent().addClass('act-link');
        $('.footer-nav li a[href="' + page + '"]').parent().parent().parent().addClass('act-link');
        $('.footer-nav li a[href="' + page + '"]').parent().parent().prev().addClass('act-link');
        $('.footer-nav li a[href="' + page + '"]').parent().parent().parent().prev().addClass('act-link');
        $('.footer-nav li a[href="' + page + '"]').parent().parent().parent().parent().parent().addClass('act-link');
        $('.footer-nav li a[href="' + page + '"]').parent().parent().parent().parent().parent().parent().parent().addClass('act-link');
        $('.footer-nav li a[href="' + page + '"]').parent().parent().parent().parent().parent().parent().parent().parent().parent().addClass('act-link');
        // footer nav active links

        // res nav activ link
        $('.desk-ham-menu li a[href="' + page + '"]').addClass('act-link');
        $('.nav-dropdown li a[href="' + page + '"]').addClass('act-link');
        $('.nav-dropdown li a[href="' + page + '"]').parent().addClass('act-link');
        $('.nav-dropdown li a[href="' + page + '"]').parent().parent().prev().addClass('act-link');
        
        $('.nav-dropdown a[href="' + page + '"]').addClass('act-link');
        $('.nav-dropdown li a[href="' + page + '"]').parent().parent().parent().parent().parent().parent().parent().parent().prev("a").addClass('act-link');
        $('.nav-dropdown li a[href="' + page + '"]').parent().parent().parent().parent().prev("a").addClass('act-link');
        $('.nav-dropdown li a[href="' + page + '"]').parent().parent().parent().parent().parent().prev("a").parent().addClass('act-link');
		$('.nav-dropdown li a[href="' + page + '"]').parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().addClass('act-link');
        // res nav activ link

        $('.product-links  a[href="' + page + '"]').addClass('act-link');
        $('.product-links  a[href="' + page + '"]').parent().addClass('act-link');
        
    }
    // conditions for inner pages
});
// active link

//Validation
function validationCont()
{
    //1. First name
    var x = document.forms['valid_cont']['txtName'];
    var y = x.value;
    if (y == "") {
        alert('Please Enter Your Name.');
        x.focus();
        return false;
    }
    var reg = /^[ a-zA-Z]*$/;
    if (reg.test(y) == false) {
        alert('Invalid Name! Please Enter only Alphabets.');
        x.focus();
        return false;
    }
    // First name

    //  mail
    var x = document.forms['valid_cont']['txtEmail'];
    var y = x.value;
    if (y == "") {
        alert('Please Enter Your Email Id.');
        x.focus();
        return false;
    } else {
         var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z_ ]{2,4})$/;
        if (reg.test(y) == false) {
            alert('Invalid Email Address.');
            x.focus();
            return false;
        }
    }
    // mail

    // TxtProduct
    var x = document.forms['valid_cont']['txtProduct'];
    var y = x.value;
    if (y == "") {
        alert('Please Enter Product.');
        x.focus();
        return false;
    }

    // Nature for Enquiry
    var x = document.forms['valid_cont']['TxtEnquiry'];
    var y = x.value;
    if (y == "") {
        alert('Please Enter Your Nature for Enquiry.');
        x.focus();
        return false;
    }

    // Message
    var x = document.forms['valid_cont']['txtMessage'];
    var y = x.value;
    if (y == "") {
        alert('Please Enter Your Message.');
        x.focus();
        return false;
    }
    var reg = /^[ a-zA-Z]*$/;
    if (reg.test(y) == false) {
        alert('Invalid Message! Please Enter only Alphabets....');
        x.focus();
        return false;
    }
    // Message

    alert("Thank you for Submission");
    return true;
}
