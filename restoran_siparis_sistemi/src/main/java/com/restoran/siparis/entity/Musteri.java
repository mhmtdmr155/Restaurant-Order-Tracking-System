package com.restoran.siparis.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "musteri")
public class Musteri {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ad;
    private String soyad;
    private String telefon;

    @OneToMany(mappedBy = "musteri", cascade = CascadeType.ALL)
    private List<Siparis> siparisler;

    public Musteri() {}

    // Getter ve Setter'lar
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAd() {
        return ad;
    }

    public void setAd(String ad) {
        this.ad = ad;
    }

    public String getSoyad() {
        return soyad;
    }

    public void setSoyad(String soyad) {
        this.soyad = soyad;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public List<Siparis> getSiparisler() {
        return siparisler;
    }

    public void setSiparisler(List<Siparis> siparisler) {
        this.siparisler = siparisler;
    }
}
