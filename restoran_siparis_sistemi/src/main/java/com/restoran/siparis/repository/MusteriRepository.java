package com.restoran.siparis.repository;

import com.restoran.siparis.entity.Musteri;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MusteriRepository extends JpaRepository<Musteri, Long> {
}
