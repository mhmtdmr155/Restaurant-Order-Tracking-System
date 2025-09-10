package com.restoran.siparis.repository;

import com.restoran.siparis.entity.Urun;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UrunRepository extends JpaRepository<Urun, Long> {
}
