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
        List<Cartao> list;
        try{
                list = iCartaoRepositorio.findAll();
        }
        catch(Exception ex){
             throw ex;
        }
        return list;
    }

    @Override
    public int save(Cartao card) {
    int row;
        try{
                row = iCartaoRepositorio.save(card);
        }
        catch(Exception ex){
             throw ex;
        }
        return row;
    }

    @Override
    public int update(Cartao card) {
    int row;
        try{
                row = iCartaoRepositorio.update(card);
        }
        catch(Exception ex){
             throw ex;
        }
        return row;
    }

    @Override
    public int deleteByid(int id) {
    int row;
        try{
                row = iCartaoRepositorio.deleteByid(id);
        }
        catch(Exception ex){
             throw ex;
        }
        return row; 
    }

    
}
