package com.restoran.siparis.controller;

import com.restoran.siparis.entity.Musteri;
import com.restoran.siparis.service.MusteriService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/musteriler")
public class MusteriController {

    private final MusteriService musteriService;

    public MusteriController(MusteriService musteriService) {
        this.musteriService = musteriService;
    }

    @GetMapping
    public List<Musteri> getAllMusteriler() {
        return musteriService.getAllMusteriler();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Musteri> getMusteriById(@PathVariable Long id) {
        return musteriService.getMusteriById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Musteri createMusteri(@RequestBody Musteri musteri) {
        return musteriService.saveMusteri(musteri);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Musteri> updateMusteri(@PathVariable Long id, @RequestBody Musteri musteri) {
        return musteriService.getMusteriById(id)
                .map(existingMusteri -> {
                    musteri.setId(id);
                    return ResponseEntity.ok(musteriService.saveMusteri(musteri));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMusteri(@PathVariable Long id) {
        musteriService.deleteMusteri(id);
        return ResponseEntity.noContent().build();
    }
}
