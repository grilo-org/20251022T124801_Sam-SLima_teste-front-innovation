## Sobre o Projeto

Este projeto é um teste prático de front-end desenvolvido com **React**, **Next.js** e **TailwindCSS**.  
Ele demonstra habilidades em:

- Consumo de APIs
- Gerenciamento de estado global (Zustand)
- Componentização e modais
- UI/UX com Tailwind e Material Icons
- Filtragem e favoritos de produtos

O objetivo é criar uma **aplicação de catálogo de produtos**, com login, listagem de produtos, marcação de favoritos e visualização de detalhes.

---

## Tecnologias Utilizadas

- **React** – Biblioteca principal de UI
- **Next.js** – Framework de React para SSR e rotas
- **TailwindCSS** – Estilização rápida e responsiva
- **Material UI Icons** – Ícones prontos e consistentes
- **Zustand** – Gerenciamento de estado global
- **SWR** – Fetch e cache de dados
- **next/font** – Otimização e carregamento de fontes
- **JavaScript / TypeScript**

---

## Funcionalidades

- Tela de Login funcional
- Listagem de produtos com imagens, preços e descrição
- Adicionar/remover produtos favoritos
- Filtrar para mostrar apenas produtos favoritos
- Modal com detalhes completos do produto
- Suporte a teclado (`Esc` para fechar modal)
- Layout responsivo para diferentes telas

---

## Estrutura do Projeto

├─ /app # Páginas e rotas do Next.js
├─ /components # Componentes reutilizáveis (CardProduto, Modal, etc)
├─ /lib # Configurações de API e helpers
├─ /store # Estado global com Zustand
├─ /public # Imagens e arquivos estáticos
├─ /styles # CSS global e Tailwind config
├─ /pages # (caso use) Páginas do Next.js

## 🚀 Como Rodar o Projeto

1. Clone o repositório:

```bash
git clone <URL_DO_REPO>
```

2. Instale as dependencias:

npm install

3. Inicie o servidor de desenvolvimento:

npm run dev

4. Abra no navegador:

http://localhost:3000

## Fontes e Tipografia

Este projeto utiliza next/font
para carregar a fonte Geist de forma otimizada.

## Recursos e Documentação

- Next.js Documentation

- Learn Next.js

- TailwindCSS Documentation

- Material UI Icons

- Zustand Documentation

## Variáveis de ambiente

NEXT_PUBLIC_API_BASE=https://apihomolog.innovationbrindes.com.br/api

## Decisões tecnicas e pendências

- TailwindCSS: escolhi o TailwindCSS por ser a biblioteca de estilização que domino atualmente, o que trouxe mais agilidade ao desenvolvimento e garantiu consistência visual no projeto.

- Material UI Icons: utilizei o Material UI Icons para reforçar a interface com ícones padronizados, tornando o design mais atrativo e de fácil interpretação.

- Identidade Visual: não utilizei a logo oficial da Innovation por não tê-la disponível localmente, mas mantive o nome em tipografia semelhante, buscando preservar ao máximo a identidade visual da empresa.

- Componentização: a intenção inicial era componentizar elementos de UI como botões, inputs e cards para promover reutilização e manutenção mais simples. Contudo, durante o desenvolvimento surgiram erros de importação que, pelo tempo limitado disponível, poderiam comprometer a entrega. Nesse contexto, priorizei a implementação funcional das telas de Login e Produtos, mantendo os elementos diretamente nelas. Como evolução futura, a componentização completa será uma prioridade.

- Imagens (<img> vs next/image): a implementação ideal seria usar o componente next/image para otimização automática e melhor pontuação em performance. No entanto, ao integrá-lo com as imagens vindas da API (armazenadas em S3), surgiram conflitos de configuração no next.config.js e erros relacionados a propriedades obrigatórias (como width/height).
  Como o prazo para a entrega era curto e resolver essas questões demandaria mais tempo de ajuste, optei por utilizar o elemento nativo <img> apenas para garantir que o fluxo principal funcionasse.
  Para uma versão futura, a migração completa para next/image é um dos pontos prioritários, tanto pela performance quanto pelo SEO

## Evidencias
<img width="1917" height="1028" alt="telaLogin" src="https://github.com/user-attachments/assets/3605f1f4-d43a-4901-887a-603bcae3ed02" />
![evidencia1](https://github.com/user-attachments/assets/42d68449-0eb1-4fa5-8cf8-3346571fa8a9)
![evidencia2](https://github.com/user-attachments/assets/e38861a0-45ef-4107-bda6-212ec07630ee)


