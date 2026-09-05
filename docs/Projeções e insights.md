# Ideias & Hipóteses de Negócio: SaaS White-Label para Recapadoras e Distribuidores de Pneus

> **Documento Estratégico & Arquitetural**  
> **Objetivo:** Mapear os recursos de alto valor, hipóteses de mercado, arquitetura de backend (Supabase), estratégias comerciais e modelos de monetização para transformar o RecapData Pro em uma plataforma SaaS B2B White-Label completa.

---

## 1. Visão Geral & Tese de Negócio

No transporte rodoviário de cargas no Brasil e América Latina:
1. **O pneu é o segundo maior custo operacional de uma frota**, superado apenas pelo consumo de óleo diesel.
2. Transportadoras não compram pneus ou recapagens por vaidade: elas compram **Custo por Quilômetro (CPK)** e **disponibilidade de frota**.
3. **A dor do mercado:** A maioria das recapadoras e representantes de pneus (especialmente chineses/importados) atua na vala comum da **guerra predatória de preços**, enviando cotações frias e perdendo margem.
4. **A solução:** Transformar o vendedor externo em um **Consultor Técnico de Engenharia de Custo**, fornecendo uma plataforma no pátio da transportadora que audita perdas, demonstra o ROI matematicamente e garante o ciclo completo da carcaça.

---

## 2. Públicos-Alvo & Propostas de Valor

| Público-Alvo | O Problema / Objeção Central | A Proposta de Valor do SaaS |
| :--- | :--- | :--- |
| **Recapadoras / Reformadoras de Pneus** (Concessionárias de Bandas ou Independentes) | Dificuldade em provar o custo-benefício da reforma contra pneus novos de entrada; vendedores sem preparo técnico no pátio; perda de carcaças por sucateamento prematuro. | **"O Sistema Comercial que Tira sua Recapadora da Guerra de Preços."** O consultor realiza auditorias técnicas no pátio e gera laudos com cálculo de economia imediata e viabilidade da carcaça. |
| **Importadores & Representantes de Pneus Chineses/Alternativos** | Estigma do cliente: *"Pneu chinês é descartável e não aceita recapagem"*; desconfiança sobre rendimento quilométrico. | **"A Plataforma de Quebra de Objeção e Comprovação de CPK."** Comprovação de rendimento por teste piloto comparativo e certificação de marcas importadas que possuem carcaça recapável. |
| **Transportadoras & Gestores de Frotas** (Beneficiário Final) | Pneus sucateados antes do tempo; falta de controle de calibração; falta de previsibilidade de custo. | **"Auditoria Técnica Gratuita de Frotas."** A recapadora ou importador passa a atuar como um departamento terceirizado de engenharia de pneus para a transportadora. |

---

## 3. Recursos Técnicos Avançados (Consultoria de Alto Valor no Pátio)

### 3.1. Inspeção Rápida de Pátio (Yard Audit / Pátio Inteligente)
- **Amostragem de Sulco (mm) por Eixo:** Medição ágil em 5 a 15 caminhões da frota durante a visita técnica.
- **Identificação do "Ponto de Ouro da Carcaça":**
  - Alerta automático para pneus entre **3,0 mm e 4,5 mm de sulco restante**.
  - O sistema avisa: *"Se este pneu continuar rodando mais 15 dias, atingirá a cinta de aço da carcaça, transformando um ativo de R$ 900 em sucata descartável."*
- **Detecção de Desgastes Anormais:** Registro rápido de desgastes em ombro, dente de serra ou desgaste unilateral (problemas de geometria, embuchamento e eixos desalinhados).

### 3.2. Calculadora Interativa de CPK (Custo por Quilômetro)
Simulação visual em tempo real na frente do gestor de frota comparando cenários:
- **Cenário A (Atual da Frota):** Pneu novo de marca tradicional descartado sem recapagem ou com reforma genérica.
- **Cenário B (Alternativa Pneu Importado):** Aquisição de pneu novo importado de boa carcaça + 1 recapagem garantida.
- **Cenário C (Ciclo Completo de Reforma):** Pneu 1ª vida + 1ª recapagem + 2ª recapagem (comprovando reduções de até 50% a 60% no CPK).

