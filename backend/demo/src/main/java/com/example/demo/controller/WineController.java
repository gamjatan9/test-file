package com.example.demo.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ResponseDTO;
import com.example.demo.dto.WineDTO;
import com.example.demo.model.WineEntity;
import com.example.demo.service.WineService;

@RestController
@RequestMapping("wine")
public class WineController {
	
	@Autowired
	private WineService service;
	
	// (1) ��ǰ ���� �߰� ��� (POST �޼ҵ� �̿�)
	@PostMapping
	public ResponseEntity<?> createWine(
			@AuthenticationPrincipal String userId,
			@RequestBody WineDTO dto){
		try {
			WineEntity entity = WineDTO.toEntity(dto);
			
			entity.setId(null); // id�� null�� �ʱ�ȭ
			entity.setUserId(userId); // �⺻ �����
			
			List<WineEntity> entities = service.create(entity); //WineEntity ����
			
			List<WineDTO> dtos = entities.stream().map(WineDTO::new).collect(Collectors.toList());
			
			ResponseDTO<WineDTO> response = ResponseDTO.<WineDTO>builder().data(dtos).build();  //ResponseDTO �ʱ�ȭ
			
			return ResponseEntity.ok().body(response);  //ResponseDTO ����		
		
		} catch(Exception e) {
			String error = e.getMessage();
			ResponseDTO<WineDTO> response = ResponseDTO.<WineDTO>builder().error(error).build();
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	// (2) ��ǰ ���� �˻� ��� (GET �޼ҵ� �̿�)
	@GetMapping
	public ResponseEntity<?> retrieveWineList(@AuthenticationPrincipal String userId) {
		
		List<WineEntity> entities = service.retrieve(userId);
		
		List<WineDTO> dtos = entities.stream().map((e)->(new WineDTO(e))).collect(Collectors.toList());
		
		ResponseDTO<WineDTO> response = ResponseDTO.<WineDTO>builder().data(dtos).build();
		
		return ResponseEntity.ok().body(response);
	}
	
	// (3) ��ǰ ���� ���� ��� (PUT �޼ҵ� �̿�)
	@PutMapping
	public ResponseEntity<?> updateWine(@AuthenticationPrincipal String userId, @RequestBody WineDTO dto){

		WineEntity entity = WineDTO.toEntity(dto);
		
		entity.setUserId(userId);
		
		List<WineEntity> entities = service.update(entity);
		
		List<WineDTO> dtos = entities.stream().map((e)->(new WineDTO(e))).collect(Collectors.toList());
		
		ResponseDTO<WineDTO> response = ResponseDTO.<WineDTO>builder().data(dtos).build();
		
		return ResponseEntity.ok().body(response);
	}
	
	// (4) ��ǰ ���� ���� ���(Delete �޼ҵ� �̿�)
	@DeleteMapping
	public ResponseEntity<?> deleteWine(@AuthenticationPrincipal String userId, @RequestBody WineDTO dto){
		try {
			WineEntity entity = WineDTO.toEntity(dto);
			
			entity.setUserId(userId);
			
			List<WineEntity> entities = service.delete(entity);
			
			List<WineDTO> dtos = entities.stream().map((e)->(new WineDTO(e))).collect(Collectors.toList());
			
			ResponseDTO<WineDTO> response = ResponseDTO.<WineDTO>builder().data(dtos).build();
			
			return ResponseEntity.ok().body(response);
		} catch(Exception e) {
			String error = e.getMessage();
			ResponseDTO<WineDTO> response = ResponseDTO.<WineDTO>builder().error(error).build();
			return ResponseEntity.badRequest().body(response);
		}
		
	}
}
