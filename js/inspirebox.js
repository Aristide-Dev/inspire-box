jQuery(document).ready(function($) {
    const quoteKey = 'inspiration_quote';
    const lastSeenKey = 'inspiration_last_seen';

    // Fonction pour vérifier si la citation a déjà été affichée aujourd'hui
    function hasSeenQuoteToday() {
        const lastSeen = localStorage.getItem(lastSeenKey);
        const today = new Date().toISOString().split('T')[0]; // Obtenir la date actuelle

        return lastSeen === today;
    }

    // Fonction pour enregistrer la date actuelle
    function setQuoteSeen() {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem(lastSeenKey, today);
    }

    // Vérifiez si la citation a déjà été vue aujourd'hui
    if (!hasSeenQuoteToday()) {
        $.get('/wp-json/inspiration/v1/quotes', function(data) {
            if (data && data.length) {
                const randomIndex = Math.floor(Math.random() * data.length);
                const quote = data[randomIndex];
                $('#inspirebox').hide().fadeIn(1000);
                $('#inspirebox').html(`<p class="quote">${quote}</p>`);
    
                setTimeout(function() {
                    $('#inspirebox').fadeOut(1000);
                }, 5000); // Ferme après 5 secondes

                // Enregistrer que la citation a été vue
                setQuoteSeen();
            }
        });
    }
});
