jQuery(document).ready(function($) {
    const lastSeenKey = 'inspiration_last_seen';
    $("#halloween-box").hide();
    $("#noel-box").hide();
    $("#inspirebox").hide();

    // Fonction pour vérifier si la citation a déjà été affichée aujourd'hui
    function hasSeenQuoteToday(theme) {
        const lastSeen = localStorage.getItem(theme + lastSeenKey);
        const today = new Date().toISOString().split('T')[0]; // Obtenir la date actuelle

        return lastSeen === today;
    }

    // Fonction pour enregistrer la date actuelle
    function setQuoteSeen(theme) {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem(theme + lastSeenKey, today);
    }

    // Fonction pour afficher une citation dans une box donnée
    function displayQuote(theme, boxId, hatImage) {
        $.get('/wp-json/inspiration/v1/quotes', function(data) {
            if (data && data.length) {
                const randomIndex = Math.floor(Math.random() * data.length);
                const quote = data[randomIndex];

                $(boxId).hide().fadeIn(1000);
                $(boxId).html(`<p class="quote">${quote}</p>`);
                
                // Ajouter un chapeau
                $(boxId).append(`<img src="${hatImage}" class="hat" alt="${theme} hat">`);

                setTimeout(function() {
                    $(boxId).fadeOut(1000, function() {
                        $(this).find('.hat').remove(); // Supprimer le chapeau lors de la disparition
                    });
                }, 10000); // Ferme après 10 secondes

                // Enregistrer que la citation a été vue
                setQuoteSeen(theme);
            }
        });
    }


    const files_uri = InspireBox.pluginUrl;

    // if (!hasSeenQuoteToday('noel')) {
    //     displayQuote('noel', '#noel-box', files_uri + 'images/noel_hat.png');
    // }
    // if (!hasSeenQuoteToday('halloween')) {
    //     displayQuote('halloween', '#halloween-box', files_uri + 'images/halloween_hat.png');
    // }

    // Vérifiez si la citation de Noël a déjà été vue aujourd'hui
    if (!hasSeenQuoteToday('noel')) {
        displayQuote('noel', '#noel-box', files_uri + 'images/noel_hat.png');
    }else{
        // Vérifiez si la citation d'Halloween a déjà été vue aujourd'hui
        if (!hasSeenQuoteToday('halloween')) {
            displayQuote('halloween', '#halloween-box', files_uri + 'images/halloween_hat.png');
        }
    }
});
