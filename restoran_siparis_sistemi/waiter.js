document.addEventListener('DOMContentLoaded', function() {
    const siparisListesi = document.getElementById('garson-siparisleri');
    
    // Garson siparişlerini render etme
    function renderWaiterOrders() {
        const orders = getFilteredOrders(SIPARIS_DURUMLARI.HAZIR);
        
        siparisListesi.innerHTML = '';
        
        if (orders.length === 0) {
            siparisListesi.innerHTML = '<p>Bekleyen sipariş bulunmamaktadır.</p>';
            return;
        }
        
        orders.forEach(order => {
            siparisListesi.appendChild(
                createOrderCard(order, true, [{
                    text: 'Teslim Edildi',
                    status: SIPARIS_DURUMLARI.TESLIM_EDILDI
                }])
            );
        });
    }
    
    renderWaiterOrders();
    
    // Gerçek zamanlı güncelleme (basit bir simulasyon)
    setInterval(renderWaiterOrders, 5000);
});