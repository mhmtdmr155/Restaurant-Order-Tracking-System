// Sipariş verilerini localStorage'da saklayacağız
// Gerçek bir uygulamada bu bir API'ye bağlanacaktır

// Sipariş durumları
const SIPARIS_DURUMLARI = {
    BEKLIYOR: 'bekliyor',
    HAZIRLANIYOR: 'hazirlaniyor',
    HAZIR: 'hazir',
    TESLIM_EDILDI: 'teslim-edildi'
};

// Sipariş ID üretme
let lastOrderId = localStorage.getItem('lastOrderId') || 0;

function generateOrderId() {
    lastOrderId++;
    localStorage.setItem('lastOrderId', lastOrderId);
    return lastOrderId;
}

// Siparişleri kaydetme
function saveOrders(orders) {
    localStorage.setItem('restaurantOrders', JSON.stringify(orders));
}

// Tüm siparişleri getirme
function getAllOrders() {
    const orders = localStorage.getItem('restaurantOrders');
    return orders ? JSON.parse(orders) : [];
}

// Yeni sipariş ekleme
function addOrder(order) {
    const orders = getAllOrders();
    const newOrder = {
        id: generateOrderId(),
        ...order,
        tarih: new Date().toISOString(),
        durum: SIPARIS_DURUMLARI.BEKLIYOR
    };
    orders.push(newOrder);
    saveOrders(orders);
    return newOrder;
}

// Sipariş durumunu güncelleme
function updateOrderStatus(orderId, newStatus) {
    const orders = getAllOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
        orders[orderIndex].durum = newStatus;
        saveOrders(orders);
        return true;
    }
    
    return false;
}

// Filtrelenmiş siparişleri getirme
function getFilteredOrders(statusFilter) {
    const orders = getAllOrders();
    
    if (statusFilter === 'tumu') {
        return orders;
    }
    
    return orders.filter(order => order.durum === statusFilter);
}

// Sipariş kartı oluşturma
function createOrderCard(order, showActions = false, actions = []) {
    const card = document.createElement('div');
    card.className = 'siparis-karti';
    
    const durumClass = `durum-${order.durum}`;
    const durumText = {
        [SIPARIS_DURUMLARI.BEKLIYOR]: 'Bekliyor',
        [SIPARIS_DURUMLARI.HAZIRLANIYOR]: 'Hazırlanıyor',
        [SIPARIS_DURUMLARI.HAZIR]: 'Hazır',
        [SIPARIS_DURUMLARI.TESLIM_EDILDI]: 'Teslim Edildi'
    }[order.durum];
    
    card.innerHTML = `
        <div class="masa">${order.masa}</div>
        <h3>${order.urun}</h3>
        <p>Adet: ${order.adet}</p>
        <p>Sipariş No: ${order.id}</p>
        <span class="durum ${durumClass}">${durumText}</span>
    `;
    
    if (showActions && actions.length > 0) {
        const actionButtons = document.createElement('div');
        actionButtons.className = 'aksiyon-butonlari';
        
        actions.forEach(action => {
            const button = document.createElement('button');
            button.textContent = action.text;
            button.addEventListener('click', () => {
                if (updateOrderStatus(order.id, action.status)) {
                    window.location.reload(); // Sayfayı yenile
                }
            });
            actionButtons.appendChild(button);
        });
        
        card.appendChild(actionButtons);
    }
    
    return card;
}