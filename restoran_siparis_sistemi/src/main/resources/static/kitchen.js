document.addEventListener('DOMContentLoaded', function() {
    const siparisListesi = document.getElementById('mutfak-siparisleri');

    // Siparişleri API'den çek
    fetchSiparisler();

    function fetchSiparisler() {
        fetch("http://localhost:8080/api/orders")   
            .then(response => response.json())
            .then(data => {
                renderSiparisler(data);
            })
            .catch(error => {
                console.error("Siparişler alınamadı:", error);
                siparisListesi.innerHTML = "<p>Bir hata oluştu. Siparişler yüklenemedi.</p>";
            });
    }

    function renderSiparisler(siparisler) {
        siparisListesi.innerHTML = '';

        if (siparisler.length === 0) {
            siparisListesi.innerHTML = '<p>Şu anda hiç sipariş bulunmamaktadır.</p>';
            return;
        }

        siparisler.forEach(order => {
            const card = document.createElement('div');
            card.className = 'siparis-karti';

            card.innerHTML = `
                <h3>Masa No: ${order.masaNo}</h3>
                <p>Ürün: ${order.urunAdi}</p>
                <p>Adet: ${order.adet}</p>
                
            `;

            siparisListesi.appendChild(card);
        });
    }
});
