package com.crud.cartao.demo.services;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.crud.cartao.demo.model.Cartao;

@Service    
public class CartaoServicos implements ICartaoService {
    
    @Autowired
    private ICartaoRepositorio iCartaoRepositorio;

    @Override
    public List<Cartao> findAll() {
         return iCartaoRepositorio.findAll();
    
    }

    @Override
    public int save(Cartao card) {
            return iCartaoRepositorio.save(card);
      
    }

    @Override
    public int update(Cartao card) {
        return iCartaoRepositorio.update(card);
    }

    @Override
    public int deleteByid(int id) {
        return iCartaoRepositorio.deleteByid(id);
    }

    
}
