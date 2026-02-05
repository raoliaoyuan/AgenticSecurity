/**
 * =====================================================================
 * 运行架构视图 - 数据驱动配置 (Data-Driven Architecture Schema)
 * =====================================================================
 * 
 * 基于 Google Cloud Multi-Agent AI System 架构重新设计
 * 参考文档: https://docs.cloud.google.com/architecture/multiagent-ai-system
 * 
 * 架构要点:
 *   1. Frontend (接入层) 在 Agent Orchestration Layer 外部
 *   2. Coordinator Agent 是核心编排器
 *   3. 所有子代理 (Subagents) 在一个统一的编排框内
 *   4. Model Armor 作为推理请求的安全护栏
 *   5. Model Runtime 支持 Vertex AI / Cloud Run / GKE
 *   6. MCP Clients 连接内部/外部工具
 * 
 * @version 3.0.0 - 基于 Google 架构重构版本
 * @lastUpdated 2026-02-05
 */

// =====================================================================
// 图标名称映射（用于渲染层动态加载图标）
// =====================================================================
export const ICON_NAMES = {
    USER: 'User',
    CODE: 'Code2',
    GLOBE: 'Globe',
    SHIELD: 'Shield',
    CPU: 'Cpu',
    BRAIN: 'Brain',
    LOCK: 'Lock',
    ACTIVITY: 'Activity',
    DATABASE: 'Database',
    FILE_SEARCH: 'FileSearch',
    BOT: 'Bot',
    SERVER: 'Server',
    KEY: 'Key',
    LAYERS: 'Layers',
    CHECK: 'CheckCircle2',
    ZAP: 'Zap',
    MESSAGE: 'MessageSquare',
    HAMMER: 'Hammer',
    LINK: 'Link',
};

