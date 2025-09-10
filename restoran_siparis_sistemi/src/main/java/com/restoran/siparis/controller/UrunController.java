package com.restoran.siparis.controller;

import com.restoran.siparis.entity.Urun;
import com.restoran.siparis.service.UrunService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/urunler")
public class UrunController {

    private final UrunService urunService;

    public UrunController(UrunService urunService) {
        this.urunService = urunService;
    }

    @GetMapping
    public List<Urun> getAllUrunler() {
        return urunService.getAllUrunler();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Urun> getUrunById(@PathVariable Long id) {
        return urunService.getUrunById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Urun createUrun(@RequestBody Urun urun) {
        return urunService.saveUrun(urun);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Urun> updateUrun(@PathVariable Long id, @RequestBody Urun urun) {
        return urunService.getUrunById(id)
                .map(existingUrun -> {
                    urun.setId(id);
                    return ResponseEntity.ok(urunService.saveUrun(urun));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUrun(@PathVariable Long id) {
        urunService.deleteUrun(id);
        return ResponseEntity.noContent().build();
    }
}
