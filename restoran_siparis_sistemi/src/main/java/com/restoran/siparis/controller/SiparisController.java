package com.restoran.siparis.controller;

import com.restoran.siparis.entity.Siparis;
import com.restoran.siparis.entity.Siparis.SiparisDurumu;
import com.restoran.siparis.service.SiparisService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:8080") // Gerekirse frontend portuna göre değiştirirsin
public class SiparisController {

    private final SiparisService siparisService;

    public SiparisController(SiparisService siparisService) {
        this.siparisService = siparisService;
    }

    // Tüm siparişleri getir
    @GetMapping
    public ResponseEntity<List<Siparis>> getAllOrders() {
        List<Siparis> siparisler = siparisService.getAllSiparisler();
        return ResponseEntity.ok(siparisler);
    }

    // Sadece mutfaktaki (HAZIRLANIYOR durumundaki) siparişleri getir
    @GetMapping("/mutfak")
    public ResponseEntity<List<Siparis>> getMutfakSiparisler() {
        List<Siparis> mutfakSiparisler = siparisService.getSiparislerByDurum(SiparisDurumu.HAZIRLANIYOR);
        return ResponseEntity.ok(mutfakSiparisler);
    }

    // 🚀 Garson için (ALINDI durumundaki) siparişleri getir
    @GetMapping("/garson")
    public ResponseEntity<List<Siparis>> getGarsonSiparisler() {
        List<Siparis> garsonSiparisler = siparisService.getSiparislerByDurum(SiparisDurumu.ALINDI);
        return ResponseEntity.ok(garsonSiparisler);
    }

    // Yeni sipariş oluştur
    @PostMapping
    public ResponseEntity<Siparis> createOrder(@RequestBody Siparis siparis) {
        // Yeni sipariş geldiğinde durumu ALINDI olsun
        siparis.setDurum(SiparisDurumu.ALINDI);
        Siparis savedSiparis = siparisService.saveSiparis(siparis);
        return ResponseEntity.ok(savedSiparis);
    }

    // Siparişi mutfağa gönder (durumu HAZIRLANIYOR yap)
    @PutMapping("/{siparisId}/mutfaga-gonder")
    public ResponseEntity<Siparis> mutfagaGonder(@PathVariable Long siparisId) {
        Siparis updatedSiparis = siparisService.mutfagaGonder(siparisId);
        if (updatedSiparis != null) {
            return ResponseEntity.ok(updatedSiparis);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Sipariş sil
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        siparisService.deleteSiparis(id);
        return ResponseEntity.noContent().build();
    }
}
