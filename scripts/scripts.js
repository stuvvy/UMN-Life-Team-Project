$(document).ready(function () {
    //global var
    var images = ["gambar/charfinalboy/idle-unscreen.gif", "gambar/charfinalgirl/idle-unscreen.gif"];
    var img_idx = 0;
    var user_name;
    var size = 250;
    var toggle = 0;
    //menu (main.html)

    $(".team").hide();
    //team bocil kematian
    $(".anggota").click(function () {
        if (toggle === 0) {
            $(".team").fadeIn();
            toggle = 1;
        }
        else {
            $(".team").fadeOut();
            toggle = 0;
        }
    });


    //button-right
    $("#arrow-right").click(function () {
        console.log(img_idx);
        if (img_idx === 1) {
            img_idx = 0;
        }
        else {
            img_idx++;
        }
        $("#change-character").attr("src", images[img_idx]);
        $("#change-character").attr("style", "width:" + size + "px;");
    });

    $("#arrow-left").click(function () {
        console.log(img_idx);
        if (img_idx === 1) {
            img_idx = 0;
        }
        else {
            img_idx++;
        }
        $("#change-character").attr("src", images[img_idx]);
        $("#change-character").attr("style", "width:" + size + "px;");
    });

    //play-button
    $(".play-button").click(function () {
        console.log(img_idx);
        var playername = $("#playerName").val();
        if (playername === "") {
            alert("You haven't entered your name yet.");
        }
        else {
            user_name = playername;
            console.log(user_name);
            window.location = 'game.html';
            localStorage.setItem("name", user_name);
            localStorage.setItem("images", img_idx);
        }
    });

    let play = function () { document.getElementById("audio-play").play() }

    //game 


});