// =====================================================================
// 核心架构 Schema 定义 (基于 Google Multi-Agent 架构)
// =====================================================================
export const PROCESS_VIEW_SCHEMA = {
    metadata: {
        title: '运行架构视图 (Process View)',
        subtitle: '基于 Google Cloud Multi-Agent AI System 架构设计',
        version: '3.0',
        reference: 'https://docs.cloud.google.com/architecture/multiagent-ai-system',
    },

    // -------------------------------------------------------------------
    // 用户入口 (顶部)
    // -------------------------------------------------------------------
    users: {
        top: [
            { id: 'user-app', label: 'Application users', icon: ICON_NAMES.USER },
            { id: 'user-dev', label: 'AI developers', icon: ICON_NAMES.CODE },
        ],
        bottom: [
            { id: 'user-admin', label: 'Platform administrators', icon: ICON_NAMES.USER },
            { id: 'user-devops', label: 'DevOps engineers', icon: ICON_NAMES.SERVER },
        ],
    },

    // -------------------------------------------------------------------
    // Step 1: 前端接入层 (在 Agent Orchestration Layer 外部)
    // -------------------------------------------------------------------
    frontend: {
        id: 'node-frontend',
        label: 'Frontend',
        labelEn: 'Cloud Run service',
        icon: ICON_NAMES.GLOBE,
        description: '用户通过前端界面（如 Cloud Run 服务形式运行的聊天界面）输入 Prompt',
        features: ['Human-in-the-loop interaction'],
    },

    // -------------------------------------------------------------------
    // ADK (Agent Development Kit) - 右侧独立模块
    // -------------------------------------------------------------------
    adk: {
        id: 'node-adk',
        label: 'ADK',
        description: 'Agent Development Kit - 智能体开发套件',
    },

    // -------------------------------------------------------------------
    // Agent Orchestration Layer (智能体编排层 - 核心大框)
    // 包含: Coordinator + 所有子代理
    // -------------------------------------------------------------------
    orchestrationLayer: {
        id: 'orchestration-layer',
        label: 'Agent Orchestration Layer',

        // 协调器代理 (核心)
        coordinator: {
            id: 'node-coordinator',
            step: 2,
            label: 'Coordinator',
            labelEn: 'Agent',
            icon: ICON_NAMES.CPU,
            description: '协调器代理会根据提示中表达的意图启动相应的代理流程',
        },

        // 子代理调用标记
        subagentInvocation: {
            step: 3,
            label: 'Subagent invocation',
        },

        // 子代理编排模式 (两种并行模式)
        subagentPatterns: [
            {
                id: 'pattern-sequential',
                type: 'sequential',
                label: 'Sequential',
                description: '顺序执行模式',
                agents: [
                    { id: 'agent-task-a', label: 'Task-A', labelEn: 'Subagent' },
                    { id: 'agent-task-a1', label: 'Task-A.1', labelEn: 'Subagent' },
                ],
                // 连接: Task-A -> Task-A.1 (垂直向下)
            },
            {
                id: 'pattern-iterative',
                type: 'iterative',
                label: 'Iterative refinement',
                description: '迭代优化模式',
                agents: [
                    { id: 'agent-task-b', label: 'Task-B', labelEn: 'Subagent' },
                ],
                evaluators: [
                    { id: 'agent-quality', label: 'Quality evaluator', labelEn: 'Subagent' },
                    { id: 'agent-enhancer', label: 'Prompt enhancer', labelEn: 'Subagent' },
                ],
                loopLabel: 'Updated prompt',
                loopCondition: 'If rework is required',
            },
        ],

        // 响应生成器 (Step 4)
        responseGenerator: {
            id: 'node-response-generator',
            step: 4,
            label: 'Response Generator',
            labelEn: 'Subagent',
            icon: ICON_NAMES.CHECK,
            description: '生成响应，执行验证和依据检查',
        },

        // 运行时选项
        runtimes: [
            { id: 'runtime-cloudrun', label: 'Cloud Run', icon: ICON_NAMES.GLOBE },
            { id: 'runtime-agent-engine', label: 'Agent Engine', icon: ICON_NAMES.BOT },
            { id: 'runtime-gke', label: 'GKE', icon: ICON_NAMES.SERVER },
        ],
    },

    // -------------------------------------------------------------------
    // Model Runtime (模型运行时 - 右侧)
    // -------------------------------------------------------------------
    modelRuntime: {
        id: 'model-runtime',
        label: 'Model runtime:',

        // 安全护栏 (Model Armor)
        modelArmor: {
            id: 'node-model-armor',
            label: 'Model Armor',
            icon: ICON_NAMES.SHIELD,
            description: '推理请求的安全过滤与检查',
        },

        // AI 模型
        aiModel: {
            id: 'node-ai-model',
            label: 'AI model',
            labelEn: '(e.g., Gemini)',
            icon: ICON_NAMES.BRAIN,
        },

        // 模型托管选项
        hostingOptions: [
            { id: 'host-vertex', label: 'Vertex AI', icon: ICON_NAMES.BRAIN, recommended: true },
            { id: 'host-cloudrun', label: 'Cloud Run', icon: ICON_NAMES.GLOBE },
            { id: 'host-gke', label: 'GKE', icon: ICON_NAMES.SERVER },
        ],

        // 推理响应标签
        inferenceLabel: 'Inference responses',
    },

    // -------------------------------------------------------------------
    // MCP Clients & Tools (工具层)
    // -------------------------------------------------------------------
    mcpLayer: {
        id: 'mcp-layer',
        label: 'MCP clients',
        step: 5,

        // Google Cloud 内部工具
        internalTools: {
            id: 'tools-internal',
            label: 'Tools within Google Cloud',
            tools: [
                { id: 'tool-databases', label: 'Databases', icon: ICON_NAMES.DATABASE },
                { id: 'tool-apis', label: 'APIs', icon: ICON_NAMES.CODE },
            ],
        },

        // 外部工具
        externalTools: {
            id: 'tools-external',
            label: 'External tools',
            tools: [
                { id: 'ext-services', label: 'Services', icon: ICON_NAMES.GLOBE },
                { id: 'ext-files', label: 'Files', icon: ICON_NAMES.FILE_SEARCH },
            ],
        },
    },

    // -------------------------------------------------------------------
    // 可观测性
    // -------------------------------------------------------------------
    observability: {
        id: 'node-observability',
        label: 'Google Cloud Observability',
        icon: ICON_NAMES.ACTIVITY,
    },

    // -------------------------------------------------------------------
    // 流程步骤定义 (基于 Google 文档)
    // -------------------------------------------------------------------
    flowSteps: [
        { step: 1, label: 'Prompt', from: 'users', to: 'frontend' },
        { step: 2, label: 'Response', from: 'frontend', to: 'coordinator', bidirectional: true },
        { step: 3, label: 'Subagent invocation', from: 'coordinator', to: 'subagents' },
        { step: 4, label: 'Response Generation', from: 'subagents', to: 'response-generator' },
        { step: 5, label: 'MCP Protocol', from: 'agents', to: 'tools' },
    ],

    // -------------------------------------------------------------------
    // 连接关系定义 (清晰的直线连接)
    // -------------------------------------------------------------------
    connections: [
        // 用户 -> 前端
        { id: 'conn-user-frontend', from: 'user-app', to: 'node-frontend', type: 'vertical', label: '① Prompt' },

        // 前端 <-> 协调器 (双向)
        { id: 'conn-frontend-coordinator', from: 'node-frontend', to: 'node-coordinator', type: 'vertical', bidirectional: true, label: 'Response' },

        // 协调器 -> 子代理
        { id: 'conn-coordinator-subagents', from: 'node-coordinator', to: 'subagents-area', type: 'vertical', label: '③ Subagent invocation' },

        // 子代理 -> 响应生成器
        { id: 'conn-subagents-response', from: 'subagents-area', to: 'node-response-generator', type: 'vertical', label: '' },

        // 协调器 -> Model Runtime (推理请求)
        { id: 'conn-coordinator-inference', from: 'node-coordinator', to: 'node-model-armor', type: 'horizontal', label: 'Inference requests' },

        // Model Armor -> AI Model
        { id: 'conn-armor-model', from: 'node-model-armor', to: 'node-ai-model', type: 'horizontal', label: '' },

        // Model Runtime -> 响应生成器 (推理响应)
        { id: 'conn-inference-response', from: 'model-runtime', to: 'node-response-generator', type: 'curved', label: 'Inference responses' },

        // 编排层 -> MCP 工具
        { id: 'conn-agents-mcp', from: 'orchestration-layer', to: 'mcp-layer', type: 'vertical', label: '⑤ MCP servers' },

        // MCP -> 内部工具
        { id: 'conn-mcp-internal', from: 'mcp-layer', to: 'tools-internal', type: 'vertical', label: 'MCP servers' },

        // MCP -> 外部工具
        { id: 'conn-mcp-external', from: 'mcp-layer', to: 'tools-external', type: 'vertical', label: 'MCP servers' },
    ],

    // -------------------------------------------------------------------
    // 智能体流程说明 (基于 Google 文档)
    // -------------------------------------------------------------------
    agentFlow: [
        { step: '1', title: '用户输入', desc: '用户通过前端（例如以无服务器 Cloud Run 服务形式运行的聊天界面）输入提示。' },
        { step: '2', title: '前端转发', desc: '前端将提示转发给协调器代理 (Coordinator Agent)。' },
        { step: '3', title: '意图识别与路由', desc: '协调器代理会根据提示中表达的意图启动相应的代理流程（顺序模式或迭代优化模式）。' },
        { step: '4', title: '子代理执行', desc: '子代理执行任务，可能涉及顺序调用或迭代优化循环。' },
        { step: '5', title: '响应生成', desc: '响应生成器子代理生成响应，执行验证和依据检查，然后通过协调器代理将最终响应发送给用户。' },
    ],

    // -------------------------------------------------------------------
    // 架构亮点
    // -------------------------------------------------------------------
    highlights: [
        { title: 'A2A 协议互操作', icon: ICON_NAMES.LINK, desc: '代理可以使用 Agent2Agent (A2A) 协议相互通信，实现代理之间的互操作性。' },
        { title: 'Human-in-the-loop', icon: ICON_NAMES.USER, desc: '架构包含人工介入路径，以便人类用户在必要时介入智能体流程。' },
        { title: 'Model Armor 安全护栏', icon: ICON_NAMES.SHIELD, desc: '所有推理请求经过 Model Armor 进行安全过滤与检查。' },
        { title: 'MCP 工具集成', icon: ICON_NAMES.HAMMER, desc: '通过 Model Context Protocol (MCP) 与内部/外部工具无缝集成。' },
    ],
};

