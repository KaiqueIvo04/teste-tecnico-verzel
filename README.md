# Desafio Técnico QA Júnior — Verzel Store

## 1. Sobre o projeto

Este repositório contém os artefatos produzidos durante o desafio técnico para a vaga de **QA Júnior da Verzel**.

**Objetivo:** avaliar a qualidade da **funcionalidade de cupons de desconto e frete grátis** da Verzel Store, contemplando especificação de test cases, realização de testes funcionais de UI (E2E) e API, testes exploratórios manuais, report de bugs e automação de testes.

**Link da Aplicação**: [Verzel Store](https://verzel-store.qa-test-verzel-store.workers.dev/)

## 2. Estratégia de testes

Foram utilizadas as seguintes abordagens:

- **Testes funcionais:** validação dos comportamentos especificados nos critérios de aceite.
- **Testes de fluxo padrão e alternativo:** verificação dos caminhos de sucesso que permitem alcançar o objetivo da feature e dos caminhos que se desviam podendo levar à falhas.
- **Testes de interface (UI):** validação dos fluxos de interação com a loja.
- **Testes de API:** validação de endpoints, códigos HTTP, contratos de resposta e regras de negócio.
- **Testes exploratórios:** investigação de comportamentos e identificação de possíveis defeitos.
- **Testes automatizados:** Foram automatizados 3 casos de testes funcionais incluindo E2E e API com Playwright e TypeScript.

As técnicas de teste utilizadas incluem particionamento de equivalência e análise de valores limite.

## 3. Especificação dos cenários e casos de teste

Os casos foram especificados com base nos critérios de aceite e nas regras documentadas para a aplicação.

A documentação contempla:

- Identificação e descrição dos cenários.
- Critérios de aceite relacionados.
- Tipo de cenário e técnica utilizada.
- Pré-condições e dados de teste.
- Passos de execução em Gherkin (Given, When, Then).
- Resultados obtidos.
- Status de execução.
- Evidências e defeitos relacionados.

**Planilha de especificação e execução:**

[Visualizar planilha de testes](./Testes_VerzelStore_QA.xlsm)

**Observação:** recomenda-se o arquivo da planilha do tipo .xlsm com um aplicativo próprio para conseguir acesso a estrutura completa e suas demais abas.

## 4. Execução dos testes manuais e exploratórios

Foram executados **21 casos de teste**, considerando os fluxos da interface e as validações da API.

Os resultados foram documentados na planilha, juntamente com as evidências das execuções.

**Evidências:**

[Consultar evidências dos testes](./evidences/)

As evidências incluem capturas de tela e gravações dos comportamentos observados.

## 5. Registro de bugs

Durante a execução foram registrados **4 bugs**, documentados na planilha de testes.

Os registros contemplam identificação, descrição, passos de reprodução, resultados esperados e observados, severidade, prioridade e evidências.

**Evidências dos bugs:**

[Consultar evidências dos bugs](./bug-evidences/)

## 6. Automação de testes

Foram implementados três cenários automatizados utilizando **Playwright Test com TypeScript**, abrangendo a interface e a API.

| ID | Cenário | Camada | Resultado |
|---|---|---|---|
| CT-001 | Aplicar cupom de desconto válido na compra | UI / E2E | Aprovado |
| CT-017 | Rejeitar pedido com cupom expirado | API | Aprovado |
| CT-020 | Rejeitar 6 unidades do mesmo produto na confirmação do pedido | API | Reprovado (bug04) |

Os testes podem ser consultados em [`tests/`](./tests/).

### Defeito identificado pela automação

O cenário **CT-020** valida o limite máximo de 5 unidades de um mesmo produto por pedido, conforme o CA10.

O comportamento esperado é o retorno HTTP `422`, com o código `QUANTIDADE_MAXIMA_EXCEDIDA`.

Entretanto, durante a execução, a API retornou HTTP `201`, indicando que o pedido foi aceito.

O teste foi mantido com suas assertions originais para preservar a identificação do defeito e demonstrar a divergência em relação à especificação.

## 7. Como executar os testes automatizados

### Pré-requisitos

- Node.js e npm instalados.
- Acesso à aplicação Verzel Store.

### Instalar dependências

```bash
npm install
```

### Instalar os navegadores utilizados pelo Playwright

```bash
npx playwright install
```

### Executar todos os testes

```bash
npx playwright test
```

### Executar os testes apenas no Chromium

```bash
npx playwright test --project=chromium
```

### Executar um cenário específico

```bash
npx playwright test --grep "CT-001" --project=chromium
```

### Executar em modo interativo

```bash
npx playwright test --ui
```

### Visualizar relatório HTML

```bash
npx playwright show-report
```

**Observação:** a suíte contém um teste (CT-020) que identifica um defeito conhecido no sistema (bug04). Por esse motivo, a execução completa poderá apresentar uma falha enquanto o comportamento da API permanecer em desacordo com a especificação.

## 8. Estrutura do repositório

```text
teste-tecnico-verzel/
├── bug-evidences/
│   ├── bug01.png
│   ├── bug02.png
│   ├── bug03.png
│   └── bug04.png
├── evidences/
│   ├── CT-001.png
│   ├── ...
│   └── CT-021.png
├── tests/
│   ├── CT-001-e2e.spec.ts
│   ├── CT-017-api.spec.ts
│   └── CT-020-api.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
├── Testes_VerzelStore_QA.xlsm
└── README.md
```

## 9. Observações Gerais

Os defeitos encontrados foram registrados com suas respectivas evidências, enquanto os cenários automatizados demonstram a possibilidade de validar tanto os fluxos da interface quanto as regras de negócio diretamente pela API.

A documentação e os testes automatizados foram mantidos no mesmo repositório para facilitar a consulta, reprodução e avaliação dos resultados.

---

**Ferramentas utilizadas:** Playwright, TypeScript, Google Sheets, Git e GitHub.