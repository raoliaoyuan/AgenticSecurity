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
    BrainCircuit,
    ShieldAlert
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

    const FeatureBox = ({ icon: Icon, title, enTitle, activeColor = "text-blue-400" }) => (
        <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-colors flex flex-col gap-1 items-start group">
            <div className="flex items-center gap-2">
                <Icon size={14} className={`${activeColor} group-hover:scale-110 transition-transform`} />
                <span className="text-[10px] font-black text-white">{title}</span>
            </div>
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter ml-5 group-hover:text-slate-400 transition-colors">{enTitle}</span>
        </div>
    );

    return (
        <div className="p-10 bg-slate-50/50 rounded-[40px] border border-slate-200 overflow-hidden">
            <div className="mb-14 text-center">
                <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                    Security Architecture 可视化安全架构
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-2">多维身份认证与授权架构 (视觉平衡版)</h3>
                <p className="text-slate-500 font-bold text-sm tracking-wide">Multi-dimensional Identity Auth & AuthZ Architecture (Visual Balanced)</p>
            </div>

            <Xwrapper>
                <div className="relative flex flex-col gap-24 items-center max-w-[1400px] mx-auto py-5">

                    {/* 顶部中心：平衡双核心 */}
                    <div className="flex gap-10 items-stretch">

                        {/* 1. 智能体身份服务 (蓝色系 - 智能感) */}
                        <div id="identity-service" className="w-[500px] p-8 bg-slate-900 rounded-[40px] text-white flex flex-col items-center shadow-xl relative border-4 border-blue-500/20">
                            <div className="absolute -top-4 bg-blue-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ring-4 ring-slate-900">
                                Trusted Agent Center 智能体安全中心
                            </div>

                            <div className="flex items-center gap-8 w-full mb-6 px-2">
                                <div className="p-4 rounded-3xl bg-blue-500/10 border border-blue-500/20">
                                    <BrainCircuit className="text-blue-400" size={48} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-black leading-tight">智能体身份服务</span>
                                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Agent Identity Service</span>
                                    <div className="mt-2 flex gap-2">
                                        <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[8px] font-bold rounded border border-blue-500/20 uppercase">A2A</span>
                                        <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-[8px] font-bold rounded border border-cyan-500/20 uppercase">Zero Trust</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 w-full">
                                <FeatureBox icon={BookOpen} title="智能体身份目录" enTitle="Identity Directory" activeColor="text-blue-400" />
                                <FeatureBox icon={ShieldCheck} title="智能体令牌保险库" enTitle="Token Vault" activeColor="text-blue-400" />
                                <FeatureBox icon={FileSearch} title="智能体策略检索" enTitle="Policy Retrieval" activeColor="text-blue-400" />
                                <FeatureBox icon={Zap} title="智能体身份解析器" enTitle="Identity Analyzer" activeColor="text-blue-400" />
                            </div>
                        </div>

                        {/* 2. IAM 服务 (紫色系 - 区分度) */}
                        <div id="iam-service" className="w-[280px] p-8 bg-slate-800 rounded-[40px] text-white flex flex-col items-center justify-center shadow-xl relative border-4 border-purple-500/20 group hover:border-purple-500/40 transition-all">
                            <div className="absolute -top-4 bg-purple-600 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg ring-4 ring-slate-900 group-hover:scale-105 transition-transform">
                                Infrastructure IAM 基础身份
                            </div>
                            <div className="p-4 rounded-3xl bg-purple-500/10 border border-purple-500/20 mb-4 group-hover:bg-purple-500/20 transition-colors">
                                <Key className="text-purple-400" size={42} />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-black leading-tight text-center">IAM 服务</span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5 group-hover:text-slate-400 transition-colors">IAM Service</span>
                                <div className="mt-4 flex flex-col gap-2 w-full">
                                    <div className="px-3 py-1.5 bg-slate-900/50 rounded-xl border border-slate-700 text-[8px] font-bold text-slate-400 flex items-center gap-2 group-hover:border-purple-500/30 transition-colors">
                                        <ShieldAlert size={10} className="text-purple-500" />
                                        <span>权限治理 (Governance)</span>
                                    </div>
                                    <div className="px-3 py-1.5 bg-slate-900/50 rounded-xl border border-slate-700 text-[8px] font-bold text-slate-400 flex items-center gap-2 group-hover:border-purple-500/30 transition-colors">
                                        <Fingerprint size={10} className="text-purple-500" />
                                        <span>角色托管 (Hosting)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 下层集群：保持紧凑布局 */}
                    <div className="flex gap-20 items-start">
                        {/* 左侧：接入链路 */}
                        <div className="flex flex-col gap-24">
                            <Node id="user" icon={User} label="终端用户" enLabel="End User" subLabel="MFA 认证" colorClass="text-blue-600" bgClass="bg-blue-50" />
                            <Node id="frontend" icon={Globe} label="前端服务" enLabel="Frontend Service" subLabel="身份代理 (Proxy)" colorClass="text-cyan-600" bgClass="bg-cyan-50" />
                        </div>

                        {/* 中间：智能体集群 */}
                        <div className="flex flex-col gap-24 pt-12">
                            <Node id="orchestrator" icon={Workflow} label="协调智能体" enLabel="Orchestrator Agent" subLabel="任务编排" colorClass="text-indigo-600" bgClass="bg-indigo-50" hasSdk={true} />
                            <Node id="sub-agent" icon={Cpu} label="子智能体" enLabel="Sub-Agent" subLabel="原子化执行" colorClass="text-emerald-600" bgClass="bg-emerald-50" hasSdk={true} />
                        </div>

                        {/* 右侧：后端集群 */}
                        <div className="grid grid-cols-2 gap-8 pt-10">
                            <Node id="llm" icon={Box} label="基础模型" enLabel="Foundation Model" subLabel="核心推理" colorClass="text-purple-600" bgClass="bg-purple-50" customWidth="w-40" />
                            <Node id="cloud" icon={Cloud} label="云服务" enLabel="Cloud Service" subLabel="资源接口" colorClass="text-sky-600" bgClass="bg-sky-50" customWidth="w-40" />
                            <Node id="external" icon={ExternalLink} label="外部服务" enLabel="External Service" subLabel="三方 API" colorClass="text-amber-600" bgClass="bg-amber-50" customWidth="w-40" />
                            <Node id="other-auth" icon={Lock} label="其他资源" enLabel="Other Assets" subLabel="私有部署" colorClass="text-rose-600" bgClass="bg-rose-50" customWidth="w-40" />
                        </div>
                    </div>

                    {/* 连线与逻辑流转 */}
                    <Xarrow start="user" end="frontend" color="#2563eb" strokeWidth={2} labels={<ConnectionLabel text="登录" enText="Login" />} headSize={4} />
                    <Xarrow start="frontend" end="orchestrator" color="#0891b2" strokeWidth={2} labels={<ConnectionLabel text="委派" enText="Delegation" />} headSize={4} />
                    <Xarrow start="orchestrator" end="sub-agent" color="#4f46e5" strokeWidth={2} dashness={true} headSize={4} />

                    <Xarrow start="orchestrator" end="identity-service" color="#3b82f6" strokeWidth={2} labels={<ConnectionLabel text="SDK 核验" enText="SDK Verify" color="text-blue-500" />} headSize={4} path="grid" />
                    <Xarrow start="sub-agent" end="identity-service" color="#3b82f6" strokeWidth={2} labels={<ConnectionLabel text="SDK 申请" enText="SDK Request" color="text-blue-500" />} headSize={4} path="grid" />

                    <Xarrow start="orchestrator" end="llm" color="#8b5cf6" strokeWidth={2} dashness={{ strokeLen: 4, nonStrokeLen: 4 }} />
                    <Xarrow start="orchestrator" end="cloud" color="#0ea5e9" strokeWidth={2} dashness={{ strokeLen: 4, nonStrokeLen: 4 }} />
                    <Xarrow start="sub-agent" end="external" color="#f59e0b" strokeWidth={2} dashness={{ strokeLen: 4, nonStrokeLen: 4 }} />
                    <Xarrow start="sub-agent" end="other-auth" color="#e11d48" strokeWidth={2} dashness={{ strokeLen: 4, nonStrokeLen: 4 }} />

                </div>
            </Xwrapper>

            {/* 底部详细说明 */}
            <div className="mt-20 grid grid-cols-4 gap-6 px-10">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all group">
                    <div className="flex items-center gap-3 mb-3">
                        <BrainCircuit size={20} className="text-blue-600 group-hover:scale-110 transition-transform" />
                        <h5 className="font-black text-xs uppercase tracking-tight">Agent-First Identity</h5>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">专为智能体设计的身份系统，提供基于行为解析与 A2A 协议的动态凭证管理。</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-purple-200 transition-all group">
                    <div className="flex items-center gap-3 mb-3">
                        <Key size={20} className="text-purple-600 group-hover:scale-110 transition-transform" />
                        <h5 className="font-black text-xs uppercase tracking-tight">Infrastructure IAM</h5>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">支撑底座的权限管理系统，负责物理资源、存储与传统的角色访问控制。</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group">
                    <div className="flex items-center gap-3 mb-3">
                        <Layers size={20} className="text-indigo-600 group-hover:scale-110 transition-transform" />
                        <h5 className="font-black text-xs uppercase tracking-tight">Integrated SDK</h5>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">智能体通过内置 SDK 无缝接入安全中枢，实现从身份申请到令牌映射的全自动化。</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-all group">
                    <div className="flex items-center gap-3 mb-3">
                        <ShieldCheck size={20} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                        <h5 className="font-black text-xs uppercase tracking-tight">Zero Trust Context</h5>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">基于身份与全链路上下文的实时核验，构建覆盖智能体全生命周期的零信任边界。</p>
                </div>
            </div>
        </div>
    );
});

export default IdentityAuthView;
