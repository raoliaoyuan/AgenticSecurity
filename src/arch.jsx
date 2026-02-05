import React, { useState, useMemo, useCallback, memo } from 'react';
import Xarrow, { Xwrapper, useXarrow } from 'react-xarrows';
// 导入架构 Schema 配置 - LLM 可直接阅读此文件理解架构逻辑
import PROCESS_VIEW_SCHEMA, { schemaToMermaid, getSchemaSummary } from './processViewSchema';
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
        className={`group/card relative bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 ${isActive ? 'ring-2 ring-blue-500 shadow-xl shadow-blue-100' : 'hover:shadow-lg hover:border-blue-200 shadow-sm'}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
                {getIcon(comp.icon, 'w-6 h-6')}
            </div>
            <span className="font-black text-xl text-slate-900">{comp.name}</span>
        </div>
        <p className="text-base text-slate-500 leading-relaxed mb-6 font-medium">{comp.desc}</p>

        {/* 关键特性 */}
        <div className="space-y-3 mb-6">
            <div className="text-xs font-black text-slate-300 uppercase tracking-widest">关键特性</div>
            <div className="flex flex-wrap gap-2">
                {comp.features.map(f => (
                    <span key={f} className="text-xs bg-slate-50 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 group-hover/card:border-blue-500/30 transition-colors">
                        • {f}
                    </span>
                ))}
            </div>
        </div>

        {showThreats && comp.threats && (
            <div className="flex flex-wrap gap-2 mt-4 pt-5 border-t border-slate-100">
                {comp.threats.map(t => (
                    <span key={t} className="text-sm font-black px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-200 flex items-center gap-1.5 hover:bg-red-100 transition-colors">
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
            <div className={`border ${layer.borderColor} ${layer.color} rounded-[2.5rem] p-8 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200 hover:bg-white`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <div className={`p-4 bg-white rounded-2xl border ${layer.borderColor} shadow-sm`}>
                            {getIcon(layer.icon, `w-8 h-8 text-${layer.iconColor}-600`)}
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mb-1">{layer.title}</h2>
                            <p className="text-xl text-slate-800 font-black tracking-tight">{layer.functionalDesc}</p>
                        </div>
                    </div>
                    {showThreats && (
                        <div className="hidden lg:flex items-center gap-3 text-sm text-red-600 font-black bg-white px-4 py-2 rounded-xl border border-red-100 shadow-sm shadow-red-50">
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
        <span className={`text-base font-black text-${color}-600 bg-${color}-50 px-2 py-1 rounded-lg h-fit border border-${color}-200`}>{threat.id}</span>
        <div>
            <div className="text-lg font-black text-slate-700 group-hover/threat:text-slate-900 transition-colors">{threat.name}</div>
            <p className="text-sm text-slate-500 font-medium">{threat.desc}</p>
        </div>
    </div>
));

// Memoized 威胁模型摘要
const ThreatSection = memo(({ section }) => (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
            {React.cloneElement(section.icon, { className: 'w-6 h-6' })} {section.title}
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
    const [activeTab, setActiveTab] = useState('logical');

    // 使用 useMemo 缓存静态数据
    const layers = useMemo(() => [
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
    ], []);

    const threatLists = useMemo(() => ({
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
        <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900 leading-normal selection:bg-blue-200">
            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.4]" style={{
                backgroundImage: `radial-gradient(#cbd5e1 0.5px, transparent 0.5px)`,
                backgroundSize: '24px 24px'
            }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-8">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-blue-600 text-white shadow-xl shadow-blue-200 rounded-2xl">
                                <Shield className="w-10 h-10" />
                            </div>
                            <h1 className="text-5xl font-black text-slate-900 tracking-tight">
                                AgenticSecurity <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Blueprint</span>
                            </h1>
                        </div>
                        <p className="text-slate-500 text-xl font-medium ml-1">企业级 Agent 安全架构全链路解析 (V5.0)</p>
                    </div>
                </header>

                <div className="flex flex-wrap gap-2 mb-8 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-fit">
                    {[
                        { id: 'logical', label: '逻辑架构', icon: Shield, color: 'blue' },
                        { id: 'process', label: '运行架构', icon: Layers, color: 'purple' },
                        { id: 'development', label: '开发架构', icon: Code2, color: 'indigo' },
                        { id: 'data', label: '数据架构', icon: Database, color: 'cyan' },
                        { id: 'physical', label: '物理架构', icon: Server, color: 'emerald' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`px-5 py-2.5 rounded-xl text-base font-black transition-all duration-200 flex items-center gap-2 ${activeTab === tab.id ? `bg-${tab.color}-600 text-white shadow-lg shadow-${tab.color}-200` : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                        >
                            <tab.icon className="w-4 h-4" /> {tab.label}
                        </button>
                    ))}
                    <div className="w-px h-8 bg-slate-200 mx-2 self-center"></div>
                    <button
                        onClick={handleToggleThreats}
                        className={`px-5 py-2.5 rounded-xl text-base font-black transition-colors duration-200 flex items-center gap-2 border ${showThreats ? 'bg-red-50 border-red-200 text-red-600 shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Skull className="w-4 h-4" />
                        {showThreats ? '威胁透视: ON' : '威胁透视: OFF'}
                    </button>
                </div>

                {activeTab === 'logical' && (
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
                )}
                {activeTab === 'process' && <ProcessView />}
                {activeTab === 'development' && <DevelopmentView />}
                {activeTab === 'data' && <DataView />}
                {activeTab === 'physical' && <PhysicalView />}

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


const ProcessView = memo(() => {
    // =========================================================================
    // 数据驱动：基于 Google Multi-Agent 架构重新设计
    // 优化: 1) 所有连接线使用水平/垂直线 2) 中英双语 3) 一页内展示
    // =========================================================================
    const schema = PROCESS_VIEW_SCHEMA;

    // 开发模式下输出 Schema 摘要
    useMemo(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log('📐 ProcessView Schema Summary:', getSchemaSummary(schema));
        }
    }, [schema]);

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* 标题 */}
            <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
                    <Layers className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-3xl font-black text-slate-900">{schema.metadata.title}</h3>
                    <p className="text-slate-500 text-sm">{schema.metadata.subtitle}</p>
                </div>
            </div>

            {/* 主架构图 */}
            <div className="relative bg-white rounded-3xl border border-slate-200 p-6 shadow-xl">
                <Xwrapper>
                    {/* ========== 顶部：用户入口 ========== */}
                    <div className="flex justify-center gap-20 mb-4">
                        <div id="user-app" className="flex flex-col items-center gap-2">
                            <div className="w-14 h-14 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center shadow-md">
                                <User className="w-7 h-7 text-slate-600" />
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-bold text-slate-700">应用用户</div>
                                <div className="text-xs text-slate-400">App Users</div>
                            </div>
                        </div>
                        <div id="user-dev" className="flex flex-col items-center gap-2">
                            <div className="w-14 h-14 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center shadow-md">
                                <Code2 className="w-7 h-7 text-slate-600" />
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-bold text-slate-700">AI 开发者</div>
                                <div className="text-xs text-slate-400">AI Developers</div>
                            </div>
                        </div>
                    </div>

                    {/* Step 1: Prompt */}
                    <div className="flex flex-col items-center mb-3">
                        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
                            <span className="flex items-center justify-center w-6 h-6 bg-emerald-600 text-white text-xs font-black rounded-full">1</span>
                            <span className="text-sm font-bold text-emerald-700">提示词 Prompt</span>
                        </div>
                        <div className="w-px h-4 bg-emerald-300"></div>
                    </div>

                    {/* ========== Frontend ========== */}
                    <div className="flex justify-center mb-3">
                        <div id="node-frontend" className="bg-white border-2 border-slate-300 rounded-xl px-6 py-3 shadow-md flex items-center gap-3">
                            <Globe className="w-6 h-6 text-slate-600" />
                            <div>
                                <div className="font-bold text-slate-800 text-lg">前端服务</div>
                                <div className="text-xs text-slate-500">Frontend Service</div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Response */}
                    <div className="flex flex-col items-center mb-3">
                        <div className="w-px h-3 bg-slate-300"></div>
                        <div className="flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200">
                            <span className="flex items-center justify-center w-6 h-6 bg-slate-500 text-white text-xs font-black rounded-full">2</span>
                            <span className="text-sm font-bold text-slate-600">响应 Response</span>
                        </div>
                        <div className="w-px h-3 bg-slate-300"></div>
                    </div>

                    {/* ========== 企业环境大框 ========== */}
                    <div className="bg-gradient-to-br from-blue-50/60 to-slate-50/40 border-2 border-blue-200 rounded-2xl p-5 relative">
                        <div className="absolute -top-3.5 left-8 bg-blue-600 px-4 py-1.5 rounded-full text-sm font-black text-white shadow-lg flex items-center gap-2">
                            <Shield className="w-4 h-4" /> 企业环境 Enterprise Environment
                        </div>

                        {/* 三栏布局 */}
                        <div className="grid grid-cols-12 gap-4 mt-3">

                            {/* === 左列：控制平面 === */}
                            <div className="col-span-3">
                                <div id="node-control-plane" className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 h-full">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Cpu className="w-5 h-5 text-purple-600" />
                                        <div>
                                            <div className="text-sm font-black text-purple-700">控制平面</div>
                                            <div className="text-xs text-purple-400 uppercase">Control Plane</div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <CompactItem icon={<Cpu className="w-4 h-4" />} cn="意图编排" en="Orchestrator" />
                                        <CompactItem icon={<Lock className="w-4 h-4" />} cn="身份管理" en="Identity" />
                                        <CompactItem icon={<Brain className="w-4 h-4" />} cn="记忆管理" en="Memory" />
                                        <CompactItem icon={<Activity className="w-4 h-4" />} cn="配额管理" en="Quota" />
                                    </div>
                                    <div className="mt-3 pt-2 border-t border-purple-100">
                                        <div className="text-xs text-purple-400 uppercase mb-1.5">治理 Governance</div>
                                        <div className="flex flex-wrap gap-1">
                                            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded">审计</span>
                                            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded">策略</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* === 中列：Agent 编排层 === */}
                            <div className="col-span-5">
                                <div id="orchestration-layer" className="bg-emerald-50/50 border-2 border-emerald-300 rounded-2xl p-4 relative h-full">
                                    <div className="absolute -top-3 left-4 bg-emerald-600 px-3 py-1 rounded-full text-xs font-black text-white shadow">
                                        智能体编排层 Agent Orchestration
                                    </div>

                                    {/* Coordinator */}
                                    <div id="node-coordinator" className="bg-white border-2 border-emerald-400 rounded-xl p-3 mt-3 mb-3 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                                <Cpu className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 text-base">协调器代理</div>
                                                <div className="text-xs text-emerald-600 font-bold uppercase">Coordinator Agent</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex items-center gap-2 mb-3 mt-4">
                                        <span className="flex items-center justify-center w-5 h-5 bg-emerald-600 text-white text-xs font-black rounded-full">3</span>
                                        <span className="text-xs font-bold text-slate-500">子代理调用 Subagent</span>
                                    </div>

                                    {/* 子代理模式 */}
                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                        <div id="pattern-seq" className="bg-white border border-blue-200 rounded-lg p-2">
                                            <div className="text-xs text-blue-500 font-bold mb-1.5">顺序 Sequential</div>
                                            <div className="space-y-1.5">
                                                <div className="bg-blue-50 rounded px-2 py-1 text-xs text-center font-medium">Task-A</div>
                                                <div className="bg-blue-50 rounded px-2 py-1 text-xs text-center font-medium">Task-A.1</div>
                                            </div>
                                        </div>
                                        <div id="pattern-iter" className="bg-white border border-orange-200 rounded-lg p-2">
                                            <div className="text-xs text-orange-500 font-bold mb-1.5">迭代 Iterative ↺</div>
                                            <div className="space-y-1.5">
                                                <div className="bg-orange-50 rounded px-2 py-1 text-xs text-center font-medium">Task-B</div>
                                                <div className="flex gap-1">
                                                    <div className="bg-orange-50 rounded px-1.5 py-1 text-xs flex-1 text-center">Eval</div>
                                                    <div className="bg-orange-50 rounded px-1.5 py-1 text-xs flex-1 text-center">Enhance</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 4 + Response Generator */}
                                    <div className="flex items-center gap-2 mb-2 mt-2">
                                        <span className="flex items-center justify-center w-5 h-5 bg-emerald-600 text-white text-xs font-black rounded-full">4</span>
                                        <span className="text-xs font-bold text-slate-500">结果整合 Result Aggregation</span>
                                    </div>
                                    <div id="node-response-gen" className="bg-emerald-100 border border-emerald-300 rounded-lg p-2.5 flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                        <div>
                                            <div className="font-bold text-slate-800 text-sm">响应生成器</div>
                                            <div className="text-xs text-emerald-600">Response Generator</div>
                                        </div>
                                    </div>

                                    {/* 运行时 */}
                                    <div className="mt-2 pt-2 border-t border-emerald-200 flex items-center justify-center gap-2 text-xs text-slate-500">
                                        <Globe className="w-3 h-3" /> Cloud Run
                                        <span className="text-slate-300">|</span>
                                        <Bot className="w-3 h-3" /> Agent Engine
                                    </div>
                                </div>
                            </div>

                            {/* === 右列：模型运行时 === */}
                            <div className="col-span-4">
                                <div id="model-runtime" className="bg-slate-50 border border-slate-200 rounded-2xl p-4 h-full">
                                    <div className="text-xs font-bold text-slate-500 mb-3 uppercase">模型运行时 Model Runtime</div>

                                    {/* Model Armor */}
                                    <div id="node-model-armor" className="bg-white border-2 border-emerald-300 rounded-xl p-3 mb-3 flex items-center gap-3 shadow-sm">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                            <Shield className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-700 text-sm">模型护甲</div>
                                            <div className="text-xs text-slate-500">Model Armor</div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center mb-2">
                                        <div className="w-px h-4 bg-slate-300"></div>
                                    </div>

                                    {/* AI Model */}
                                    <div id="node-ai-model" className="bg-white border border-slate-200 rounded-xl p-3">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <Brain className="w-5 h-5 text-blue-500" />
                                            <div>
                                                <div className="font-bold text-slate-700 text-sm">AI 模型</div>
                                                <div className="text-xs text-slate-400">AI Model (Gemini)</div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-500 ml-7">
                                            Vertex AI / Cloud Run / GKE
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ========== MCP 区域 ========== */}
                        <div className="mt-4 pt-3 border-t-2 border-dashed border-slate-200">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-black rounded-full">5</span>
                                <span className="text-sm font-bold text-slate-600">MCP 客户端 MCP Clients</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* 内部工具 */}
                                <div id="tools-internal" className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                                    <div className="text-xs font-bold text-blue-600 mb-2 uppercase">内部工具 Internal Tools</div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <Database className="w-5 h-5 text-blue-500" />
                                            <span className="text-xs text-slate-600">数据库</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <Code2 className="w-5 h-5 text-blue-500" />
                                            <span className="text-xs text-slate-600">APIs</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 外部工具 */}
                                <div id="tools-external" className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-3">
                                    <div className="text-xs font-bold text-slate-500 mb-2 uppercase">外部工具 External Tools</div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <Globe className="w-5 h-5 text-slate-500" />
                                            <span className="text-xs text-slate-500">服务</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <FileSearch className="w-5 h-5 text-slate-500" />
                                            <span className="text-xs text-slate-500">文件</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 可观测性 */}
                        <div className="mt-3 flex justify-center">
                            <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
                                <Activity className="w-4 h-4 text-slate-500" />
                                <span className="text-sm text-slate-600">可观测性 Observability</span>
                            </div>
                        </div>
                    </div>

                    {/* ========== 底部角色 ========== */}
                    <div className="flex justify-center gap-12 mt-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <User className="w-4 h-4" />
                            <span>平台管理员 Admins</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Server className="w-4 h-4" />
                            <span>运维工程师 DevOps</span>
                        </div>
                    </div>

                    {/* ========== 连接线 - 全部使用 grid 路径 ========== */}

                    {/* User -> Frontend */}
                    <Xarrow
                        start="user-app"
                        end="node-frontend"
                        color="#10b981"
                        strokeWidth={2}
                        path="grid"
                        startAnchor="bottom"
                        endAnchor="top"
                        showHead={true}
                        headSize={5}
                        labels={{ middle: <div className="text-[10px] text-emerald-600 bg-white px-2 py-0.5 rounded border border-emerald-100 shadow-sm font-bold">提示词 Prompt</div> }}
                    />

                    <Xarrow
                        start="user-dev"
                        end="node-frontend"
                        color="#64748b"
                        strokeWidth={2}
                        path="grid"
                        startAnchor="bottom"
                        endAnchor="top"
                        showHead={true}
                        headSize={5}
                        labels={{ middle: <div className="text-[10px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-100 shadow-sm font-bold">配置/指令 Config</div> }}
                    />

                    {/* 控制平面 -> Coordinator (策略) */}
                    <Xarrow
                        start="node-control-plane"
                        end="node-coordinator"
                        color="#9333ea"
                        strokeWidth={2}
                        path="grid"
                        startAnchor={{ position: "right", offset: { y: 0 } }}
                        endAnchor={{ position: "left", offset: { y: 0 } }}
                        showHead={true}
                        headSize={5}
                        dashness={{ strokeLen: 4, nonStrokeLen: 4 }}
                        gridBreak="50%"
                        labels={{ middle: <div className="text-xs text-purple-500 bg-white px-2 py-0.5 rounded border border-purple-200 shadow-sm font-bold">策略 Policy</div> }}
                    />

                    {/* Frontend -> Orchestration Layer */}
                    <Xarrow
                        start="node-frontend"
                        end="orchestration-layer"
                        color="#10b981"
                        strokeWidth={2}
                        path="grid"
                        startAnchor="bottom"
                        endAnchor="top"
                        showHead={true}
                        headSize={5}
                        gridBreak="50%"
                        labels={{ middle: <div className="text-xs text-emerald-600 bg-white px-2 py-0.5 rounded border border-emerald-100 shadow-sm font-bold">请求 Request</div> }}
                    />

                    {/* Coordinator -> Model Armor (推理请求) */}
                    <Xarrow
                        start="node-coordinator"
                        end="node-model-armor"
                        color="#64748b"
                        strokeWidth={2}
                        path="grid"
                        startAnchor={{ position: "right", offset: { y: 0 } }}
                        endAnchor={{ position: "left", offset: { y: 0 } }}
                        showHead={true}
                        headSize={5}
                        gridBreak="50%"
                        labels={{ middle: <div className="text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded shadow-sm">推理请求 Inference</div> }}
                    />

                    {/* Model Armor -> AI Model */}
                    <Xarrow
                        start="node-model-armor"
                        end="node-ai-model"
                        color="#64748b"
                        strokeWidth={2}
                        path="grid"
                        startAnchor="bottom"
                        endAnchor="top"
                        showHead={true}
                        headSize={5}
                        gridBreak="50%"
                        labels={{ middle: <div className="text-[9px] text-slate-500 bg-white px-1 rounded">安全审查 Security</div> }}
                    />

                    {/* AI Model -> Response Generator (推理响应) */}
                    <Xarrow
                        start="node-ai-model"
                        end="node-response-gen"
                        color="#10b981"
                        strokeWidth={2}
                        path="grid"
                        startAnchor={{ position: "left", offset: { y: 10 } }}
                        endAnchor={{ position: "right", offset: { y: 0 } }}
                        showHead={true}
                        headSize={5}
                        dashness={{ strokeLen: 4, nonStrokeLen: 4 }}
                        gridBreak="70%"
                        labels={{ middle: <div className="text-[10px] text-emerald-500 bg-white px-2 py-0.5 rounded border border-emerald-100 shadow-sm">文本返回 Text Result</div> }}
                    />

                    {/* Orchestration -> Internal Tools (MCP) */}
                    <Xarrow
                        start="orchestration-layer"
                        end="tools-internal"
                        color="#3b82f6"
                        strokeWidth={2}
                        path="grid"
                        startAnchor={{ position: "bottom", offset: { x: -60 } }}
                        endAnchor="top"
                        showHead={true}
                        headSize={5}
                        gridBreak="50%"
                        labels={{ middle: <div className="text-xs text-blue-500 bg-white px-2 py-0.5 rounded border border-blue-200 shadow-sm font-bold">内部调用 MCP</div> }}
                    />

                    {/* Orchestration -> External Tools (MCP) */}
                    <Xarrow
                        start="orchestration-layer"
                        end="tools-external"
                        color="#94a3b8"
                        strokeWidth={2}
                        path="grid"
                        startAnchor={{ position: "bottom", offset: { x: 60 } }}
                        endAnchor="top"
                        showHead={true}
                        headSize={5}
                        dashness={{ strokeLen: 4, nonStrokeLen: 4 }}
                        gridBreak="50%"
                        labels={{ middle: <div className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm font-bold">外部扩展 External Call</div> }}
                    />

                </Xwrapper>
            </div>
        </div>
    );
});

