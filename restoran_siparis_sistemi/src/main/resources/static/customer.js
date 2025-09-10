document.addEventListener('DOMContentLoaded', function() {
    const siparisFormu = document.getElementById('siparis-formu');
    const siparisListesi = document.getElementById('siparis-listesi');
    const kategoriSelect = document.getElementById('kategori');
    const urunSelect = document.getElementById('urun');

    const apiUrl = 'http://localhost:8080/api/orders'; // Backend API URL

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

        if (seciliKategori && urunler[seciliKategori]) {
            urunler[seciliKategori].forEach(urun => {
                const option = document.createElement('option');
                option.value = urun.id;
                option.textContent = `${urun.ad} (${urun.fiyat}₺)`;
                urunSelect.appendChild(option);
            });
        }
    });

    // Form gönderimi (Siparişi backend'e POST ile gönder)
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

        const seciliUrun = urunler[seciliKategori]?.find(u => u.id === urunId);
        if (!seciliUrun) {
            alert('Seçilen ürün bulunamadı.');
            return;
        }

        const yeniSiparis = {
            masaNo: masa,
            urunAdi: seciliUrun.ad,
            adet: adet,
            toplamFiyat: seciliUrun.fiyat * adet
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(yeniSiparis)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Sipariş gönderilemedi.');
            }
            return response.text(); // BURASI ÖNEMLİ: .json() DEĞİL, .text()
        })
        .then(data => {
            console.log('Sunucu cevabı:', data);
            alert(`Sipariş başarıyla gönderildi!\nÜrün: ${yeniSiparis.urunAdi}\nAdet: ${yeniSiparis.adet}\nToplam: ${yeniSiparis.toplamFiyat}₺`);
            siparisFormu.reset();
            urunSelect.innerHTML = '<option value="">Önce kategori seçin</option>';
            urunSelect.disabled = true;
            document.getElementById('adet').value = 1;
            renderCustomerOrders(); // Sipariş listesini yenile
        })
        .catch(error => {
            console.error('Hata:', error);
            alert('Sipariş gönderilemedi.');
        });
    });

    // Sipariş listesini render et
    function renderCustomerOrders() {
        const currentTable = parseInt(localStorage.getItem('currentTable')) || 1;
        siparisListesi.innerHTML = '';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Siparişler alınamadı.');
                }
                return response.json();
            })
            .then(data => {
                const tableOrders = data.filter(order => order.masaNo === currentTable);

                if (tableOrders.length === 0) {
                    siparisListesi.innerHTML = '<p>Henüz siparişiniz bulunmamaktadır.</p>';
                    return;
                }

                tableOrders.forEach(order => {
                    const orderCard = document.createElement('div');
                    orderCard.classList.add('siparis-kart');
                    orderCard.innerHTML = `
                        <h4>${order.urunAdi}</h4>
                        <p>Adet: ${order.adet}</p>
                        <p>Toplam: ${order.toplamFiyat}₺</p>
                    `;
                    siparisListesi.appendChild(orderCard);
                });
            })
            .catch(error => {
                console.error('Siparişler yüklenemedi:', error);
            });
    }

    // Masa numarasını belirleme (ilk girişte)
    if (!localStorage.getItem('currentTable')) {
        let masa = prompt('Lütfen masa numaranızı girin:');
        masa = parseInt(masa);
        if (masa && !isNaN(masa)) {
            localStorage.setItem('currentTable', masa);
        } else {
            localStorage.setItem('currentTable', '1');
        }
    }

    renderCustomerOrders();
});
