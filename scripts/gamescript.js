
function decreaseValue(value, n) {
    value -= n;
    console.log(value);
    return value;
}

//background audio
var audio = document.getElementById("myaudio");
audio.volume = 0;

//mute & unmute audio
var toggleAudio = 1;

//variables
var userName = localStorage.getItem("name");
var index = localStorage.getItem("images");
console.log(index);
var img;
if (index == 1) {
    img = "gambar/charfinalgirl/";
}
else {
    img = "gambar/charfinalboy/";
}
var currMin = 0;
var currHour = 6;

// colors :)
var nightBackground = "#132237";
var nightFonts = "#19B3B8";
var headerUMN = "#E7C664";
var headerlife = "#9ED072";
var dayBackground = "#eeebe2";
var dayFonts = "steelblue";
var headerUMNDay = "#ae185e";
var afternoonBackground = "#FAD6A5";
var afternoonFonts = "#05295A";
var headerlifeAfternoon = "#A5FAD6";


//intervals
warningInt = setInterval(function () {
    user.setUserWarning();
}, 1000)

TimeInt = setInterval(function () {
    gameTime();
}, 1000);

gameInt = setInterval(function () {
    user.gamerunning();
    user.setUserWarning();
}, 450);

$(".lofiAudio").click(function () {
    if (toggleAudio === 1) {
        if (currHour > 12 && currHour < 17) {
            $(".lofiAudio").css("background-color", "#FA62D5").css("margin-top", "5px").css("border-bottom-width", "0px");
        }
        else if (currHour > 17) {
            $(".lofiAudio").css("background-color", "#19B3B8").css("margin-top", "5px").css("border-bottom-width", "0px");
        }
        else {
            $(".lofiAudio").css("background-color", "steelblue").css("margin-top", "5px").css("border-bottom-width", "0px");
        }
        audio.volume = 0.15;
        toggleAudio = 0;
    }
    else {
        $(".lofiAudio").css("background-color", "#aaa8a0").css("margin-top", "2px").css("border-bottom-width", "3px");
        audio.volume = 0;
        toggleAudio = 1;
    }
});

