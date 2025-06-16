package com.crud.cartao.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.crud.cartao.demo.model.Cartao;
import com.crud.cartao.demo.model.ServiceResponse;
import com.crud.cartao.demo.services.ICartaoService;

@RestController
@RequestMapping("api/v1/card")
@CrossOrigin("*")
public class CartaoController {

    @Autowired
    private ICartaoService iCartaoService;


    @GetMapping("/list")
    public ResponseEntity<List<Cartao>> list() {
        var result = iCartaoService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

   
    @PostMapping("/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody Cartao card) {
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iCartaoService.save(card);

        if (result == 1) {
            serviceResponse.setMessage("Item salvo com sucesso");
            serviceResponse.setSuccess(true);
        } else {
            serviceResponse.setMessage("Falha ao salvar");
            serviceResponse.setSuccess(false);
        }

        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }


    @PostMapping("/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody Cartao card) {
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iCartaoService.update(card);

        if (result == 1) {
            serviceResponse.setMessage("Item atualizado com sucesso");
            serviceResponse.setSuccess(true);
        } else {
            serviceResponse.setMessage("Falha ao atualizar");
            serviceResponse.setSuccess(false);
        }

        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

   
    @GetMapping("/delete/{id}")
    public ResponseEntity<ServiceResponse> delete(@PathVariable int id) {
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iCartaoService.deleteByid(id);

        if (result == 1) {
            serviceResponse.setMessage("Item removido com sucesso");
            serviceResponse.setSuccess(true);
        } else {
            serviceResponse.setMessage("Falha ao remover");
            serviceResponse.setSuccess(false);
        }

        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
}
