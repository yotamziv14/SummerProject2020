class Disc {
    //disk הגדרנו כל דסקית משחק בתור אובייקט מסוג
    //לאובייקט דיסק יש את הקונסטרקטור שבונה אותו, ומתודה שמציירת אותו במיקום שהתקבל כארגומנטים של איקס ו-וואי
    constructor(color, radius) {
        this.color = color;
        this.radius = radius;
    }
    render(ctx, x, y) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}

var c = document.getElementById("can");
var ctx = c.getContext("2d");
var sizeX = 7;
var sizeY = 6;
var grid = [sizeX];
var color;
var gameEnded;
var turn = 0;
var a = true;
var scoreRed = 0;
var scoreYellow = 0;

NewGame(grid);

function NewGame() {
    ///,הפונקציה מתחילה משחק חדש אחרי כל סיום משחק ומאתחלת את מספר התורות
    ///מציגה את הניקוד על הקנווס, יוצרת לוח משחק ומציגה אותו
    turn = 0;
    document.getElementById("winDisplay").innerText = "";
    document.getElementById("scoreRed").innerText = scoreRed.toString();
    document.getElementById("scoreYellow").innerText = scoreYellow.toString();
    gameEnded = false;
    for (var i = 0; i < sizeX; i++) {
        grid[i] = [sizeY];
    }
    for (var i = 0; i < sizeX; i++) {
        for (var j = 0; j < sizeY; j++) {
            grid[i][j] = 0;
        }
    }
    ctx.lineWidth = "0.0000000000000000000000000000001";
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 100, c.width, c.height);
    for (var i = 0; i < sizeX; i++) {
        for (var j = 0; j < sizeY; j++) {
            var disc = new Disc("white", (c.height - 100) / sizeY / 2.4);
            disc.render(ctx, i * c.width / sizeX + c.width / sizeX / 2, j * c.height / sizeX + (c.height * sizeY / sizeX) / sizeY / 2 * 3);
        }
    }
    ctx.clearRect(0, 0, c.width, c.height / sizeX);
}

function MainGame(grid, x, turn) {
    /// הפונקציה הראשית של המשחק. מקבלת מערך, מיקום איקס, ואת מספר התור, ובהתאם לכך מוסיפה

    ctx.lineWidth = "0.0000000000000000000000000000001";
    var y;
    y = Row(grid, x);
    if (y != -1) {
        if (turn % 2 == 0) {
            grid[x][y] = 1;
            color = "red";
        }
        else {
            grid[x][y] = 2;
            color = "yellow";
        }
        var disc = new Disc(color, c.height/ sizeX / 2.4);
        disc.render(ctx, x * c.width / sizeX + c.width / sizeX / 2, y * c.height / sizeX + c.height / sizeX / 2 * 3);
        ctx.stroke();
        turn++;
        if (turn % 2 == 0) {
            color = "red";
        }
        else {
            color = "yellow"
        }
        ctx.clearRect(0, 0, c.width, c.height / sizeX);
        var disc2 = new Disc(color, c.height / sizeX / 2.4);
        disc2.render(ctx, x * c.width / sizeX + c.width / sizeX / 2, c.height / sizeX / 2.4);
        CheckForWin(grid);
        CheckForDraw(grid);
    }
    return turn;
}

function Row(grid, x) {
    /// הפונקציה בודקת אם השורה לא מלאה. היא מקבלת כארגומנט שורה מהאיוונט ליסנר ואת המערך של הלוח
    ///ואם אכן השורה לא מלאה אז היא מחזירה את מיקום הוואי שבו צריך לשים את הדיסקית לאותה שורה
    for (var i = sizeY - 1; i >= 0; i--) {
        if (grid[x][i] != 1 && grid[x][i] != 2) {
            break;
        }
    }
    if (i < sizeY)
        return i;
}

window.addEventListener("mousedown", function (event) {
    if (!gameEnded) {
        if (event.button === 0) {
            let rect = can.getBoundingClientRect();
            let scaleX = can.width / rect.width;
            let mouseX = (event.clientX - rect.left) * scaleX;
            if (mouseX >= 0 && mouseX <= c.width) {
                turn = MainGame(grid, Math.floor(mouseX * sizeX / c.width), turn);
            }
        }
    }
}, false);

function CheckForDraw(grid) {
    /// הפונקציה מקבלת את מערך לוח המשחק ובודקת אם קיים מצב של תיקו, כלומר כל הלוח מלא
    for (var i = 0; i < sizeX; i++) {
        for (var j = 0; j < sizeY; j++) {
            if (grid[i][j] == 0) {
                return true;
            }
        }
    }
    Win("orange");
}

