function addRecord() {
    $('#id').val('');
    $('#title').val('');
    $('#descript').val('');
    $('#photo').val('');

    $('#myModalLabel').html('Add new destination');
    $('#addRecord').modal('show');
}

function readRecords() {
    $.get("/cities", {}, function(data, status) {
        data.forEach(function(value) {
            var row = '<ul id="row_id_' + value.id + '">' + displayListItems(value) + '</ul>';
            $("#destinations").append(row);
        });
    });
}

function displayListItems(value) {
    return '<li>' + value.id + '</li>' +
        '<li class="title">' + value.title + '</li>' +
        '<li class="descript">' + value.description.substring(0, 255) + '...</li>' +
        '<li class="photo">' + value.photo + '</li>' +
        '<div id="btncrud">' + '<button onclick="viewRecord(' + value.id + ')" class="btn btn-edit">Update</button>' +
        '<button onclick="deleteRecord(' + value.id + ')" class="btn btn-danger">Remove</button>' + '</div>';
}

function viewRecord(id) {
    var url = "/cities" + id;
    $.get(url, {}, function(data, status) {
        $('#title').val(data.title);
        $('#descript').val(data.description);
        $('#photo').val(data.photo);
        $('#id').val(id);
        $('#myModalLabel').html('Edit destination');
        $('#addRecord').modal('show');
    });
}

function createRecord(formData) {
    $.ajax({
        url: '/cities',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#addRecord').modal('hide');
            var row = '<ul id="row_id_' + data.id + '">' +
                displayListItems(data) +
                '</ul>'
            $('#destinations').append(row);
        }
    });
}

function updateRecord(formData) {
    $.ajax({
        url: '/cities/' + formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#row_id_' + formData.id + '>li.title').html(formData.title);
            $('#row_id_' + formData.id + '>li.description').html(formData.description.substring(0, 255) + '...');
            $('#row_id_' + formData.id + '>li.photo').html(formData.photo);
            $('#addRecord').modal('hide');

        }
    });
}

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');

        }
        else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}

function deleteRecord(id) {
    $.ajax({
        url: '/cities/' + id,
        type: "DELETE",
        success: function(data) {
            $('#row_id_' + id).remove();

        }
    });
}

function saveRecord() {
    var formData = $('#record_form').serializeObject();
    if (formData.id) {
        updateRecord(formData);
    }
    else {
        createRecord(formData);
    }
}
