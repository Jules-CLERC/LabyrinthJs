class ConfigureLabyrinth {

    constructor(difficulty) {
        //supression des éléments de la fenêtre principale
        $('#divMainWindow').empty();
        $("body").off();

        this.configure(difficulty);
    }

    configure(difficulty) {
        this.difficulty = difficulty;
        if (this.difficulty === "Personalisée") {
            this.configureCustom();
        }
        else {
            this.configureNotCustom();
        }
    }

    configureCustom() {
        this.addFormSettingsCustom();
        this.addClickValidSettingsCustom();
        this.addKeyDown();
    }

    addFormSettingsCustom() {
        $('#divMainWindow').append(
            '<div><p id="infosSizeY" class="warningSettings"></p><p>taille du labyrinthe verticale : </p><input id="inputSizeY" type="number"/></div>' +
            '<div><p id="infosSizeX" class="warningSettings"></p><p>taille du labyrinthe horizontale : </p><input id="inputSizeX" type="number"/></div>' +
            '<div><p id="infosNbKeys" class="warningSettings"></p><p>nombre de clefs : </p><input id="inputNbKeys" type="number"/></div>' +
            '<div><p id="infosVisionSize" class="warningSettings"></p><p>distance de visibilité : </p><input id="inputVisionSize" type="number"/></div>' +
            '<div><p id="infosNameCustom" class="warningSettings"></p><p>nom de la partie : </p><input id="inputNameCustom" type="text"/></div>' +
            '<input id="buttonValidSettings" type="button" value="valider"/>' +
            '<p>Vous pouvez appuyer sur entrée pour valider. </p>'
        );
    }

    addClickValidSettingsCustom() {
        let self = $(this);
        $('#buttonValidSettings').click(function () {
            self[0].checkInputs();
        });
    }

    addKeyDown() {
        $("body").keydown(function (event) {
            if(event.originalEvent.key == "Enter") {
                $('#buttonValidSettings').click();
            }
            else {
                console.log("touche non prise en charge");
            }
        });
    }

    checkInputs() {
        this.validSettings = true;
        this.checkInputSizeY();
        this.checkInputSizeX();
        this.checkInputNbKeys();
        this.checkInputVisionSize();
        this.checkInputNameCustom();
        if (this.validSettings === true) {
            this.createLabyrinth();
        }
    }

    checkInputSizeY() {
        this.sizeY = parseInt($('#inputSizeY').val());
        if (isNaN(this.sizeY)) {
            $('#infosSizeY').html("<p>Vous devez remplir ce champ.</p>");
            this.validSettings = false;
        }
        else if (this.sizeY < 3 || this.sizeY > 750) {
            $('#infosSizeY').html("<p>Vous devez rentrer une taille comprise entre 3 et 750.</p>");
            this.validSettings = false;
        }
        else {
            $('#infosSizeY').empty();
        }
    }

    checkInputSizeX() {
        this.sizeX = parseInt($('#inputSizeX').val());
        if (isNaN(this.sizeX)) {
            $('#infosSizeX').html("<p>Vous devez remplir ce champ.</p>");
            this.validSettings = false;
        }
        else if (this.sizeX < 3 || this.sizeX > 750) {
            $('#infosSizeX').html("<p>Vous devez rentrer une taille comprise entre 3 et 750.</p>");
            this.validSettings = false;
        }
        else {
            $('#infosSizeX').empty();
        }
    }

    checkInputNbKeys() {
        if (isNaN(this.sizeY) || isNaN(this.sizeX)) {
            $('#infosNbKeys').html("<p>Vous devez remplir les deux champs précédents.</p>");
        }
        else {
            this.nbKeys = parseInt($('#inputNbKeys').val());
            if (isNaN(this.nbKeys)) {
                $('#infosNbKeys').html("<p>Vous devez remplir ce champ.</p>");
                this.validSettings = false;
            }
            else if (this.nbKeys < 0 || this.nbKeys > Math.floor((this.sizeY*this.sizeX)/4)) {
                $('#infosNbKeys').html("<p>Vous devez rentrer un nombre compris entre 0 et " + Math.floor((this.sizeY*this.sizeX)/4) + " .</p>");
                this.validSettings = false;
            }
            else {
                $('#infosNbKeys').empty();
            }
        }
    }

    checkInputVisionSize() {
        this.visionSize = parseInt($('#inputVisionSize').val());
        if (isNaN(this.visionSize)) {
            $('#infosVisionSize').html("<p>Vous devez remplir ce champ.</p>");
            this.validSettings = false;
        }
        else if (this.visionSize < 1 || this.visionSize > 12) {
            $('#infosVisionSize').html("<p>Vous devez rentrer une taille comprise entre 1 et 12.</p>");
            this.validSettings = false;
        }
        else {
            $('#infosVisionSize').empty();
        }
    }

    checkInputNameCustom() {
        this.name = $('#inputNameCustom').val();
        if (this.name === "") {
            $('#infosNameCustom').html("<p>Vous devez remplir ce champ.</p>");
            this.validSettings = false;
        }
        else if (this.name < 5 || this.name > 29) {
            $('#infosNameCustom').html("<p>Vous devez rentrer un nom possédant entre 5 et 29 caractères.</p>");
            this.validSettings = false;
        }
        else {
            $('#infosNameCustom').empty();
        }
    }

    configureNotCustom() {
        let self = $(this);
        $.ajax({
            async: false,
            dataType: "json",
            url: "json/settingsDifficultyLabyrinth.json",
            method: "post"
        }).done(function (data) {
            self[0].sizeY = data[self[0].difficulty].labyrinthSize;
            self[0].sizeX = data[self[0].difficulty].labyrinthSize;
            self[0].nbKeys = data[self[0].difficulty].nbKeys;
            self[0].visionSize = data[self[0].difficulty].visionSize;
        }).fail(function () {
            alert("erreur recherche paramètres dans le fichier json settingsDifficultylabyrinth");
        });
        this.name = this.difficulty;
        this.difficulty = "Prédéfini";
        this.createLabyrinth();
    }

    createLabyrinth() {
        $('#divMainWindow').empty();
        const labyrinthArea = new LabyrinthArea(this.difficulty, this.sizeY, this.sizeX, this.nbKeys, this.visionSize, this.name);
    }
}