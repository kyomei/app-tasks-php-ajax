$(function () {
   // console.log('Hello World');
   $('#task-result').hide();
   fetchTasks();
   // Search on table
   $('#search').keyup(function () {
      if ($('#search').val()) {
         let search = $('#search').val();
         $.ajax({
            url: 'task-search.php',
            type: 'POST',
            data: {search},
            success: function (response) {
               let tasks = JSON.parse(response);
               let template = '';

               tasks.forEach(task => {
                  template += `<li>${task.name}</li>`
               });

               $('#container').html(template);
               $('#task-result').show();
            }
         });
      }
   });

   // Insert on table
   $('#task-form').submit(function (e) {
      e.preventDefault();

      const postData = {
         name: $('#name').val(),
         description: $('#description').val()
      };
      $.post('task-add.php', postData, function (response) {
         fetchTasks();

         $('#task-form').trigger('reset');
      });
   });

   function fetchTasks() {
      // Select on table
      $.ajax({
         url: 'task-list.php',
         type: 'GET',
         success: function (response) {
            let tasks = JSON.parse(response);
            let template = '';
            tasks.forEach(task => {
               template += `
               <tr>
                  <td>${task.id}</td>
                  <td>${task.name}</td>
                  <td>${task.description}</td>
                  <td>
                     <button class="btn btn-danger">Delete</button>
                  </td>
               </tr>
               `
            });
            console.log(tasks);
            $('#tasks').html(template);
         }
      });
   }

});