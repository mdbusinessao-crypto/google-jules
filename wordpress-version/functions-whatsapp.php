<?php
/**
 * Custom WhatsApp Integration for WooCommerce - Angola Shop
 * Add this to your child theme's functions.php or a custom plugin.
 */

// 1. Add "Buy on WhatsApp" button to Single Product Page
add_action('woocommerce_after_add_to_cart_button', 'angola_shop_whatsapp_product_button');
function angola_shop_whatsapp_product_button() {
    global $product;
    $phone = '244921225720';
    $message = rawurlencode("Olá! Tenho interesse no produto: " . $product->get_name() . " (Preço: " . strip_tags($product->get_price_html()) . "). Pode me ajudar?");
    $url = "https://wa.me/{$phone}?text={$message}";

    echo '<a href="' . $url . '" class="button whatsapp-buy-button" style="background-color: #25d366; color: white; margin-top: 10px; display: block; text-align: center; font-weight: bold; padding: 10px 20px; border-radius: 5px; text-decoration: none;">
        <i class="fab fa-whatsapp"></i> Comprar direto no WhatsApp
    </a>';
}

// 2. Add "Finalize via WhatsApp" on Cart Page
add_action('woocommerce_proceed_to_checkout', 'angola_shop_whatsapp_cart_button', 20);
function angola_shop_whatsapp_cart_button() {
    echo '<a href="#" id="finalize-whatsapp" class="button alt" style="background-color: #128C7E; color: white; margin-top: 10px; width: 100%; display: block; text-align: center;">
        Finalizar Pedido no WhatsApp
    </a>';
    ?>
    <script>
    jQuery(document).ready(function($) {
        $('#finalize-whatsapp').on('click', function(e) {
            e.preventDefault();
            // In a real scenario, this would open a modal form first
            // Here we show how to gather cart data via JS or just redirect if no form needed
            window.location.href = '<?php echo esc_url( wc_get_checkout_url() ); ?>?checkout_type=whatsapp';
        });
    });
    </script>
    <?php
}

// 3. Custom message generator after order creation
add_action('woocommerce_thankyou', 'angola_shop_redirect_to_whatsapp');
function angola_shop_redirect_to_whatsapp($order_id) {
    // Only redirect if the customer chose to checkout via WhatsApp or always (recommended for this store)
    $is_whatsapp_flow = isset($_GET['checkout_type']) && $_GET['checkout_type'] === 'whatsapp';

    $order = wc_get_order($order_id);
    $phone = '244921225720';

    $items_text = "Pedido #" . $order_id . "\n\n";
    foreach ($order->get_items() as $item_id => $item) {
        $product = $item->get_product();
        $items_text .= "• " . $item->get_name() . " x" . $item->get_quantity() . " - " . strip_tags(wc_price($item->get_total())) . "\n";
    }

    $items_text .= "\n*Total:* " . strip_tags($order->get_formatted_order_total());
    $items_text .= "\n\n*Dados do Cliente:*";
    $items_text .= "\nNome: " . $order->get_billing_first_name();
    $items_text .= "\nWhatsApp: " . $order->get_billing_phone();
    if ($order->get_billing_address_1()) {
        $items_text .= "\nEndereço: " . $order->get_billing_address_1();
    }

    $message = rawurlencode($items_text);
    $url = "https://wa.me/{$phone}?text={$message}";

    // Automatically redirect to WhatsApp on the thank you page
    ?>
    <div class="whatsapp-confirmation-box" style="text-align: center; padding: 20px; background: #e9f7ef; border-radius: 10px; margin-bottom: 20px; border: 2px solid #25d366;">
        <h3>Quase lá!</h3>
        <p>Clique no botão abaixo para enviar os detalhes do seu pedido para o nosso WhatsApp e confirmar a sua compra.</p>
        <a href="<?php echo $url; ?>" target="_blank" class="button" style="background-color: #25d366; color: white; padding: 15px 30px; font-size: 18px;">
            Enviar Pedido para o WhatsApp
        </a>
    </div>
    <script>
        // Optional: auto redirect after 3 seconds
        // setTimeout(function(){ window.location.href = "<?php echo $url; ?>"; }, 3000);
    </script>
    <?php
}

// 4. Simplify Checkout Fields (Requirement #5)
add_filter('woocommerce_checkout_fields', 'angola_shop_simplify_checkout_fields');
function angola_shop_simplify_checkout_fields($fields) {
    // We only want: Full Name (First/Last), WhatsApp (Phone), and Address
    // Remove unnecessary billing fields
    unset($fields['billing']['billing_last_name']);
    unset($fields['billing']['billing_company']);
    unset($fields['billing']['billing_email']);
    unset($fields['billing']['billing_country']);
    unset($fields['billing']['billing_state']);
    unset($fields['billing']['billing_city']);
    unset($fields['billing']['billing_postcode']);
    unset($fields['billing']['billing_address_2']);

    // Adjust labels for the Angolan context
    $fields['billing']['billing_first_name']['label'] = 'Nome Completo';
    $fields['billing']['billing_first_name']['placeholder'] = 'Insira o seu nome completo';
    $fields['billing']['billing_first_name']['class'] = array('form-row-wide'); // Full width

    $fields['billing']['billing_phone']['label'] = 'Número de WhatsApp';
    $fields['billing']['billing_phone']['placeholder'] = 'Ex: 921225720';
    $fields['billing']['billing_phone']['class'] = array('form-row-wide');

    $fields['billing']['billing_address_1']['label'] = 'Endereço de Entrega (Opcional)';
    $fields['billing']['billing_address_1']['placeholder'] = 'Bairro, Rua, Casa nº';
    $fields['billing']['billing_address_1']['required'] = false;
    $fields['billing']['billing_address_1']['class'] = array('form-row-wide');

    return $fields;
}