var player = {
    initialize: function (name, img) {
        this.name = name;
        this.imageIdx = index;
        this.money = 100;
        this.isalive = true;
        this.isSleeping = false;
        this.isGraduated = false;
        this.energyLevel = 50;
        this.foodLevel = 50;
        this.happinessLevel = 50;
        this.healthLevel = 50;
        this.xpLevel = 0;
        this.level = 1;
        this.difficulty = 0;
    },

    study: function () {
        if (this.xpLevel < 100) {
            this.xpLevel += 20;
        }
        if (this.xpLevel === 100) {
            this.xpLevel = 0;
            if (this.level < 4) {
                this.level++;
                // Audio graduate
                var audio = $("#audio-graduate")[0];
                audio.play();
            }
            else {
                this.isGraduated = true;
            }
        }
        if (this.energyLevel > 0) {
            this.energyLevel -= 10 + this.difficulty;
        }
        if (this.happinessLevel > 0) {
            this.happinessLevel -= 10 + this.difficulty;
        }
        if (this.energyLevel < 0) {
            this.energyLevel = 0;
        }
        if (this.happinessLevel < 0) {
            this.energyLevel = 0;
        }
        if (currHour < 23) {
            currHour += 1;
        }
        else {
            currHour = 0;
        }

    },


    eat: function () {
        if (this.foodLevel > 100) {
            this.foodLevel = 100;
        }
        if (this.foodLevel < 100) {
            this.foodLevel += 30;
        }
        if (this.money > 5) {
            this.money -= Math.floor(Math.random() * 50) + 10;
        }
        if (currHour < 23) {
            currHour += 1;
        }
        else {
            currHour = 0;
        }
    },
    work: function () {
        if (this.energyLevel > 0) {
            this.energyLevel -= 20 + this.difficulty;
        }
        if (this.happinessLevel > 0) {
            this.happinessLevel -= 20 + this.difficulty;
        }
        this.money += Math.floor(Math.random() * 100) + 20;

        if (currHour < 23) {
            currHour += 1;
        }
        else {
            currHour = 0;
        }
    },
    play: function () {
        if (this.energyLevel > 0) {
            this.energyLevel -= 10 + this.difficulty;
        }
        if (this.foodLevel > 0) {
            this.foodLevel -= 15 + this.difficulty;
        }
        if (this.energyLevel < 0) {
            this.energyLevel = 0;
        }
        if (this.happinessLevel < 100) {
            this.happinessLevel += 40;
        }
        if (currHour < 23) {
            currHour += 1;
        }
        else {
            currHour = 0;
        }
    },
    sleep: function () {
        this.isSleeping = true;
        if (this.energyLevel < 100) {
            this.energyLevel += 30;
        }
        if (this.foodLevel > 0) {
            this.foodLevel -= 5 + this.difficulty;
        }
        if (currHour < 23) {
            currHour += 3;
        }
        else {
            currHour = 0;
        }
    },


    calcHealthBar: function () {
        if (this.foodLevel === 0) {
            if (this.healthLevel > 0) {
                this.healthLevel -= 10;
                console.log(this.healthLevel);
            }
            else this.isalive = false;
        }
        else {
            if (this.healthLevel > 0) {
                this.healthLevel = this.energyLevel * 0.4 + this.happinessLevel * 0.2 + this.foodLevel * 0.4;
            }
            else this.isalive = false;
        }

        return this.healthLevel;
    },

    //time passes
    gamerunning: function () {
        if (currHour > 23) {
            currHour = 0;
        }
        if (this.isalive && !this.isGraduated) {
            $("img").attr("src", img + "idle-unscreen.gif");
            $("img").attr("style", "width:260px");
            if (this.energyLevel > 0) {
                this.energyLevel = decreaseValue(this.energyLevel, 0.05);
            }
            if (this.foodLevel > 0) {
                this.foodLevel = decreaseValue(this.foodLevel, 0.5);
            }
            if (this.happinessLevel > 0) {
                this.happinessLevel = decreaseValue(this.happinessLevel, 0.5);
            }
            if (this.energyLevel <= 0) {
                this.energyLevel = 0;
            }
            if (this.foodLevel <= 0) {
                this.foodLevel = 0;
            }
            if (this.energyLevel >= 100) {
                this.energyLevel = 100;
            }
            if (this.foodLevel >= 100) {
                this.foodLevel = 100;
            }
            if (this.happinessLevel >= 100) {
                this.happinessLevel = 100;
            }
            if (this.money <= 0) {
                this.money = 0;
            }

            // NERF MONEY STRAT
            if (this.money >= 300) {
                this.money = 300;
            }

            if (this.level == 2) {
                this.difficulty = 3;
            }

            if (this.level == 3) {
                this.difficulty = 6;
            }

            if (this.level == 4) {
                this.difficulty = 9;
            }


            //levels
            $("#lvl").text(this.level + " Year");
            //ganti logo bermasalah :)

            // button disabled
            $("#btnRestart").fadeOut();
            $("#win").fadeOut();

            if (this.happinessLevel > 30 && this.energyLevel > 20) {
                $("#btnStudy").attr("disabled", true).css("background-color", "#21bd2e").css("border", "none");
                $("#btnStudy").children().eq(1).text("STUDY");
                $("#btnStudy").attr("disabled", false);
            }
            if (this.happinessLevel < 30 || this.energyLevel < 20) {
                $("#btnStudy").attr("disabled", true).css("background-color", "black").css("border", "none");
                $("#btnStudy").children().eq(1).text("Disabled").css("text-align", "center");
            }

            if (this.money > 5) {
                $("#btnEat").attr("disabled", true).css("background-color", "#b8b8b8").css("border", "none");
                $("#btnEat").children().eq(1).text("EAT");
                $("#btnEat").attr("disabled", false);
            }
            if (this.money < 5) {
                $("#btnEat").attr("disabled", true).css("background-color", "black").css("border", "none");
                $("#btnEat").children().eq(1).text("Disabled").css("text-align", "center");
            }

            if (this.happinessLevel > 15 && this.energyLevel > 25 && this.foodLevel > 20) {
                $("#btnWork").attr("disabled", true).css("background-color", "rgb(197, 70, 70)").css("border", "none");
                $("#btnWork").children().eq(1).text("WORK");
                $("#btnWork").attr("disabled", false);
            }
            if (this.happinessLevel < 15 || this.energyLevel < 25 || this.foodLevel < 20) {
                $("#btnWork").attr("disabled", true).css("background-color", "black").css("border", "none");
                $("#btnWork").children().eq(1).text("Disabled").css("text-align", "center");
            }

            if (this.energyLevel > 15 && this.foodLevel > 25) {
                $("#btnPlay").attr("disabled", true).css("background-color", "rgb(255, 182, 46)").css("border", "none");
                $("#btnPlay").children().eq(1).text("PLAY");
                $("#btnPlay").attr("disabled", false);
            }
            if (this.energyLevel < 15 || this.foodLevel < 25) {
                $("#btnPlay").attr("disabled", true).css("background-color", "black").css("border", "none");
                $("#btnPlay").children().eq(1).text("Disabled").css("text-align", "center");
            }

            $("#btnSleep").attr("disabled", true).css("background-color", "rgb(94, 237, 237)").css("border", "none");
            $("#btnSleep").children().eq(1).text("SLEEP");
            $("#btnSleep").attr("disabled", false);


        }
        else if (!this.isalive) {
            var audio = $("#audio-dead")[0];
            audio.play();
            $("#btnRestart").fadeIn();
            $("#btnRestart").attr("disabled", false);
            $("img").attr("src", "gambar/dead.png");

            $("#cont2").remove();
            $("#contMid2").remove();
            $("#warningBox").fadeOut();
            $("#warningBox1").fadeOut();
            $("#warningBox2").fadeOut();
            $("#warningBox3").fadeOut();
            $("#warningBox4").fadeOut();
        }

        else if (this.isGraduated) {
            clearInterval(gameTime);
            $("#btnRestart").fadeIn();
            $("#btnRestart").attr("disabled", false);
            $("img").attr("src", img + "congrats-unscreen.gif");
            $("img").attr("style", "width:260px");
            $("#cont2").remove();
            $("#contMid2").remove();
            $("#warningBox").fadeOut();
            $("#warningBox1").fadeOut();
            $("#warningBox2").fadeOut();
            $("#warningBox3").fadeOut();
            $("#warningBox4").fadeOut();
            $("#win").fadeIn();

        }
        this.healthLevel = this.calcHealthBar();
        this.setPlayerStatus();
    },

    setPlayerStatus: function () {
        $("#status-label").text(this.name);
        //health bar
        $("#healthBar").attr("value", this.healthLevel);
        //food bar
        $("#foodBar").attr("value", this.foodLevel);
        //energy bar
        $("#energyBar").attr("value", this.energyLevel);
        //happiness bar
        $("#happinessBar").attr("value", this.happinessLevel);
        //xp bar
        $("#eduBar").attr("value", this.xpLevel);
        //money
        $("#moneyAmount").text("$" + this.money);
        // time 
    },

    energyLevelWarning: function () {
        var energyWarning = false;
        if (this.energyLevel < 30) {
            energyWarning = true;
        };
        return energyWarning;
    },

    foodLevelWarning: function () {
        var foodWarning = false;
        if (this.foodLevel < 30) {
            foodWarning = true;
        };
        return foodWarning;
    },

    happinessLevelWarning: function () {
        var happinessWarning = false;
        if (this.happinessLevel < 30) {
            happinessWarning = true;
        };
        return happinessWarning;
    },

    healthLevelWarning: function () {
        var healthWarning = false;
        if (this.healthLevel < 30) {
            healthWarning = true;
        };
        return healthWarning;
    },

    setUserWarning: function () {
        if (this.healthLevelWarning()) {
            setTimeout(function () {
                $("#warningBox1").html("<h5>Warning: Health Bar is Low !!</h5>").css("color", "red");
            }, 500);
        }
        else {
            setTimeout(function () {
                $("#warningBox1").html("");
            }, 500);
        }

        if (this.foodLevelWarning()) {
            setTimeout(function () {
                $("#warningBox2").html("<h5>Warning: Food Bar is Low !!</h5>").css("color", "red");
            }, 500);
        }
        else {
            setTimeout(function () {
                $("#warningBox2").html("");
            }, 500);
        }

        if (this.happinessLevelWarning()) {
            setTimeout(function () {
                $("#warningBox3").html("<h5>Warning: Happiness Bar is Low !!</h5>").css("color", "red");
            }, 500);
        }
        else {
            setTimeout(function () {
                $("#warningBox3").html("");
            }, 500);
        }

        if (this.energyLevelWarning()) {
            setTimeout(function () {
                $("#warningBox4").html("<h5>Warning: Energy Bar is Low !!</h5>").css("color", "red");
            }, 500);
        }
        else {
            setTimeout(function () {
                $("#warningBox4").html("");
            }, 500);
        }

    }
}


