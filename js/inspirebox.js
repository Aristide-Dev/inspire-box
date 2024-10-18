// inspirebox.js
jQuery(document).ready(function($) {
    console.log('inspire box script started');
    // Afficher la fenêtre avec un effet de fade-in
    $('#inspirebox').hide().fadeIn(1000);
    
    // Optionnel : Fermer la fenêtre après quelques secondes
    setTimeout(function() {
        $('#inspirebox').fadeOut(1000);
    }, 5000); // Ferme après 5 secondes
});
