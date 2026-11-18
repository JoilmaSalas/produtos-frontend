
const API_BASE_URL = '/produtos';

document.addEventListener('DOMContentLoaded', () => {
    const produtoForm = document.getElementById('produtoForm');
    const produtosList = document.getElementById('produtosList');

    async function carregarProdutos() {
        try {
            const resposta = await fetch(API_BASE_URL);

            if (!resposta.ok) {
                throw new Error('Erro ao carregar produtos');
            }

            const produtos = await resposta.json();
            produtosList.innerHTML = '';

            if (produtos.length === 0) {
                produtosList.innerHTML = '<p>Nenhum produto cadastrado.</p>';
                return;
            }

            produtos.forEach(produto => {
                const item = document.createElement('div');
                item.style.margin = '15px 0';
                item.style.padding = '15px';
                item.style.background = 'white';
                item.style.borderRadius = '8px';

                const nome = document.createElement('strong');
                nome.textContent = produto.nome;

                const preco = document.createElement('span');
                preco.textContent = ` - R$ ${Number(produto.preco).toFixed(2)}`;

                const botao = document.createElement('button');
                botao.textContent = 'Excluir';
                botao.style.marginLeft = '15px';

                botao.addEventListener('click', async () => {
                    if (!confirm('Deseja excluir este produto?')) return;

                    try {
                        const resposta = await fetch(
                            `${API_BASE_URL}/${produto.id}`,
                            { method: 'DELETE' }
                        );

                        if (!resposta.ok) {
                            throw new Error('Erro ao excluir produto');
                        }

                        await carregarProdutos();
                    } catch (erro) {
                        alert(erro.message);
                    }
                });

                item.append(nome, preco, botao);
                produtosList.appendChild(item);
            });

        } catch (erro) {
            console.error(erro);
            produtosList.textContent = 'Erro ao carregar produtos.';
        }
    }

    produtoForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const preco = Number(document.getElementById('preco').value);

        try {
            const resposta = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, preco })
            });

            if (!resposta.ok) {
                throw new Error('Erro ao cadastrar produto');
            }

            alert('Produto cadastrado com sucesso!');
            produtoForm.reset();
            await carregarProdutos();

        } catch (erro) {
            console.error(erro);
            alert(erro.message);
        }
    });

    carregarProdutos();
});
