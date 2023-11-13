package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.WineEntity;
import com.example.demo.persistence.WineRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class WineService {
	
	@Autowired
	private WineRepository repository;
	
	// (1) ��ǰ ���� �߰� ���
	public List<WineEntity> create(final WineEntity entity){
		
		validate(entity);
		
		repository.save(entity);
		
		return repository.findByUserId(entity.getUserId());
	}
	
	// (2) ��ǰ ���� �˻� ���
	public List<WineEntity> retrieve(final String userId) {
		return repository.findByUserId(userId);
	}
	
	// (3) ��ǰ ���� ���� ���
	public List<WineEntity> update(final WineEntity entity){
		validate(entity);
		
		//id �Ӽ��� �̿��Ͽ� ��ǰ�� ã��
		final Optional<WineEntity> original = repository.findById(entity.getId());
		
		original.ifPresent(wine -> {
			wine.setTitle(entity.getTitle());
			wine.setType(entity.getType());
			wine.setCo(entity.getCo());
			repository.save(wine);
		});
		
		return retrieve(entity.getUserId());
	}
	
	// (4) ��ǰ ���� ���� ���
	public List<WineEntity> delete(final WineEntity entity){
		validate(entity);
		
		try {
			repository.delete(entity); //��ƼƼ ����
		} catch(Exception e){
			log.error("error deleting entity", entity.getUserId(), e); 
			throw new RuntimeException("error deleting entity" + entity.getUserId());
		}
		return retrieve(entity.getUserId());
	}
	
	// ��ƼƼ�� ��ȿ���� Ȯ��
	private void validate(final WineEntity entity) {
		if(entity == null) {
			throw new RuntimeException("Entity cannot be null.");			
		}
		if(entity.getUserId() == null) {
			throw new RuntimeException("Unknown user.");
		}
	}
}
