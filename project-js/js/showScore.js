(function () {
    $(document).ready(function () {
        let showScore = new ShowScore();
    });
})();

class ShowScore {
    constructor() {
        this.addShowScore();
    }

    addShowScore() {
        //ajout d'un bouton pour voir ses scores
        $('#divButtons').append('<div id="divButtonsScore"></div>');
        let buttonShowScore = $('<input id="buttonshowScore" class="mainInput" type="button" value="Statistiques">');
        buttonShowScore.click(function () {
            //on active le scroll de la page
            $('html').css({'overflow': 'scroll'});
            //on active le bouton playGame, si ce n'est pas déja fait
            document.getElementById("playGame").disabled = false;
            //on vide la page
            $('#divMainWindow').empty();
            //on ajoute le choix des difficultés
            let listName = ('<select id="selectName" name="select"><option value="Facile">Facile</option><option value="Normale">Normale</option><option value="Difficile">Difficile</option><option value="Ultra difficile">Ultra difficile</option><option value="Personalisée">Personalisée</option></select>');
            let buttonConfirm = $('<input id="buttonConfirm" class="secondaryInput" type="button" value="Valider">');
            buttonConfirm.click(function () {
                //on vide la page
                $('#divTabScore').empty();
                let valueName = $("#selectName :selected").val();
                $.ajax({
                    url: "php/showScore.php",
                    method: "post",
                    data: {
                        name: valueName
                    }
                }).done(function (data) {
                    $('#divMainWindow').append('<div id="divTabScore"></div>');
                    $('#divTabScore').append(data);
                }).fail(function () {
                    alert("erreur BD pour la recherche des scores");
                });
            });
            $('#divMainWindow').append(listName,buttonConfirm);
        });
        $('#divButtonsScore').append(buttonShowScore);
    }
}