package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Produit;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    List<Produit> findByShopId(String shopId);
}