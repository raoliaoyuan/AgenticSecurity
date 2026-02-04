import React, { useState, useMemo, useCallback, memo } from 'react';
import {
    Shield,
    User,
    MessageSquare,
    Zap,
    Lock,
    Database,
    Server,
    Cpu,
    Key,
    FileSearch,
    CheckCircle2,
    AlertTriangle,
    Globe,
    Brain,
    Layers,
    Link,
    Code2,
    TableProperties,
    Save,
    RotateCw,
    Skull,
    Info,
    Hammer,
    Bot,
    Activity
} from 'lucide-react';

// 图标映射表，用于按需创建图标
const iconMap = {
    Globe, MessageSquare, Link, Shield, Cpu, Lock, Brain, Bot, User, Zap,
    Database, Hammer, FileSearch, Layers, Code2, Save, RotateCw, TableProperties,
    Key, Server, CheckCircle2, AlertTriangle, Skull, Activity
};

// 根据图标名称和样式创建图标组件
const getIcon = (iconName, className) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
};

// Memoized 组件卡片
const ComponentCard = memo(({ comp, isActive, onMouseEnter, onMouseLeave, showThreats }) => (
    <div
        className={`group/card relative bg-white/[0.03] border border-white/10 rounded-3xl p-6 transition-colors duration-200 ${isActive ? 'bg-white/[0.08] border-white/30' : 'hover:bg-white/[0.05]'}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-300 border border-blue-500/30">
                {getIcon(comp.icon, 'w-6 h-6')}
            </div>
            <span className="font-black text-xl text-white">{comp.name}</span>
        </div>
        <p className="text-base text-slate-400 leading-relaxed mb-6 font-medium">{comp.desc}</p>

        {/* 关键特性 */}
        <div className="space-y-3 mb-6">
            <div className="text-sm font-black text-white/20 uppercase tracking-widest">关键特性</div>
            <div className="flex flex-wrap gap-2">
                {comp.features.map(f => (
                    <span key={f} className="text-xs bg-white/5 text-slate-300 px-2.5 py-1 rounded-lg border border-white/10 group-hover/card:border-blue-500/30 transition-colors">
                        • {f}
                    </span>
                ))}
            </div>
        </div>

        {showThreats && comp.threats && (
            <div className="flex flex-wrap gap-2 mt-4 pt-5 border-t border-white/5">
                {comp.threats.map(t => (
                    <span key={t} className="text-sm font-black px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 flex items-center gap-1.5 hover:bg-red-500/20 transition-colors">
                        <AlertTriangle className="w-4 h-4" /> {t}
                    </span>
                ))}
            </div>
        )}
    </div>
));

// Memoized Layer 组件
const LayerSection = memo(({ layer, isLast, activeStep, setActiveStep, showThreats }) => {
    const handleMouseEnter = useCallback((compId) => setActiveStep(compId), [setActiveStep]);
    const handleMouseLeave = useCallback(() => setActiveStep(null), [setActiveStep]);

    return (
        <div className="group relative">
            <div className={`border ${layer.borderColor} ${layer.color} rounded-[2.5rem] p-8 transition-colors duration-200 hover:bg-white/[0.08]`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            {getIcon(layer.icon, `w-8 h-8 text-${layer.iconColor}-400`)}
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-white/40 uppercase tracking-[0.4em] mb-1">{layer.title}</h2>
                            <p className="text-lg text-slate-300 font-medium">{layer.functionalDesc}</p>
                        </div>
                    </div>
                    {showThreats && (
                        <div className="hidden lg:flex items-center gap-3 text-base text-red-400 font-black bg-red-400/10 px-4 py-2 rounded-full border border-red-400/20">
                            <Activity className="w-5 h-5" />
                            覆盖威胁节点: {layer.threatCount} 个
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {layer.components.map((comp) => (
                        <ComponentCard
                            key={comp.id}
                            comp={comp}
                            isActive={activeStep === comp.id}
                            onMouseEnter={() => handleMouseEnter(comp.id)}
                            onMouseLeave={handleMouseLeave}
                            showThreats={showThreats}
                        />
                    ))}
                </div>
            </div>
            {!isLast && (
                <div className="flex justify-center py-4 relative">
                    <div className="w-0.5 h-10 bg-gradient-to-b from-blue-500/50 to-transparent"></div>
                </div>
            )}
        </div>
    );
});

// Memoized 威胁列表项
const ThreatItem = memo(({ threat, color }) => (
    <div className="group/threat flex gap-4 transition-transform hover:translate-x-1">
        <span className={`text-base font-black text-${color}-400 bg-${color}-400/10 px-2 py-1 rounded-lg h-fit border border-${color}-400/20`}>{threat.id}</span>
        <div>
            <div className="text-lg font-black text-slate-200 group-hover/threat:text-white transition-colors">{threat.name}</div>
            <p className="text-sm text-slate-500 font-medium">{threat.desc}</p>
        </div>
    </div>
));

// Memoized 威胁模型摘要
const ThreatSection = memo(({ section }) => (
    <div className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/5">
        <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            {section.icon} {section.title}
        </h3>
        <div className="space-y-5">
            {section.list.map(t => (
                <ThreatItem key={t.id} threat={t} color={section.color} />
            ))}
        </div>
    </div>
));

const ArchitectureViz = () => {
    const [activeStep, setActiveStep] = useState(null);
    const [showThreats, setShowThreats] = useState(true);
    const [activeTab, setActiveTab] = useState('spec');

    // 使用 useMemo 缓存静态数据 - 将图标改为字符串标识
    const layers = useMemo(() => [
        {
            id: 'access',
            title: '接入层 (Access Layer)',
            functionalDesc: '负责多渠道请求的接收、初步格式化与身份初识，作为系统的物理安全边界。',
            color: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
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
            color: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20',
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
            color: 'bg-indigo-500/10',
            borderColor: 'border-indigo-500/20',
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
            color: 'bg-amber-500/10',
            borderColor: 'border-amber-500/20',
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
            color: 'bg-slate-500/10',
            borderColor: 'border-slate-500/20',
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
            title: '基础设施层 (Infrastructure Layer)',
            functionalDesc: '底层运行时支撑，提供计算隔离、网络通信及存储服务等云原生基础能力。',
            color: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/20',
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
    ], []);

    const threatLists = useMemo(() => ({
        llm: [
            { id: 'LLM01:2025', name: 'Prompt Injection', desc: '提示词注入 (直接、间接或通过 RAG 资源)' },
            { id: 'LLM02:2025', name: 'Sensitive Info Disclosure', desc: '不当暴露 PII、凭据或系统指令' },
            { id: 'LLM03:2025', name: 'Supply Chain Risks', desc: '训练集、基础模型或工具库供应链投毒' },
            { id: 'LLM04:2025', name: 'Data & Model Poisoning', desc: '操作训练、微调或嵌入数据以改变行为' },
            { id: 'LLM05:2025', name: 'Improper Output Handling', desc: '输出缺乏清理导致的 SSRF、XSS 或指令劫持' },
            { id: 'LLM06:2025', name: 'Excessive Agency', desc: '赋予模型过多的工具权限、自主权或信任度' },
            { id: 'LLM07:2025', name: 'System Prompt Leakage', desc: '泄露系统初始指令以获取绕过护栏的方法' },
            { id: 'LLM08:2025', name: 'Vector & Embedding Weaknesses', desc: '针对 RAG 向量存储的噪声注入或冲突攻击' },
            { id: 'LLM09:2025', name: 'Misinformation', desc: '产生误导、虚假且具有说服力的内容 (幻觉)' },
            { id: 'LLM10:2025', name: 'Unbounded Consumption', desc: '恶意构造请求导致配额耗尽或拒绝服务' }
        ],
        agentic: [
            { id: 'ASI01', name: 'Agent Goal Hijack', desc: '篡改智能体任务清单或偏离设计初衷' },
            { id: 'ASI02', name: 'Tool Misuse & Exploitation', desc: '智能体由于对工具参数缺乏校验导致的滥用' },
            { id: 'ASI03', name: 'Identity & Privilege Abuse', desc: '身份继承漏洞或跨代理级别的权限提升' },
            { id: 'ASI04', name: 'Agentic Supply Chain', desc: '加载了包含恶意逻辑的第三方智能体或 Persona' },
            { id: 'ASI05', name: 'Unexpected Code Execution', desc: '智能体自主生成并执行了未经审计的脚本' },
            { id: 'ASI06', name: 'Memory & Context Poisoning', desc: '在长期记忆或上下文中注入恶意知识' },
            { id: 'ASI07', name: 'Insecure Inter-Agent Comm', desc: '多代理协作中的消息篡改、劫持或伪造' },
            { id: 'ASI08', name: 'Cascading Failures', desc: '单个节点受控引发的自动化链路整体瘫痪' },
            { id: 'ASI09', name: 'Human-Agent Trust Exploit', desc: '利用用户对智能体的过度信赖诱导危险授权' },
            { id: 'ASI10', name: 'Rogue Agents', desc: '自发的、违反对齐协议的不符合安全约束的行为' }
        ],
        mcp: [
            { id: 'MCP01', name: 'Indirect Prompt Injection', desc: '通过恶意 MCP 资源内容注入指令' },
            { id: 'MCP02', name: 'Tool Poisoning', desc: '工具 Meta 定义被篡改以引入恶意逻辑' },
            { id: 'MCP03', name: 'Excessive Permissions', desc: 'MCP Server 权限分配过大且缺乏 RBAC' },
            { id: 'MCP04', name: 'Auth/Credential Theft', desc: 'API Token 在协议传输或存储中泄露' },
            { id: 'MCP05', name: 'Tool Shadowing', desc: '恶意 MCP Server 拦截或重定向合规调用' },
            { id: 'MCP06', name: 'Command/SQL Injection', desc: '工具接口缺乏对输入参数的强隔离与清理' },
            { id: 'MCP07', name: 'Rug Pull Attacks', desc: '信任工具在更新后突然改变其安全行为' },
            { id: 'MCP08', name: 'Broken Auth & Authz', desc: 'Server 间缺乏有效的相互认证机制' },
            { id: 'MCP09', name: 'Lack of Audit & Telemetry', desc: '跨协议边界的调用缺乏全链路追踪记录' },
            { id: 'MCP10', name: 'reasoning Integrity Failure', desc: '推理幻觉导致的错误的工具调用参数组合' }
        ]
    }), []);

    // 缓存威胁模型摘要数据
    const threatSections = useMemo(() => [
        { title: 'OWASP LLM 重点防御', color: 'red', list: threatLists.llm, icon: <Skull className="w-6 h-6 text-red-400" /> },
        { title: 'Agentic 行为审计', color: 'orange', list: threatLists.agentic, icon: <Zap className="w-6 h-6 text-orange-400" /> },
        { title: 'MCP 通道安全', color: 'amber', list: threatLists.mcp, icon: <Layers className="w-6 h-6 text-amber-400" /> }
    ], [threatLists]);

    // 缓存按钮点击处理
    const handleTabChange = useCallback((tab) => setActiveTab(tab), []);
    const handleToggleThreats = useCallback(() => setShowThreats(prev => !prev), []);

    // 缓存防御概要数据
    const defenseItems = useMemo(() => [
        { title: '多维身份校验', desc: '通过 Identity Manager 强制映射企业 UUID，杜绝社交账号冒用。' },
        { title: '意图双重护栏', desc: '接入层初步扫描 + 控制面 Schema 转换，阻断 99% 的注入攻击。' },
        { title: '物理权限锁定', desc: '子代理执行 SQL 或 API 调用时，强制注入基于 JWT 的用户身份过滤器。' },
        { title: '隔离计算沙箱', desc: '所有非确定性代码均在 Python Sandbox 中运行，严格限制网络与文件访问。' }
    ], []);

    return (
        <div className="min-h-screen bg-[#020617] p-6 font-sans text-slate-200 leading-normal selection:bg-blue-500/30">
            {/* Background - 简化背景，移除动画 */}
            <div className="fixed inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-blue-600/20 border border-blue-500/40 rounded-2xl">
                                <Shield className="text-blue-400 w-10 h-10" />
                            </div>
                            <h1 className="text-5xl font-black text-white tracking-tight">
                                Antigravity <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Agent SPEC</span>
                            </h1>
                        </div>
                        <p className="text-slate-400 text-xl font-medium ml-1">企业级 Agent 网关安全架构全链路解析 (V5.0)</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                            <button
                                onClick={() => handleTabChange('spec')}
                                className={`px-6 py-3 rounded-xl text-lg font-bold transition-colors duration-200 flex items-center gap-2 ${activeTab === 'spec' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                            >
                                <Shield className="w-5 h-5" /> 功能视图
                            </button>
                            <button
                                onClick={() => handleTabChange('global')}
                                className={`px-6 py-3 rounded-xl text-lg font-bold transition-colors duration-200 flex items-center gap-2 ${activeTab === 'global' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
                            >
                                <Layers className="w-5 h-5" /> 逻辑视图
                            </button>
                        </div>
                        <button
                            onClick={handleToggleThreats}
                            className={`px-6 py-3 rounded-xl text-lg font-bold transition-colors duration-200 flex items-center gap-3 border ${showThreats ? 'bg-red-500/20 border-red-500/50 text-red-100' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                        >
                            <Skull className="w-6 h-6" />
                            {showThreats ? '威胁透视内启' : '功能蓝图模式'}
                        </button>
                    </div>
                </header>

                {activeTab === 'spec' ? (
                    <div className="space-y-6">
                        {layers.map((layer, idx) => (
                            <LayerSection
                                key={layer.id}
                                layer={layer}
                                isLast={idx === layers.length - 1}
                                activeStep={activeStep}
                                setActiveStep={setActiveStep}
                                showThreats={showThreats}
                            />
                        ))}
                    </div>
                ) : (
                    <GlobalArchView />
                )}

                {/* 威胁模型摘要 */}
                {showThreats && (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {threatSections.map(section => (
                            <ThreatSection key={section.title} section={section} />
                        ))}
                    </div>
                )}

                {/* 底部防御概要 - 移除外部纹理图片，用 CSS 实现 */}
                <div className="mt-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 rounded-[3.5rem] flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
                    {/* 使用 CSS 替代外部纹理图片 */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
                    }}></div>
                    <div className="max-w-3xl relative z-10">
                        <h4 className="text-4xl font-black mb-8 flex items-center gap-4">
                            <div className="p-2 bg-white/20 rounded-xl">
                                <CheckCircle2 className="w-10 h-10 text-green-300" />
                            </div>
                            架构安全防御综述
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {defenseItems.map(item => (
                                <div key={item.title} className="group/summary">
                                    <div className="text-2xl font-black mb-2 flex items-center gap-2 group-hover/summary:translate-x-1 transition-transform">
                                        <span className="w-1.5 h-6 bg-white/30 rounded-full"></span>
                                        {item.title}
                                    </div>
                                    <p className="text-lg text-white/70 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hidden lg:block text-right relative z-10">
                        <div className="text-sm font-black opacity-30 mb-2 tracking-[0.5em] uppercase">Security Infrastructure</div>
                        <div className="text-7xl font-black italic tracking-tighter opacity-100">SPEC 5.0</div>
                        <div className="inline-block text-sm font-black bg-white text-blue-600 px-4 py-2 mt-6 rounded-full hover:scale-110 transition-transform cursor-pointer">
                            READY FOR PRODUCTION
                        </div>
                    </div>
                </div>

                <footer className="mt-16 text-center text-slate-600 text-sm font-black tracking-[0.3em] uppercase pb-12">
                    Antigravity Framework Infrastructure Specification • PREMIUM EDITION V5.0
                </footer>
            </div>
        </div>
    );
};


const GlobalArchView = memo(() => {
    return (
        <div className="space-y-12">
            {/* 顶层拓扑图卡片 */}
            <div className="bg-white/[0.03] border border-white/10 rounded-[3rem] p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Layers className="w-64 h-64 text-blue-500" />
                </div>

                <h3 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-500/30">
                        <Layers className="text-blue-400 w-8 h-8" />
                    </div>
                    企业级智能体整体拓扑架构 (BluePrint)
                </h3>

                <div className="relative p-8 bg-[#0a0f1e] rounded-[2rem] border border-white/5 overflow-x-auto">
                    {/* 模拟架构图的可视化展示 */}
                    <div className="min-w-[800px] py-10 flex flex-col items-center gap-20">
                        {/* 接入层节点 */}
                        <div className="flex gap-8">
                            <ArchNode title="接入层" icon={<Globe />} color="blue" items={['企业 IM (飞书/钉钉)', '自研 Web Portal', '外部 API 渠道']} />
                        </div>
                        <ArrowDown />

                        {/* 控制平面节点 */}
                        <div className="flex flex-col items-center">
                            <div className="bg-purple-500/10 border-2 border-purple-500/40 p-8 rounded-[2.5rem] relative">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white">Control Plane</div>
                                <div className="flex gap-12">
                                    <ArchNode title="安全护栏" icon={<Shield />} color="red" items={['注入检测', 'PII 脱敏']} />
                                    <ArchNode title="意图编排" icon={<Cpu />} color="purple" items={['域分发', 'Slot 提取']} />
                                    <ArchNode title="身份映射" icon={<Lock />} color="indigo" items={['SVID 签发', 'RBAC 控制']} />
                                </div>
                            </div>
                        </div>
                        <ArrowDown />

                        {/* 核心链路 */}
                        <div className="grid grid-cols-2 gap-24 w-full px-20">
                            <div className="space-y-20 flex flex-col items-center">
                                <ArchNode title="智能体层 (LLMs)" icon={<Bot />} color="indigo" items={['Router Agent', '财务/HR/IT 代理']} />
                                <ArrowDown />
                                <ArchNode title="存储层 (Storage)" icon={<Database />} color="slate" items={['向量知识库', '加密对话历史']} horizontal />
                            </div>
                            <div className="space-y-20 flex flex-col items-center">
                                <ArchNode title="工具层 (Execution)" icon={<Hammer />} color="amber" items={['RAG 检索器', 'SAP/ERP 连接器', 'Python 沙箱']} />
                                <ArrowDown />
                                <ArchNode title="系统边界" icon={<Server />} color="emerald" items={['企业内网系统', '公有云边缘节点']} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 核心流转时序说明 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TimelineSection />
                <HighlightsSection />
            </div>
        </div>
    );
});

// 提取为独立的 memoized 组件
const TimelineSection = memo(() => {
    const timelineItems = useMemo(() => [
        { step: '01', title: '边界接入与初步脱敏', desc: '请求通过 WAF 与 API 网关，进行初步的注入特征扫描与身份初识。' },
        { step: '02', title: '控制面意图编排', desc: 'Intention Engine 解析用户真实意图，决定激活对应的 Specialized Agent。' },
        { step: '03', title: '记忆上下文注入', desc: '根据 UID 检索长期与短期记忆，构造完整的推理 Prompt 链。' },
        { step: '04', title: '工具调用与沙箱执行', desc: 'Agent 生成 Action，在隔离沙箱或通过 MCP 协议调用企业内部工具。' },
        { step: '05', title: '输出合规性二次审计', desc: '在返回用户前进行 PII 检测与结果脱敏，确保数据不离开安全边界。' }
    ], []);

    return (
        <div className="bg-gradient-to-br from-blue-900/20 to-transparent border border-white/10 p-10 rounded-[3rem]">
            <h4 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                <RotateCw className="text-blue-400 w-6 h-6" /> 请求处理全链路时序
            </h4>
            <div className="space-y-8">
                {timelineItems.map((item) => (
                    <div key={item.step} className="flex gap-6">
                        <div className="text-3xl font-black text-blue-500/30 tracking-tighter">{item.step}</div>
                        <div>
                            <div className="text-xl font-bold text-white mb-1">{item.title}</div>
                            <p className="text-slate-400 font-medium">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

const HighlightsSection = memo(() => {
    const highlightItems = useMemo(() => [
        { title: '多步思考 (Chain-of-Thought)', icon: <Brain />, desc: '每个 Agent 强制要求 Thought -> Action 闭环，行为可追溯。' },
        { title: 'SVID 身份透传', icon: <Key />, desc: '工具层调用时，物理层级透传由 Identity Manager 签发的受限 Token。' },
        { title: '冷热记忆分离存储', icon: <Database />, desc: '短期会话存于内存缓存，长期知识与事实存于多模态向量索引。' },
        { title: '动态护栏注入', icon: <Shield />, desc: '根据业务敏感度，动态调整注入检测的深度与强度。' }
    ], []);

    return (
        <div className="bg-gradient-to-br from-purple-900/20 to-transparent border border-white/10 p-10 rounded-[3rem]">
            <h4 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                <Zap className="text-purple-400 w-6 h-6" /> 关键架构设计亮点
            </h4>
            <div className="grid grid-cols-1 gap-6">
                {highlightItems.map((item) => (
                    <div key={item.title} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="text-purple-400">{item.icon}</div>
                            <div className="text-lg font-black text-white leading-none">{item.title}</div>
                        </div>
                        <p className="text-sm text-slate-400 font-medium">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
});

const ArchNode = memo(({ title, icon, color, items, horizontal }) => {
    const colorClasses = useMemo(() => ({
        blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
        purple: 'border-purple-500/40 bg-purple-500/10 text-purple-400',
        red: 'border-red-500/40 bg-red-500/10 text-red-400',
        indigo: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400',
        amber: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
        slate: 'border-slate-500/40 bg-slate-500/10 text-slate-400',
        emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
    }), []);

    return (
        <div className={`border-2 ${colorClasses[color]} p-5 rounded-3xl min-w-[200px]`}>
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
                <div className="font-black uppercase tracking-wider text-sm">{title}</div>
            </div>
            <div className={`flex ${horizontal ? 'flex-row gap-3' : 'flex-col gap-2'}`}>
                {items.map(item => (
                    <div key={item} className="text-xs font-black px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 whitespace-nowrap">
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
});

const ArrowDown = memo(() => (
    <div className="flex flex-col items-center">
        <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500/50 to-purple-500/50"></div>
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-purple-500/50"></div>
    </div>
));

export default ArchitectureViz;