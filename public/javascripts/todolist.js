$(document).ready(function () {
  var todolist = [];
  getList();
  function getList() {
    const api = "http://localhost:3000/todolist/getList";
    $.get(api, function (data, status) {
      for (var i = 0; i < data.length; i++) {
        todolist = data[i];
      }
      
    });
  }

  var id = 0;
  function addList() {
    let title = $("#title").val();
    let content = $("#msg").val();
    if (title == "" || msg == "") {
      alert("請輸入標題和內容!");
    } else {
      id++;
      const api = "http://localhost:3000/todolist/input";
      var data = { id: id, title: title, content: content };
      $.post(api, data, (res) => {
        newList(res.data);
        $("#title").val("");
        $("#msg").val("");
      });
    }
  }
  $("#checkBtn").click(addList);

  function newList(data) {
    let content = `<div class="input-group mb-3" id="${data.id}">
        <div class="input-group-prepend">
            <div class="input-group-text">
                <input type="checkbox" id="check${data.id} onclick="checkStatus(  )">
            </div>
        </div>
        <input type="text" class="form-control col-sm-3" id="title${data.id}" value="${data.title}" readonly>
        <input type="text" class="form-control col-sm-9" id="msg${data.id}" value=${data.content} readonly>
            <div class="input-group-append" id="button-addon4">
            <button class="btn btn-outline-secondary" type="button" id="btnEdit${data.id}" >修改</button>
            <button class="btn btn-outline-secondary" type="button" id="btnUpdate${data.id}" >更新</button>
            <button class="btn btn-outline-secondary" type="button" id="btnRemove${data.id}" >刪除</button>
            </div>
        </div>`;
    $(".todocontainer").append(content);
    $("#btnEdit" + data.id).click(function (id) {
      console.log("Edit");
      $("#btnEdit" + data.id).addClass("d-none");
      $("#btnRemove" + data.id).addClass("d-none");
      $("#btnUpdate" + data.id).removeClass("d-none");
      $("#title" + data.id).attr("readonly", false);
      $("#msg" + data.id).attr("readonly", false);
    });

    $("#btnUpdate" + data.id).click(function (id) {
      $("#btnEdit" + data.id).removeClass("d-none");
      $("#btnRemove" + data.id).removeClass("d-none");
      $("#btnUpdate" + data.id).addClass("d-none");
      $("#title" + data.id).attr("readonly", true);
      $("#msg" + data.id).attr("readonly", true);
    });

    $("#btnRemove" + data.id).click(function () {
      let index = todolist.findIndex((element) => element.id == data.id);
      todolist.splice(index, 1);
      $("#" + data.id).remove();
      console.log("刪除");
    });

    function checkStatus(id, status) {
      if (checkStatus.checked) {
        console.log(123);
        $("#title" + data.id).addClass("textDelete");
        $("#msg" + data.id).addClass("textDelete");
        $("#btnEdit" + data.id).addClass("d-none");
      } else {
        $("#title" + data.id).removeClass("textDelete");
        $("#msg" + data.id).removeClass("textDelete");
        $("#btnEdit" + data.id).removeClass("d-none");
      }
    }
  }
});