//functions 
function decreaseValue(value, n) {
    value -= n;
    return value;
}

function pad(value) {
    if (value < 10) {
        return '0' + value;
    } else {
        return value;
    }
}

function gameTime() {
    currMin = (currMin < 10 ? '0' : '') + currMin;

    if (currMin < 59) {
        currMin++;
    }
    else {
        currMin = 0;
        if (currHour < 23) {
            currHour++;
        }
        else {
            currHour = 0;
        }
    }
    var timeString = pad(currHour) + ":" + pad(currMin);
    $("#clockValue").text(timeString);

    //day night cycle
    if (currHour > 12 && currHour <= 17) {
        $("body").css("background-color", afternoonBackground).css("color", "#9879C8").css("transition", " background-color 1000ms linear;");
        $("#dayOrNight").attr("class", "logo-noborder afternoon fa-solid fa-cloud-sun fa-3x");
        $("#sunOrMoon").text("Good Evening");
        $(".parent2day").attr("class", "parent2afternoon container d-flex flex-column align-items-center pt-5");
        $(".cont-progress").attr("style", "height: auto; border: 8px #96CEB4 solid; border-radius: 12px;");
        $(".fa-graduation-cap").attr("style", "color:blue;");
        $(".fa-money-bill").attr("style", "color:green;");
        $("#UMN").attr("class", "UMNlifeAfternoon");
        $("header").css("color", "#5B7869");

    }
    else if (currHour >= 18) {
        console.log("true");
        $("body").css("background-color", nightBackground).css("color", nightFonts).css("transition", " background-color 1000ms linear;");
        $("#dayOrNight").attr("class", "logo-noborder moon fa-solid fa-moon fa-3x");
        $("#sunOrMoon").text("Good Night");
        $(".parent2afternoon").attr("class", "parent2night container d-flex flex-column align-items-center pt-5");
        $(".cont-progress").attr("style", "height: auto; border: 8px lightblue solid; border-radius: 12px;");
        $(".fa-graduation-cap").attr("style", "color:lightblue;");
        $(".fa-money-bill").attr("style", "color:lime;");
        $("#UMN").attr("class", "UMNlifeNight");
        $("header").css("color", "#A5FAD6");
    }
    else {
        $("body").css("background-color", dayBackground).css("color", dayFonts).css("transition", "background-color 1000ms linear;");
        $("#dayOrNight").attr("class", "logo-noborder matahari fa-solid fa-sun fa-3x");
        $("#sunOrMoon").text("Good Morning");
        $(".parent2night").attr("class", "parent2day container d-flex flex-column align-items-center pt-5");
        $(".cont-progress").attr("style", "height: auto; border: 8px lightcoral solid; border-radius: 12px;");
        $(".fa-graduation-cap").attr("style", "color:darkblue;");
        $(".fa-money-bill").attr("style", "color:darkgreen;");
        $("#UMN").attr("class", "UMNlife");
        $("header").css("color", "#3846b1");

    }
    if (currHour > 12 && currHour < 17 && toggleAudio === 0) {
        $(".lofiAudio").css("background-color", "#FA62D5").css("margin-top", "5px").css("border-bottom-width", "0px");
    }
    else if (currHour > 17 && toggleAudio === 0) {
        $(".lofiAudio").css("background-color", "#19B3B8").css("margin-top", "5px").css("border-bottom-width", "0px");
    }
    else if (currHour < 12 && toggleAudio === 0) {
        $(".lofiAudio").css("background-color", "steelblue").css("margin-top", "5px").css("border-bottom-width", "0px");
    }

}