### 3.3. Auditoria Fotográfica de Sucatas & Avarias com IA
- Fotografia da pilha de pneus descartados no fundo da oficina/transportadora.
- Upload de imagens e classificação da causa de descarte:
  - Separação de lona / bolha (superaquecimento ou baixa calibragem).
  - Picotamento e arrancamento (terreno severo ou banda incorreta).
  - Danos no talão (montagem incorreta / roda defeituosa).
  - Furo ou corte sem conserto.
- **Laudo Pericial de Sucata:** Relatório impresso ou em PDF quantificando em Reais (R$) o montante financeiro perdido por descarte prematuro de carcaças na frota.

### 3.4. Calculadora de Impacto em Combustível (Resistência ao Rolamento)
- Cruzamento de dados: Quilometragem rodada mensal x Preço médio do diesel x Tipo de composto/banda (ex: Bandas ECO de baixa histerese).
- Algoritmo que projeta a economia de combustível decorrente do uso de compostos de baixa resistência ao rolamento e manutenção correta de pressão, demonstrando que **a economia de diesel gerada muitas vezes paga 100% do custo de recapagem da frota**.

---

## 4. Recursos Comerciais, Pós-Venda & Retaguarda (Backend Supabase)

### 4.1. Pipeline Comercial & CRM Especializado em Frotas (Kanban)
Fases configuradas especificamente para o ciclo comercial de pneus:
1. `Visita / Coleta Realizada`
2. `Laudo & Estudo de CPK Entregue`
3. `Lote Piloto / Teste Pneu x Pneu em Andamento`
4. `Coleta Inicial de Carcaças`
5. `Fornecedor Homologado / Contrato Recorrente`

### 4.2. Gestão de Testes Comparativos (Lote Piloto Pneu a Pneu)
- Cadastro de veículos de teste onde rodam, no mesmo caminhão e mesmo eixo:
  - 2 pneus da concorrência (controle).
  - 2 pneus da recapadora / pneu chinês (amostra).
- Registro periódico a cada 10.000 km ou 20.000 km da perda de milímetros.
- Geração de gráfico de regressão linear projetando a quilometragem final e o CPK real comprovado.

### 4.3. Automação de Comunicações & Follow-Up (WhatsApp & E-mail)
Através de **Supabase Edge Functions + Webhooks** para gateways de mensageria (ex: Z-API, Evolution API, WhatsApp Cloud API):
- **Imediato (Dia 0):** Envio instantâneo do link do Laudo Técnico via WhatsApp para o contato decisor da transportadora.
- **Follow-Up Automático (Dia +3):** Mensagem de cortesia verificando se o decisor analisou o estudo de economia de frota.
- **Alerta de Ciclo de Pátio (Dia +30 a +45):** Lembrete automático para o consultor técnico revisitar a frota e checar pneus que estavam no ponto de retirada.

### 4.4. Portal do Cliente da Transportadora (Área B2B)
- Acesso restrito para o frotista (via Magic Link):
  - Consulta aos laudos técnicos das vistorias realizadas em suas unidades.
  - Histórico de carcaças enviadas para a recapadora e status de produção.
  - Certificados de garantia de reforma.
  - **Painel ESG / Sustentabilidade:** Indicadores de carcaças reaproveitadas, pneus poupados de descarte, litros de petróleo economizados e redução na pegada de carbono ($CO_2$).

---

## 5. Estratégia Específica para Distribuidores de Pneus Chineses & Alternativos

1. **Certificador de Recapabilidade de Carcaças Importadas:**
   - Base de dados colaborativa com o histórico de marcas importadas aprovadas na raspagem e vulcanização (ex: Sailun, Linglong, Triangle, Roadone, Double Coin).
