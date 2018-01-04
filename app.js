$(document).ready(function(){
  var fbToken = "EAACEdEose0cBAJUC5hzlM8x96bxxzSlldHJcHlyKyDVjoudLGSYaWR3dAun4y7b56rN0JLhDSrJuTrIi9tISBdPNNtcENPm7yeErNRjt76gl2cy1za8pZCwS6soeTqPvHZB5LpIDZBy0wzrbvn5XK85nTE0bpXbjQw8qvZBTvEJJCArKmMrB12SwIXZC1Ry4ZD";

  $.ajax('https://graph.facebook.com/me?fields=name,posts.fields(full_picture,created_time,story,likes),id,location,favorite_athletes,hometown,quotes,gender,birthday,languages,relationship_status,education,family,email,picture.width(300).height(300),friends&access_token='+fbToken,{
    success: function(response){
      
      // profile picture
      $(".profilepic").attr("src", response.picture.data.url);
      
      // User name
      if(response.name !== null && response.name !== undefined){
        $(".username").text(response.name);  
      }
      else{
        $(".username").text(null);
      }

      // quotes
      if(response.quotes !== null && response.quotes !== undefined){
        $("#quotes").text(response.quotes);  
      }
      else{
        $("#quotes").text("(empty)");
      }

      // Gender
      $("#gender").text(response.gender);
      
      // DOB
      $("#dob").text(response.birthday);
  
      // Displaying Posts
        for(var i = 0; i < response.posts.data.length; i++){

          div = document.createElement("div");
          $(div).attr("class", "story"+i);
          $("#story").append(div);
          if(response.posts.data[i].story !== null & response.posts.data[i].story !== undefined){
            $(".story"+i).html("<h4 class='w3-border-bottom w3-padding-16'><b>"+response.posts.data[i].story+"</b></h4>"+"<p>at "+response.posts.data[i].created_time+"</p><img class='w3-image w3-padding-16 postpic' src="+response.posts.data[i].full_picture+">"+  "<br>");
          }
          else{
            $(".story"+i).html("<h4 class='w3-border-bottom w3-padding-16'><b>Story None</b></h4>"+"<p>at "+response.posts.data[i].created_time+"</p><img class='w3-image w3-padding-16 postpic' src="+response.posts.data[i].full_picture+">"+  "<br>");  
          }
        }

        // Adding classes to the created posts
        for(var i= 0; i < response.posts.data.length; i++){
          $(".story"+i).attr("class", "w3-border w3-content w3-white w3-margin-bottom w3-padding indiPost");
          $(".story"+i).css("max-width:100%");
        }
      
      },
      error : function(request,errorType,errorMessage){
                console.log(request);
                console.log(errorType);
                alert(errorMessage);
              },

      timeout:20000, // in ms

      beforeSend : function(){
                    $('.profile').hide();
                    $('.loader').show();

                  },

      complete : function(){
                  $('.profile').show();
                  $('.loader').hide();
                }
  });
});
