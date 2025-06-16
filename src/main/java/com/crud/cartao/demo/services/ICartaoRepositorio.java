package com.crud.cartao.demo.services;

import java.util.List;


import com.crud.cartao.demo.model.Cartao;

public interface ICartaoRepositorio {
 public List<Cartao> findAll();
 public int save(Cartao card);
 public int update(Cartao card);
 public int deleteByid(int id);
}
