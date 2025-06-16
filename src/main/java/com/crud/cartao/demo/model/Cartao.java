package com.crud.cartao.demo.model;

import lombok.Data;

@Data
public class Cartao {
    int id_card;
    String nome_card;
    String numero;
    String tipo;
    int cvv;
    int status;
}
