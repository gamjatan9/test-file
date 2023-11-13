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
	@GeneratedValue(generator="system-uuid") //id �ڵ����� ����
	@GenericGenerator(name="system-uuid", strategy="uuid")
	private String id; // �� ������Ʈ�� ���̵�
	private String userId; // �� ������Ʈ�� ������ ������� ���̵�
	private String title; // Wine Ÿ��Ʋ
	private String type; // Wine ����
	private String co; // Wine ������(country of origin)

}
