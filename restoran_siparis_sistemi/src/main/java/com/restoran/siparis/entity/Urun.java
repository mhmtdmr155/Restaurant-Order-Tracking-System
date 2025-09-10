package com.restoran.siparis.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "urun")
public class Urun {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String urunAdi;
    private Double fiyat;

    // Siparişler ile ilişkiyi burada tanımlıyoruz
    @OneToMany(mappedBy = "urun", cascade = CascadeType.ALL)
    private List<Siparis> siparisler;

    public Urun() {}

    // Getter ve Setter'lar
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrunAdi() {
        return urunAdi;
    }

    public void setUrunAdi(String urunAdi) {
        this.urunAdi = urunAdi;
    }

    public Double getFiyat() {
        return fiyat;
    }

    public void setFiyat(Double fiyat) {
        this.fiyat = fiyat;
    }

    public List<Siparis> getSiparisler() {
        return siparisler;
    }

    public void setSiparisler(List<Siparis> siparisler) {
        this.siparisler = siparisler;
    }
}
