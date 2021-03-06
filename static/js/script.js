let i = 0;
let j = 0;
let time = [];
let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let events = [];

function compileData() {
    var js_data = JSON.stringify(events);
    $.ajax({
        url: '/events',
        type: 'post',
        contentType: 'application/json',
        dataType: 'json',
        data: js_data
    }).done(function (result) {
        console.log(result);
        $("#data").html(result);
    });
    //window.location.href = "/modal"; 
}

function updateTitle(i, j) {
    var f = 0;
    var event_title = [];
    for (var a = 0; a < time.length; a++) {
        if (time[a].index == j) {
            var title = document.getElementById('title_form' + i + j).elements.namedItem("title").value;
            var link = document.getElementById('title_form' + i + j).elements.namedItem("link").value;
            var html = '<button type="button" class="button-design" data-toggle="modal" data-target="#exampleModalCenter"" onclick="title_form(' + i + ',' + j + ')">' + title + '</button>';
            for (var b=0;b<events.length;b++){
                if(events[b].i==i && events[b].j==j){
                events.splice(b,1);
                }
            }
            temp = { i:i,j:j,day: days[i - 1], from: time[a].from, to: time[a].to, title: title, link: link };
            events.push(temp);
            $('#title' + i + j).html(html);
            f = 1;
            break;
        }
    }
    if (f == 0) {
        alert("Enter Time!");
    }
};

function updateTime(i, j) {
    
    var from = document.getElementById('time_form' + i + j).elements.namedItem("from").value;
    var to = document.getElementById('time_form' + i + j).elements.namedItem("to").value;
    var html = '<button type="button" class="button-design" data-toggle="modal" data-target="#exampleModalCenter"" onclick="time_form(' + i + ',' + j + ')">' +  from + '-' + to + '</button>';
    var f=-1;
    for (var a=0;a<time.length;a++){
        if(time[a].index==j){
            time.splice(a,1);
            f=j;
        }
    }
    if(f!=-1){
        for(var a =0;a<events.length;a++){
            if(events[a].j==f){
                events[a].to=to;
                events[a].from=from;
            }
        }
    }
    temp = { index: j, from: from, to: to };
    time.push(temp);
    $('#time' + i + j).html(html);
};

function time_form(i, j) {
    var table_body = '<form id="time_form' + i + j + '">';
    table_body += '<label for="from">From:</label>';
    table_body += '<input type="time" id="from" name="from"><br/>';
    table_body += '<label for="to">To:</label>';
    table_body += '<input type="time" id="to" name="to"><br/>';
    table_body += '<button type="button" data-dismiss="modal" onclick="updateTime(' + i + ',' + j + ')">Submit</button>';
    table_body += '';
    table_body += '</form>';
    table_body += '';
    table_body += '';
    table_body += '';
    $('#modal_form').html(table_body);
}

function title_form(i, j) {
    var table_body = '<form id=title_form' + i + j + '>';
    table_body += '<label for="title">Title:</label>';
    table_body += '<input type="text" id="title" name="title" reqiured><br/>';
    table_body += '<label for="link">Link:</label>';
    table_body += '<input type="link" id="link" name="link"><br/>';
    table_body += '<button type="button" data-dismiss="modal" onclick="updateTitle(' + i + ',' + j + ')">Submit</button>';
    table_body += '<input type="reset">';
    table_body += '</form>';
    table_body += '';
    table_body += '';
    table_body += '';
    $('#modal_form').html(table_body);
}
//$("#generateTable").click(function ()
$(document).ready(function () {
     {
        var number_of_rows = 5;
        var number_of_cols = 8;
        var table_body = '<table border="2" class="table">';
        var x = 0;
        for (i = 0; i <= number_of_rows; i++) {
            table_body += '<tr>';

            for (j = 0; j < number_of_cols; j++) { // id="cell'+i+j+'
                table_body += '<td>';
                if (i == 0 && j != 0) {
                    table_body += '<div id="time' + i + j + '"><button type="button" class="button-design"  data-toggle="modal" data-target="#exampleModalCenter"" onclick="time_form(' + i + ',' + j + ')">Time</button></div>';
                }
                if (i == 0 && j == 0) {
                    table_body += '<h7>Day/Time</h7>';
                }
                if (i != 0 && j == 0) {
                    var day = days[i - 1];
                    table_body += '<h7>' + day + '</h7>';
                }
                if (i != 0 && j != 0) {
                    table_body += '<div id="title' + i + j + '"><button type="button" class="button-design"  data-toggle="modal" data-target="#exampleModalCenter"" onclick="title_form(' + i + ',' + j + ')">Title</button></div>';
                }
                table_body += '</td>';
            }
            table_body += '</tr>';
        }
        table_body += '</table>';
        table_body += '<br/><button type="submit" class="submit-design" data-toggle="modal" data-target="#filename" onclick="compileData(' + number_of_rows + ',' + number_of_cols + ')">Submit</button>';
        $('#tableDiv').html(table_body);
    }/*);*/
});