//initialize user
var user = Object.create(player);
user.initialize(userName, index);
gameTime();

//onclick sounds bruh
//buttons you like buttons?? YES
//ikutin button

//STUDY
$("#btnStudy").unbind('click').click(function () {
    clearInterval(TimeInt);
    clearInterval(gameInt);
    user.setPlayerStatus();
    var audio = $("#audio-study")[0];
    audio.play();
    user.study();
    $("img").attr("src", img + "study-take-a-note-unscreen.gif");
    $("img").attr("style", "width:450px");
    user.setPlayerStatus();
    setTimeout(function () {
        if (user.isalive) {
            console.log("alive");
            TimeInt = setInterval(function () {
                gameTime();
            }, 1000);

            gameInt = setInterval(function () {
                user.gamerunning();
            }, 450);
            console.log("healthbar: " + user.healthLevel);
            console.log("Foodbar: " + user.foodLevel);
            console.log("Energybar: " + user.energyLevel);
            console.log("Happinessbar: " + user.happinessLevel);
        }
    }, 450);

    $("#btnStudy").attr("disabled", true);
    setTimeout(function () {
        $("#btnStudy").attr("disabled", false);
    }, 1000);

    $("#btnPlay").attr("disabled", true);
    setTimeout(function () {
        $("#btnPlay").attr("disabled", false);
    }, 1000);

    $("#btnWork").attr("disabled", true);
    setTimeout(function () {
        $("#btnWork").attr("disabled", false);
    }, 1000);

    $("#btnEat").attr("disabled", true);
    setTimeout(function () {
        $("#btnEat").attr("disabled", false);
    }, 1000);

    $("#btnSleep").attr("disabled", true);
    setTimeout(function () {
        $("#btnSleep").attr("disabled", false);
    }, 1000);
});

