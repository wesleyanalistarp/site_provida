# Site — Policlínica Pro Vida

Site institucional da Policlínica Pro Vida (Caetité/BA), feito com HTML, CSS e Bootstrap 5.

## Estrutura

```
index.html      página principal
css/style.css   estilos (tema azul e branco)
js/main.js      scripts (WhatsApp, cards dos médicos, botão voltar ao topo)
img/            imagens (fachada e fotos)
```

## Como editar

- **Número do WhatsApp:** primeira linha de `js/main.js` (`WHATSAPP_NUMERO`).
- **Foto da fachada:** substitua `img/fachada_01.png` mantendo o mesmo nome.
- **Médicos (corpo clínico):** cadastre cada profissional em `js/medicos.js` (nome, especialidade, CRM, foto e itens do verso) e coloque a foto em `img/medicos/` com o mesmo nome escrito no campo `foto`. Os botões de especialidade, a busca e o slider são montados sozinhos a partir dessa lista.

## Como ver

Abra o `index.html` no navegador ou use a extensão Live Server do VS Code.