// 紧凑型控制平面项组件
const CompactItem = memo(({ icon, cn, en }) => (
    <div className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-1.5 border border-purple-100">
        <div className="text-purple-500">{icon}</div>
        <div>
            <div className="text-xs font-bold text-purple-700">{cn}</div>
            <div className="text-xs text-purple-400">{en}</div>
        </div>
    </div>
));

// 子代理卡片组件
const SubagentBox = memo(({ label, sublabel, small }) => (
    <div className={`bg-slate-50 border border-slate-200 rounded-lg ${small ? 'p-2' : 'p-3'} flex items-center gap-2`}>
        <div className={`${small ? 'w-6 h-6' : 'w-8 h-8'} bg-white rounded flex items-center justify-center border border-slate-100`}>
            <Bot className={`${small ? 'w-3 h-3' : 'w-4 h-4'} text-slate-500`} />
        </div>
        <div>
            <div className={`font-bold text-slate-700 ${small ? 'text-xs' : 'text-sm'}`}>{label}</div>
            <div className="text-[9px] text-slate-400">{sublabel}</div>
        </div>
    </div>
));

// ========== 三栏式面板组件 ==========

// 控制平面面板
const ControlPlanePanel = memo(() => (
    <div id="node-control-plane" className="bg-purple-50/50 border border-purple-200 rounded-2xl p-5 h-full relative">
        <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-100 rounded-xl">
                <Cpu className="w-5 h-5 text-purple-600" />
            </div>
            <div>
                <div className="text-sm font-black text-purple-700">控制平面</div>
                <div className="text-[10px] text-purple-400 uppercase tracking-widest">Control Plane</div>
            </div>
        </div>
        <div className="space-y-3 relative z-10">
            <ControlPlaneItem icon={<Cpu />} title="意图编排引擎" desc="Intent Orchestrator" />
            <ControlPlaneItem icon={<Lock />} title="身份管理器" desc="Identity Manager" />
            <ControlPlaneItem icon={<Brain />} title="记忆管理器" desc="Memory Manager" />
            <ControlPlaneItem icon={<Activity />} title="配额管理器" desc="Quota Manager" />
        </div>
        <div className="mt-4 pt-4 border-t border-purple-100">
            <div className="text-[10px] text-purple-400 uppercase tracking-widest mb-2">Policy Governance</div>
            <div className="flex flex-wrap gap-1">
                <span className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full border border-purple-200">审计日志</span>
                <span className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full border border-purple-200">策略执行</span>
            </div>
        </div>
    </div>
));

