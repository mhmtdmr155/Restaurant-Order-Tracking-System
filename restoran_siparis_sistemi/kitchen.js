document.addEventListener('DOMContentLoaded', function() {
    const siparisListesi = document.getElementById('mutfak-siparisleri');
    const filtreBtn = document.querySelectorAll('.filtre-btn');
    
    // Filtre butonları
    filtreBtn.forEach(btn => {
        btn.addEventListener('click', function() {
            filtreBtn.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderKitchenOrders(this.dataset.durum);
        });
    });
    
    // Mutfak siparişlerini render etme
    function renderKitchenOrders(filter = 'tumu') {
        const orders = getFilteredOrders(filter)
            .filter(order => order.durum !== SIPARIS_DURUMLARI.TESLIM_EDILDI);
        
        siparisListesi.innerHTML = '';
        
        if (orders.length === 0) {
            siparisListesi.innerHTML = '<p>Bu filtreye uygun sipariş bulunamadı.</p>';
            return;
        }
        
        orders.forEach(order => {
            const actions = [];
            
            if (order.durum === SIPARIS_DURUMLARI.BEKLIYOR) {
                actions.push({
                    text: 'Hazırlanmaya Başla',
                    status: SIPARIS_DURUMLARI.HAZIRLANIYOR
                });
            } else if (order.durum === SIPARIS_DURUMLARI.HAZIRLANIYOR) {
                actions.push({
                    text: 'Hazırlandı',
                    status: SIPARIS_DURUMLARI.HAZIR
                });
            }
            
            siparisListesi.appendChild(
                createOrderCard(order, true, actions)
            );
        });
    }
    
    renderKitchenOrders();
});