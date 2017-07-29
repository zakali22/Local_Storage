$(document).ready(function() {
  var list = JSON.parse(localStorage.getItem('items')) || [];
  var itemsList = $('.menu-list');
  // Get the modal
  var modal = $('#myModal');

  populate(list, itemsList);
  // When the user clicks on <span> (x), close the modal
  $('.close').on('click', function(event) {
    event.preventDefault();
    /* Act on the event */
    modal.css('display', 'none');
  });


  $('span').on('click', function(event) {
    event.preventDefault();
    /* Act on the event */
    var element = event.target;
    var inputData = $(element).parent('li').children('input')[0].dataset.index;
    var indexOfDelete = list[inputData];
    $(element).parent('li').remove();
    list.splice(indexOfDelete, 1);
    localStorage.setItem('items', JSON.stringify(list));
    populate(list, itemsList);
    console.log(list);
    location.reload();
  });

  $('input').on('click', function(event) {
    /* Act on the event */
    var element = event.target;
    var elementIndex = element.dataset.index;
    list[elementIndex].done = !list[elementIndex].done;
    localStorage.setItem('items', JSON.stringify(list));
    console.log(list);
  });

  $('form').on('submit', function(event) {
    event.preventDefault();
    /* Act on the event */
    console.log($('.container').height(), $('body').height());
    if ($('.container').height() < 550) {
      var text = $('form input').val();
      var items = {
        text,
        done: false
      };

      list.push(items);
      populate(list, itemsList);
      localStorage.setItem('items', JSON.stringify(list));
      console.table(list);
      location.reload();
      this.reset();
    } else {
      modal.css('display', 'block');
    }

  });

  function populate(array = [], locationList) {
    var list = array.map(function(plate, index) {
      var output = '<li>';
      if (plate.done) {
        output += '<input type="checkbox" data-index=' + index + ' id="item' + index + '" checked>';
      } else {
        output += '<input type="checkbox" data-index=' + index + ' id="item' + index + '">';
      }
      output += '<label for="item' + index + '"><p>' + plate.text + '</p></label>';
      output += '<span class="delete">X</span>';
      output += '</li>';
      return output;
    }).join('');
    itemsList.html(list);
    console.table(list);
  }

});
