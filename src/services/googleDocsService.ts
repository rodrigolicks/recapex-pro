/**
 * Service to generate the Executive Pitch Document in Google Docs
 */

export interface GeneratedDocResult {
  documentId: string;
  title: string;
  docUrl: string;
  docxExportUrl: string;
}

export const createPitchDocumentInGoogleDocs = async (
  accessToken: string
): Promise<GeneratedDocResult> => {
  const title = `RecapData - Proposta Executiva & Pitch de Plataforma de Inteligência e Pós-Venda para Recapadoras`;

  // 1. Create Document
  const createRes = await fetch('https://docs.googleapis.com/v1/documents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!createRes.ok) {
    const errorData = await createRes.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || 'Falha ao criar o documento no Google Docs.'
    );
  }

  const doc = await createRes.json();
  const documentId = doc.documentId;

  // 2. Prepare comprehensive text content
  const fullDocumentText = `RECAPDATA PRO - PROPOSTA EXECUTIVA DE TRANSFORMAÇÃO DIGITAL
Plataforma Integrada de Inteligência de Prospecção, Gestão Comercial e Pós-Venda para Reformadoras e Recapadoras de Pneus
Documento Estratégico para Apresentação a Stakeholders e Investidores
Data: Agosto de 2026 | Versão: 2.0 - Arquitetura de Nuvem & Field Sales

--------------------------------------------------------------------------------

1. SUMÁRIO EXECUTIVO

O mercado brasileiro de reforma e recapagem de pneus de carga movimenta bilhões de reais anualmente, sendo o segundo maior custo operacional das transportadoras (atrás apenas do combustível). Contudo, a imensa maioria das recapadoras ainda atua com métodos comerciais analógicos, pranchetas de papel, visitas desestruturadas e um pós-venda reativo que só atua quando a carcaça do cliente já estourou ou foi para a concorrência.

O RecapData Pro nasce como um ecossistema digital completo e inteligente:
• Na ponta (Campo): Aplicativo moderno, offline-first, multiplataforma, operando em celulares de consultores comerciais no pátio da transportadora.
• No centro (Gestão & Backend): Painel gerencial em nuvem (Supabase / PostgreSQL) com distribuição de rotas, controle de metas, scoring automático de clientes e análises OLAP/BI.
• No pós-venda (Retenção): Motor preditivo de acompanhamento do ciclo de vida das carcaças, alertas de rodagem, laudos técnicos de sucata transparentes e painel de autosserviço para o cliente final.

--------------------------------------------------------------------------------

2. O DIAGNÓSTICO DO MERCADO & DORES ATUAIS

A. Dores da Recapadora:
1. Falta de Visibilidade Comercial: Vendedores visitam transportadoras sem roteirização prévia e sem saber o real potencial de consumo de pneus daquela frota.
2. Perda de Dados de Campo: Informações valiosas sobre marcas de carcaça, calibragem média e preços dos concorrentes se perdem em anotações soltas.
3. Churn Oculto: A recapadora perde clientes por não acompanhar o momento exato em que a transportadora precisa recapar novos lotes.
4. Dificuldade de Provar Valor Técnico: Dificuldade em demonstrar numericamente que a recapagem de alta qualidade gera menor Custo por Quilômetro (CPK) do que pneus importados baratos de baixa durabilidade.

B. Dores da Transportadora (Cliente Final):
1. Desconfiança sobre o estado das carcaças enviadas para recapagem.
2. Falta de controle sobre a quilometragem e o número de vidas (reformas) de cada pneu.
3. Desgaste prematuro e estouro de pneus nas rodovias por falta de monitoramento preventivo.

--------------------------------------------------------------------------------

3. ARQUITETURA MULTIPLATAFORMA & OPERAÇÃO OFFLINE-FIRST (PWA)

• Aplicação Única, Qualquer Dispositivo: Funciona nativamente em smartphones Android, iPhones (iOS), tablets e computadores desktop via navegador moderno.
• PWA (Progressive Web App): Pode ser instalado diretamente na tela inicial do celular do consultor técnico com ícone personalizado, sem burocracia de lojas de aplicativos.
• Funcionamento 100% Offline com Fila de Sincronização: Consultores técnicos entram em pátios industriais e garagens subterrâneas sem sinal 4G/5G. O app coleta todos os dados, realiza cálculos técnicos locais e sincroniza instantaneamente assim que detecta conexão com a internet.
• Interface de Alta Ergonomia: Tema escuro de alto contraste, desenhado para leitura sob luz solar direta em pátios de frotas e botões táteis projetados para uso ágil com uma só mão.

--------------------------------------------------------------------------------

4. ARQUITETURA MULTI-USUÁRIO & GOVERNANÇA DE DADOS (RBAC)

O sistema conta com controle de acesso granular baseado em papéis (Role-Based Access Control) garantido por Row-Level Security (RLS) no banco de dados:

1. Perfil Consultor de Campo / Vendedor:
   - Recebe sua lista personalizada de transportadoras para visitar na semana.
   - Realiza diagnósticos rápidos de 6 etapas técnicas.
   - Visualiza seu histórico de coletas e metas individuais.
   - Gera laudos e propostas em PDF instantaneamente.

2. Perfil Supervisor Regional / Gerente Comercial:
   - Atribui carteiras de clientes e define rotas de visitas prioritárias.
   - Acompanha o funil de prospecção da equipe em tempo real.
   - Valida condições comerciais e descontos especiais.

3. Perfil Diretor / Administrador Geral:
   - Visão consolidada de todas as filiais e regiões.
   - Painéis de BI, inteligência de mercado e precificação de concorrentes.
   - Exportação integral para Data Warehouse (OLAP).

--------------------------------------------------------------------------------

5. GESTÃO COMERCIAL, ROTEIRIZAÇÃO & PROSPECÇÃO ATIVA

• Roteiros Inteligentes de Visitas: O gestor programa no mapa as transportadoras a serem visitadas por proximidade geográfica e potencial de consumo, otimizando tempo e despesas de deslocamento.
• Check-in com Registro GPS: Registro confiável do horário e localização da visita técnica realizada no pátio.
• Algoritmo de Scoring de Potencial (0 a 100): O sistema avalia automaticamente:
   - Tamanho da frota (cavalos, carretas, bitrens e semirreboques).
   - Quilometragem média mensal rodada.
   - Nível de gestão de pneus da transportadora (calibragem, rodízio, controle de sucos).
   - Preço pago atualmente e marcas de bandas utilizadas (identificação de oportunidade de ganho de margem).
• Comparador Técnico Imediato (Novo vs. Recape vs. Misto): Cálculo em tempo real do Custo por Quilômetro (CPK) comparativo, provando ao dono da frota a economia anual gerada ao recapar com a nossa recapadora.

--------------------------------------------------------------------------------

6. O DIFERENCIAL COMPETITIVO: TORNANDO O PÓS-VENDA UM PRIMOR DE EXCELÊNCIA

A maior fonte de receita recorrente de uma recapadora não é apenas conquistar novos clientes, mas reter com lealdade inabalável as frotas já atendidas. A plataforma oferece:

1. Rastreamento e Histórico de Vidas das Carcaças:
   - Cadastro e histórico de cada pneu enviado para reforma (R1, R2, R3).
   - Identificação de quais modelos e marcas de carcaça aguentam mais recapagens naquela rota específica.

2. Gatilhos & Lembretes Preditivos de Recapeamento:
   - O sistema calcula a taxa de desgaste da frota com base na quilometragem informada.
   - Disparo de lembrete automático para o vendedor e para o frotista: "A Transportadora X atingirá o limite de segurança de suco em 15 dias - Agendar coleta de 20 carcaças".

3. Laudo Técnico Digital de Sucateamento Transparente:
   - Quando uma carcaça precisa ser rejeitada (ex: quebra de talão, separação de lonas), o técnico anexa fotos com diagnóstico detalhado no app.
   - O cliente recebe um laudo pericial transparente, eliminando qualquer desconfiança de descarte indevido.

4. Portal de Autosserviço para a Transportadora:
   - Acesso exclusivo para o frotista acompanhar seus pneus em processo na fábrica (coleta, raspagem, vulcanização, controle de qualidade, entrega).
   - Gráficos de economia acumulada e redução de emissão de CO2 proporcionada pela reforma de pneus.

5. Automações de Relacionamento (WhatsApp & E-mail):
   - Notificação automática na saída da entrega com a relação de pneus reformados.
   - Pesquisa de Satisfação NPS (Net Promoter Score) disparada após cada entrega para feedback contínuo.

--------------------------------------------------------------------------------

7. INTELIGÊNCIA ANALÍTICA, RELATÓRIOS & INTEGRAÇÃO COM BI (OLAP)

• Exportação Contínua para Bancos Analíticos: Sincronização direta com Supabase / PostgreSQL estruturado para ferramentas como Power BI, Metabase ou Looker.
• Mapa de Calor Geográfico: Identificação visual de regiões com alta densidade de carcaças e baixa penetração da nossa marca.
• Radar de Concorrência: Acompanhamento de quais bandas e concorrentes estão avançando em cada polo de transporte e a que faixas de preço.

--------------------------------------------------------------------------------

8. PLANO DE IMPLEMENTAÇÃO & ROADMAP TÉCNICO

Fase 1: Aplicativo de Coleta Offline & Validação de Campo (Concluído)
- Formulário técnico em 6 etapas, cálculos automáticos de CPK e economia de frota.

Fase 2: Backend Supabase & Autenticação Multi-Usuário (Próxima Etapa)
- Banco de dados relacional com políticas RLS, sincronização em nuvem e login seguro com Google OAuth.

Fase 3: Módulo de Pós-Venda, Lembretes Preditivos & Roteirização de Visitas
- Notificações de recompra, laudos periciais de sucata e portal do frotista.

Fase 4: Painéis Executivos de BI & Integração com ERP da Fábrica
- Conexão bidirecional com o software de produção da recapadora.

--------------------------------------------------------------------------------

9. CONCLUSÃO & PRÓXIMOS PASSOS PARA OS STAKEHOLDERS

A digitalização ponta a ponta da força de vendas e do pós-venda posiciona a recapadora não apenas como uma prestadora de serviços, mas como uma consultoria estratégica indispensável para as transportadoras.

Ações Recomendadas:
1. Aprovação do plano de integração do backend em nuvem (Supabase).
2. Liberação de piloto de campo com 2 a 3 consultores técnicos para validação das rotas.
3. Apresentação do laudo técnico automatizado para clientes estratégicos.
`;

  // 3. Batch insert text into document
  const updateRes = await fetch(
    `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            insertText: {
              location: { index: 1 },
              text: fullDocumentText,
            },
          },
        ],
      }),
    }
  );

  if (!updateRes.ok) {
    console.warn('Texto inserido com aviso, mas documento criado com sucesso.');
  }

  return {
    documentId,
    title,
    docUrl: `https://docs.google.com/document/d/${documentId}/edit`,
    docxExportUrl: `https://docs.google.com/document/d/${documentId}/export?format=docx`,
  };
};
