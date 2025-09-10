# Restaurant Order Tracking System
# Restoran Sipariş Takip Sistemi

Full-featured restaurant order tracking system developed with **Java Spring Boot** backend, **MySQL** database, and **HTML/CSS/JavaScript** frontend. The system is designed to manage orders efficiently, track order statuses, and streamline restaurant operations for customers, waiters, and kitchen staff.

---

## Özellikler / Features

- **Kullanıcı Rolleri / User Roles**:
  - **Müşteri / Customer**: Menü görüntüleme, sipariş oluşturma ve sipariş durumunu takip etme.
  - **Garson / Waiter**: Masaları yönetme, siparişleri onaylama ve teslim etme.
  - **Mutfak / Kitchen**: Siparişleri hazırlama ve hazır siparişleri yönetme.
  
- **Sipariş Yönetimi / Order Management**:
  - Menü kategorilerine göre ürünler
  - Sipariş oluşturma, detayları ve not ekleme
  - Sipariş durum takibi: Bekliyor, Hazırlanıyor, Hazır, Teslim Edildi, İptal Edildi
  - Sipariş geçmişi kaydı
  
- **Masa Yönetimi / Table Management**:
  - Masaların durumu: Boş, Dolu, Rezerve
  - Masa kapasite ve konum bilgileri
  
- **Ödeme / Payment**:
  - Nakit, kredi kartı ve diğer ödeme türleri
  - Ödeme tutarı ve indirim bilgisi
  - Sipariş ile entegre ödeme kaydı
  
- **RESTful API**:
  - Backend ve frontend tamamen RESTful API üzerinden iletişim kurar
  - JSON formatında veri alışverişi

---

## Teknolojiler / Technologies

- **Backend**: Java, Spring Boot, Spring Data JPA, RESTful APIs  
- **Database**: MySQL  
- **Frontend**: HTML, CSS, JavaScript  
- **Diğer**: Maven, Lombok  

---

## Kurulum / Installation

1. **Projeyi klonlayın / Clone the repository**  
```bash
git clone https://github.com/kullaniciadi/restaurant-order-tracking-system.git
