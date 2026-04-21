package com.example.demo;

import com.example.demo.model.Produit;
import com.example.demo.model.User;
import com.example.demo.repository.ProduitRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProduitRepository produitRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(ProduitRepository produitRepository,
                           UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.produitRepository = produitRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        creerAdminSiAbsent();
        creerProduitssSiAbsents();
    }

    private void creerAdminSiAbsent() {
        if (userRepository.count() > 0) return;

        User admin = new User();
        admin.setTelephone("0340000000");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setNom("Propriétaire Moratazana");
        userRepository.save(admin);

        System.out.println("========================================");
        System.out.println("Compte admin créé :");
        System.out.println("  Téléphone : 0340000000");
        System.out.println("  Mot de passe : admin123");
        System.out.println("  ⚠️  Changez ce mot de passe en production !");
        System.out.println("========================================");
    }

    private void creerProduitssSiAbsents() {
        if (produitRepository.count() > 0) return;

        String img1 = "https://images.unsplash.com/photo-1673297821205-e0575bbc2ab7?w=400";
        String img2 = "https://images.unsplash.com/photo-1597585079079-e0bc92fdcfa4?w=400";
        String img3 = "https://images.unsplash.com/photo-1760228752136-53e54f12a45e?w=400";
        String img4 = "https://images.unsplash.com/photo-1664137944571-0015896203c6?w=400";

        creer("Peinture Acrylique Blanc 20L", img1, 45, 85000L, 15, "main");
        creer("Peinture Acrylique Bleu 20L",  img2, 28, 87000L, 15, "main");
        creer("Peinture Murale Rouge 15L",     img3, 12, 65000L, 10, "main");
        creer("Peinture Extérieure Vert 25L",  img4,  8, 95000L, 10, "main");
        creer("Peinture Satinée Jaune 10L",    img1, 22, 45000L, 12, "main");
        creer("Peinture Mate Gris 20L",        img2, 18, 82000L, 15, "main");
        creer("Peinture Brillante Noir 15L",   img3,  5, 72000L,  8, "main");
        creer("Peinture Acrylique Beige 20L",  img4,  0, 85000L, 15, "main");

        creer("Peinture Acrylique Blanc 20L", img1, 20, 85000L, 15, "second");
        creer("Peinture Acrylique Bleu 20L",  img2, 10, 87000L, 15, "second");
        creer("Peinture Murale Rouge 15L",     img3,  6, 65000L, 10, "second");
        creer("Peinture Extérieure Vert 25L",  img4, 14, 95000L, 10, "second");
        creer("Peinture Satinée Jaune 10L",    img1,  3, 45000L, 12, "second");
        creer("Peinture Mate Gris 20L",        img2,  9, 82000L, 15, "second");
        creer("Peinture Brillante Noir 15L",   img3,  0, 72000L,  8, "second");
        creer("Peinture Acrylique Beige 20L",  img4, 11, 85000L, 15, "second");
    }

    private void creer(String name, String imageUrl, int stock, long price, int minStock, String shopId) {
        Produit p = new Produit();
        p.setName(name);
        p.setImageUrl(imageUrl);
        p.setCurrentStock(stock);
        p.setPrice(price);
        p.setMinStock(minStock);
        p.setShopId(shopId);
        produitRepository.save(p);
    }
}
