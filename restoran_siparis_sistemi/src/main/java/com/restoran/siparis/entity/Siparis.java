package com.restoran.siparis.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "siparis")
public class Siparis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer adet;
    private Double toplamTutar;
    private Integer masaNo;
    private String urunAdi;

    @ManyToOne
    @JoinColumn(name = "musteri_id")
    private Musteri musteri;

    @ManyToOne
    @JoinColumn(name = "urun_id")
    private Urun urun;

    @Enumerated(EnumType.STRING)
    private SiparisDurumu durum;

    public Siparis() {
        // Varsayılan sipariş durumu 'ALINDI'
        this.durum = SiparisDurumu.ALINDI;
    }

    // Getter ve Setter'lar
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAdet() {
        return adet;
    }

    public void setAdet(Integer adet) {
        this.adet = adet;
    }

    public Double getToplamTutar() {
        return toplamTutar;
    }

    public void setToplamTutar(Double toplamTutar) {
        this.toplamTutar = toplamTutar;
    }

    public Integer getMasaNo() {
        return masaNo;
    }

    public void setMasaNo(Integer masaNo) {
        this.masaNo = masaNo;
    }

    public String getUrunAdi() {
        return urunAdi;
    }

    public void setUrunAdi(String urunAdi) {
        this.urunAdi = urunAdi;
    }

    public Musteri getMusteri() {
        return musteri;
    }

    public void setMusteri(Musteri musteri) {
        this.musteri = musteri;
    }

    public Urun getUrun() {
        return urun;
    }

    public void setUrun(Urun urun) {
        this.urun = urun;
    }

    public SiparisDurumu getDurum() {
        return durum;
    }

    public void setDurum(SiparisDurumu durum) {
        this.durum = durum;
    }

    // Eğer durum String olarak set edilmek isteniyorsa, güvenli çevirim yapılır
    public void setDurum(String durumStr) {
        try {
            this.durum = SiparisDurumu.valueOf(durumStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Geçersiz sipariş durumu: " + durumStr);
        }
    }

    // Siparişi mutfağa gönder
    public void mutfagaGonder() {
        this.durum = SiparisDurumu.HAZIRLANIYOR;
    }

    // Siparişi hazırla
    public void siparisHazir() {
        this.durum = SiparisDurumu.HAZIR;
    }

    // Siparişi gönderildi olarak işaretle
    public void siparisGonderildi() {
        this.durum = SiparisDurumu.GONDERILDI;
    }

    // Sipariş Durumu Enum'u
    public enum SiparisDurumu {
        ALINDI, HAZIRLANIYOR, HAZIR, GONDERILDI
    }
}
