document.addEventListener('DOMContentLoaded', function() {
    const siparisListesi = document.getElementById('garson-siparis-listesi');
    const apiUrl = 'http://localhost:8080/api/orders'; // Backend URL

    // Siparişleri çek ve listele
    function fetchSiparisler() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                siparisListesi.innerHTML = '';

                if (data.length === 0) {
                    siparisListesi.innerHTML = '<p>Henüz sipariş yok.</p>';
                    return;
                }

                data.forEach(order => {
                    const orderCard = document.createElement('div');
                    orderCard.classList.add('siparis-kart');
                    orderCard.innerHTML = `
                        <h4>Masa No: ${order.masaNo}</h4>
                        <p>Ürün: ${order.urunAdi}</p>
                        <p>Adet: ${order.adet}</p>
                       
                        <button class="mutfaga-gonder-button" data-id="${order.id}">Mutfağa Gönder</button>
                        <button class="teslim-button" data-id="${order.id}">Teslim Edildi</button>
                    `;
                    siparisListesi.appendChild(orderCard);
                });

                // "Mutfağa Gönder" butonlarına click event ekle
                const mutfagaButonlari = document.querySelectorAll('.mutfaga-gonder-button');
                mutfagaButonlari.forEach(button => {
                    button.addEventListener('click', function() {
                        const orderId = this.getAttribute('data-id');
                        mutfagaGonder(orderId);
                    });
                });

                // "Teslim Edildi" butonlarına click event ekle
                const teslimButonlari = document.querySelectorAll('.teslim-button');
                teslimButonlari.forEach(button => {
                    button.addEventListener('click', function() {
                        const orderId = this.getAttribute('data-id');
                        teslimEt(orderId);
                    });
                });
            })
            .catch(error => {
                console.error('Siparişler yüklenirken hata oluştu:', error);
            });
    }

    // Siparişi teslim et ( ve sil)
    function teslimEt(orderId) {
        if (confirm("Bu siparişi teslim edildi olarak işaretlemek istiyor musunuz?")) {
            fetch(`${apiUrl}/${orderId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Sipariş silinemedi.');
                }
                alert('Sipariş teslim edildi ve sistemden kaldırıldı.');
                fetchSiparisler(); // Listeyi yenilek için 
            })
            .catch(error => {
                console.error('Sipariş silinemedi:', error);
                alert('Sipariş teslim edilirken hata oluştu.');
            });
        }
    }

    // Siparişi mutfağa gönder
    function mutfagaGonder(orderId) {
        if (confirm("Bu siparişi mutfağa göndermek istiyor musunuz?")) {
            fetch(`${apiUrl}/${orderId}/mutfaga-gonder`, {
                method: 'PUT'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Sipariş mutfağa gönderilemedi.');
                }
                alert('Sipariş mutfağa gönderildi.');
                fetchSiparisler(); // Listeyi yenile
            })
            .catch(error => {
                console.error('Sipariş mutfağa gönderilemedi:', error);
                alert('Mutfağa gönderme sırasında hata oluştu.');
            });
        }
    }

    // İlk yüklemede siparişleri getir
    fetchSiparisler();

    // Siparişleri her 10 saniyede bir yenile
    setInterval(fetchSiparisler, 10000);
});
