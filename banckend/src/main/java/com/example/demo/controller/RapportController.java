package com.example.demo.controller;

import com.example.demo.model.Produit;
import com.example.demo.repository.ProduitRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rapports")
@CrossOrigin(origins = "http://localhost:5173")
public class RapportController {

    private final ProduitRepository produitRepository;

    public RapportController(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    // GET /api/rapports/stats?shopId=main
    // Retourne les statistiques générales de la boutique
    @GetMapping("/stats")
    public Map<String, Object> getStats(@RequestParam(required = false, defaultValue = "main") String shopId) {
        List<Produit> produits = produitRepository.findByShopId(shopId);

        // Calculs sur les produits réels
        int totalStock = produits.stream()
                .mapToInt(p -> p.getCurrentStock() != null ? p.getCurrentStock() : 0)
                .sum();

        long produitsEnStock = produits.stream()
                .filter(p -> p.getCurrentStock() != null && p.getCurrentStock() > 0)
                .count();

        long produitsRupture = produits.stream()
                .filter(p -> p.getCurrentStock() != null && p.getCurrentStock() == 0)
                .count();

        long produitsFaible = produits.stream()
                .filter(p -> p.getCurrentStock() != null && p.getMinStock() != null
                        && p.getCurrentStock() > 0
                        && p.getCurrentStock() <= p.getMinStock())
                .count();

        // Valeur totale du stock (stock * prix)
        long valeurTotale = produits.stream()
                .mapToLong(p -> {
                    int stock = p.getCurrentStock() != null ? p.getCurrentStock() : 0;
                    long prix = p.getPrice() != null ? p.getPrice() : 0;
                    return stock * prix;
                })
                .sum();

        // Prix moyen
        double prixMoyen = produits.stream()
                .mapToLong(p -> p.getPrice() != null ? p.getPrice() : 0)
                .average()
                .orElse(0);

        // Nombre total de produits
        int totalProduits = produits.size();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStock", totalStock);
        stats.put("totalProduits", totalProduits);
        stats.put("produitsEnStock", produitsEnStock);
        stats.put("produitsRupture", produitsRupture);
        stats.put("produitsFaible", produitsFaible);
        stats.put("valeurTotale", valeurTotale);
        stats.put("prixMoyen", (long) prixMoyen);
        stats.put("shopId", shopId);

        return stats;
    }

    // GET /api/rapports/alertes?shopId=main
    // Retourne les produits en rupture ou stock faible
    @GetMapping("/alertes")
    public List<Produit> getAlertes(@RequestParam(required = false, defaultValue = "main") String shopId) {
        return produitRepository.findByShopId(shopId).stream()
                .filter(p -> p.getCurrentStock() != null && p.getMinStock() != null
                        && p.getCurrentStock() <= p.getMinStock())
                .toList();
    }
}
