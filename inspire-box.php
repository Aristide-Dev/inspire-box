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

// Ajouter l'affichage de la citation dans le footer
function inspirebox_display_quote() {
    echo '<div id="inspirebox" class="inspirebox"></div>';
}
add_action('wp_footer', 'inspirebox_display_quote');

// Register REST API endpoint to fetch quotes
function inspiration_quotes_register_api() {
    register_rest_route('inspiration/v1', '/quotes', array(
        'methods' => 'GET',
        'callback' => 'inspiration_quotes_get_quotes',
    ));
}
add_action('rest_api_init', 'inspiration_quotes_register_api');

// Fonction pour récupérer les citations
function inspiration_quotes_get_quotes() {
    $quotes_file = plugin_dir_path(__FILE__) . 'quotes.json'; // Chemin vers le fichier JSON
    if (file_exists($quotes_file)) {
        $quotes = json_decode(file_get_contents($quotes_file), true);
        return new WP_REST_Response($quotes, 200);
    }
    return new WP_Error('no_quotes', 'No quotes found', array('status' => 404));
}
?>
