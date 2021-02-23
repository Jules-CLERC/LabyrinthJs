(function () {
    $(document).ready(function(){
        let isConnected = new IsConnected();
    });
}) ();

class IsConnected {
    constructor() {
        this.addIsConnected();
    }

    addIsConnected() {
        $.ajax({
            url: "php/is_connected.php",
            method: "post"
        }).done(function (data) {
            if (data.success) {
                $('#divButtons').append('<div id="divButtonsDéconnexion"></div>');
                $('#divButtonsDéconnexion').append(
                    $('<input class="mainInput" type="button" value="Déconnexion">')
                        .on('click', function () {
                            $.ajax({
                                url: 'php/logout.php',
                                method: "post"
                            }).done(function() {
                                window.location.href = 'login.html';
                            }).fail(function () {
                                alert("erreur lors de la déconnexion")
                            })
                        })
                );
            }
            else {
                window.location.href = 'login.html';
            }
        }).fail(function() {
            $('body').html('une erreur critique est arrivée, merci ...');
        });
    }
}