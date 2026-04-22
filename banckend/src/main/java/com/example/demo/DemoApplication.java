package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl != null && databaseUrl.startsWith("postgresql://")) {
            System.setProperty("spring.datasource.url",
                databaseUrl.replace("postgresql://", "jdbc:postgresql://"));
        }
        SpringApplication.run(DemoApplication.class, args);
    }
}
