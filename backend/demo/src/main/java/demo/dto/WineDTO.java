package com.example.demo.dto;

import com.example.demo.model.WineEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data

public class WineDTO {
	private String id;
	private String userId;
	private String title;
	private String type;
	private String co;
	
	public WineDTO(final WineEntity entity) {
		this.id = entity.getId();
		this.userId = entity.getUserId();
		this.title = entity.getTitle();
		this.type = entity.getType();
		this.co = entity.getCo();
	}

	public static WineEntity toEntity(final WineDTO dto) {
		return WineEntity.builder()
				.id(dto.getId())
				.userId(dto.getUserId())
				.title(dto.getTitle())
				.type(dto.getType())
				.co(dto.getCo())
				.build();
	}
}