function CheckForWin(grid) {
    /// הפונקציה מקבלת את מערך לוח המשחק ובודקת אם יש ארבעה ברצף מאותו צבע בטור, שורה או אלכסון
    /// ואם אכן קיים מצב ניצחון היא שולחת ארגומנט טיפוס סטרינג שבתוכו צבע המנצח לפונקציה ווין
    for (var i = 0; i < sizeX -  3; i++) {
        for (var j = 0; j < sizeY; j++) {
            if (grid[i][j] == 1 && grid[i + 1][j] == 1 && grid[i + 2][j] == 1 && grid[i + 3][j] == 1) {
                Win("red");
            }
            if (grid[i][j] == 2 && grid[i + 1][j] == 2 && grid[i + 2][j] == 2 && grid[i + 3][j] == 2) {
                Win("yellow");
            }
        }
    }
    for (var i = 0; i < sizeX; i++) {
        for (var j = 0; j < sizeY - 3; j++) {
            if (grid[i][j + 1] == 1 && grid[i][j + 2] == 1 && grid[i][j] == 1 && grid[i][j + 3] == 1) {
                Win("red");
            }
            if (grid[i][j + 1] == 2 && grid[i][j + 2] == 2 && grid[i][j] == 2 && grid[i][j + 3] == 2) {
                Win("yellow");
            }
        }
    }
    for (var i = 0; i < sizeX - 3; i++) {
        for (var j = 0; j < sizeY - 3; j++) {
            if (grid[i + 1][j + 1] == 1 && grid[i + 2][j + 2] == 1 && grid[i][j] == 1 && grid[i + 3][j + 3] == 1) {
                Win("red");
            }
            if (grid[i + 1][j + 1] == 2 && grid[i + 2][j + 2] == 2 && grid[i][j] == 2 && grid[i + 3][j + 3] == 2) {
                Win("yellow");
            }
        }
    }
    for (var i = 3; i < sizeX; i++) {
        for (var j = 0; j < sizeY - 3; j++) {
            if (grid[i - 1][j + 1] == 1 && grid[i - 2][j + 2] == 1 && grid[i][j] == 1 && grid[i - 3][j + 3] == 1) {
                Win("red");
            }
            if (grid[i - 1][j + 1] == 2 && grid[i - 2][j + 2] == 2 && grid[i][j] == 2 && grid[i - 3][j + 3] == 2) {
                Win("yellow");
            }
        }
    }
}

function Win(color) {
    ///htmlהפונקציה מציגה את הצבע המנצח בפסקה שהובנתה מראש בדף ה
    ctx.clearRect(0, 0, c.width, c.height / sizeX);
    gameEnded = true;
    if (color == "red") {
        scoreRed++;
        document.getElementById("winDisplay").style.color = color;
        document.getElementById("winDisplay").innerText = "Red Wins, Press Enter to play again";
    }
    else if (color == "yellow") {
        scoreYellow++;
        document.getElementById("winDisplay").style.color = color;
        document.getElementById("winDisplay").innerText = "Yellow Wins, Press Enter to play again";
    }
    else if (color == "orange") {
        scoreRed += 0.5;
        scoreYellow += 0.5;
        document.getElementById("winDisplay").style.color = color;
        document.getElementById("winDisplay").innerText = "Draw, Press Enter to play again";
    
    }
    document.getElementById("scoreRed").innerText = scoreRed.toString();
    document.getElementById("scoreYellow").innerText = scoreYellow.toString();
}

window.addEventListener("mousemove", function (e) {
    ctx.lineWidth = "0.0000000000000000000000000000001";
    if (!gameEnded) {
        let rect = can.getBoundingClientRect();
        let scaleX = can.width / rect.width;
        let mouseX = (event.clientX - rect.left) * scaleX;
        let x = Math.floor(mouseX * sizeX / c.width);
        if (x <= 6 && x >= 0) {
            ctx.clearRect(0, 0, c.width, c.height / sizeX);
            if (turn % 2 == 0) {
                color = "red";
            }
            else {
                color = "yellow";
            }
            var disc = new Disc(color, c.height / sizeX / 2.4);
            disc.render(ctx, x * c.width / sizeX + c.width / sizeX / 2, c.height / sizeX / 2.4);
        }
    }
}, false);

window.addEventListener("keydown", function (e) {
    if (gameEnded) {
        if (e.key == "Enter") {
            NewGame(grid);
        }
    }
}, false);