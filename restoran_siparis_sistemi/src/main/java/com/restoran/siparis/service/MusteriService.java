package com.restoran.siparis.service;

import com.restoran.siparis.entity.Musteri;
import com.restoran.siparis.repository.MusteriRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MusteriService {

    private final MusteriRepository musteriRepository;

    public MusteriService(MusteriRepository musteriRepository) {
        this.musteriRepository = musteriRepository;
    }

    public List<Musteri> getAllMusteriler() {
        return musteriRepository.findAll();
    }

    public Optional<Musteri> getMusteriById(Long id) {
        return musteriRepository.findById(id);
    }

    public Musteri saveMusteri(Musteri musteri) {
        return musteriRepository.save(musteri);
    }

    public void deleteMusteri(Long id) {
        musteriRepository.deleteById(id);
    }
}
