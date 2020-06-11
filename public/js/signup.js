$(document).ready(function () {
  const signupForm = $(".signup");
  const emailInput = $("#email-input");
  const passwordInput = $("#password-input");
  const sidekick = $("#name-input");
  
 
  var users =[];
  var indexNum;


  signupForm.on("submit", event => {
      event.preventDefault();
      let sidekickImage = $('input[name="Choice"]:checked').val();


      const sidekickData = {
          name: sidekick.val().trim(),
          image: sidekickImage
      }   

      const userData = {
          email: emailInput.val().trim(),
          password: passwordInput.val().trim()
      };

      console.log(userData.email);
      if (userData.email) {
        $.get("/api/users", {
        }).then(result => {
          console.log(result)
          for (i = 0; i < result.length; i++ ) {
            console.log(userData.email)
            console.log(result[i].email)
            if (userData.email === result[i].email) {
            alert("This email already has an account! Please log-in.")
              return;
            }
          }
        });
      };

      if (!userData.email || !userData.password) {
          alert("Please enter a valid username and password.")
          return;
      }

      if (!sidekickData.name) {
        alert("Please give your Sidekick a name!")
        return;
      }

      if (!sidekickData.image) {
        alert("Please select one of the images")
        return;
      }

      
     
      createUserandSidekick(userData.email, userData.password, sidekickData.name, sidekickData.image);
      
  });

//This function creates a new user, and then gets all of the users. 
//Next it uses the users table and takes the last one(the one just created)
//And assigns the sidekick to that user
  async function createUserandSidekick(email, password, name, image) {
      await $.post("/api/signup", {
          email: email,
          password: password
      }).then(function () {
              console.log("new user added");
          });  
      await $.get("/api/users", function(data) {
          users = data;
          console.log(users)
          indexNum = (users.length - 1)
      });
      $.post("/api/sidekick", {
          sidekickName: name,
          sidekickImage: image,
          UserId: users[indexNum].id
      }).then(function () {
                  console.log("added sidekick");
                  alert("Welcome " + sidekickData.name + "!");
                  window.location.replace("/members");
          });
  }

});

