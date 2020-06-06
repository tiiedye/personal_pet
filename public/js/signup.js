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

      if (!userData.email || !userData.password) {
          alert("Please enter a valid username and password.")
          return;
      }

      
     
      createUserandSidekick(userData.email, userData.password, sidekickData.name, sidekickData.image);
      emailInput.val("");
      passwordInput.val("");
      sidekick.val("");
      alert("Welcome " + sidekickData.name + ". Please log in to continue.")
  });


  async function createUserandSidekick(email, password, name, image) {
      await $.post("/api/signup", {
          email: email,
          password: password
      }).then(function () {
              console.log("new user added");
          });  
      await $.get("/api/users", function(data) {
          users = data;
          indexNum = (users.length - 1)
      });
      $.post("/api/sidekick", {
          sidekickName: name,
          sidekickImage: image,
          UserId: users[indexNum].id
      }).then(function () {
                  console.log("added sidekick");
                  window.location.replace("/members");
          });
  }

});