//EAT
$("#btnEat").unbind('click').click(function () {
    clearInterval(TimeInt);
    clearInterval(gameInt);
    user.setPlayerStatus();
    var audio = $("#audio-eat")[0];
    audio.play();
    user.eat();
    user.setPlayerStatus();
    $("img").attr("src", img + "eat-with-table-unscreen.gif");
    $("img").attr("style", "width:250px");
    setTimeout(function () {
        if (user.isalive) {
            console.log("alive");
            TimeInt = setInterval(function () {
                gameTime();
            }, 1000);

            gameInt = setInterval(function () {
                user.gamerunning();
            }, 450);
            console.log("healthbar: " + user.healthLevel);
            console.log("Foodbar: " + user.foodLevel);
            console.log("Energybar: " + user.energyLevel);
            console.log("Happinessbar: " + user.happinessLevel);
        }
    }, 450);


    $("#btnPlay").attr("disabled", true);
    setTimeout(function () {
        $("#btnPlay").attr("disabled", false);
    }, 1000);

    $("#btnWork").attr("disabled", true);
    setTimeout(function () {
        $("#btnWork").attr("disabled", false);
    }, 1000);

    $("#btnSleep").attr("disabled", true);
    setTimeout(function () {
        $("#btnSleep").attr("disabled", false);
    }, 1000);

    $("#btnEat").attr("disabled", true);
    setTimeout(function () {
        $("#btnEat").attr("disabled", false);
    }, 1000);

    $("#btnStudy").attr("disabled", true);
    setTimeout(function () {
        $("#btnStudy").attr("disabled", false);
    }, 1000);
});

