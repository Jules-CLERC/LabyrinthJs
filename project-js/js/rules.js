(function () {
    $(document).ready(function () {
        let rules = new Rules();
    });
})();

class Rules {
    constructor() {
        this.addButtonRules();
    }

    addButtonRules() {
        $('#divButtons').append('<div id="divButtonsRules"></div>');
        let buttonRules = $('<input id="buttonRules" class="mainInput" type="button" value="Règles">');
        let self = $(this);
        buttonRules.click(function () {
            //on active le scroll de la page
            $('html').css({'overflow': 'scroll'});
            //on active le bouton playGame, si ce n'est pas déja fait
            document.getElementById("playGame").disabled = false;
            //on vide la page
            $('#divMainWindow').empty();
            $('#divMainWindow').append('<div id="divRules"></div>');
            $.ajax({
                url: "json/rules.json",
                method: "post"
            }).done(function (data) {
                let i = 0;
                $('#divRules').append('<p id="textRules"> '+ data['règles']['liste'][i].text +' </p>');
                $('#divRules').click(function () {
                    if (i < data['règles']['liste'].length -1) {
                        i++;
                        document.getElementById("buttonRules").disabled = true;
                        self[0].showRules(data,i);
                    }
                    else {
                        $('#divRules').empty();
                        $('#divRules').append('<p id="textRules"> cliquez pour relire les règles. </p>');
                        i = 0;
                    }
                });
            }).fail(function () {
                alert("erreur recherche fichier json des règles");
            })
        });
        $('#divButtonsRules').append(buttonRules);
    }

    showRules(data,i) {
        for (let j = 0; j < data['règles']['liste'][i].text.length; j++) {
            setTimeout(function () {
                $('#divRules').empty();
                $('#divRules').append('<p id="textRules"> '+ data['règles']['liste'][i].text.substr(0,j+1) +' </p>');
            },j * data['règles'].speedText);
        }
        setTimeout(function () {
            document.getElementById("buttonRules").disabled = false;
        },data['règles']['liste'][i].text.length * data['règles'].speedText);
    }
}