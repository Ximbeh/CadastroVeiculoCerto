package com.example.cadastroveiculos.repository;


import com.example.cadastroveiculos.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;


public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
}