$("#btnWork").unbind('click').click(function () {
    clearInterval(TimeInt);
    clearInterval(gameInt);
    user.setPlayerStatus();
    var audio = $("#audio-work")[0];
    audio.play();
    user.work();
    user.setPlayerStatus();
    $("img").attr("src", img + "work-pc-unscreen.gif");
    $("img").attr("style", "width:500px");
    setTimeout(function () {
        if (user.isalive) {
            console.log("alive");
            TimeInt = setInterval(function () {
                gameTime();
            }, 1000);

            gameInt = setInterval(function () {
                user.gamerunning();
            }, 450);
            console.log("healthbar: " + user.healthLevel);
            console.log("Foodbar: " + user.foodLevel);
            console.log("Energybar: " + user.energyLevel);
            console.log("Happinessbar: " + user.happinessLevel);
        }
    }, 450);

    $("#btnStudy").attr("disabled", true);
    setTimeout(function () {
        $("#btnStudy").attr("disabled", false);
    }, 1000);

    $("#btnPlay").attr("disabled", true);
    setTimeout(function () {
        $("#btnPlay").attr("disabled", false);
    }, 1000);

    $("#btnWork").attr("disabled", true);
    setTimeout(function () {
        $("#btnWork").attr("disabled", false);
    }, 1000);

    $("#btnEat").attr("disabled", true);
    setTimeout(function () {
        $("#btnEat").attr("disabled", false);
    }, 1000);

    $("#btnSleep").attr("disabled", true);
    setTimeout(function () {
        $("#btnSleep").attr("disabled", false);
    }, 1000);
});

$("#btnPlay").unbind('click').click(function () {
    clearInterval(TimeInt);
    clearInterval(gameInt);
    user.setPlayerStatus();
    var audio = $("#audio-play")[0];
    audio.play();
    user.play();
    user.setPlayerStatus();

    $("img").attr("src", img + "play-drone-unscreen.gif");
    $("img").attr("style", "width:800px");
    setTimeout(function () {
        if (user.isalive) {
            console.log("alive");
            TimeInt = setInterval(function () {
                gameTime();
            }, 1000);

            gameInt = setInterval(function () {
                user.gamerunning();
            }, 450);
            console.log("healthbar: " + user.healthLevel);
            console.log("Foodbar: " + user.foodLevel);
            console.log("Energybar: " + user.energyLevel);
            console.log("Happinessbar: " + user.happinessLevel);
        }
    }, 450);

    $("#btnStudy").attr("disabled", true);
    setTimeout(function () {
        $("#btnStudy").attr("disabled", false);
    }, 1000);

    $("#btnPlay").attr("disabled", true);
    setTimeout(function () {
        $("#btnPlay").attr("disabled", false);
    }, 1000);

    $("#btnWork").attr("disabled", true);
    setTimeout(function () {
        $("#btnWork").attr("disabled", false);
    }, 1000);

    $("#btnEat").attr("disabled", true);
    setTimeout(function () {
        $("#btnEat").attr("disabled", false);
    }, 1000);

    $("#btnSleep").attr("disabled", true);
    setTimeout(function () {
        $("#btnSleep").attr("disabled", false);
    }, 1000);
});

$("#btnSleep").unbind('click').click(function () {
    clearInterval(TimeInt);
    clearInterval(gameInt);
    user.setPlayerStatus();
    var audio = $("#audio-sleep")[0];
    audio.play();
    user.sleep();
    user.setPlayerStatus();

    $("img").attr("src", img + "sleep-in-bed-unscreen.gif");
    $("img").attr("style", "width:450px");
    setTimeout(function () {
        if (user.isalive) {
            console.log("alive");
            TimeInt = setInterval(function () {
                gameTime();
            }, 1000);

            gameInt = setInterval(function () {
                user.gamerunning();
            }, 450);
            console.log("healthbar: " + user.healthLevel);
            console.log("Foodbar: " + user.foodLevel);
            console.log("Energybar: " + user.energyLevel);
            console.log("Happinessbar: " + user.happinessLevel);
        }
    }, 450);

    $("#btnStudy").attr("disabled", true);
    setTimeout(function () {
        $("#btnStudy").attr("disabled", false);
    }, 1000);


    $("#btnPlay").attr("disabled", true);
    setTimeout(function () {
        $("#btnPlay").attr("disabled", false);
    }, 1000);

    $("#btnWork").attr("disabled", true);
    setTimeout(function () {
        $("#btnWork").attr("disabled", false);
    }, 1000);

    $("#btnEat").attr("disabled", true);
    setTimeout(function () {
        $("#btnEat").attr("disabled", false);
    }, 1000);

    $("#btnSleep").attr("disabled", true);
    setTimeout(function () {
        $("#btnSleep").attr("disabled", false);
    }, 1000);
});

$("#btnRestart").unbind('click').click(function () {
    window.location = 'main.html';
});
