# 🐉 Bestiário de Monstros - Monster Hunter World

Um **bestiário interativo** de monstros de *Monster Hunter World*, feito com HTML, CSS e JavaScript. Permite buscar monstros por nome em português, navegar entre eles e visualizar detalhes como tipo, elementos, fraquezas, resistências, habitats e descrição.

---

## 🔹 Funcionalidades

- Buscar monstros pelo **nome em português**
- Navegar com botões **Anterior** e **Próximo**
- Exibir informações detalhadas:
  - Nome (PT)
  - Imagem do monstro
  - Tipo / Espécie traduzida
  - Elementos
  - Fraquezas
  - Resistências
  - Habitats
  - Descrição
- Tratamento automático de **acentos e apóstrofos** nos nomes
- Mensagens padrão se o monstro não for encontrado

---

## 🔹 Como usar

1. Clone ou baixe o repositório.
2. Abra `index.html` em um servidor local (ex: Live Server no VSCode) para que o JSON carregue corretamente.
3. Digite o nome do monstro no campo de busca ou use os botões para navegar.
4. Veja os detalhes do monstro sendo exibidos no card.

---

## 🔹 Estrutura de Arquivos

/images/monstros/ ← ícones dos monstros
/data/monsters.json ← dados dos monstros
index.html
style.css
script.js


---

## 🔹 Observações

- JSON deve conter: `name`, `species`, `elements`, `weaknesses`, `resistances`, `locations` e `description`.
- Nomes com `'` ou acentos são normalizados automaticamente.
- Elementos faltantes exibem valores padrão (“Desconhecido” ou “Nenhum”).

---

## 🔹 Tecnologias

- HTML5
- CSS3
- JavaScript ES6+
- JSON (dados dos monstros)

---

## 🔹 Preview

![Exemplo de Bestiário](./images/exemplo_bestiario.png)

---