// =====================================================================
// Mermaid 导出功能 - 将 Schema 转换为 Mermaid 图代码
// =====================================================================
export function schemaToMermaid(schema) {
    const lines = [
        '```mermaid',
        'graph TD',
        '    %% 运行架构视图 (Process View) - 基于 Google Multi-Agent 架构',
        '    %% Generated from PROCESS_VIEW_SCHEMA v3.0',
        '',
        '    %% === 用户入口 ===',
        '    user-app[("👤 Application users")]',
        '    user-dev[("👨‍💻 AI developers")]',
        '',
        '    %% === Step 1: Prompt ===',
        '    user-app -->|"① Prompt"| frontend',
        '    user-dev -.-> frontend',
        '',
        '    %% === Frontend (外部于编排层) ===',
        '    frontend["🌐 Frontend<br/>Cloud Run service"]',
        '',
        '    %% === Step 2: Response (双向) ===',
        '    frontend <-->|"Response"| coordinator',
        '',
        '    subgraph Orchestration ["Agent Orchestration Layer"]',
        '        direction TB',
        '        ',
        '        coordinator["🎯 Coordinator Agent"]',
        '        ',
        '        coordinator -->|"③ Subagent invocation"| subagents',
        '        ',
        '        subgraph subagents ["Subagents"]',
        '            direction LR',
        '            ',
        '            subgraph Sequential ["Sequential Pattern"]',
        '                taskA["Task-A<br/>Subagent"] --> taskA1["Task-A.1<br/>Subagent"]',
        '            end',
        '            ',
        '            subgraph Iterative ["Iterative Refinement"]',
        '                taskB["Task-B<br/>Subagent"]',
        '                quality["Quality evaluator<br/>Subagent"]',
        '                enhancer["Prompt enhancer<br/>Subagent"]',
        '                taskB --> quality',
        '                quality -->|"If rework required"| enhancer',
        '                enhancer -->|"Updated prompt"| taskB',
        '            end',
        '        end',
        '        ',
        '        subagents --> responseGen["✅ Response Generator<br/>Subagent"]',
        '    end',
        '',
        '    %% === Model Runtime ===',
        '    subgraph ModelRuntime ["Model Runtime"]',
        '        armor["🛡️ Model Armor"]',
        '        aiModel["🧠 AI model<br/>(Gemini)"]',
        '        armor --> aiModel',
        '        ',
        '        subgraph Hosting ["Hosting Options"]',
        '            vertexAI["Vertex AI"]',
        '            cloudRun["Cloud Run"]',
        '            gke["GKE"]',
        '        end',
        '    end',
        '',
        '    coordinator -->|"Inference requests"| armor',
        '    ModelRuntime -->|"Inference responses"| responseGen',
        '',
        '    %% === MCP Tools ===',
        '    Orchestration -->|"⑤ MCP clients"| mcp["MCP Layer"]',
        '    ',
        '    subgraph InternalTools ["Tools within Google Cloud"]',
        '        databases["💾 Databases"]',
        '        apis["🔌 APIs"]',
        '    end',
        '    ',
        '    subgraph ExternalTools ["External tools"]',
        '        services["🌐 Services"]',
        '        files["📄 Files"]',
        '    end',
        '    ',
        '    mcp -->|"MCP servers"| InternalTools',
        '    mcp -->|"MCP servers"| ExternalTools',
        '',
        '    %% === 底部角色 ===',
        '    admin[("👤 Platform administrators")]',
        '    devops[("🔧 DevOps engineers")]',
        '    admin -.-> Orchestration',
        '    devops -.-> Orchestration',
        '```',
    ];

    return lines.join('\n');
}

// =====================================================================
// 导出 Schema 摘要（用于 LLM 快速理解）
// =====================================================================
export function getSchemaSummary(schema) {
    return {
        title: schema.metadata.title,
        version: schema.metadata.version,
        reference: schema.metadata.reference,
        architecture: {
            frontend: 'Frontend (Cloud Run) - 外部于 Agent Orchestration Layer',
            coordinator: 'Coordinator Agent - 核心编排器',
            subagentPatterns: ['Sequential Pattern', 'Iterative Refinement Pattern'],
            responseGenerator: 'Response Generator Subagent',
            modelRuntime: ['Model Armor (安全护栏)', 'AI Model (Gemini)', 'Vertex AI / Cloud Run / GKE'],
            mcpTools: ['Internal Tools (Databases, APIs)', 'External Tools (Services, Files)'],
        },
        flowSteps: schema.flowSteps.map(f => `Step ${f.step}: ${f.label}`),
    };
}

export default PROCESS_VIEW_SCHEMA;
