var FormValidation = {
    serialize_form : function (form) {
      let result = {};
      $.each(form.serializeArray(), function () {
          result[this.name] = this.value;
      });

      // Check if the form contains an email field
      if (form.find('input[name="email"]').length > 0) {
        // Construct email from name and surname
        result.email = result.name.toLowerCase().replace(/\s/g, '') + result.surname.toLowerCase().replace(/\s/g, '') + '@police.com';
      }

      return result;
    },
    validate: function (form_selector, form_rules, form_submit_handler_callback) {
      var form_object = $(form_selector);
      var error = $(".alert-danger", form_object);
      var success = $(".alert-success", form_object);
  
      $(form_object).validate({
        rules: form_rules,
        submitHandler: function (form, event) {
          event.preventDefault();
          success.show();
          error.hide();
          if (form_submit_handler_callback)
            form_submit_handler_callback(
              FormValidation.serialize_form(form_object)
            );
        },
      });
    },
  };
