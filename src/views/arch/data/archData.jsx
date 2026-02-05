/**
 * 架构视图共享数据定义
 * 提取自 arch.jsx，供各视图组件复用
 */

import {
    Shield, Globe, MessageSquare, Zap, Lock, Database, Server, Cpu, Key,
    FileSearch, CheckCircle2, AlertTriangle, Brain, Layers, Code2, TableProperties,
    Save, RotateCw, Skull, Bot, Activity, Hammer, User, Link
} from 'lucide-react';

// =====================================================================
// 图标映射表
// =====================================================================
export const iconMap = {
    Globe, MessageSquare, Link, Shield, Cpu, Lock, Brain, Bot, User, Zap,
    Database, Hammer, FileSearch, Layers, Code2, Save, RotateCw, TableProperties,
    Key, Server, CheckCircle2, AlertTriangle, Skull, Activity
};

// 根据图标名称和样式创建图标组件
export const getIcon = (iconName, className) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
};

// =====================================================================
// 逻辑架构层级数据
// =====================================================================
export const layers = [
    {
        id: 'access',
        title: '接入层 (Access Layer)',
        functionalDesc: '负责多渠道请求的接收、初步格式化与身份初识，作为系统的物理安全边界。',
        color: 'bg-blue-50',
        borderColor: 'border-blue-200',
        icon: 'Globe',
        iconColor: 'blue',
        threatCount: 12,
        components: [
            { id: 'im_cn', name: '企业 IM 适配器', icon: 'MessageSquare', desc: '飞书/钉钉/Teams Webhook 集成', features: ['消息去重与幂等', '消息签名验证', '事件分发路由'], threats: ['LLM01:2025', 'LLM04:2025', 'MCP01'] },
            { id: 'custom_web', name: '自定义 Web 前端', icon: 'Globe', desc: '通过安全 REST API 与代理通信并支持人工干预流程的 Web 应用', features: ['Human-in-the-loop 审批', 'SSO 单点登录', '操作确认超时'], threats: ['LLM01:2025', 'LLM07:2025', 'LLM02:2025'] },
            { id: 'event_driven', name: '事件驱动应用', icon: 'Zap', desc: '通过 Pub/Sub 发布业务事件启动系统间自动化工作流', features: ['事件订阅分发', 'Dead Letter Queue', '多系统编排'], threats: ['LLM04:2025', 'MCP01', 'MCP05'] },
            { id: 'chat_interface', name: '临时对话界面', icon: 'MessageSquare', desc: '无状态调试与测试用途的轻量聊天界面，支持匿名会话', features: ['无状态会话', '调试日志输出', '工具调用测试'], threats: ['LLM04:2025', 'MCP01', 'MCP05'] }
        ]
    },
    {
        id: 'gateway',
        title: '控制平面 (Control Plane)',
        functionalDesc: '系统的神经中枢，执行安全护栏、身份映射、意图编排及会话记忆的动态调度。',
        color: 'bg-purple-50',
        borderColor: 'border-purple-200',
        icon: 'Shield',
        iconColor: 'purple',
        threatCount: 11,
        components: [
            { id: 'gc', name: '意图编排引擎', icon: 'Cpu', desc: '意图解析与分发', features: ['意图置信度阈值', '多意图冲突仲裁', '路由决策'], threats: ['AG05', 'AG07', 'MCP04'] },
            { id: 'iman', name: '身份管理器', icon: 'Lock', desc: 'SSO 映射与 JWT 签发', features: ['LDAP/AD 联通', '动态权限降级', '角色映射'], threats: ['AG02', 'MCP05'] },
            { id: 'ss', name: '安全护栏', icon: 'Shield', desc: '输入输出双向拦截与脱敏', features: ['注入指纹扫描', '输出幻觉检测', 'PII 自动掩码'], threats: ['LLM02', 'LLM06', 'LLM09'] },
            { id: 'memory_svc', name: '记忆管理器', icon: 'Brain', desc: '记忆调度与分片', features: ['记忆过期策略', '敏感信息遗忘', '摘要生成'], threats: ['LLM03', 'AG06', 'MCP02'] },
            { id: 'quota_mgr', name: '配额管理器', icon: 'Activity', desc: 'Token 消耗与 API 调用频率控制', features: ['成本预算管控', '调用频率限制', '用量告警'], threats: ['LLM10:2025', 'ASI08'] }
        ]
    },
    {
        id: 'agents',
        title: '智能体层 (Agent Layer)',
        functionalDesc: '智能决策层，基于特定业务逻辑和上下文记忆进行推理，并向工具层下达执行指令。',
        color: 'bg-indigo-50',
        borderColor: 'border-indigo-200',
        icon: 'Bot',
        iconColor: 'indigo',
        threatCount: 11,
        components: [
            { id: 'orchestrator_agent', name: '编排智能体', icon: 'Cpu', desc: '负责意图路由、任务分发与输出质量监督的元级智能体', features: ['意图分类路由', '多智能体协作编排', '输出质量审核'], threats: ['AG05', 'ASI01', 'ASI07', 'ASI10'] },
            { id: 'functional_agents', name: '职能智能体集群', icon: 'User', desc: '处理人财行等内部职能事务的业务智能体池', features: ['财务报销预算', 'HR考勤绩效', '行政排程预订'], threats: ['LLM06:2025', 'ASI03', 'ASI09', 'LLM02:2025'] },
            { id: 'tech_agent', name: '技术智能体', icon: 'Zap', desc: '处理 IT 运维、权限管理与故障排查的技术类智能体', features: ['工单自动分类', '权限链路追踪', '故障自愈建议'], threats: ['ASI02', 'ASI01', 'ASI05'] }
        ]
    },
    {
        id: 'tools',
        title: '工具层 (Tool Layer)',
        functionalDesc: '物理执行层，提供标准化接口连接企业内部系统、外部服务或执行隔离的计算逻辑。',
        color: 'bg-amber-50',
        borderColor: 'border-amber-200',
        icon: 'Hammer',
        iconColor: 'amber',
        threatCount: 8,
        components: [
            { id: 'tool_registry', name: '工具注册中心', icon: 'TableProperties', desc: '统一管理工具元数据、版本与权限，支持动态发现', features: ['工具元数据管理', '版本控制', '权限分配'], threats: ['MCP02', 'MCP07'] },
            { id: 'mcp_tools', name: 'MCP 工具服务', icon: 'Layers', desc: 'MCP 协议工具统一入口，包含数据库 Toolbox 与自定义后端防腐层', features: ['数据库安全访问', '后端 API 标准化', '参数化查询防注入'], threats: ['MCP01', 'MCP02', 'MCP03', 'MCP06'] },
            { id: 'api_cli_gateway', name: 'API/CLI 网关', icon: 'Globe', desc: '外部服务调用网关，支持 REST API、GraphQL 及命令行工具', features: ['OAuth/HMAC 签名', '请求响应脱敏', '调用链路追踪'], threats: ['LLM05', 'MCP06', 'MCP04'] },
            { id: 'rag_retriever', name: 'RAG 检索引擎', icon: 'FileSearch', desc: '企业知识库语义检索服务，支持多模态内容索引', features: ['向量相似度搜索', '引用源标注', '混合检索策略'], threats: ['LLM08:2025', 'MCP02'] }
        ]
    },
    {
        id: 'data',
        title: '数据与存储层 (Storage Layer)',
        functionalDesc: '持久化底座，确保对话历史、知识索引、身份关系及生产数据的全生命周期安全。',
        color: 'bg-slate-100',
        borderColor: 'border-slate-300',
        icon: 'Database',
        iconColor: 'slate',
        threatCount: 12,
        components: [
            { id: 'cache_layer', name: '缓存层', icon: 'Zap', desc: 'Redis/Memcached 热点数据与会话状态缓存', features: ['热点数据加速', '会话状态存储', '限流计数器'], threats: ['ASI06', 'MCP08'] },
            { id: 'mem_db', name: '对话历史库', icon: 'Save', desc: '用户历史加密存储', features: ['按 UID 物理隔离', '会话归档导出', '加密落盘'], threats: ['LLM02:2025', 'ASI06', 'ASI03'] },
            { id: 'vector_db', name: '向量索引库', icon: 'RotateCw', desc: '语义记忆与知识库', features: ['索引版本管理', '增量更新', '向量压缩'], threats: ['LLM08:2025', 'ASI06', 'LLM04:2025'] },
            { id: 'map_db', name: '身份关系库', icon: 'TableProperties', desc: '身份关联与映射表', features: ['跨平台 ID 映射', '账号生命周期', '权限快照'], threats: ['ASI03', 'ASI07', 'MCP04'] },
            { id: 'ent_db', name: '核心数据库', icon: 'Database', desc: 'SAP/ERP 生产数据', features: ['行级权限控制', '审计追踪', '读写分离'], threats: ['LLM10:2025', 'MCP03', 'MCP06'] }
        ]
    },
    {
        id: 'infra',
        title: '基础设施层 (Infra Layer)',
        functionalDesc: '底层运行时支撑，提供计算隔离、网络通信及存储服务等云原生基础能力。',
        color: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        icon: 'Server',
        iconColor: 'emerald',
        threatCount: 8,
        components: [
            { id: 'compute_env', name: '计算环境', icon: 'Code2', desc: '代码执行沙箱与容器运行时，提供隔离的计算能力', features: ['资源 Quota 限制', '网络/文件隔离', '超时自动终止'], threats: ['ASI05', 'MCP07'] },
            { id: 'network_env', name: '网络环境', icon: 'Globe', desc: '零信任网络、服务网格与安全通信通道', features: ['mTLS 双向认证', '微隔离策略', '流量加密传输'], threats: ['MCP08', 'LLM10:2025'] },
            { id: 'storage_platform', name: '存储平台', icon: 'Database', desc: '对象存储、块存储及分布式文件系统基础服务', features: ['静态加密存储', '多副本冗余', '生命周期管理'], threats: ['ASI06', 'MCP03'] },
            { id: 'secret_manager', name: '密钥管理服务', icon: 'Key', desc: '统一的凭据与密钥生命周期管理', features: ['HSM 硬件保护', '自动轮换策略', '访问审计日志'], threats: ['MCP04', 'ASI03'] },
            { id: 'observability', name: '可观测性平台', icon: 'Activity', desc: '全链路监控、日志聚合与告警中心', features: ['分布式追踪', '指标聚合分析', '异常行为检测'], threats: ['MCP09', 'ASI08'] }
        ]
    }
];