// 智能体编排面板
const AgentOrchestrationPanel = memo(() => (
    <div className="bg-emerald-50/30 border-2 border-emerald-200 rounded-2xl p-5 relative">
        <div className="absolute -top-3 left-6 bg-emerald-600 px-4 py-1 rounded-full text-xs font-black text-white shadow-lg shadow-emerald-200">
            Agent Orchestration Layer
        </div>

        <div className="flex flex-col items-center gap-4 mt-4">
            {/* 新增：接入层 (Access Layer) */}
            <div className="bg-white border-2 border-blue-100 rounded-xl p-3 flex items-center gap-3 shadow-md w-full max-w-md">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Globe className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                    <div className="font-black text-slate-800 text-sm">接入层服务</div>
                    <div className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Frontend / Access Layer</div>
                </div>
            </div>

            <ConnectorVertical height={16} color="blue" arrow />

            {/* Coordinator Agent */}
            <div id="node-coordinator" className="bg-white border-2 border-emerald-300 rounded-2xl p-4 flex items-center gap-4 shadow-lg shadow-emerald-100 w-full max-w-md">
                <div className="w-14 h-14 bg-emerald-100 border border-emerald-200 rounded-xl flex items-center justify-center">
                    <Cpu className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                    <div className="font-black text-lg text-slate-900">协调器代理</div>
                    <div className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Coordinator Agent</div>
                </div>
            </div>

            {/* 流程标记 Step 2 & Step 3 */}
            <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                    <FlowLabel label="Human-in-the-loop" step="2" />
                </div>
                <ConnectorVertical height={12} color="emerald" />

                <div className="flex items-center gap-2">
                    <FlowLabel label="Subagent Routing" step="3" />
                </div>
                <ConnectorVertical height={12} color="emerald" arrow />
            </div>

            {/* 子代理编排区域 - 双流程并排 */}
            <div className="w-full grid grid-cols-2 gap-4">
                {/* 顺序执行流程 */}
                <div id="node-subagents" className="bg-white border-2 border-blue-200 rounded-2xl p-4 relative">
                    <div className="absolute -top-2.5 left-4 bg-blue-500 px-3 py-0.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider">
                        Sequential Pattern
                    </div>
                    <div className="flex flex-col items-center gap-3 mt-3">
                        <SubagentNode title="职能代理" subtitle="Task-A Agent" color="blue" />
                        <ConnectorVertical height={16} color="blue" arrow />
                        <SubagentNode title="技术代理" subtitle="Task-A.1 Agent" color="blue" />
                    </div>
                </div>

                {/* 迭代优化流程 */}
                <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 relative">
                    <div className="absolute -top-2.5 left-4 bg-orange-500 px-3 py-0.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider">
                        Iterative Refinement
                    </div>
                    <div className="flex flex-col items-center gap-2 mt-3">
                        <SubagentNode title="任务代理" subtitle="Task-B Agent" color="orange" />
                        <div className="flex items-center gap-2 w-full">
                            <div className="flex-1 h-px bg-orange-200"></div>
                            <span className="text-[10px] text-orange-400 italic">loop</span>
                            <div className="flex-1 h-px bg-orange-200"></div>
                        </div>
                        <div className="flex gap-2 w-full">
                            <SubagentNode title="质量评估" subtitle="Evaluator" color="orange" small />
                            <SubagentNode title="提示增强" subtitle="Enhancer" color="purple" small />
                        </div>
                        <div className="text-[10px] text-orange-400 italic bg-orange-50 px-2 py-0.5 rounded-full">
                            ↺ If rework required
                        </div>
                    </div>
                </div>
            </div>

            {/* 响应生成器 */}
            <div className="flex items-center gap-2 mt-2">
                <FlowLabel label="Response Aggregation" step="4" />
            </div>
            <ConnectorVertical height={16} color="emerald" />
            <div id="node-response-generator" className="bg-emerald-100 border-2 border-emerald-300 rounded-2xl p-4 flex items-center gap-4 shadow-md w-full max-w-md">
                <div className="w-12 h-12 bg-white border border-emerald-200 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                    <div className="font-black text-slate-900">响应生成器</div>
                    <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Response Generator + Validation</div>
                </div>
            </div>
        </div>
    </div>
));

