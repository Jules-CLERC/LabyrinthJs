(function () {
    $(document).ready(function () {
        let settings = new Settings();
    });
})();

class Settings {
    constructor() {
        this.addButtonSettings();
    }

    addButtonSettings() {
        $('#divButtons').append('<div id="divButtonsSettings"></div>');
        let buttonHome = $('<input id="buttonSettings" class="mainInput" type="button" value="Réglages">');
        buttonHome.click(function () {
            //on active le scroll de la page
            $('html').css({'overflow': 'scroll'});
            //on active le bouton playGame, si ce n'est pas déja fait
            document.getElementById("playGame").disabled = false;
            //on vide la page
            $('#divMainWindow').empty();

            $('#divMainWindow').append('<div id="divInformations"></div>','<div id="divResultatJson"></div>');
            $('#divInformations').append('<p> Changer la photo de profil : </p>');

            $.ajax({
                url: "json/choiceImages.json",
                method: "post"
            }).done(function (data) {
                for (let key in data) {
                    $('#divInformations').append(
                        $('<div/>').html(data[key].title)
                            .css({
                                'margin': '5px',
                                'padding': '5px',
                                'border': '2px solid red',
                            })
                            .on('click', function (data) {
                                $('#divResultatJson').empty();
                                $.ajax({
                                    url: "json/choiceImages.json",
                                    method: "post",
                                }).done(function(data) {
                                    for (let level in data[key]['photos']) {
                                        let div = $('<div class="divPhotos"></div>');
                                        div.append(
                                            '<p>'+data[key]['photos'][level]['obj']+' </p>','<img class="imgProfil" src="'+ data[key]['photos'][level]['lien'] +'"/>'
                                        ).on('click', function (data) {
                                            $.ajax({
                                                url: "json/choiceImages.json",
                                                method: "post"
                                            }).done(function (data) {
                                                let link = data[key]['photos'][level]['lien'];
                                                $.ajax({
                                                    url: "php/changeImgProfil.php",
                                                    method: "post",
                                                    data: {
                                                        link: link
                                                    }
                                                }).done(function (data) {
                                                    console.log(data);
                                                    $('#divImgProfil').empty();
                                                    $('#divImgProfil').append($('<img src="'+data+'" id="imgProfilUser"/>'));
                                                    $('#divResultatJson').empty();
                                                }).fail(function () {
                                                    alert("erreur changement photo de profil");
                                                })
                                            }).fail(function () {
                                                alert("erreur lors de la recherche des photos disponibles dans une catégorie");
                                            })
                                        });
                                        $('#divResultatJson').append(div);
                                    }
                                }).fail(function () {
                                    alert("erreur lors de la sélection d'une catégorie");
                                })
                            })
                    )
                }
            }).fail(function () {
                alert("erreur lors de la recherche des photos de profil");
            });
        });
        $('#divButtonsSettings').append(buttonHome);
    }
}