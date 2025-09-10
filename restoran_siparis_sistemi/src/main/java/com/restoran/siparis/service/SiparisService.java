package com.restoran.siparis.service;

import com.restoran.siparis.entity.Siparis;
import com.restoran.siparis.entity.Siparis.SiparisDurumu;
import com.restoran.siparis.repository.SiparisRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SiparisService {

    private final SiparisRepository siparisRepository;

    public SiparisService(SiparisRepository siparisRepository) {
        this.siparisRepository = siparisRepository;
    }

    // Tüm siparişleri al
    public List<Siparis> getAllSiparisler() {
        return siparisRepository.findAll();
    }

    // Sipariş ID'sine göre siparişi al
    public Optional<Siparis> getSiparisById(Long id) {
        return siparisRepository.findById(id);
    }

    // Yeni siparişi kaydet
    public Siparis saveSiparis(Siparis siparis) {
        return siparisRepository.save(siparis);
    }

    // Siparişi sil
    public void deleteSiparis(Long id) {
        siparisRepository.deleteById(id);
    }

    // Siparişi mutfağa gönder (durum değiştir)
    public Siparis mutfagaGonder(Long siparisId) {
        Siparis siparis = siparisRepository.findById(siparisId)
                .orElseThrow(() -> new RuntimeException("Sipariş bulunamadı"));

        siparis.setDurum(SiparisDurumu.HAZIRLANIYOR); // Siparişin durumunu 'HAZIRLANIYOR' yap
        return siparisRepository.save(siparis);
    }

    // Belirli bir duruma sahip siparişleri getir (örneğin HAZIRLANIYOR)
    public List<Siparis> getSiparislerByDurum(SiparisDurumu durum) {
        return siparisRepository.findByDurum(durum);
    }
}
