(function () {
    $(document).ready(function () {
        let header = new Header();
        let mainWindow = new MainWindow();
        let welcome = new Welcome();
    });
})();

class Header {
    constructor() {
        $('body').append('<div id="divHeader"></div>');
        $('#divHeader').append('<div id="divWelcome"></div>','<div id="divButtons"></div>');
    }
}

class MainWindow {
    constructor() {
        $('body').append('<div id="divMainWindow"></div>');
    }
}

class Welcome {
    constructor() {
        //ajout dans la divHeader d'un message de bienvenue
        let textHome = $('<p id="textHome"></p>');
        $('#divWelcome').append(textHome);

        $.ajax({
            url : "php/getUser.php",
            method: "POST"
        }).done(function (data) {
            document.getElementById('textHome').innerHTML = "Bonjour " + data;
        }).fail(function () {
            alert("erreur récupération nom utilisateur");
        });

        //ajout de la photo de profil
        $.ajax({
            url : "php/getImgProfil.php",
            method: "POST"
        }).done(function (data) {
            let imgProfil = $('<img src="'+data+'" id="imgProfilUser"/>');
            $('#divWelcome').append('<div id="divImgProfil"></div>');
            $('#divImgProfil').append(imgProfil);
        }).fail(function () {
            alert("erreur récupération photo de profil");
        });
    }
}