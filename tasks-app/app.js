$(function () {
   let edit = false;
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

   // save on table
   $('#task-form').submit(function (e) {
      e.preventDefault();
      const postData = {
         name: $('#name').val(),
         description: $('#description').val(),
         id: $('#taskId').val()
      };
      
      let url = edit === false ? 'task-add.php' : 'task-edit.php';
      
      
      $.post(url, postData, function (response) {        
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
            fetchTasks();
         });
      }
   });
   
   // Select data for edit table (loading data form)
   $(document).on('click', '.task-item', function(){
      // Recupera o id do elemento clicado
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('taskId');
      
      // Envia o id para task-single.php
      $.post('task-single.php', {id}, function(response) {          
         // Recebe os dados "response" converte para obj json e passa para os inputs
         const task = JSON.parse(response);
         $('#taskId').val(task.id);
         $('#name').val(task.name);        
         $('#description').val(task.description);
         edit = true;
      });
       
      
   });

});