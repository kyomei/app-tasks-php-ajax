$(function(){
   console.log('Hello World');
   
   $('#search').keyup(function() {
      let search = $('#search').val();
      $.ajax({
         url: 'task-search.php',
         type: 'POST',
         data: {search},
         success: function(response) {
            console.log(response);
         }
      });
   });
});