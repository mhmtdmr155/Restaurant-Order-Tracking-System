package com.restoran.siparis.service;

import com.restoran.siparis.entity.Urun;
import com.restoran.siparis.repository.UrunRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UrunService {

    private final UrunRepository urunRepository;

    public UrunService(UrunRepository urunRepository) {
        this.urunRepository = urunRepository;
    }

    public List<Urun> getAllUrunler() {
        return urunRepository.findAll();
    }

    public Optional<Urun> getUrunById(Long id) {
        return urunRepository.findById(id);
    }

    public Urun saveUrun(Urun urun) {
        return urunRepository.save(urun);
    }

    public void deleteUrun(Long id) {
        urunRepository.deleteById(id);
    }
}
