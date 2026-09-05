# RecapData 🛞

**Plataforma Inteligente de Coleta Técnica, Diagnóstico de Frotas e Geração de Laudos para Reformadoras de Pneus e Vendedores de Pneus Novos**

O **RecapData** foi desenvolvido especificamente para representantes técnicos de reforma (RTRs), consultores comerciais de recapadoras e vendedores de pneus de carga que realizam atendimento direto no pátio e nas garagens de transportadoras.

A plataforma substitui blocos de papel e pranchetas por um fluxo estruturado em 6 etapas, calculando automaticamente o potencial de recapagem anual, a economia estimada para a frota e gerando instantaneamente um **Laudo Técnico Oficial em PDF** e relatório formatado para WhatsApp.

---

## 📱 PWA (Progressive Web App) & Suporte a Android Nativo

O RecapData foi projetado sob a arquitetura **Offline-First**, permitindo operar perfeitamente em garagens remotas, galpões fechados ou pátios de transportadoras sem sinal de internet (3G/4G/5G).

### Funcionalidades PWA Ativas
- **Instalação Instantânea**: Pode ser instalado diretamente pelo navegador Chrome/Edge no Android e PC sem passar por lojas de aplicativos, através do botão **"Instalar App"** na barra superior.
- **Suporte a iOS Safari**: Modal guiado para inclusão na Tela de Início via menu nativo do Safari.
- **Service Worker & Precaching**: Configurado via `vite-plugin-pwa` e `Workbox`, armazenando todos os recursos estáticos, fontes e rotas para inicialização instantânea mesmo offline.
- **Armazenamento Local Contínuo**: Coletas e rascunhos são persistidos no `localStorage` do dispositivo, permitindo fechar o navegador e retomar o atendimento a qualquer momento.
- **Indicador de Conexão**: Notificação visual discreta caso o consultor perca sinal de rede durante a visita.

### 🤖 Como Compilar como Aplicativo Android Nativo (APK / AAB)

O projeto possui código 100% desacoplado e compatível com **Capacitor**, permitindo empacotar o RecapData como um binário nativo Android para distribuição via Google Play Store ou instalação direta de APK:

1. **Instalar o Capacitor no projeto**:
   ```bash
   npm install @capacitor/core
   npm install -D @capacitor/cli @capacitor/android
   ```

2. **Inicializar a configuração do Capacitor**:
   ```bash
   npx cap init RecapData com.recapdata.app --web-dir dist
   ```

3. **Gerar o build otimizado da aplicação web**:
   ```bash
   npm run build
   ```

4. **Adicionar a plataforma Android**:
   ```bash
   npx cap add android
   ```

5. **Sincronizar os arquivos compilados**:
   ```bash
   npx cap sync
   ```

6. **Abrir o projeto no Android Studio e compilar o APK**:
   ```bash
   npx cap open android
   ```
   *No Android Studio:* Menu `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)` para gerar o instalador `.apk`.

---

## ⚖️ Análise Estratégica: Vantagens e Pontos Fracos da Plataforma

O uso do **RecapData** transforma a abordagem de vendas no setor de pneus de carga. Abaixo estão detalhadas as vantagens competitivas e os desafios operacionais identificados para os dois principais perfis de usuários:

---

### 1. Para Representantes de Reformadoras / Recapadoras (RTRs)

#### 🟢 Vantagens
* **Elevação de "Tirador de Pedido" para Consultor Técnico de CPK**: O representante deixa de negociar apenas o preço da recapagem por unidade e apresenta um diagnóstico estruturado do Custo por Quilômetro (CPK) e da economia anual total da frota.
* **Cálculo Imediato do Potencial de Pneus Reformáveis**: O sistema calcula automaticamente o consumo da frota com base nas composições mapeadas (ex: *Cavalo 2 eixos duplos + Reboque 3 eixos duplos com 22 pneus*), quantificando exatamente quantas carcaças devem ser recapadas por mês e ano.
* **Geração Instantânea de Laudo Técnico em PDF**: Elimina o atraso de dias para enviar um relatório à transportadora. O laudo em PDF sai pronto ainda na visita, com indicador visual de oportunidade, assinatura técnica e resumo executivo.
* **Mapeamento Cirúrgico da Concorrência**: Registra qual reformadora atende o cliente atualmente, qual banda/desenho é utilizado e o principal motivo de insatisfação (ex: descolamento, demora na entrega, carcaças sucateadas sem justificativa), fornecendo argumentos sob medida para a virada de conta.
* **Atendimento em Pátio 100% Offline**: Sem dependência de internet estável; o representante pode coletar os dados no fundo do pátio e gerar laudos sem risco de travamentos.

