jQuery(document).ready(function($) {
    $.get('/wp-json/inspiration/v1/quotes', function(data) {
        if (data && data.length) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const quote = data[randomIndex];
            $('#inspirebox').html(`<p class="quote">${quote}</p>`);
        }
    });
});
