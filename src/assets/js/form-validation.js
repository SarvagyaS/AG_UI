$(document).ready(function(){
    loginFormValidation();

    $.validator.addMethod("emailregx", function (value, element, regexpr) {
        return regexpr.test(value);
    },"Please enter a valid email ID.");

    $.validator.addMethod("phoneregx", function (value, element, regexpr) {
        return regexpr.test(value);
    },"Please enter a valid phone number.");

    function loginFormValidation(){
        var $username_form = $("#login_form");
        var $forgotpass_form = $("#forgotpass_form");
        var $userregister_form = $("#userregister_form");

        $username_form.validate({
            rules: {
                emailId: {
                    required: true,
                    emailregx: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,                    
                },  
                login_pass: {
                    required: true,
                },
                phoneNo: {
                    required: true,
                    phoneregx: /^[6-9]*$/,
                    minlength: 6,
                    maxlength: 16
                },
            },
            messages: {                
                emailId: {
                    required: "Please enter Email ID",
                    emailregx: "Please enter valid email ID"
                },
                login_pass: {
                    required: "Enter Password"
                },
                phoneNo: {
                    required: "Please enter Mobile No.",
                    minlength: "Please enter valid Mobile No.",
                    phoneregx: "Please enter valid Mobile No."
                },
            },
            submitHandler:function(form){
            }
        }); 
        
        $forgotpass_form.validate({
            rules: {
                pass_email: {
                    required: true,
                    emailregx: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,                    
                },                  
            },
            messages: {                
                pass_email: {
                    required: "Please enter Email ID",
                    emailregx: "Please enter valid email ID"
                },               
            },
            submitHandler:function(form){
            }
        }); 

        $userregister_form.validate({
            rules: {
                firstname: {
                    required: true,
                },
                lastname: {
                    required: true,
                },
                regemailId: {
                    required: true,
                    emailregx: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,                    
                }, 
                password: {
                    required: true,
                },
                confpassword: {
                    required: true,
                },   
                regphoneNo: {
                    required: true,
                    phoneregx: /^[6-9]*$/,
                    minlength: 6,
                    maxlength: 16
                },              
            },
            messages: {   
                firstname: {
                    required: "Please enter First Name",
                },
                lastname: {
                    required: "Please enter Last Name",
                },             
                pass_email: {
                    required: "Please enter Email ID",
                    emailregx: "Please enter valid email ID"
                }, 
                password: {
                    required: "Please enter Password",
                },
                confpassword: {
                    required: "Please enter Password",
                },   
                regphoneNo: {
                    required: "Please enter Mobile No.",
                    minlength: "Please enter valid Mobile No.",
                    phoneregx: "Please enter valid Mobile No."
                },               
            },
            submitHandler:function(form){
            }
        }); 
    }
});