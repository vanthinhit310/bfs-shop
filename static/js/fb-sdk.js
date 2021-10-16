window.fbAsyncInit = function () {
    FB.init({
        appId: "2989257141287784",
        autoLogAppEvents: true,
        xfbml: true,
        cookie: true,
        version: "v12.0"
    });
    FB.AppEvents.logPageView();
};

(function (d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
    fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
