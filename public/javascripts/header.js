if (!$.cookie('userID') || $.cookie('userID') == "null") {
    $('#login').show();
    $('#changePW').hide();
    $('#username').hide();
    $('#logout').hide();
} else {
    $('#login').hide();
    $('#changePW').show();
    $('#username').show();
    $('#username').text("UserName : " + $.cookie('userName'));
    $('#logout').show();
}
function logout() {
    $.removeCookie("userID");
    $.removeCookie("userName");
    history.go(0);
}
