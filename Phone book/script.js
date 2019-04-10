let Selected = null;
let Oldphone = '';
let SortCol = 1;

function clrSelected() {
  if (Selected) {
    document.getElementById(Selected).className = 'simple-row';
    document.getElementById('delete-button').setAttribute('disabled', '');
    document.getElementById('modify-button').setAttribute('disabled', '');
    Selected = null;
    document.getElementById('submit-button').innerText = 'Отправить';
  }
}

$(() => {
  function tableFirstColEnum() {
    let id = 1;
    $('#phone-book-table').children('tbody').children('tr').children('td:nth-child(1)')
      .each((key, value) => {
        value.innerText = id; // eslint-disable-line no-param-reassign
        id += 1;
      });
  }

  function postprocessTable() {
    $('#phone-book-table').fancyTable({
      sortColumn: SortCol,
      sortable: true,
      searchable: true,
      globalSearch: true,
      inputPlaceholder: 'Поиск...',
      pagination: false,
    });
    tableFirstColEnum();
    const n = Math.abs(SortCol);
    const arrow = SortCol > 0 ? '\u23F6' : '\u23F7';
    const newtext = document.getElementById(`mencol${n}`).innerText + arrow;
    document.getElementById(`mencol${n}`).innerText = newtext;
  }

  function resort(num) { // eslint-disable-line no-unused-vars
    if (num === 0) return;

    const inputVal = $('#dearch_input').val();

    $('#phone-book-table').find('thead').remove();
    $('#phone-book-table').prepend($("<thead><tr style='border-bottom: 3px double gray;'>"
          + "  <td id='mencol0' class='colname'>№</td>"
          + "  <td id='mencol1' class='colname'>Имя</td>"
          + "  <td id='mencol2' class='colname'>Фамилия</td>"
          + "  <td id='mencol3' class='colname'>Номер</td>"
          + "  <td id='mencol4' class='colname'>Категория</td>"
          + '  </tr></thead>'));

    if (Math.abs(num) === SortCol) {
      SortCol = -SortCol;
    } else {
      SortCol = num;
    }

    $('#mencol1').click(() => resort(1));
    $('#mencol2').click(() => resort(2));
    $('#mencol3').click(() => resort(3));
    $('#mencol4').click(() => resort(4));
    postprocessTable();
    $('#dearch_input').val(inputVal);
    $('#dearch_input').keyup();
  }

  function onAjaxCompleted() {
    $('#mencol1').click(() => resort(1));
    $('#mencol2').click(() => resort(2));
    $('#mencol3').click(() => resort(3));
    $('#mencol4').click(() => resort(-4));
  }

  function updateTable() {
    clrSelected();

    $.ajax({
      url: 'loaddata.php',
      type: 'POST',
      data: 'action=update',
      success(result) {
        $('#phone-book-table').html(result);
        postprocessTable();
        onAjaxCompleted();
      },
    });
  }

  function clearInputs() {
    $('input').val('');
    clrSelected();
  }

  function submitRecord() {
    const modify = Selected === null;

    function phoneCheck(phone) {
      if (phone !== '') return true;
      return false;
    }

    const name = $('#name-input').val();
    const surname = $('#surname-input').val();
    const phone = $('#phone-input').val();
    const group = $('#group-input').val();

    if (name === '' || !phoneCheck(phone)) {
      alert('Некорректные данные!'); // eslint-disable-line no-alert
    } else {
      clearInputs();
      const lastOption = modify ? 'action=add'
        : `action=modify&oldphone=${Oldphone}`;

      const options = `${`name=${name}&`
          + `surname=${surname}&`
          + `phone=${phone}&`
          + `group=${group}&`}${lastOption}`;

      // console.log(options);

      $.ajax({
        url: 'loaddata.php',
        type: 'POST',
        data: options,
        success(result) {
          $('#phone-book-table').html(result);
          postprocessTable();
          onAjaxCompleted();
        },
      });
    }
  }

  $(document).ready(() => {
    updateTable();
  });

  function applyModify() {
    if (Selected !== null) {
      const e = document.getElementById(Selected);
      const tdl = e.getElementsByTagName('td');
      $('#name-input').val(tdl.item(1).innerText);
      $('#surname-input').val(tdl.item(2).innerText);
      $('#phone-input').val(tdl.item(3).innerText);
      $('#group-input').val(tdl.item(4).innerText);

      document.getElementById('submit-button').innerText = 'Изменить';
    }
  }

  function removeRecord() {
    const e = document.getElementById(Selected);
    const tdl = e.getElementsByTagName('td');
    clrSelected();

    $.ajax({
      url: 'loaddata.php',
      type: 'POST',
      data: 'action=remove&'
          + `phone=${tdl.item(3).innerText}`,
      success(result) {
        $('#phone-book-table').html(result);
        postprocessTable();
        onAjaxCompleted();
      },
    });
  }


  $('#update-button').click(updateTable);
  $('#submit-button').click(submitRecord);
  $('#clear-button').click(clearInputs);
  $('#modify-button').click(applyModify);
  $('#delete-button').click(removeRecord);
});


function phoneBookRowOnClick(e) { // eslint-disable-line no-unused-vars
  const eid = e.getAttribute('id');

  if (Selected === eid) {
    clrSelected();
  } else {
    clrSelected();
    Selected = eid;
    Oldphone = e.getElementsByTagName('td').item(3).innerText;
    e.className = 'selected-row';
    document.getElementById('delete-button').removeAttribute('disabled');
    document.getElementById('modify-button').removeAttribute('disabled');
  }
}

function phoneBookMouseOut(e) { // eslint-disable-line no-unused-vars
  const eid = e.getAttribute('id');
  if (Selected !== eid) {
    e.className = 'simple-row';
  }
}

function phoneBookMouseOver(e) { // eslint-disable-line no-unused-vars
  const eid = e.getAttribute('id');
  if (Selected !== eid) {
    e.className = 'hovered-row';
  }
}
