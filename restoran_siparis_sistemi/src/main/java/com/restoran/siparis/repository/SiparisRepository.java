package com.restoran.siparis.repository;

import com.restoran.siparis.entity.Siparis;
import com.restoran.siparis.entity.Siparis.SiparisDurumu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SiparisRepository extends JpaRepository<Siparis, Long> {

    // Belirli bir masa numarasına ait siparişleri getir
    List<Siparis> findByMasaNo(Integer masaNo);

    // Ürün adında belirli bir ifadeyi içeren siparişleri getir
    List<Siparis> findByUrunAdiContaining(String ifade);

    // Belirli bir duruma sahip siparişleri getir
    List<Siparis> findByDurum(SiparisDurumu durum);
}
