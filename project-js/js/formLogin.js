(function () {
    $(document).ready(function () {
        let formLogin = new FormLogin();
    });
})();

class FormLogin {
    constructor() {
        this.addFormLogin();
    }

    addFormLogin() {
        $("#submit").click(function(e){
            e.preventDefault();

            $.ajax({
                url: "php/login.php",
                method: "POST",
                data: {
                    username : $("#username").val(),
                    password : $("#password").val()
                }
            }).done(function (data) {
                console.log(data);
                if(data == 'Success'){
                    // l'utilisateur est connecté, redirection vers index
                    console.log("connexion réussie");
                    window.location.href = 'index.html';
                }
                else{
                    $("#resultat").html("<p>Identifiants incorrects</p>");
                }
            }).fail(function () {
                alert("erreur de login");
            });
        });

        $("#buttonRegister").click(function () {
            $('body').empty();
            let register = $(
                '<h1>Création d un compte</h1>' +
                '<div id="resultat"></div>' +
                '<h2>créez votre identifiant</h2>' +
                '<input type="text" id="username" />' +
                '<h2>Créez votre mot de passe</h2>' +
                '<input type="password" id="password" />' +
                '<h2>Confirmez votre mot de passe</h2>' +
                '<input type="password" id="password2" />' +
                '<input type="submit" id="submitRegister" value="Créer un compte !" />'
            );
            $('body').append(register);
            $("#submitRegister").click(function(e){
                e.preventDefault();
                if($("#username").val() !== "" && $("#password").val() !== "" && $("#password2").val() !== "") { //remplir tous les champs
                    if ($('#password').val() === $('#password2').val()) {    //confirmer le mdp
                        if ($("#username").val().length > 6) { //taille identifiant
                            if ($("#password").val().length > 6) { //taille mdp
                                $.ajax({
                                    url: "php/register.php",
                                    method: "POST",
                                    data: {
                                        username : $("#username").val(),
                                        password : $("#password").val()
                                    }
                                }).done(function (data) {
                                    if(data == 'Success'){
                                        // l'utilisateur a crée un compte
                                        console.log("compte créé avec succès");
                                        //redirection vers la page principale
                                        window.location.href = 'index.html';
                                    }
                                    else{
                                        $("#resultat").html("<p>" + data +"</p>");
                                    }
                                }).fail(function () {
                                    alert("erreur lors de le création du compte");
                                });
                            }
                            else {
                                $("#resultat").html("<p>vous devez rentrer un mot de passe plus grand </p>");
                            }
                        }
                        else {
                            $("#resultat").html("<p>vous devez rentrer un identifiant plus grand </p>");
                        }
                    }
                    else {
                        $("#resultat").html("<p>vous devez rentrer le même mot de passe </p>");
                    }
                }
                else {
                    $("#resultat").html("<p>vous devez remplir tout les champs</p>");
                }
            });
        })
    }
}