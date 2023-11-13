package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="Wine")

public class WineEntity {
	@Id
	@GeneratedValue(generator="system-uuid") //id 자동으로 생성
	@GenericGenerator(name="system-uuid", strategy="uuid")
	private String id; // 이 오브젝트의 아이디
	private String userId; // 이 오브젝트를 생성한 사용자의 아이디
	private String title; // Wine 타이틀
	private String type; // Wine 종류
	private String co; // Wine 원산지(country of origin)

}