2. **Matriz de Preservação de Capital de Giro:**
   - Demonstração comparativa para transportadoras descapitalizadas: a compra de 60 pneus importados novos reduz a imobilização de capital de giro em até R$ 60.000 a R$ 90.000 no primeiro dia, comparado a pneus premium nacionais.
3. **Combo Pneu Novo + Reforma Garantida (Parcerias Estratégicas):**
   - O representante vende o pneu importado já associado a um voucher ou convênio com uma recapadora regional que garante a compra ou reforma da carcaça na 1ª vida.

---

## 6. Arquitetura Técnica & Banco de Dados (Supabase Multi-Tenant)

### 6.1. Isolamento Multi-Tenant com RLS (Row Level Security)
Cada recapadora ou distribuidora opera como um `tenant` isolado:
- **Tabela `tenants`:**
  - `id`, `name`, `subdomain`/`slug`, `logo_url`, `primary_color`, `accent_color`, `contact_whatsapp`, `custom_domain`.
- **Tabelas Filhas:**
  - Todas as tabelas (`users`, `clients`, `tire_surveys`, `inspections`, `yard_audits`, `test_tires`) possuem `tenant_id uuid references tenants(id)`.
  - **Políticas RLS:** Usuários só podem ler e escrever dados pertencentes ao seu `tenant_id`.

### 6.2. Armazenamento de Mídia (Supabase Storage)
- Buckets dedicados com controle de acesso:
  - `tenant-branding`: logotipos e ícones das empresas clientes.
  - `inspection-photos`: fotos de avarias, sucatas, hodômetros e DOT dos pneus.
  - `generated-reports`: PDFs gerados automaticamente dos laudos e orçamentos.

### 6.3. Sincronização Híbrida (Offline-First)
- O consultor de campo frequentemente visita pátios em garagens sem sinal de internet (fora da cidade, postos de combustíveis ou estradas).
- O app armazena as coletas localmente (`IndexedDB` / `localStorage`) e realiza background-sync com o Supabase assim que a conexão de rede for restabelecida.

---

## 7. Modelos de Monetização & Precificação (Pricing SaaS)

### 7.1. Assinatura Mensal Recorrente (SaaS por Porte)
- **Plano Consultor / Autônomo (1 usuário):**
  - R$ 79 a R$ 99 / mês
  - Coletas ilimitadas, relatórios em PDF com sua assinatura e envio no WhatsApp.
- **Plano Recapadora / Equipe Comercial (até 5 consultores externos):**
  - R$ 349 a R$ 490 / mês
  - Gestão centralizada de oportunidades, dashboard de inteligência de mercado, exportação em CSV/Excel.
- **Plano Enterprise / Redes de Concessionárias (múltiplas unidades):**
  - R$ 890 a R$ 1.800 / mês
  - Usuários ilimitados, relatórios comparativos entre filiais, API de integração com ERP (ex: Totvs, Sankhya, sistemas legados de recapadora).

### 7.2. Setup White-Label Customizado
- **Taxa de Implantação (Setup):** R$ 1.800 a R$ 3.500 (pagamento único).
  - Domínio próprio (ex: `coleta.recapadorax.com.br`).
  - Paleta de cores oficial, logotipo da marca e seleção exclusiva do catálogo de bandas homologadas (Vipal, Bandag, Tipler, Borrachas VIP, etc.).
- **Mensalidade de Sustentação:** R$ 450 a R$ 950 / mês.

---

## 8. Próximos Passos de Desenvolvimento Sugeridos

1. **Calculadora Integrada de CPK & Ponto de Retirada:** Criar um simulador visual interativo dentro da própria aplicação.
2. **Modelagem do Schema SQL do Supabase:** Estruturação das tabelas multi-tenant com RLS e triggers de auditoria.
3. **Módulo de Inspeção Fotográfica de Sucatas:** Permitir anexar fotos aos laudos técnicos gerados.
4. **Exportação de Proposta Técnica Comercial:** Formatação avançada em PDF para impressão e envio formal à diretoria da transportadora.
