import React, { memo } from 'react';
import Xarrow, { Xwrapper } from 'react-xarrows';
import {
    User,
    Shield,
    Cpu,
    Database,
    ExternalLink,
    Lock,
    Key,
    Fingerprint,
    Workflow,
    ArrowRightLeft,
    Box,
    Globe,
    Cloud,
    Server,
    Zap,
    Layers,
    BookOpen,
    ShieldCheck,
    FileSearch,
    BrainCircuit
} from 'lucide-react';

const IdentityAuthView = memo(() => {
    const boxStyle = "relative flex flex-col items-center justify-center p-4 bg-white border-2 border-slate-100 rounded-[28px] shadow-sm z-10 transition-all hover:border-blue-200 hover:shadow-md";
    const labelStyle = "mt-3 text-[13px] font-black text-slate-800 text-center leading-tight";
    const enLabelStyle = "text-[9px] text-slate-400 uppercase tracking-tighter font-bold mt-0.5 text-center";
    const subLabelStyle = "text-[9px] text-blue-500/70 font-bold mt-1.5 text-center bg-blue-50/50 px-2 py-0.5 rounded-full";

    const Node = ({ id, icon: Icon, label, enLabel, subLabel, colorClass = "text-slate-600", bgClass = "bg-slate-50", customWidth, hasSdk }) => (
        <div id={id} className={`${boxStyle} ${customWidth ? customWidth : 'w-48'}`}>
            {hasSdk && (
                <div className="absolute -top-3 -right-3 bg-slate-900 text-white px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg ring-2 ring-white z-20 transition-transform hover:scale-110">
                    <Layers size={10} className="text-blue-400" />
                    <span className="text-[8px] font-black tracking-tighter">AGENT IDENTITY SDK</span>
                </div>
            )}
            <div className={`p-3 rounded-2xl ${bgClass} ${colorClass}`}>
                <Icon size={24} />
            </div>
            <span className={labelStyle}>{label}</span>
            <span className={enLabelStyle}>{enLabel}</span>
            <span className={subLabelStyle}>{subLabel}</span>
        </div>
    );

    const ConnectionLabel = ({ text, enText, subtext, color = "text-blue-600", borderColor = "border-blue-100" }) => (
        <div className={`bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border ${borderColor} shadow-sm flex flex-col items-center`}>
            <span className={`text-[10px] font-black leading-none ${color}`}>{text}</span>
            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter mt-1">{enText}</span>
            {subtext && <span className="text-[8px] text-slate-400 font-medium mt-0.5">{subtext}</span>}
        </div>
    );

    const FeatureBox = ({ icon: Icon, title, enTitle }) => (
        <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-colors flex flex-col gap-1 items-start group">
            <div className="flex items-center gap-2">
                <Icon size={14} className="text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black">{title}</span>
            </div>
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter ml-5 group-hover:text-slate-400 transition-colors">{enTitle}</span>
        </div>
    );

    return (
        <div className="p-10 bg-slate-50/50 rounded-[40px] border border-slate-200 overflow-hidden">
            <div className="mb-14 text-center">
                <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-200">
                    Security Architecture 可视化安全架构
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-2">多维身份认证与授权架构 (核心功能集成)</h3>
                <p className="text-slate-500 font-bold text-sm tracking-wide">Multi-dimensional Identity Auth & AuthZ Architecture (Core Features)</p>
            </div>

            <Xwrapper>
                <div className="relative flex flex-col gap-24 items-center max-w-7xl mx-auto py-5">

                    {/* 顶部中心：深度化身份服务 */}
                    <div id="identity-service" className="w-[600px] p-10 bg-slate-900 rounded-[50px] text-white flex flex-col items-center shadow-2xl relative border-4 border-blue-500/20">
                        <div className="absolute -top-5 bg-blue-600 px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl ring-4 ring-slate-900">
                            Central Trusted Authority 核心安全中心
                        </div>

                        <div className="flex items-center gap-12 w-full mb-8 px-4">
                            <Shield className="text-blue-400" size={80} />
                            <div className="flex flex-col">
                                <span className="text-3xl font-black leading-tight">智能体身份服务</span>
                                <span className="text-[12px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5">Agent Identity Service</span>
                                <div className="mt-3 flex gap-2">
                                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[8px] font-bold rounded border border-blue-500/20">RBAC / ABAC</span>
                                    <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-[8px] font-bold rounded border border-cyan-500/20">Zero Trust</span>
                                </div>
                            </div>
                        </div>

                        {/* 四大核心功能展示网格 */}
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <FeatureBox
                                icon={BookOpen}
                                title="智能体身份目录"
                                enTitle="Agent Identity Directory"
                            />
                            <FeatureBox
                                icon={ShieldCheck}
                                title="智能体令牌保险库"
                                enTitle="Agent Identity Token Vault"
                            />
                            <FeatureBox
                                icon={FileSearch}
                                title="智能体策略检索"
                                enTitle="Agent Identity Policy Retrieval"
                            />
                            <FeatureBox
                                icon={BrainCircuit}
                                title="智能体身份解析器"
                                enTitle="Agent Identity Analyzer"
                            />
                        </div>
                    </div>

                    {/* 中间层：用户、前端与智能体集群 */}
                    <div className="flex gap-20 items-start">
                        {/* 左侧：接入链路 */}
                        <div className="flex flex-col gap-24">
                            <Node
                                id="user"
                                icon={User}
                                label="终端用户"
                                enLabel="End User"
                                subLabel="多因素认证 (MFA)"
                                colorClass="text-blue-600"
                                bgClass="bg-blue-50"
                            />
                            <Node
                                id="frontend"
                                icon={Globe}
                                label="前端服务"
                                enLabel="Frontend Service"
                                subLabel="Web / App 控制台"
                                colorClass="text-cyan-600"
                                bgClass="bg-cyan-50"
                            />
                        </div>

                        {/* 中间：智能体集群 (SDK 集成) */}
                        <div className="flex flex-col gap-24 pt-12">
                            <Node
                                id="orchestrator"
                                icon={Workflow}
                                label="协调智能体"
                                enLabel="Orchestrator Agent"
                                subLabel="核心调度引擎"
                                colorClass="text-indigo-600"
                                bgClass="bg-indigo-50"
                                hasSdk={true}
                            />
                            <Node
                                id="sub-agent"
                                icon={Cpu}
                                label="子智能体"
                                enLabel="Sub-Agent"
                                subLabel="特化任务执行"
                                colorClass="text-emerald-600"
                                bgClass="bg-emerald-50"
                                hasSdk={true}
                            />
                        </div>

                        {/* 右侧：多元化后端集群 */}
                        <div className="grid grid-cols-2 gap-8 pt-10">
                            <Node
                                id="llm"
                                icon={Box}
                                label="基础模型"
                                enLabel="Foundation Model"
                                subLabel="推理单元"
                                colorClass="text-purple-600"
                                bgClass="bg-purple-50"
                                customWidth="w-44"
                            />
                            <Node
                                id="cloud"
                                icon={Cloud}
                                label="云服务"
                                enLabel="Cloud Service"
                                subLabel="IAM 映射控制"
                                colorClass="text-sky-600"
                                bgClass="bg-sky-50"
                                customWidth="w-44"
                            />
                            <Node
                                id="external"
                                icon={ExternalLink}
                                label="外部服务"
                                enLabel="External Service"
                                subLabel="API Key 注入"
                                colorClass="text-amber-600"
                                bgClass="bg-amber-50"
                                customWidth="w-44"
                            />
                            <Node
                                id="other-auth"
                                icon={Lock}
                                label="其他资源"
                                enLabel="Other Assets"
                                subLabel="自定义授权"
                                colorClass="text-rose-600"
                                bgClass="bg-rose-50"
                                customWidth="w-44"
                            />
                        </div>
                    </div>

                    {/* 连线与逻辑流转 */}

                    {/* 1. 用户入口流程 */}
                    <Xarrow
                        start="user"
                        end="frontend"
                        color="#2563eb"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="终端登录" enText="Login / MFA" />}
                        headSize={4}
                    />
                    <Xarrow
                        start="frontend"
                        end="orchestrator"
                        color="#0891b2"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="委派请求" enText="Delegation" />}
                        headSize={4}
                    />

                    {/* 2. A2A 编排流程 */}
                    <Xarrow
                        start="orchestrator"
                        end="sub-agent"
                        color="#4f46e5"
                        strokeWidth={2}
                        dashness={true}
                        labels={<ConnectionLabel text="A2A 协作" enText="A2A Collaboration" />}
                        headSize={4}
                        path="smooth"
                    />

                    {/* 3. SDK 与身份服务交互 (核心逻辑) */}
                    <Xarrow
                        start="orchestrator"
                        end="identity-service"
                        color="#3b82f6"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="SDK 身份解析" enText="SDK Analyzer Call" color="text-blue-500" />}
                        headSize={4}
                        path="grid"
                    />
                    <Xarrow
                        start="sub-agent"
                        end="identity-service"
                        color="#3b82f6"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="SDK 凭证获取" enText="SDK Vault Access" color="text-blue-500" />}
                        headSize={4}
                        path="grid"
                    />

                    {/* 4. 后端授权访问 */}
                    <Xarrow start="identity-service" end="llm" color="#8b5cf6" strokeWidth={2} dashness={{ strokeLen: 4, nonStrokeLen: 4 }} />
                    <Xarrow start="identity-service" end="cloud" color="#0ea5e9" strokeWidth={2} dashness={{ strokeLen: 4, nonStrokeLen: 4 }} />
                    <Xarrow start="identity-service" end="external" color="#f59e0b" strokeWidth={2} dashness={{ strokeLen: 4, nonStrokeLen: 4 }} />
                    <Xarrow start="identity-service" end="other-auth" color="#e11d48" strokeWidth={2} dashness={{ strokeLen: 4, nonStrokeLen: 4 }} />

                </div>
            </Xwrapper>

            {/* 底部架构说明 */}
            <div className="mt-24 grid grid-cols-4 gap-8 px-12">
                <div className="flex flex-col items-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm text-center group hover:border-blue-200 transition-colors">
                    <BookOpen className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" size={28} />
                    <h5 className="font-black text-sm uppercase tracking-tight mb-2">Registry & Directory</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">统一的智能体元数据存储，记录各 Agent 的身份属性、权限范围及信任等级。</p>
                </div>
                <div className="flex flex-col items-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm text-center group hover:border-blue-200 transition-colors">
                    <ShieldCheck className="text-slate-900 mb-4 group-hover:scale-110 transition-transform" size={28} />
                    <h5 className="font-black text-sm uppercase tracking-tight mb-2">Dynamic Vault</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">高安全性的凭证保险库，支持按需生成短期令牌及 API Key 自动注入。</p>
                </div>
                <div className="flex flex-col items-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm text-center group hover:border-blue-200 transition-colors">
                    <FileSearch className="text-indigo-600 mb-4 group-hover:scale-110 transition-transform" size={28} />
                    <h5 className="font-black text-sm uppercase tracking-tight mb-2">Policy Engine</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">实时检索与验证安全策略 (IAM/Casbin)，确保智能体的每一次调用都符合合规要求。</p>
                </div>
                <div className="flex flex-col items-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm text-center group hover:border-blue-200 transition-colors">
                    <BrainCircuit className="text-emerald-500 mb-4 group-hover:scale-110 transition-transform" size={28} />
                    <h5 className="font-black text-sm uppercase tracking-tight mb-2">Agent Analyzer</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">解析 Agent 上下文、意图与请求链，实现基于行为的细粒度身份核验。</p>
                </div>
            </div>
        </div>
    );
});

export default IdentityAuthView;
