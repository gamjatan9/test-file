package com.example.demo.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.WineEntity;

@Repository
public interface WineRepository extends JpaRepository<WineEntity, String> {
	List<WineEntity> findByUserId(String userId);
} 
