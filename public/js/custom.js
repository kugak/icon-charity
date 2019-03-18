(function ($) {

  "use strict";

  /*
   * preloader
   * -----------------------------------------------------------------------------
   */

  $(window).on('load', function () {
      $('.preloader').delay(50).fadeOut(100);
  });

  document.documentElement.addEventListener('touchmove', function (event) {
    event.preventDefault();      
}, false);


  /*
   * Ajax registration form
   * -----------------------------------------------------------------------------
   */

  
   $(document).ready(function(){
    $('#overlay').modal('show');
});

setTimeout(function() {
    $('#overlay').modal('hide');
}, 5000);

  // request submission
  var EnableDisableForm = function (objectType, btn1, btn1Text) {
      if (objectType == 'Disable') {
          $('#' + btn1).attr('disabled', 'disabled');
      } else {
          $('#' + btn1).removeAttr('disabled');
      }
      $('#' + btn1).val(btn1Text);
  }


  function AjaxFormSubmit(formname, btn1, btn1Text) {
      var options = {
          complete: function (response) {
              if ('Success') {
                  $('#registerForm').append("<div class='alert alert-success animated fadeInRight' id='success'><strong>Success!</strong> Your registration has been successfully submitted</div>");
                  setTimeout(function () {
                      $('#success').addClass('animated fadeOutRight');
                      $('#success').removeClass('fadeInRight');

                  }, 5000);

                  $('#registerForm')[0].reset();
              }
              EnableDisableForm('Enabled', btn1, btn1Text);
          },
          error: function (response) {
              var data = response.responseText;
              console.log(data);
          }
      };
      $('#' + formname).ajaxSubmit(options);
  }


// Ajax form validation
  $('#registerForm').validate({
      errorElement: 'span',
      rules: {
          first_name: {
              required: true
          },
          last_name: {
              required: true
          },
          email_address: {
              required: true
          },
          company_name: {
              required: true
          },
          accept_email: {
              required: true
          }

      },
      messages: {
          first_name: {
              required: 'First Name is Required.'
          },
          last_name: {
              required: 'Last Name is Required.'
          },
          email_address: {
              required: 'E-Mail Address Required.'
          },
          company_name: {
              required: 'Company Name is Required.'
          },
          accept_email: {
              required: 'Required.'
          }

      },
      submitHandler: function (form) {
          EnableDisableForm('Disable');
        //   AjaxFormSubmit('registerForm', 'submit');
          return true; // required to block normal submit since you used ajax
      }
  });


})(jQuery);