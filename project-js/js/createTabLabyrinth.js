class CreateTabLabyrinth {

    constructor(sizeY, sizeX, nbKeys) {
        this.sizeY = sizeY;
        this.sizeX = sizeX;
        this.nbKeys = nbKeys;
        this.save = [];
        this.tab = [];
        this.configureLabyrinth();
    }

    configureLabyrinth() {
        this.labyrinthFull(); //création du tableau contenant le labyrinthe
        this.labyrinthExtract();    //extraction des cases
        this.setSpawn();         //placement du point de départ
        this.setArrival(); //placement du point de fin
        this.setKey();  //placements des clefs
    }

    labyrinthFull() {
        for(let y=0; y < this.sizeY; y++) {
            this.tab[y] = [];
            for(let x=0; x < this.sizeX; x++) {
                this.tab[y][x] = "mur";
            }
        }
    }

    labyrinthExtract() {
        this.extractY = 0;
        this.extractX = 0;
        this.tab[this.extractY][this.extractX] = "vide";
        for(;;) {
            //on détermine les directions possibles
            let tabD = []; //on enregistre les directions possibles dans ce tableau

            if (this.tryValidity(this.extractY,this.extractX-2) === true && this.tab[this.extractY][this.extractX-2] === "mur") { //gauche
                tabD.push('this.left()');
            }
            if (this.tryValidity(this.extractY,this.extractX+2) === true && this.tab[this.extractY][this.extractX+2] === "mur") { //droite
                tabD.push('this.right()');
            }
            if (this.tryValidity(this.extractY-2,this.extractX) === true && this.tab[this.extractY-2][this.extractX] === "mur") { //haut
                tabD.push('this.up()');
            }
            if (this.tryValidity(this.extractY+2,this.extractX) === true && this.tab[this.extractY+2][this.extractX] === "mur") { //bas
                tabD.push('this.down()');
            }

            //si aucune direction n'est possible
            if (tabD.length == 0) {
                //on déplace le curseur à une intersection
                if (this.save.length >= 1) {
                    //on prend la dernière intersection enregistrée
                    this.extractY = this.save[this.save.length-1][0];
                    this.extractX = this.save[this.save.length-1][1];
                    //on supprime les coordonnées sauvegardées
                    this.save.splice(this.save.length-1);
                }
                else {
                    //conception du labyrinthe terminée
                    break;
                }
            }
            else {
                //on vérifie s'il s'agit d'une intersection
                if (tabD.length > 1) {
                    //on enregistre les coordonnées de l'intersection
                    this.save.push([this.extractY,this.extractX]);
                }
                //maintenant on choisit une direction aléatoirement
                let rand = Math.round(Math.random() * tabD.length);
                let randModulo = rand % tabD.length;
                eval(tabD[randModulo]);
            }
        }
    }

    tryValidity (y,x) {
        try {
            this.tab[y][x];
        } catch (e) {
            if (e instanceof TypeError) {
                return false;
            }
        }
        return true;
    }

    left() {
        this.tab[this.extractY][this.extractX-1] = "vide";
        this.tab[this.extractY][this.extractX-2] = "vide";
        this.extractX = this.extractX - 2;
    }

    right() {
        this.tab[this.extractY][this.extractX+1] = "vide";
        this.tab[this.extractY][this.extractX+2] = "vide";
        this.extractX = this.extractX + 2;
    }

    up() {
        this.tab[this.extractY-1][this.extractX] = "vide";
        this.tab[this.extractY-2][this.extractX] = "vide";
        this.extractY = this.extractY - 2;
    }

    down() {
        this.tab[this.extractY+1][this.extractX] = "vide";
        this.tab[this.extractY+2][this.extractX] = "vide";
        this.extractY = this.extractY + 2;
    }

    setSpawn() {
        this.setPoint("départ");
    }

    setArrival() {
        this.setPoint("arrivée");
    }

    setKey() {
        for (let i = 0; i < this.nbKeys; i++) {
            this.setPoint("clef");
        }
    }

    setPoint(value) {
        let randX = this.randomNumber(0, this.sizeX-1);
        let randY = this.randomNumber(0, this.sizeY-1);
        while (this.tab[randY][randX] !== "vide") {
            randX = this.randomNumber(0, this.sizeX-1);
            randY = this.randomNumber(0, this.sizeY-1);
        }
        this.tab[randY][randX] = value;
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getTab() {
        return this.tab;
    }
}