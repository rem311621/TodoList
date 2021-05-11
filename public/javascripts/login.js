function login() {
  var _account = $("#ac").val();
  var _password = $("#pw").val();
  if (!_account || !_password) {
    $("#errmsg").text("請輸入帳號密碼!");
  } else {
    $.post(
      "/member/login",
      { account: _account, password: _password },
      function (res) {
        if (res.status == 1) {
          $("#errmsg").text(res.msg);
        } else {
          $.cookie("userName", res.data.name);
          $.cookie("userID", res.data.account);
          alert("登入成功!");
          location.href = "http://localhost:3000";
        }
      }
    );
  }
}
function register() {
  location.href = "/public/register.html";
}
