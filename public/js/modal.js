
$(document).ready(function () {


    //this section of code deals with the invite modal   

    $(".addEmailForm").on("click", function (event) {
        event.preventDefault();
        var newDiv = $("<div></div>")
        newDiv.html(' <label for = "inviteEmail" id = "emailHelp"></label> <input type = "email" class="form-control inviteEmails" id="InputEmail1" aria-describedby="#emailHelp"> ');
        $(".email-forms").append(newDiv);
        console.log("party?")
    });


    $("#saveBtn").on("click", function (event) {
        event.preventDefault();
        console.log("save working?");
        // var emails = $(".inviteEmails").val().trim();
        var emails = {
            email: "landhdogs@aol.com"
        }
        console.log(emails)

        $.post("/email", emails, function() {
            console.log("Server received our data");
        });

  


        $("#saveBtn").attr("data-dimiss", "modal");
        
    })
});


