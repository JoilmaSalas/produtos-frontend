package com.seufrontend.produtos_frontend;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final List<Map<String, Object>> produtos = new ArrayList<>();
    private long proximoId = 1;

    @GetMapping
    public List<Map<String, Object>> listar() {
        return produtos;
    }

    @PostMapping
    public Map<String, Object> cadastrar(@RequestBody Map<String, Object> dados) {
        Map<String, Object> produto = new java.util.HashMap<>(dados);
        produto.put("id", proximoId++);
        produtos.add(produto);
        return produto;
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable long id) {
        produtos.removeIf(p -> ((Number) p.get("id")).longValue() == id);
    }
}