// =====================================================================
// 威胁模型列表
// =====================================================================
export const threatLists = {
    llm: [
        { id: 'LLM01:2025', name: 'Prompt Injection', desc: '提示词注入 (直接、间接或通过 RAG 资源)' },
        { id: 'LLM02:2025', name: 'Sensitive Info Disclosure', desc: '不当暴露 PII、凭据或系统指令' },
        { id: 'LLM03:2025', name: 'Supply Chain Risks', desc: '训练集、基础模型或工具库供应链投毒' },
        { id: 'LLM04:2025', name: 'Data & Model Poisoning', desc: '操作训练、微调或嵌入数据以改变行为' },
        { id: 'LLM05:2025', name: 'Improper Output Handling', desc: '输出导致 SSRF、XSS 或指令劫持' },
        { id: 'LLM06:2025', name: 'Excessive Agency', desc: '赋予模型过多的工具权限、自主权或信任度' },
        { id: 'LLM07:2025', name: 'System Prompt Leakage', desc: '泄露系统初始指令' },
        { id: 'LLM08:2025', name: 'Vector Weaknesses', desc: '针对 RAG 向量存储的攻击' },
        { id: 'LLM09:2025', name: 'Misinformation', desc: '产生误导、虚假且具有说服力的内容' },
        { id: 'LLM10:2025', name: 'Unbounded Consumption', desc: '恶意请求导致配额耗尽' }
    ],
    agentic: [
        { id: 'ASI01', name: 'Agent Goal Hijack', desc: '篡改智能体任务清单或偏离设计初衷' },
        { id: 'ASI02', name: 'Tool Misuse', desc: '对工具参数缺乏校验导致的滥用' },
        { id: 'ASI03', name: 'Identity Abuse', desc: '身份继承漏洞或跨代理级别的权限提升' },
        { id: 'ASI04', name: 'Agentic Supply Chain', desc: '恶意第三方智能体或 Persona' },
        { id: 'ASI05', name: 'Unexpected Execution', desc: '自主执行未经审计的脚本' },
        { id: 'ASI06', name: 'Memory Poisoning', desc: '在长期记忆或上下文中注入恶意知识' },
        { id: 'ASI07', name: 'Insecure Comm', desc: '协作中的消息篡改、劫持或伪造' },
        { id: 'ASI08', name: 'Cascading Failures', desc: '单个节点受控引发整体瘫痪' },
        { id: 'ASI09', name: 'Trust Exploit', desc: '利用用户对智能体的信赖诱导危险授权' },
        { id: 'ASI10', name: 'Rogue Agents', desc: '违反安全约束的行为' }
    ],
    mcp: [
        { id: 'MCP01', name: 'Indirect Injection', desc: '通过恶意 MCP 资源内容注入指令' },
        { id: 'MCP02', name: 'Tool Poisoning', desc: '工具定义被篡改以引入恶意逻辑' },
        { id: 'MCP03', name: 'Excessive Permissions', desc: '服务器权限分配过大且缺乏 RBAC' },
        { id: 'MCP04', name: 'Credential Theft', desc: 'API Token 在协议传输中泄露' },
        { id: 'MCP05', name: 'Tool Shadowing', desc: '恶意服务器拦截合规调用' },
        { id: 'MCP06', name: 'Injection', desc: '接口缺乏对输入参数的清理' },
        { id: 'MCP07', name: 'Rug Pull Attacks', desc: '信任工具在更新后改变行为' },
        { id: 'MCP08', name: 'Broken Auth', desc: '服务器间缺乏相互认证机制' },
        { id: 'MCP09', name: 'Lack of Audit', desc: '跨协议边界的调用缺乏追踪记录' },
        { id: 'MCP10', name: 'Integrity Failure', desc: '错误的工具调用参数组合' }
    ]
};

// =====================================================================
// 防御概要
// =====================================================================
export const defenseItems = [
    { title: '多维身份校验', desc: '通过 Identity Manager 强制映射企业 UUID，杜绝社交账号冒用。' },
    { title: '意图双重护栏', desc: '接入层初步扫描 + 控制面 Schema 转换，阻断 99% 的注入攻击。' },
    { title: '物理权限锁定', desc: '子代理执行 SQL 或 API 调用时，强制注入基于 JWT 的用户身份过滤器。' },
    { title: '隔离计算沙箱', desc: '所有非确定性代码均在 Python Sandbox 中运行，严格限制网络与文件访问。' }
];

// =====================================================================
// 威胁模型摘要配置
// =====================================================================
export const getThreatSections = () => [
    { title: 'OWASP LLM 重点防御', color: 'red', list: threatLists.llm, icon: <Skull className="w-6 h-6 text-red-400" /> },
    { title: 'Agentic 行为审计', color: 'orange', list: threatLists.agentic, icon: <Zap className="w-6 h-6 text-orange-400" /> },
    { title: 'MCP 通道安全', color: 'amber', list: threatLists.mcp, icon: <Layers className="w-6 h-6 text-amber-400" /> }
];