#### 🔴 Pontos Fracos e Desafios Operacionais
* **Dependência da Transparência do Frotista**: A precisão dos números depende dos dados informados pelo transportador (km rodado mensal, número exato de reformas por carcaça). Se o cliente omitir informações, o cálculo do laudo será baseado em médias de mercado.
* **Não Substitui a Inspeção Individual das Carcaças**: O aplicativo mapeia o panorama geral e a política de manutenção da frota, mas não substitui a raspagem, inspeção visual minuciosa e exame eletrônico de carcaça (shearografia/ultrassom) realizado na fábrica da reformadora.
* **Exigência de Disciplina do Consultor**: Exige que o consultor técnico reserve de 10 a 15 minutos de entrevista com o responsável pelo tráfego/manutenção para preencher os dados com critério, em vez de uma visita relâmpago.

---

### 2. Para Vendedores de Pneus Novos e Carcaças

#### 🟢 Vantagens
* **Argumentação de Venda de Pneus de 1ª Linha**: Permite justificar o valor de um pneu novo premium (Michelin, Bridgestone, Goodyear, Continental) demonstrando que sua carcaça suporta 2 a 3 recapagens, gerando um custo por km infinitamente menor do que pneus de baixo custo descartáveis.
* **Visão do Ciclo de Vida Completo**: Permite ao vendedor de novos identificar quando a frota está com déficit de carcaças na base ou quando o índice de sucata está elevado, criando o momento exato para repor pneus novos no eixo dianteiro direcional.
* **Fechamento de Pacotes Integrados (Novo + Reforma)**: Excelente ferramenta para concessionárias e distribuidores que vendem pneus novos e também possuem reformadora autorizada, apresentando proposta unificada de gestão de pneus.
* **Envio Ágil via WhatsApp**: Permite compartilhar o resumo executivo da visita instantaneamente no WhatsApp do diretor ou dono da transportadora, facilitando a decisão de compra.

#### 🔴 Pontos Fracos e Desafios Operacionais
* **Frotistas com Foco Exclusivo em Preço Inicial**: Transportadoras com baixa liquidez financeira que compram apenas pneus de menor custo por restrição de caixa imediata podem demonstrar resistência em analisar a conta de longo prazo de 2ª e 3ª vidas úteis.
* **Necessidade de Parametrização Comercial Local**: Preços de pneus novos sofrem oscilações frequentes de frete, impostos estaduais (ICMS-ST) e tabela de fábrica; o vendedor precisa conferir os valores médios de referência para alinhar à realidade da sua região.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend Core**: React 19, TypeScript, Vite 6
- **Estilização**: Tailwind CSS 4, Motion (Framer Motion)
- **Geração de Documentos**: `jspdf` (renderização técnica de laudos multipágina em PDF)
- **Ícones & Design**: `lucide-react`
- **PWA & Cache**: `vite-plugin-pwa`, Workbox Service Workers
- **Tematização Dinâmica**: Suporte a 6 esquemas de cores industriais com modo Claro e Escuro
- **Arquitetura Mobile**: Compatível com Capacitor para build nativo Android / iOS

---

## 🚀 Como Executar Localmente

```bash
# 1. Instalar as dependências
npm install

# 2. Executar o servidor de desenvolvimento
npm run dev

# 3. Compilar para produção
npm run build

# 4. Validar tipagem TypeScript
npm run lint
```
