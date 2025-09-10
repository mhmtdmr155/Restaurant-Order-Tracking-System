document.addEventListener('DOMContentLoaded', function() {
    const siparisFormu = document.getElementById('siparis-formu');
    const siparisListesi = document.getElementById('siparis-listesi');
    const kategoriSelect = document.getElementById('kategori');
    const urunSelect = document.getElementById('urun');

    // Ürün verileri
    const urunler = {
        yemek: [
            { id: 1, ad: "Köfte", fiyat: 85 },
            { id: 2, ad: "Tavuk Şiş", fiyat: 75 },
            { id: 3, ad: "Lahmacun", fiyat: 30 },
            { id: 4, ad: "Pide", fiyat: 60 },
            { id: 5, ad: "Salata", fiyat: 45 }
        ],
        icecek: [
            { id: 6, ad: "Ayran", fiyat: 12 },
            { id: 7, ad: "Kola", fiyat: 15 },
            { id: 8, ad: "Şalgam", fiyat: 14 },
            { id: 9, ad: "Ice tea", fiyat: 16 },
            { id: 10, ad: "Sade soda", fiyat: 10 }
        ],
        tatli: [
            { id: 11, ad: "Künefe", fiyat: 50 },
            { id: 12, ad: "Antep baklava", fiyat: 60 },
            { id: 13, ad: "San sebastian", fiyat: 55 },
            { id: 14, ad: "Sütlaç", fiyat: 35 },
            { id: 15, ad: "Kazandibi", fiyat: 40 }
        ]
    };

    // Kategori değiştiğinde ürünleri yükle
    kategoriSelect.addEventListener('change', function() {
        const seciliKategori = this.value;
        urunSelect.innerHTML = '<option value="">Seçiniz</option>';
        urunSelect.disabled = !seciliKategori;

        if (seciliKategori) {
            urunler[seciliKategori].forEach(urun => {
                const option = document.createElement('option');
                option.value = urun.id;
                option.textContent = `${urun.ad} (${urun.fiyat}₺)`;
                urunSelect.appendChild(option);
            });
        }
    });

    // Form gönderimi
    siparisFormu.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const urunId = parseInt(urunSelect.value);
        const seciliKategori = kategoriSelect.value;
        const adet = parseInt(document.getElementById('adet').value);
        const masa = parseInt(document.getElementById('masa').value);
        
        if (!urunId || isNaN(adet) || isNaN(masa)) {
            alert('Lütfen tüm alanları doldurun!');
            return;
        }
        
        // Ürün bilgilerini bul
        const seciliUrun = urunler[seciliKategori].find(u => u.id === urunId);
        const urunAdi = seciliUrun.ad;
        const urunFiyat = seciliUrun.fiyat;
        const toplamFiyat = urunFiyat * adet;
        
        const newOrder = addOrder({ 
            urun: `${urunAdi} (${adet}x ${urunFiyat}₺)`, 
            adet: adet, 
            masa: masa,
            fiyat: toplamFiyat
        });
        
        renderCustomerOrders();
        
        // Formu temizle
        siparisFormu.reset();
        document.getElementById('adet').value = 1;
        urunSelect.innerHTML = '<option value="">Önce kategori seçin</option>';
        urunSelect.disabled = true;
        
        alert(`Siparişiniz alındı!\nÜrün: ${urunAdi}\nAdet: ${adet}\nToplam: ${toplamFiyat}₺\nSipariş No: ${newOrder.id}`);
    });
    
    // Müşteri siparişlerini render etme
    function renderCustomerOrders() {
        const orders = getAllOrders().filter(order => order.masa === parseInt(localStorage.getItem('currentTable')));
        siparisListesi.innerHTML = '';
        
        if (orders.length === 0) {
            siparisListesi.innerHTML = '<p>Henüz siparişiniz bulunmamaktadır.</p>';
            return;
        }
        
        orders.forEach(order => {
            siparisListesi.appendChild(createOrderCard(order));
        });
    }
    
    // Masa numarasını belirleme
    if (!localStorage.getItem('currentTable')) {
        const masa = prompt('Lütfen masa numaranızı girin:');
        if (masa && !isNaN(masa)) {
            localStorage.setItem('currentTable', masa);
        } else {
            localStorage.setItem('currentTable', '1');
        }
    }
    
    renderCustomerOrders();
});