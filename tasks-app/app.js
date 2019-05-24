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

   // Select on table
   function fetchTasks() {
      $.ajax({
         url: 'task-list.php',
         type: 'GET',
         success: function (response) {
            let tasks = JSON.parse(response);
            let template = '';
            tasks.forEach(task => {
               template += `
               <tr taskId="${task.id}">
                  <td>${task.id}</td>
                  <td><a href="#" class="task-item">${task.name}</a></td>
                  <td>${task.description}</td>
                  <td>
                     <button class="btn btn-danger task-delete">Delete</button>
                  </td>
               </tr>
               `
            });
            $('#tasks').html(template);
         }
      });
   }

   // Delete on table
   $(document).on('click', '.task-delete', function () {
      if (confirm('Are you sure you want to delete it?')) {
         let element = $(this)[0].parentElement.parentElement;
         let id = $(element).attr('taskId');
         $.post('task-delete.php', {id}, function (response) {
            console.log(response);
            fetchTasks();
         });
      }
   });
   

});