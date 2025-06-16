package com.crud.cartao.demo.repository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.crud.cartao.demo.model.Cartao;
import com.crud.cartao.demo.services.ICartaoRepositorio;

@Repository
public class CartapRepositorio implements ICartaoRepositorio {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public List<Cartao> findAll() {
       String SQL = "SELECT * FROM Cartao WHERE STATUS = 1";
       
       return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Cartao.class));
    }

    @Override
public int save(Cartao card) {
    String SQL = "INSERT INTO cartao (nome_card, numero, tipo, cvv, status) VALUES (?, ?, ?, ?, ?)";
    return jdbcTemplate.update(SQL, new Object[] {
        card.getNome_card(),
        card.getNumero(),
        card.getTipo(),
        card.getCvv(),
        card.getStatus()
    });
}


    @Override
    public int update(Cartao card) {
        String SQL = "UPDATE cartao set nome_card = ?, numero = ?, tipo = ?, cvv = ? where id_card = ?";
    return jdbcTemplate.update(SQL, new Object[] {
        card.getNome_card(),
        card.getNumero(),
        card.getTipo(),
        card.getCvv(),
        card.getId_card()
    });
}

    @Override
    public int deleteByid(int id) {
    String SQL = "delete cartao where id_card = ?";
    return jdbcTemplate.update(SQL, new Object[] {id});
    }

}
