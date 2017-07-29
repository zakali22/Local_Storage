$(document).ready(function() {
  var list = JSON.parse(localStorage.getItem('items')) || [];
  var itemsList = $('.menu-list');
  // Get the modal
  var modal = $('#myModal');
  console.log(location);

  populate(list, itemsList);
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
      this.reset();
    } else {
      modal.css('display', 'block');
    }

  });

  $('span.delete').on('click', function(event) {
    event.preventDefault();
    /* Act on the event */
    console.log(event.target);
    $(event.target).parent().remove();
  });

  function populate(array = [], locationList) {
    var list = array.map(function(plate, index) {
      var output = '<li>';
      output += '<input type="checkbox" data-index=item' + index + '" id="item' + index + '">';
      output += '<label for="item' + index + '"><p>' + plate.text + '</p></label>';
      output += '<span class="delete">X</span>';
      output += '</li>';
      return output;
    }).join('');
    itemsList.html(list);
    console.table(list);
  }

  // When the user clicks on <span> (x), close the modal
  $('.close').on('click', function(event) {
    event.preventDefault();
    /* Act on the event */
    modal.css('display', 'none');
    location.reload();
  });

});
