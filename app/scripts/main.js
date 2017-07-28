$(document).ready(function() {
  var list = JSON.parse(localStorage.getItem('items')) || [];
  var itemsList = $('.menu-list');

  populate(list, itemsList);
  $('form').on('submit', function(event) {
    event.preventDefault();
    /* Act on the event */
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
  });

  function populate(array = [], locationList) {
    var list = array.map(function(plate, index) {
      var output = '<li>';
      output += '<input type="checkbox" data-index=item' + index + '" id="item' + index + '">';
      output += '<label for="item' + index + '"><p>' + plate.text + '</p></label>';
      output += '</li>';
      return output;
    }).join('');
    itemsList.html(list);
    console.log(list);
  }
});