// 模型运行时面板
const ModelRuntimePanel = memo(() => (
    <div className="h-full flex flex-col">
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-blue-500"></div>

            <div className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center mb-3">Inference Pipeline</div>

            {/* Ingress Point */}
            <div id="node-runtime-ingress" className="flex justify-center mb-2">
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Agent Requests
                </div>
            </div>

            {/* 安全护栏 (Middleware) */}
            <div className="bg-red-50 border-2 border-red-100 rounded-xl p-3 relative mb-2 z-10 shadow-sm">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-200 rounded-r"></div>
                <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-red-500" />
                    <div>
                        <div className="text-xs font-black text-red-700 leading-none">安全护栏</div>
                        <div className="text-[9px] text-red-400 uppercase tracking-widest">Middleware</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-1 relative">
                    {/* 穿透箭头背景 */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-red-200 opacity-20 text-4xl font-black">↓</div>
                    <span className="text-[9px] bg-white text-red-500 px-1.5 py-0.5 rounded border border-red-100 text-center">Prompt 注入</span>
                    <span className="text-[9px] bg-white text-red-500 px-1.5 py-0.5 rounded border border-red-100 text-center">PII 脱敏</span>
                    <span className="text-[9px] bg-white text-red-500 px-1.5 py-0.5 rounded border border-red-100 text-center">幻觉检测</span>
                    <span className="text-[9px] bg-white text-red-500 px-1.5 py-0.5 rounded border border-red-100 text-center">内容风控</span>
                </div>
            </div>

            {/* 管道连接 */}
            <div className="flex justify-center -my-1 relative z-0">
                <div className="w-0.5 h-6 bg-slate-200"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-[9px] text-slate-400 border border-slate-100 rounded-full">Safe</div>
            </div>

            {/* 模型运行时 */}
            <div id="node-runtime-egress" className="bg-blue-50/50 border-2 border-blue-100 rounded-xl p-3 flex-1 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-blue-500" />
                    <div>
                        <div className="text-xs font-black text-slate-700 leading-none">LLM 运行时</div>
                        <div className="text-[9px] text-blue-400 uppercase tracking-widest">Model Engine</div>
                    </div>
                </div>
                <div className="space-y-1.5">
                    <RuntimeOption label="Vertex AI" highlight />
                    <RuntimeOption label="Cloud Run" />
                </div>
            </div>

            {/* A2A 协议 */}
            <div className="mt-auto pt-3 text-center">
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 border border-indigo-100 rounded text-[9px] text-indigo-500 font-bold">
                    <Activity className="w-3 h-3" /> A2A Protocol
                </div>
            </div>
        </div>
    </div>
));

// 工具与基础设施面板
const ToolsAndInfraPanel = memo(() => (
    <div className="grid grid-cols-2 gap-4">
        {/* 内部工具 */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="text-xs text-amber-600 font-black mb-3 uppercase tracking-widest">Enterprise Tools</div>
            <div className="flex gap-2 flex-wrap">
                <ToolNode icon={<Database />} title="企业数据库" />
                <ToolNode icon={<Code2 />} title="内部 APIs" />
                <ToolNode icon={<FileSearch />} title="RAG 引擎" />
            </div>
            <div className="text-[10px] text-amber-400 mt-2 text-center uppercase tracking-widest">MCP Servers</div>
        </div>

        {/* 基础设施 */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="text-xs text-slate-500 font-black mb-3 uppercase tracking-widest">Infrastructure</div>
            <div className="grid grid-cols-3 gap-2">
                <InfraNode icon={<Database />} title="存储" items={['向量库', '缓存']} compact />
                <InfraNode icon={<Server />} title="计算" items={['沙箱', '隔离']} compact />
                <InfraNode icon={<Key />} title="密钥" items={['HSM', '轮换']} compact />
            </div>
            <div className="flex justify-center mt-2">
                <Activity className="w-4 h-4 text-slate-300" />
                <span className="text-[10px] text-slate-400 ml-1">Observability</span>
            </div>
        </div>
    </div>
));

// ========== 增强连接线组件 ==========

// 垂直连接器
const ConnectorVertical = memo(({ height = 30, color = 'slate', arrow = false }) => {
    const colorMap = {
        slate: 'bg-slate-200',
        emerald: 'bg-emerald-300',
        blue: 'bg-blue-300',
        purple: 'bg-purple-300',
    };
    const arrowColorMap = {
        slate: 'border-t-slate-300',
        emerald: 'border-t-emerald-400',
        blue: 'border-t-blue-400',
        purple: 'border-t-purple-400',
    };
    return (
        <div className="flex flex-col items-center">
            <div className={`w-0.5 ${colorMap[color]}`} style={{ height: `${height}px` }}></div>
            {arrow && (
                <div className={`w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] ${arrowColorMap[color]}`}></div>
            )}
        </div>
    );
});



// 用户节点
const UserNode = memo(({ title, subtitle, icon, small }) => (
    <div className={`flex flex-col items-center ${small ? 'gap-2' : 'gap-3'}`}>
        <div className={`bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-100 transition-transform hover:-translate-y-1 ${small ? 'w-14 h-14' : 'w-20 h-20'}`}>
            <div className="text-slate-600">{React.cloneElement(icon, { size: small ? 24 : 32 })}</div>
        </div>
        <div className="text-center leading-tight">
            <div className={`font-black text-slate-900 ${small ? 'text-sm' : 'text-base'}`}>{title}</div>
            <div className={`text-slate-400 font-bold uppercase tracking-tighter ${small ? 'text-[10px]' : 'text-xs'}`}>{subtitle}</div>
        </div>
    </div>
));

// 步进标注
const FlowLabel = memo(({ label, step, centered }) => (
    <div className={`flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
        {step && <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-black rounded-full shadow-lg shadow-blue-200">{step}</span>}
        <span className="text-sm font-black text-blue-600/80 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">{label}</span>
    </div>
));

// 逻辑架构节点
const LogicNode = memo(({ title, subtitle, icon, color, items }) => {
    const colorMap = {
        blue: 'bg-blue-50 border-blue-200 text-blue-700',
        purple: 'bg-purple-50 border-purple-200 text-purple-700',
        emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    };
    return (
        <div className={`group/node relative border-2 ${colorMap[color]} p-6 rounded-3xl min-w-[280px] shadow-sm hover:shadow-xl transition-all duration-300 bg-white`}>
            <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-2xl bg-${color}-50 border border-${color}-100`}>
                    {React.cloneElement(icon, { size: 24, className: `text-${color}-600` })}
                </div>
                <div>
                    <div className="font-black text-slate-900 leading-none mb-1">{title}</div>
                    <div className="text-xs text-slate-400 font-bold tracking-widest">{subtitle}</div>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {items.map(item => (
                    <span key={item} className={`text-xs font-black px-3 py-1.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-600 transition-colors group-hover/node:bg-${color}-50 group-hover/node:border-${color}-200`}>{item}</span>
                ))}
            </div>
        </div>
    );
});

// Coordinator 节点
const CoordinatorNode = memo(() => (
    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 flex items-center gap-5 shadow-lg shadow-emerald-50 transition-transform hover:-translate-y-1">
        <div className="w-16 h-16 bg-white border border-emerald-200 rounded-2xl flex items-center justify-center shadow-sm">
            <Cpu className="w-8 h-8 text-emerald-600" />
        </div>
        <div>
            <div className="font-black text-xl text-slate-900">编排智能体</div>
            <div className="text-xs text-emerald-600 font-black uppercase tracking-[0.2em] mt-1">Coordinator Agent</div>
        </div>
    </div>
));

// 子代理节点
const SubagentNode = memo(({ title, subtitle, color, small, highlight }) => {
    const colors = {
        emerald: 'border-emerald-200 bg-emerald-50 text-emerald-900 shadow-emerald-50',
        orange: 'border-orange-200 bg-orange-50 text-orange-900 shadow-orange-50',
        purple: 'border-purple-200 bg-purple-50 text-purple-900 shadow-purple-50',
    };
    return (
        <div className={`border-2 ${colors[color]} rounded-2xl p-4 transition-all hover:shadow-lg ${small ? 'text-xs' : ''} ${highlight ? 'ring-2 ring-blue-400 ring-offset-2' : ''} bg-white`}>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                    <div className="font-black text-slate-900 text-sm leading-none mb-1">{title}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{subtitle}</div>
                </div>
            </div>
        </div>
    );
});

// 运行时选项
const RuntimeOption = memo(({ label, highlight }) => (
    <div className={`flex items-center gap-3 text-sm font-bold transition-colors cursor-default ${highlight ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'}`}>
        <div className={`w-5 h-5 rounded flex items-center justify-center shadow-sm ${highlight ? 'bg-blue-100 border border-blue-200' : 'bg-slate-100'}`}>
            <Server className="w-3 h-3" />
        </div>
        <span>{label}</span>
        {highlight && <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">推荐</span>}
    </div>
));


// 运行时徽章
const RuntimeBadge = memo(({ label }) => (
    <span className="px-3 py-1.5 bg-slate-100 rounded-xl text-xs text-slate-600 border border-slate-200 font-black shadow-sm">{label}</span>
));

// 控制平面项
const ControlPlaneItem = memo(({ icon, title, desc }) => (
    <div className="flex items-center gap-3 group/cp cursor-default">
        <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center border border-purple-200 shadow-sm group-hover/cp:bg-purple-600 transition-colors">
            {React.cloneElement(icon, { className: 'w-4 h-4 text-purple-600 group-hover/cp:text-white transition-colors' })}
        </div>
        <div>
            <div className="text-sm text-slate-700 font-black transition-colors group-hover/cp:text-slate-900">{title}</div>
            {desc && <div className="text-[10px] text-slate-400">{desc}</div>}
        </div>
    </div>
));


// 工具节点
const ToolNode = memo(({ icon, title, external }) => (
    <div className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all cursor-default ${external ? 'bg-slate-50 border border-slate-200 shadow-sm hover:translate-y-1' : 'bg-amber-50 border border-amber-200 shadow-md hover:-translate-y-1'}`}>
        {React.cloneElement(icon, { className: `w-8 h-8 ${external ? 'text-slate-400' : 'text-amber-600'}` })}
        <span className={`text-xs mt-2 font-black uppercase tracking-tighter ${external ? 'text-slate-400' : 'text-amber-700'}`}>{title}</span>
    </div>
));

// 基础设施节点
const InfraNode = memo(({ icon, title, items, compact }) => {
    if (compact) {
        return (
            <div className="bg-white border border-slate-100 rounded-xl p-3 text-center hover:shadow-md transition-all">
                {React.cloneElement(icon, { className: 'w-5 h-5 text-slate-500 mx-auto mb-1' })}
                <div className="text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1">{title}</div>
                <div className="flex flex-wrap gap-0.5 justify-center">
                    {items.map(item => (
                        <span key={item} className="text-[8px] text-slate-400">{item}</span>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="bg-white border border-slate-200 rounded-[1.5rem] p-5 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    {React.cloneElement(icon, { className: 'w-5 h-5 text-slate-600' })}
                </div>
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{title}</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {items.map(item => (
                    <span key={item} className="text-[10px] font-black bg-slate-50 px-2 py-1 rounded-lg text-slate-500 border border-slate-100">{item}</span>
                ))}
            </div>
        </div>
    );
});


// 简单箭头
const ArrowDownSimple = memo(() => (
    <div className="flex flex-col items-center">
        <div className="w-0.5 h-6 bg-slate-100"></div>
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-200"></div>
    </div>
));

// 微型箭头
const ArrowDownTiny = memo(() => (
    <div className="flex flex-col items-center group/arrow">
        <div className="w-0.5 h-3 bg-emerald-200 group-hover/arrow:bg-emerald-400 transition-colors"></div>
        <div className="w-0 h-0 border-l-3 border-l-transparent border-r-3 border-r-transparent border-t-4 border-t-emerald-200 group-hover/arrow:border-t-emerald-400 transition-colors"></div>
    </div>
));

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
        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-10 rounded-[3rem] shadow-xl shadow-blue-50">
            <h4 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200">
                    <RotateCw className="w-6 h-6" />
                </div>
                请求处理全链路时序
            </h4>
            <div className="space-y-8">
                {timelineItems.map((item) => (
                    <div key={item.step} className="flex gap-6 group/item">
                        <div className="text-3xl font-black text-blue-600/20 tracking-tighter group-hover/item:text-blue-600/40 transition-colors pt-1">{item.step}</div>
                        <div>
                            <div className="text-xl font-black text-slate-800 mb-1">{item.title}</div>
                            <p className="text-slate-500 font-bold leading-relaxed">{item.desc}</p>
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
        <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 p-10 rounded-[3rem] shadow-xl shadow-purple-50">
            <h4 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <div className="p-2 bg-purple-600 text-white rounded-xl shadow-lg shadow-purple-200">
                    <Zap className="w-6 h-6" />
                </div>
                关键架构设计亮点
            </h4>
            <div className="grid grid-cols-1 gap-6">
                {highlightItems.map((item) => (
                    <div key={item.title} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="text-purple-600">{item.icon}</div>
                            <div className="text-lg font-black text-slate-900 leading-none">{item.title}</div>
                        </div>
                        <p className="text-sm text-slate-500 font-bold leading-relaxed">{item.desc}</p>
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

// --- 新增视图组件 ---

const DevelopmentView = memo(() => (
    <div className="space-y-8">
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-sm shadow-indigo-100">
                <Code2 className="w-8 h-8" />
            </div>
            <div>
                <h3 className="text-3xl font-black text-slate-900">开发架构视图 (Development View)</h3>
                <p className="text-slate-500 text-sm mt-1">代码组织、模块依赖与构建流水线</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50">
                <h4 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <Layers className="w-6 h-6 text-indigo-500" /> 技术栈矩阵
                </h4>
                <div className="space-y-6">
                    <DevStackItem label="Frontend" items={['React 18', 'Vite', 'Tailwind CSS', 'Lucide React']} />
                    <DevStackItem label="Backend" items={['Python 3.11', 'FastAPI', 'LangChain', 'Pydantic']} />
                    <DevStackItem label="Data" items={['PostgreSQL', 'Redis', 'Qdrant', 'MinIO']} />
                    <DevStackItem label="Infra" items={['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions']} />
                </div>
            </div>
            <div className="bg-slate-900 rounded-[2.5rem] p-10 shadow-xl shadow-slate-400/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <h4 className="text-2xl font-black text-white mb-8 flex items-center gap-3 relative z-10">
                    <Code2 className="w-6 h-6 text-indigo-400" /> 模块结构
                </h4>
                <div className="font-mono text-sm text-slate-300 bg-black/40 p-8 rounded-2xl border border-white/10 relative z-10 leading-relaxed">
                    <div className="mb-2 text-indigo-400 font-black">src/</div>
                    <div className="pl-6 border-l border-white/10 ml-1">
                        <div className="mb-1">├── <span className="text-white">api/</span> <span className="text-slate-500 ml-2">// REST & GraphQL endpoints</span></div>
                        <div className="mb-1">├── <span className="text-white">agents/</span> <span className="text-slate-500 ml-2">// Intelligent agent logic</span></div>
                        <div className="mb-1">├── <span className="text-white">core/</span> <span className="text-slate-500 ml-2">// Shared utilities & config</span></div>
                        <div className="mb-1">├── <span className="text-white">db/</span> <span className="text-slate-500 ml-2">// Database models & migrations</span></div>
                        <div className="mb-1">└── <span className="text-white">web/</span> <span className="text-slate-500 ml-2">// Frontend application</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
));

const DevStackItem = ({ label, items }) => (
    <div className="flex flex-col gap-3">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</span>
        <div className="flex flex-wrap gap-2">
            {items.map(i => <span key={i} className="text-xs font-black text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-colors cursor-default">{i}</span>)}
        </div>
    </div>
);

const DataView = memo(() => (
    <div className="space-y-8">
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cyan-50 text-cyan-600 rounded-2xl border border-cyan-100 shadow-sm shadow-cyan-100">
                <Database className="w-8 h-8" />
            </div>
            <div>
                <h3 className="text-3xl font-black text-slate-900">数据架构视图 (Data View)</h3>
                <p className="text-slate-500 text-sm mt-1">核心实体关系与数据流转管道</p>
            </div>
        </div>
        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-x-auto">
            <div className="min-w-[800px] flex justify-center gap-16">
                <EntityNode name="User" fields={['UUID', 'Role', 'SVID']} />
                <div className="flex items-center text-slate-300 font-black text-sm italic">── 1:N ──</div>
                <EntityNode name="Session" fields={['SessionID', 'Context', 'History']} />
                <div className="flex items-center text-slate-300 font-black text-sm italic">── 1:N ──</div>
                <EntityNode name="Memory" fields={['VectorID', 'Embedding', 'Metadata']} />
            </div>
            <div className="flex justify-center my-10">
                <div className="h-20 border-l-2 border-dashed border-slate-200"></div>
            </div>
            <div className="min-w-[800px] flex justify-center gap-16">
                <EntityNode name="Agent" fields={['AgentID', 'Tools', 'Prompt']} color="purple" />
                <div className="flex items-center text-slate-300 font-black text-sm italic">── USES ──</div>
                <EntityNode name="Tool" fields={['ToolID', 'Schema', 'ACL']} color="amber" />
            </div>
        </div>
    </div>
));

const EntityNode = ({ name, fields, color = 'cyan' }) => (
    <div className={`bg-${color}-50 border border-${color}-200 p-6 rounded-[2rem] min-w-[200px] shadow-sm hover:shadow-xl transition-all`}>
        <div className={`text-${color}-600 font-black mb-4 border-b border-${color}-100 pb-3 text-center text-lg tracking-widest uppercase`}>{name}</div>
        <div className="space-y-2">
            {fields.map(f => <div key={f} className="text-sm text-slate-600 font-bold flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full bg-${color}-400`}></div>
                {f}
            </div>)}
        </div>
    </div>
);

const PhysicalView = memo(() => (
    <div className="space-y-8">
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 shadow-sm shadow-emerald-100">
                <Server className="w-8 h-8" />
            </div>
            <div>
                <h3 className="text-3xl font-black text-slate-900">物理架构视图 (Physical View)</h3>
                <p className="text-slate-500 text-sm mt-1">云原生部署拓扑与网络边界</p>
            </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-[3.5rem] p-12 relative overflow-hidden shadow-xl">
            <div className="absolute top-6 left-10 bg-emerald-600 text-white px-5 py-2 rounded-full text-xs font-black border border-emerald-400 shadow-lg shadow-emerald-200 tracking-widest uppercase">
                Global Region Context
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
                <ZoneBox name="Public Subnet (DMZ)" color="slate">
                    <InfraComponent name="Load Balancer (WAF)" icon={<Globe />} />
                    <InfraComponent name="API Gateway" icon={<Link />} />
                </ZoneBox>
                <ZoneBox name="Private App Subnet" color="blue">
                    <InfraComponent name="K8s Cluster (EKS/GKE)" icon={<Server />} count={3} />
                    <InfraComponent name="Agent Replicas" icon={<Bot />} count={12} />
                </ZoneBox>
                <ZoneBox name="Private Data Subnet" color="emerald">
                    <InfraComponent name="Vector DB Cluster" icon={<Database />} />
                    <InfraComponent name="PostgreSQL Primary" icon={<Database />} />
                    <InfraComponent name="Redis High Availability" icon={<Zap />} />
                </ZoneBox>
            </div>
        </div>
    </div>
));

const ZoneBox = ({ name, children, color = 'slate' }) => (
    <div className="border border-slate-200 rounded-[2.5rem] p-8 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="text-[10px] font-black text-slate-400 uppercase mb-6 tracking-[0.2em] flex items-center gap-2">
            <span className="w-4 h-0.5 bg-slate-200"></span>
            {name}
        </div>
        <div className="space-y-4">{children}</div>
    </div>
);

const InfraComponent = ({ name, icon, count }) => (
    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:border-blue-300 transition-colors">
        <div className="text-slate-400 group-hover:text-blue-600 transition-colors">{icon}</div>
        <div className="text-sm font-black text-slate-700 leading-none">{name}</div>
        {count && <div className="ml-auto text-[10px] font-black bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{count} NODES</div>}
    </div>
);

// =====================================================================
// Schema 驱动的面板组件 (Data-Driven Panel Components)
// 这些组件从 PROCESS_VIEW_SCHEMA 读取数据并渲染精美的 UI
// LLM 只需修改 processViewSchema.js 即可影响这些视图
// =====================================================================

// 控制平面面板 - Schema 驱动版本
const ControlPlanePanelFromSchema = memo(({ controlPlane }) => (
    <div id="node-control-plane" className="bg-purple-50/50 border border-purple-200 rounded-2xl p-5 h-full relative">
        <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-100 rounded-xl">
                {getIcon(controlPlane.icon, 'w-5 h-5 text-purple-600')}
            </div>
            <div>
                <div className="text-sm font-black text-purple-700">{controlPlane.label}</div>
                <div className="text-[10px] text-purple-400 uppercase tracking-widest">{controlPlane.labelEn}</div>
            </div>
        </div>
        <div className="space-y-3 relative z-10">
            {controlPlane.components.map(comp => (
                <ControlPlaneItem
                    key={comp.id}
                    icon={getIcon(comp.icon, 'w-4 h-4')}
                    title={comp.label}
                    desc={comp.labelEn}
                />
            ))}
        </div>
        <div className="mt-4 pt-4 border-t border-purple-100">
            <div className="text-[10px] text-purple-400 uppercase tracking-widest mb-2">Policy Governance</div>
            <div className="flex flex-wrap gap-1">
                {controlPlane.governance.map(item => (
                    <span key={item} className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full border border-purple-200">{item}</span>
                ))}
            </div>
        </div>
    </div>
));

// 智能体编排面板 - Schema 驱动版本
const AgentOrchestrationPanelFromSchema = memo(({ orchestration, flowSteps }) => (
    <div className="bg-emerald-50/30 border-2 border-emerald-200 rounded-2xl p-5 relative">
        <div className="absolute -top-3 left-6 bg-emerald-600 px-4 py-1 rounded-full text-xs font-black text-white shadow-lg shadow-emerald-200">
            {orchestration.label}
        </div>

        <div className="flex flex-col items-center gap-4 mt-4">
            {/* 接入层 (Access Layer) */}
            <div className="bg-white border-2 border-blue-100 rounded-xl p-3 flex items-center gap-3 shadow-md w-full max-w-md">
                <div className="p-2 bg-blue-50 rounded-lg">
                    {getIcon(orchestration.accessLayer.icon, 'w-5 h-5 text-blue-500')}
                </div>
                <div>
                    <div className="font-black text-slate-800 text-sm">{orchestration.accessLayer.label}</div>
                    <div className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">{orchestration.accessLayer.labelEn}</div>
                </div>
            </div>

            <ConnectorVertical height={16} color="blue" arrow />

            {/* Coordinator Agent */}
            <div id="node-coordinator" className="bg-white border-2 border-emerald-300 rounded-2xl p-4 flex items-center gap-4 shadow-lg shadow-emerald-100 w-full max-w-md">
                <div className="w-14 h-14 bg-emerald-100 border border-emerald-200 rounded-xl flex items-center justify-center">
                    {getIcon(orchestration.coordinator.icon, 'w-7 h-7 text-emerald-600')}
                </div>
                <div>
                    <div className="font-black text-lg text-slate-900">{orchestration.coordinator.label}</div>
                    <div className="text-xs text-emerald-600 font-bold uppercase tracking-widest">{orchestration.coordinator.labelEn}</div>
                </div>
            </div>

            {/* 流程标记 Step 2 & Step 3 */}
            <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                    <FlowLabel label={flowSteps[1].label} step="2" />
                </div>
                <ConnectorVertical height={12} color="emerald" />

                <div className="flex items-center gap-2">
                    <FlowLabel label={flowSteps[2].label} step="3" />
                </div>
                <ConnectorVertical height={12} color="emerald" arrow />
            </div>

            {/* 子代理编排区域 - 双流程并排 */}
            <div className="w-full grid grid-cols-2 gap-4">
                {orchestration.subagentPatterns.map(pattern => (
                    <div
                        key={pattern.id}
                        id={pattern.type === 'sequential' ? 'node-subagents' : undefined}
                        className={`bg-white border-2 ${pattern.type === 'sequential' ? 'border-blue-200' : 'border-orange-200'} rounded-2xl p-4 relative`}
                    >
                        <div className={`absolute -top-2.5 left-4 ${pattern.type === 'sequential' ? 'bg-blue-500' : 'bg-orange-500'} px-3 py-0.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider`}>
                            {pattern.label}
                        </div>
                        <div className="flex flex-col items-center gap-3 mt-3">
                            {pattern.agents.map((agent, idx) => (
                                <React.Fragment key={agent.id}>
                                    <SubagentNode
                                        title={agent.label}
                                        subtitle={agent.labelEn}
                                        color={pattern.type === 'sequential' ? 'blue' : 'orange'}
                                    />
                                    {idx < pattern.agents.length - 1 && (
                                        <ConnectorVertical height={16} color={pattern.type === 'sequential' ? 'blue' : 'orange'} arrow />
                                    )}
                                </React.Fragment>
                            ))}
                            {pattern.evaluators && (
                                <>
                                    <div className="flex items-center gap-2 w-full">
                                        <div className="flex-1 h-px bg-orange-200"></div>
                                        <span className="text-[10px] text-orange-400 italic">loop</span>
                                        <div className="flex-1 h-px bg-orange-200"></div>
                                    </div>
                                    <div className="flex gap-2 w-full">
                                        {pattern.evaluators.map(e => (
                                            <SubagentNode
                                                key={e.id}
                                                title={e.label}
                                                subtitle={e.labelEn}
                                                color={e.id.includes('enhancer') ? 'purple' : 'orange'}
                                                small
                                            />
                                        ))}
                                    </div>
                                    <div className="text-[10px] text-orange-400 italic bg-orange-50 px-2 py-0.5 rounded-full">
                                        ↺ {pattern.loopCondition}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* 响应生成器 */}
            <div className="flex items-center gap-2 mt-2">
                <FlowLabel label={flowSteps[3].label} step="4" />
            </div>
            <ConnectorVertical height={16} color="emerald" />
            <div id="node-response-generator" className="bg-emerald-100 border-2 border-emerald-300 rounded-2xl p-4 flex items-center gap-4 shadow-md w-full max-w-md">
                <div className="w-12 h-12 bg-white border border-emerald-200 rounded-xl flex items-center justify-center">
                    {getIcon(orchestration.responseGenerator.icon, 'w-6 h-6 text-emerald-600')}
                </div>
                <div>
                    <div className="font-black text-slate-900">{orchestration.responseGenerator.label}</div>
                    <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">{orchestration.responseGenerator.labelEn}</div>
                </div>
            </div>
        </div>
    </div>
));

// 模型运行时面板 - Schema 驱动版本
const ModelRuntimePanelFromSchema = memo(({ pipeline }) => (
    <div className="h-full flex flex-col">
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-blue-500"></div>

            <div className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center mb-3">{pipeline.label}</div>

            {/* Ingress Point */}
            <div id="node-runtime-ingress" className="flex justify-center mb-2">
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Agent Requests
                </div>
            </div>

            {/* 安全护栏 (Middleware) */}
            <div className="bg-red-50 border-2 border-red-100 rounded-xl p-3 relative mb-2 z-10 shadow-sm">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-200 rounded-r"></div>
                <div className="flex items-center gap-3 mb-2">
                    {getIcon(pipeline.middleware.icon, 'w-5 h-5 text-red-500')}
                    <div>
                        <div className="text-xs font-black text-red-700 leading-none">{pipeline.middleware.label}</div>
                        <div className="text-[9px] text-red-400 uppercase tracking-widest">{pipeline.middleware.labelEn}</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-1 relative">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-red-200 opacity-20 text-4xl font-black">↓</div>
                    {pipeline.middleware.checks.map(check => (
                        <span key={check} className="text-[9px] bg-white text-red-500 px-1.5 py-0.5 rounded border border-red-100 text-center">{check}</span>
                    ))}
                </div>
            </div>

            {/* 管道连接 */}
            <div className="flex justify-center -my-1 relative z-0">
                <div className="w-0.5 h-6 bg-slate-200"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-[9px] text-slate-400 border border-slate-100 rounded-full">Safe</div>
            </div>

            {/* 模型运行时 */}
            <div id="node-runtime-egress" className="bg-blue-50/50 border-2 border-blue-100 rounded-xl p-3 flex-1 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                    {getIcon(pipeline.modelEngine.icon, 'w-5 h-5 text-blue-500')}
                    <div>
                        <div className="text-xs font-black text-slate-700 leading-none">{pipeline.modelEngine.label}</div>
                        <div className="text-[9px] text-blue-400 uppercase tracking-widest">{pipeline.modelEngine.labelEn}</div>
                    </div>
                </div>
                <div className="space-y-1.5">
                    {pipeline.modelEngine.options.map(opt => (
                        <RuntimeOption key={opt.id} label={opt.label} highlight={opt.recommended} />
                    ))}
                </div>
            </div>

            {/* A2A 协议 */}
            <div className="mt-auto pt-3 text-center">
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 border border-indigo-100 rounded text-[9px] text-indigo-500 font-bold">
                    <Activity className="w-3 h-3" /> {pipeline.protocols[0]}
                </div>
            </div>
        </div>
    </div>
));

// 工具与基础设施面板 - Schema 驱动版本
const ToolsAndInfraPanelFromSchema = memo(({ tools, infra }) => (
    <div className="grid grid-cols-2 gap-4">
        {/* 内部工具 */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="text-xs text-amber-600 font-black mb-3 uppercase tracking-widest">{tools.label}</div>
            <div className="flex gap-2 flex-wrap">
                {tools.internalTools.map(tool => (
                    <ToolNode key={tool.id} icon={getIcon(tool.icon, 'w-6 h-6')} title={tool.label} />
                ))}
            </div>
            <div className="text-[10px] text-amber-400 mt-2 text-center uppercase tracking-widest">{tools.protocol}</div>
        </div>

        {/* 基础设施 */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="text-xs text-slate-500 font-black mb-3 uppercase tracking-widest">{infra.label}</div>
            <div className="grid grid-cols-3 gap-2">
                {infra.components.map(comp => (
                    <InfraNode key={comp.id} icon={getIcon(comp.icon, 'w-5 h-5')} title={comp.label} items={comp.items} compact />
                ))}
            </div>
            {infra.observability && (
                <div className="flex justify-center mt-2">
                    <Activity className="w-4 h-4 text-slate-300" />
                    <span className="text-[10px] text-slate-400 ml-1">Observability</span>
                </div>
            )}
        </div>
    </div>
));

// 时序说明 - Schema 驱动版本
const TimelineSectionFromSchema = memo(({ timeline }) => (
    <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-10 rounded-[3rem] shadow-xl shadow-blue-50">
        <h4 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200">
                <RotateCw className="w-6 h-6" />
            </div>
            请求处理全链路时序
        </h4>
        <div className="space-y-8">
            {timeline.map((item) => (
                <div key={item.step} className="flex gap-6 group/item">
                    <div className="text-3xl font-black text-blue-600/20 tracking-tighter group-hover/item:text-blue-600/40 transition-colors pt-1">{item.step}</div>
                    <div>
                        <div className="text-xl font-black text-slate-800 mb-1">{item.title}</div>
                        <p className="text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
));

// 架构亮点 - Schema 驱动版本
const HighlightsSectionFromSchema = memo(({ highlights }) => (
    <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 p-10 rounded-[3rem] shadow-xl shadow-purple-50">
        <h4 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <div className="p-2 bg-purple-600 text-white rounded-xl shadow-lg shadow-purple-200">
                <Zap className="w-6 h-6" />
            </div>
            关键架构设计亮点
        </h4>
        <div className="grid grid-cols-1 gap-6">
            {highlights.map((item) => (
                <div key={item.title} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="text-purple-600">{getIcon(item.icon, 'w-5 h-5')}</div>
                        <div className="text-lg font-black text-slate-900 leading-none">{item.title}</div>
                    </div>
                    <p className="text-sm text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
    </div>
));