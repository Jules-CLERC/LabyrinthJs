class Labyrinth {

	constructor(difficulty, sizeY, sizeX, nbKeys, visionSize, name) {
		this.setTabLabyrinth(sizeY, sizeX, nbKeys);
		this.setSpawn(sizeY,sizeX);
		this.setDivNbKeys(nbKeys);
		this.setScore();
		this.setVisionSize(visionSize);
		this.setName(name);
		this.setDifficulty(difficulty);
		this.showLabyrinth();
	}

	setTabLabyrinth(sizeY, sizeX, nbKeys) {
		this.sizeY = sizeY;
		this.sizeX = sizeX;
		this.nbKeysMax = nbKeys;
		const createTabLabyrinth = new CreateTabLabyrinth(sizeY, sizeX, nbKeys);
		this.tab = createTabLabyrinth.getTab();
	}

	setSpawn(sizeY,sizeX) {
		for(let y=0; y < sizeY; y++) {
			for(let x=0; x < sizeX; x++) {
				if (this.tab[y][x] === "départ") {
					this.cursorY = y;
					this.cursorX = x;
					this.tab[y][x] = "vide";
					return;
				}
			}
		}
	}

	setDivNbKeys(nbKeys) {
		this.nbKeysFind = 0;
		$('#divNbKeys').append('<p id="textKeyFind"></p>');
		this.changeMsgKeys();
	}

	setScore() {
		$('#divScore').append('<p id="textScore"> </p>');
		this.score = 0;
		this.showScore();
	}

	changeScore() {
		this.score++;
		this.showScore();
	}

	showScore() {
		let pointOrPoints;
		if (this.score > 1) {
			pointOrPoints = "points";
		}
		else {
			pointOrPoints = "point";
		}
		document.getElementById('textScore').innerHTML = "score : " + this.score + " " + pointOrPoints;
	}

	setVisionSize(visionSize) {
		this.visionSize = visionSize;
		this.setCssVisionSize();
	}

	setName(name) {
		this.name = name;
	}

	setDifficulty(difficulty) {
		this.difficulty = difficulty;
	}

	setCssVisionSize() {
		let cssVisionSize = (2*this.visionSize) + 1;
		document.documentElement.style.setProperty('--visionSize', cssVisionSize.toString());
	}

	showLabyrinth() {
		$('#divLabyrinth').empty();	//on efface le labyrinthe

		//pour chaque colonne
		for (let y = this.cursorY-this.visionSize; y < this.cursorY+this.visionSize+1; y++) {
			const ligne = $('<div id="'+y+'"></div>');
			$('#divLabyrinth').append(ligne);
			//pour chaque case
			for (let x = this.cursorX-this.visionSize; x < this.cursorX+this.visionSize+1; x++) {
				let self = $(this);

				let caseLabyrinth = $('<div id="'+x+','+y+'" class="caseLabyrinth"></div>')
					.append("&nbsp;")
					.append(this.getImage(y,x))
					.css(this.getColor(y,x))
					.click(function () {
						self[0].movePossibilities(y,x);
					})
					.mouseleave(function () {
						$(this).css(self[0].getColor(y,x));
					})
					.mouseover(function () {
						$(this).css(self[0].addColor('yellow'));
					});
				ligne.append(caseLabyrinth);
			}
		}
	}

	getImage(y,x) {
		if(this.cursorY === y && this.cursorX === x) { //pour le pion
			return  '<img src="images/imagesBox/pawn.png" class="imgCase"/>';
		}
		else if (this.tryValidity(y,x) === false || this.tab[y][x] === "mur" || this.tab[y][x] === "vide") { //pour les murs et espaces vides
			return NaN;
		}
		else if (this.tab[y][x] === "arrivée") { //pour la sortie
			if (this.nbKeysFind === this.nbKeysMax) {
				return '<img src="images/imagesBox/open-padlock.png" class="imgCase"/>';
			}
			else {
				return '<img src="images/imagesBox/lock-padlock.png" class="imgCase"/>';
			}
		}
		else if (this.tab[y][x] === "clef") { //pour les clefs
			return '<img src="images/imagesBox/key.png" class="imgCase"/>';
		}
		else { //en cas d'erreur
			console.log("case inconnue ", this.tab[y][x]);
			return NaN;
		}
	}

	movePossibilities(y,x) {
		if (x === this.cursorX && y > this.cursorY) {
			console.log("clique vers le bas");
			while (y != this.cursorY) {
				let posY = this.cursorY;
				this.Down();
				if (posY == this.cursorY) {
					return;
				}
			}
		}
		else if (x === this.cursorX && y < this.cursorY) {
			console.log("clique vers le haut");
			while (y != this.cursorY) {
				let posY = this.cursorY;
				this.Up();
				if (posY == this.cursorY) {
					return;
				}
			}
		}
		else if (y === this.cursorY && x > this.cursorX) {
			console.log("clique vers la droite");
			while (x != this.cursorX) {
				let posX = this.cursorX;
				this.Right();
				if (posX == this.cursorX) {
					return;
				}
			}
		}
		else if (y === this.cursorY && x < this.cursorX) {
			console.log("clique vers la gauche");
			while (x != this.cursorX) {
				let posX = this.cursorX;
				this.Left();
				if (posX == this.cursorX) {
					return;
				}
			}
		}
		else if (x == this.cursorX && y == this.cursorY) {
			console.log("aucun déplacement");
		}
		else {
			this.dirImpossible();
			this.changeScore();
		}
	}

	getColor(y,x) {
		if(x === this.cursorX && y === this.cursorY) { //pour le pion
			if (this.tab[y][x] === "arrivée") {
				return this.addColor('blue');
			}
			else {
				return this.addColor('white');
			}
		}
		else if (this.tryValidity(y,x) === false || this.tab[y][x] === "mur") { //pour les murs
			return this.addColor('black');
		}
		else if (this.tab[y][x] === "vide") { //pour les espaces vides
			return this.addColor('white');
		}
		else if (this.tab[y][x] === "arrivée") { //pour la sortie
			return this.addColor('blue');
		}
		else if (this.tab[y][x] === "clef") { //pour les clefs
			return this.addColor('green');
		}
		else {
			console.log("case inconnue");
		}
	}

	addColor(color) {
		return {'display' : 'inline-block','background-color': ''+color+''};
	}

	tryValidity (y,x) {
		//on vérifie si la case existe selon les coordonnées en paramètres
		try {
			this.tab[y][x];
		} catch (e) {
			if (e instanceof TypeError) {
				return false;
			}
		}
		return this.tab[y][x] !== undefined;
	}

	changeMsgKeys() {
		if (this.nbKeysFind === this.nbKeysMax) {
			document.getElementById('textKeyFind').innerHTML = "tu as actuellement toutes les clefs, rends toi à la sortie !";
		} else if (this.nbKeysFind > 1) {
			document.getElementById('textKeyFind').innerHTML = "tu as actuellement " + this.nbKeysFind + " clefs sur " + this.nbKeysMax + ".";
		} else {
			document.getElementById('textKeyFind').innerHTML = "tu as actuellement " + this.nbKeysFind + " clef sur " + this.nbKeysMax + ".";
		}
	}

	changeColorCurrentCase() {
		const position = this.cursorX + "," + this.cursorY;
		const currentCase = document.getElementById(position);
		currentCase.style.backgroundColor = 'red';
	}

	changeColorOldCase() {
		const position = this.oldCursorX + "," + this.oldCursorY;
		const currentCase = document.getElementById(position);
		currentCase.style.backgroundColor = 'white';
	}

	endGame() {
		//afficher score du joueur
		console.log("vous avez fini la partie avec " + this.score + " points");
		document.getElementById('textScore').innerHTML = "Vous avez terminé la partie avec " + this.score + " points.";
		document.getElementById('textKeyFind').innerHTML = "";
		$("#divInfosLabyrinth").append('<p> vous pouvez utiliser la touche entrée pour rejouer </p>');

		//on enlève les raccourcis clavier pour se déplacer
		$("body").off();

		//on supprime les boutons de déplacements
		$('#divArrow').empty();

		//ajouter score à la BD
		$.ajax({
			url: "php/insertScore.php",
			method: "post",
			data: {
				score: this.score,
				difficulty: this.difficulty,
				sizeY: this.sizeY,
				sizeX: this.sizeX,
				nbKeys: this.nbKeysMax,
				visionSize: this.visionSize,
				name: this.name
			}
		}).done(function (data) {
			console.log(data);
		}).fail(function () {
			alert("erreur lors de l'insertion du score dans la BD");
		});

		//on réactive le bouton play
		document.getElementById("playGame").disabled = false;

		//on demande au joueur s'il souhaite rejouer
		$('html').css({'overflow': 'scroll'});
		const self = $(this);
		const buttonReplay = $('<input id="replay" class="secondaryInput" type="button" value="rejouer une partie">');
		buttonReplay.click(function () {
			self[0].replay();
		});
		$('#divMainWindow').append(buttonReplay);

		//raccourci clavier
		$("body").keydown(function(event){
			if (event.originalEvent.key === "Enter") {
				self[0].replay();
			}
		});
	}

	replay() {
		$('html').css({'overflow': 'hidden'});
		//on désactive le bouton entrer
		$("body").off();
		//on supprime le labyrinthe terminé
		const divLabyrinthArrow = document.getElementById('divLabyrinthArrow');
		const divLabyrinth = document.getElementById('divLabyrinth');
		divLabyrinthArrow.removeChild(divLabyrinth);
		document.getElementById("playGame").click();
		//on passe le bouton lancer une partie (inutile car le joueur clique sur relancer une partie);
		const buttonPlay = document.getElementById('playGame');
		buttonPlay.click();
	}

	actionUp() {
		this.oldCursorX = this.cursorX;
		this.oldCursorY = this.cursorY;
		this.cursorY = this.cursorY-1;
		this.changeColorCurrentCase();
		this.changeColorOldCase();
		this.showLabyrinth();
	}

	up() {
		this.changeScore();
		if (this.tryValidity(this.cursorY-1,this.cursorX) === false) {
			this.dirImpossible()
		}
		else if (this.tab[this.cursorY-1][this.cursorX] === "vide") {
			this.actionUp()
		}
		else if (this.tab[this.cursorY-1][this.cursorX] === "clef") {
			this.tab[this.cursorY-1][this.cursorX] = "vide";
			this.nbKeysFind++;
			this.changeMsgKeys();
			this.actionUp();
		}
		else if (this.tab[this.cursorY-1][this.cursorX] === "arrivée") {
			this.actionUp();
			if (this.nbKeysFind === this.nbKeysMax) {
				console.log("tu as gagné");
				this.endGame();
			}
			else {
				this.missingKey();
			}
		}
		else {
			this.dirImpossible()
		}
	}

	actionDown() {
		this.oldCursorX = this.cursorX;
		this.oldCursorY = this.cursorY;
		this.cursorY = this.cursorY+1;
		this.changeColorCurrentCase();
		this.changeColorOldCase();
		this.showLabyrinth();
	}

	down() {
		this.changeScore();
		if (this.tryValidity(this.cursorY+1,this.cursorX) === false) {
			this.dirImpossible()
		}
		else if (this.tab[this.cursorY+1][this.cursorX] === "vide") {
			this.actionDown()
		}
		else if (this.tab[this.cursorY+1][this.cursorX] === "clef") {
			this.tab[this.cursorY+1][this.cursorX] = "vide";
			this.nbKeysFind++;
			this.changeMsgKeys();
			this.actionDown()
		}
		else if (this.tab[this.cursorY+1][this.cursorX] === "arrivée") {
			this.actionDown();
			if (this.nbKeysFind === this.nbKeysMax) {
				console.log("tu as gagné");
				this.endGame();
			}
			else {
				this.missingKey();
			}
		}
		else {
			this.dirImpossible()
		}
	}

	actionLeft() {
		this.oldCursorX = this.cursorX;
		this.oldCursorY = this.cursorY;
		this.cursorX = this.cursorX-1;
		this.changeColorCurrentCase();
		this.changeColorOldCase();
		this.showLabyrinth();
	}

	left() {
		this.changeScore();
		if (this.tryValidity(this.cursorY,this.cursorX-1) === false) {
			this.dirImpossible()
		}
		else if (this.tab[this.cursorY][this.cursorX-1] === "vide") {
			this.actionLeft();
		}
		else if (this.tab[this.cursorY][this.cursorX-1] === "clef"){
			this.tab[this.cursorY][this.cursorX-1] = "vide";
			this.nbKeysFind++;
			this.changeMsgKeys();
			this.actionLeft();
		}
		else if (this.tab[this.cursorY][this.cursorX-1] === "arrivée") {
			this.actionLeft();
			if (this.nbKeysFind === this.nbKeysMax) {
				console.log("tu as gagné");
				this.endGame();
			}
			else {
				this.missingKey();
			}
		}
		else {
			this.dirImpossible()
		}
	}

	actionRight() {
		this.oldCursorX = this.cursorX;
		this.oldCursorY = this.cursorY;
		this.cursorX = this.cursorX+1;
		this.changeColorCurrentCase();
		this.changeColorOldCase();
		this.showLabyrinth();
	}

	right() {
		this.changeScore();
		if (this.tryValidity(this.cursorY,this.cursorX+1) === false) {
			this.dirImpossible()
		}
		else if (this.tab[this.cursorY][this.cursorX+1] === "vide") {
			this.actionRight();
		}
		else if (this.tab[this.cursorY][this.cursorX+1] === "clef") {
			this.tab[this.cursorY][this.cursorX+1] = "vide";
			this.nbKeysFind++;
			this.changeMsgKeys();
			this.actionRight();
		}
		else if (this.tab[this.cursorY][this.cursorX+1] === "arrivée") {
			this.actionRight();
			if (this.nbKeysFind === this.nbKeysMax) {
				console.log("tu as gagné");
				this.endGame();
			}
			else {
				this.missingKey();
			}
		}
		else {
			this.dirImpossible()
		}
	}

	missingKey() {
		let nbKeysNotFound = this.nbKeysMax - this.nbKeysFind;
		if (nbKeysNotFound === 1) {
			document.getElementById('textKeyFind').innerHTML = "Il vous manque actuellement une clef.";
		}
		else {
			document.getElementById('textKeyFind').innerHTML = "Il vous manque actuellement " + nbKeysNotFound + " clefs.";
		}
	}

	dirImpossible() {
		console.log("direction impossible");
	}
}