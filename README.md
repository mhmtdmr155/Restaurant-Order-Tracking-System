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
```

2. **Backend için Maven bağımlılıklarını yükleyin / Install Maven dependencies**
```bash
cd restaurant-order-tracking-system
mvn clean install
```

3. **MySQL veritabanını oluşturun / Create MySQL database**
 -Database adı: restoran_vt

 -SQL dosyasındaki tabloları ve başlangıç verilerini çalıştırın.

4. **application.properties dosyasını güncelleyin / Configure DB connection**
 ```bash
spring.datasource.url=jdbc:mysql://localhost:3306/restoran_vt
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```
5. **Backend’i çalıştırın / Run Spring Boot application**
 ```bash
mvn spring-boot:run
```
6. **Frontend’i açın / Open frontend**
-index.html, garson.html, mutfak.html dosyalarını tarayıcıda açabilirsiniz.
-Backend API’leri ile tam entegre çalışacaktır.


## Kullanım / Usage

-Müşteri panelinden menüyü görebilir ve sipariş verebilir.

-Garson panelinden masaları ve siparişleri yönetebilir.

-Mutfak panelinden siparişlerin hazırlık durumunu güncelleyebilir.

-Ödeme ve sipariş geçmişi yönetimi backend üzerinden takip edilir.
