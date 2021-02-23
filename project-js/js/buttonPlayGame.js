(function () {
    $(document).ready(function () {
        let buttonPlayGame = new ButtonPlayGame();
    });
})();

class ButtonPlayGame {
    constructor() {
        this.addButtonPlay();
    }

    addButtonPlay() {
        $('#divButtons').append('<div id="divButtonsPlay"></div>');
        let buttonHome = $('<button id="playGame" class="mainInput"> Lancer une partie </button>');
        buttonHome.click(function () {
            //on désactive le scroll
            $('html').css({'overflow': 'hidden'});

            //désactive le bouton play
            document.getElementById("playGame").disabled = true;

            //supression des éléments de la fenêtre principale
            $('#divMainWindow').empty();

            //création des boutons de difficultés
            $('#divMainWindow').append('<div id="divButtonsDifficulty"></div>');
            let buttonEasy = $('<input id="playEasy" class="secondaryInput" type="button" value="Lancer une partie facile">');
            buttonEasy.click(function () {
                    console.log("partie facile");
                    const configureLabyrinth = new ConfigureLabyrinth("Facile");
                }
            );
            let buttonNormal = $('<input id="playNormal" class="secondaryInput" type="button" value="Lancer une partie normale">');
            buttonNormal.click(function () {
                    console.log("partie normale");
                    const configureLabyrinth = new ConfigureLabyrinth("Normale");
                }
            );
            let buttonHard = $('<input id="playHard" class="secondaryInput" type="button" value="Lancer une partie diffcile">');
            buttonHard.click(function () {
                    console.log("partie difficile");
                    const configureLabyrinth = new ConfigureLabyrinth("Difficile");
                }
            );
            let buttonUltraHard = $('<input id="playUltraHard" class="secondaryInput" type="button" value="Lancer une partie ultra difficile">');
            buttonUltraHard.click(function () {
                    console.log("partie ultra difficile");
                    const configureLabyrinth = new ConfigureLabyrinth("Ultra difficile");
                }
            );
            let buttonCustom = $('<input id="playCustom" class="secondaryInput" type="button" value="Lancer une partie personalisée">');
            buttonCustom.click(function () {
                    console.log("partie personalisée");
                    let configureLabyrinth = new ConfigureLabyrinth("Personalisée");
                }
            );

            let tips = $('<p> vous pouvez utiliser les flèches gauche, droite et la touche entrée pour sélectionner une difficulté ! </p>');

            //ajout des nouveaux boutons sur la fenêtre principale
            $('#divButtonsDifficulty').append(buttonEasy, buttonNormal, buttonHard, buttonUltraHard, buttonCustom, tips);

            //ajout d'un système de sélection par flèche
            document.getElementById("playEasy").style = "background-color:orange;";
            let currentDifficulty = document.getElementById("playEasy");
            $("body").keydown(function(event){
                if (event.originalEvent.key == "ArrowLeft") {
                    currentDifficulty.style = "background-color:black;";
                    if (document.getElementById("playEasy") === currentDifficulty ) {
                        currentDifficulty = document.getElementById("playCustom");
                    }
                    else if (document.getElementById("playNormal") === currentDifficulty ) {
                        currentDifficulty = document.getElementById("playEasy");
                    }
                    else if (document.getElementById("playHard") === currentDifficulty ) {
                        currentDifficulty = document.getElementById("playNormal");
                    }
                    else if (document.getElementById("playUltraHard") === currentDifficulty ) {
                        currentDifficulty = document.getElementById("playHard");
                    }
                    else {
                        currentDifficulty = document.getElementById("playUltraHard");
                    }
                    currentDifficulty.style = "background-color:orange;";
                }
                else if (event.originalEvent.key == "ArrowRight") {
                    currentDifficulty.style = "background-color:black;";
                    if (document.getElementById("playEasy") === currentDifficulty ) {
                        currentDifficulty = document.getElementById("playNormal");
                    }
                    else if (document.getElementById("playNormal") === currentDifficulty ) {
                        currentDifficulty = document.getElementById("playHard");
                    }
                    else if (document.getElementById("playHard") === currentDifficulty ) {
                        currentDifficulty = document.getElementById("playUltraHard");
                    }
                    else if (document.getElementById("playUltraHard") === currentDifficulty ) {
                        currentDifficulty = document.getElementById("playCustom");
                    }
                    else {
                        currentDifficulty = document.getElementById("playEasy");
                    }
                    currentDifficulty.style = "background-color:orange;";
                }
                else if(event.originalEvent.key == "Enter") {
                    currentDifficulty.click();
                }
                else {
                    console.log("touche non prise en charge");
                }
            });


        });
        $('#divButtonsPlay').append(buttonHome);

        //activer le bouton play
        $("body").keydown(function(event){
            if (event.originalEvent.key == "Enter") {
                //on désactive la touche entrée
                $("body").off();
                //on actionne le bouton "lancer la partie"
                let buttonPlay = document.getElementById('playGame');
                buttonPlay.click();
            }
        });
    }
}