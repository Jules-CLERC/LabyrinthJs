class LabyrinthArea {

    constructor(difficulty, sizeY, sizeX, nbKeys, visionSize, name) {
        console.log("nombre de clefs : " + nbKeys);
        console.log("champ de vision : " + visionSize);
        console.log("taille du labyrinthe : " + sizeY + " " + sizeX);
        $('#divMainWindow').append('<div id="divInfosLabyrinth"></div>', '<div id="divLabyrinthArrow"></div>');
        $('#divInfosLabyrinth').append('<div id="divScore"></div>', '<div id="divNbKeys"></div>');
        $('#divLabyrinthArrow').append('<div id="divLabyrinth"></div>', '<div id="divArrow"></div>');
        let labyrinth = new Labyrinth(difficulty, sizeY, sizeX, nbKeys, visionSize, name);

        //directions avec les touches du clavier
        $("body").keydown(function(event){
            if (event.originalEvent.key === "ArrowDown") {
                labyrinth.down();
            }
            else if (event.originalEvent.key === "ArrowUp") {
                labyrinth.up();
            }
            else if (event.originalEvent.key === "ArrowLeft") {
                labyrinth.left();
            }
            else if (event.originalEvent.key === "ArrowRight") {
                labyrinth.right();
            }
            else {
                console.log("touche non prise en charge");
            }
        });

        //boutons directions
        let buttonUp = $('<img src="images/arrow/arrow_up.png" id="up">');
        buttonUp.click(function () {
            labyrinth.up();
        });
        let buttonDown = $('<img src="images/arrow/arrow_down.png" id="down">');
        buttonDown.click(function () {
            labyrinth.down();
        });
        let buttonLeft = $('<img src="images/arrow/arrow_left.png" id="left">');
        buttonLeft.click(function () {
            labyrinth.left();
        });
        let buttonRight = $('<img src="images/arrow/arrow_right.png" id=right">');
        buttonRight.click(function () {
            labyrinth.right();
        });
        $('#divArrow').append('<div id="lvl1"></div>','<div id="lvl2"></div>','<div id="lvl3"></div>');
        $('#lvl1').append(buttonUp);
        $('#lvl2').append(buttonLeft,buttonRight);
        $('#lvl3').append(buttonDown);
    }
}
