<?php
/**
 * Plugin Name: InspireBox
 * Plugin URI: https://aristech-dev.com/
 * Description: Un plugin pour afficher des citations inspirantes dans une petite fenêtre pour les visiteurs du site.
 * Version: 1.2.0
 * Author: Aristide Gnimassou
 * Author URI: https://aristech-dev.com/
 * License: MIT
 */

// Sécuriser l'accès direct au fichier
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

// Enqueue le JavaScript et le CSS
function inspirebox_enqueue_scripts() {
    wp_enqueue_style( 'inspirebox-style', plugin_dir_url( __FILE__ ) . 'css/inspirebox.css' );
    wp_enqueue_script( 'inspirebox-script', plugin_dir_url( __FILE__ ) . 'js/inspirebox.js', array('jquery'), null, true );
}
add_action( 'wp_enqueue_scripts', 'inspirebox_enqueue_scripts' );

// Shortcode to display the inspiration quote
function inspiration_quotes_display() {
    ob_start(); ?>
    <div id="inspiration-quote" class="inspiration-quote"></div>
    <?php return ob_get_clean();
}
add_shortcode('inspiration_quote', 'inspiration_quotes_display');

// Fonction pour afficher la fenêtre
function inspirebox_display_quote_v1() {
    $quotes = array(
        "La vie est ce que vous en faites.",
        "Chaque jour est une nouvelle opportunité.",
        "Ne laissez pas le bruit des opinions des autres étouffer votre voix intérieure.",
        "Soyez le changement que vous souhaitez voir dans le monde.",
        "Rêvez grand et osez échouer."
    );
    $random_quote = $quotes[array_rand($quotes)];
    echo '<div id="inspirebox" class="inspirebox">'.$random_quote.'</div>';
}
add_action( 'wp_footer', 'inspirebox_display_quote' );
?>
