package com.example.demo.controller;

import com.example.demo.dto.SaisieSoirDTO;
import com.example.demo.model.Produit;
import com.example.demo.repository.ProduitRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "http://localhost:5173")
public class ProduitController {

    private final ProduitRepository repository;

    public ProduitController(ProduitRepository repository) {
        this.repository = repository;
    }

    // GET tous les produits d'une boutique
    @GetMapping
    public List<Produit> getAll(@RequestParam(required = false) String shopId) {
        if (shopId != null) {
            return repository.findByShopId(shopId);
        }
        return repository.findAll();
    }

    // GET un produit par ID
    @SuppressWarnings("null")
    @GetMapping("/{id}")
    public ResponseEntity<Produit> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST créer un produit
    @SuppressWarnings("null")
    @PostMapping
    public Produit create(@RequestBody Produit produit) {
        return repository.save(produit);
    }

    // PUT mise à jour complète
    @SuppressWarnings("null")
    @PutMapping("/{id}")
    public ResponseEntity<Produit> update(@PathVariable Long id, @RequestBody Produit produit) {
        return repository.findById(id).map(existing -> {
            existing.setName(produit.getName());
            existing.setCurrentStock(produit.getCurrentStock());
            existing.setPrice(produit.getPrice());
            existing.setMinStock(produit.getMinStock());
            existing.setImageUrl(produit.getImageUrl());
            existing.setShopId(produit.getShopId());
            return ResponseEntity.ok(repository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // PATCH saisie du soir - met à jour stock
    @SuppressWarnings("null")
    @PatchMapping("/{id}/saisie-soir")
    public ResponseEntity<Produit> saisieSoir(@PathVariable Long id, @RequestBody SaisieSoirDTO dto) {
        return repository.findById(id).map(produit -> {
            int soldToday = dto.getSoldToday() != null ? dto.getSoldToday() : 0;
            int newArrival = dto.getNewArrival() != null ? dto.getNewArrival() : 0;
            int newStock = produit.getCurrentStock() - soldToday + newArrival;
            produit.setCurrentStock(Math.max(0, newStock));
            return ResponseEntity.ok(repository.save(produit));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE supprimer un produit
    @SuppressWarnings("null")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}