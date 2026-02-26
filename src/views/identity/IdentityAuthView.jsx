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
                <div className="relative flex gap-8 items-start max-w-[1400px] mx-auto py-8">

                    {/* 1. 左侧：外部组件 (客户端与接入层) */}
                    <div className="w-[260px] shrink-0 flex flex-col items-center border-[3px] border-dashed border-slate-300 bg-white/40 rounded-[40px] p-6 relative shadow-sm">
                        <div className="absolute -top-4 bg-slate-100 px-5 py-2 rounded-full text-[10px] font-black uppercase text-slate-600 border border-slate-200 shadow-sm flex items-center gap-1.5">
                            <Globe size={14} className="text-slate-400" />
                            <span>外部组件 (客户端) / External</span>
                        </div>
                        <div className="flex flex-col gap-32 mt-16 w-full items-center">
                            <Node id="user" icon={User} label="终端用户" enLabel="End User" subLabel="MFA 认证" colorClass="text-blue-600" bgClass="bg-blue-50" />
                            <Node id="frontend" icon={Globe} label="前端服务" enLabel="Frontend Service" subLabel="身份代理 (Proxy)" colorClass="text-cyan-600" bgClass="bg-cyan-50" />
                        </div>
                    </div>

                    {/* 右侧主列：包含内部组件与下方的外部资源 */}
                    <div className="flex-1 flex flex-col gap-12 min-w-0">
                        {/* 2. 上部：云平台内部组件核心区域 */}
                        <div className="flex flex-col items-center border-[3px] border-blue-200 bg-blue-50/30 rounded-[40px] p-10 relative shadow-md">
                            <div className="absolute -top-4 bg-blue-100 px-8 py-2 rounded-full text-[12px] font-black uppercase text-blue-800 border-2 border-blue-200 shadow-sm flex items-center gap-2">
                                <Cloud size={16} className="text-blue-600" />
                                <span>云平台内部组件 / Cloud Platform Internal</span>
                            </div>

                            {/* 顶层：身份与权限双核心 */}
                            <div className="flex gap-10 items-stretch w-full justify-center mt-6 mb-16">
                                {/* 智能体身份服务 */}
                                <div id="identityServiceContainer" className="w-[560px] p-5 bg-slate-900 rounded-[32px] text-white flex flex-col justify-between shadow-xl relative border-4 border-blue-500/30">
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg ring-4 ring-slate-900">
                                        Trusted Agent Center 智能体安全中心
                                    </div>
                                    <div className="flex items-center gap-5 w-full mb-4 px-2 mt-1">
                                        <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 shrink-0">
                                            <BrainCircuit className="text-blue-400" size={30} />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg font-black leading-tight">智能体身份服务</span>
                                                <div className="flex gap-1.5">
                                                    <span className="px-1.5 py-0 bg-blue-500/10 text-blue-400 text-[8px] font-bold rounded border border-blue-500/20 uppercase flex items-center">A2A</span>
                                                    <span className="px-1.5 py-0 bg-cyan-500/10 text-cyan-400 text-[8px] font-bold rounded border border-cyan-500/20 uppercase flex items-center">Zero Trust</span>
                                                </div>
                                            </div>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-0.5">Agent Identity Service</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 w-full">
                                        <FeatureBox icon={BookOpen} title="智能体身份目录" enTitle="Identity Directory" activeColor="text-blue-400" />
                                        <FeatureBox icon={ShieldCheck} title="智能体令牌保险库" enTitle="Token Vault" activeColor="text-blue-400" />
                                        <FeatureBox icon={FileSearch} title="智能体策略检索" enTitle="Policy Retrieval" activeColor="text-blue-400" />
                                        <FeatureBox icon={Zap} title="智能体身份解析器" enTitle="Identity Analyzer" activeColor="text-blue-400" />
                                    </div>
                                </div>

                                {/* IAM 服务 */}
                                <div id="iamServiceContainer" className="w-[320px] p-5 bg-white rounded-[32px] text-slate-800 flex flex-col justify-between shadow-xl relative border-4 border-purple-100 group hover:border-purple-300 transition-all">
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-600 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow-lg ring-4 ring-white group-hover:scale-105 transition-transform whitespace-nowrap">
                                        Infrastructure IAM 基础身份
                                    </div>
                                    <div className="flex items-center gap-4 w-full mb-4 px-2 mt-1">
                                        <div className="p-2.5 rounded-2xl bg-purple-50 border border-purple-100 group-hover:bg-purple-100 transition-colors shrink-0">
                                            <Key className="text-purple-600" size={30} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-lg font-black leading-tight">IAM 服务</span>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-0.5 group-hover:text-purple-400 transition-colors">IAM Service</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 w-full">
                                        <div className="px-2 py-2 bg-slate-50 rounded-xl border border-slate-200 text-[8px] font-bold text-slate-600 flex items-center justify-center gap-1.5 group-hover:border-purple-200 transition-colors h-full">
                                            <ShieldAlert size={12} className="text-purple-600 shrink-0" />
                                            <span className="leading-tight">权限治理<br /><span className="scale-90 inline-block origin-left font-medium text-slate-400">(Governance)</span></span>
                                        </div>
                                        <div className="px-2 py-2 bg-slate-50 rounded-xl border border-slate-200 text-[8px] font-bold text-slate-600 flex items-center justify-center gap-1.5 group-hover:border-purple-200 transition-colors h-full">
                                            <Fingerprint size={12} className="text-purple-600 shrink-0" />
                                            <span className="leading-tight">角色托管<br /><span className="scale-90 inline-block origin-left font-medium text-slate-400">(Hosting)</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 下层：智能体集群与内部后端 */}
                            <div className="flex gap-24 w-full justify-center">
                                {/* 智能体集群 (Agent Runtime / VPC) */}
                                <div className="flex flex-col items-center border-2 border-dashed border-indigo-200 bg-indigo-50/40 rounded-3xl p-6 relative">
                                    <div className="absolute -top-3.5 bg-indigo-100 px-4 py-1 rounded-full text-[9px] font-black uppercase text-indigo-700 border border-indigo-200 shadow-sm flex items-center gap-1.5">
                                        <Server size={12} className="text-indigo-500" />
                                        <span>Agent Runtime / VPC</span>
                                    </div>
                                    <div className="flex flex-col gap-24 mt-4 w-full items-center">
                                        <Node id="orchestrator" icon={Workflow} label="协调智能体" enLabel="Orchestrator Agent" subLabel="任务编排" colorClass="text-indigo-600" bgClass="bg-indigo-50" hasSdk={true} />
                                        <Node id="sub-agent" icon={Cpu} label="子智能体" enLabel="Sub-Agent" subLabel="原子化执行" colorClass="text-emerald-600" bgClass="bg-emerald-50" hasSdk={true} />
                                    </div>
                                </div>

                                {/* 云平台内部后端资源 */}
                                <div className="flex flex-col gap-24">
                                    <Node id="llm" icon={Box} label="基础模型" enLabel="Foundation Model" subLabel="核心推理" colorClass="text-purple-600" bgClass="bg-purple-50" />
                                    <Node id="cloud" icon={Cloud} label="云服务" enLabel="Cloud Service" subLabel="资源接口" colorClass="text-sky-600" bgClass="bg-sky-50" />
                                </div>
                            </div>
                        </div>

                        {/* 3. 下部：外部组件 (三方服务与私有部署) */}
                        <div className="flex flex-col items-center border-[3px] border-dashed border-slate-300 bg-white/40 rounded-[40px] p-8 mt-4 relative shadow-sm">
                            <div className="absolute -top-4 bg-slate-100 px-5 py-2 rounded-full text-[10px] font-black uppercase text-slate-600 border border-slate-200 shadow-sm flex items-center gap-1.5">
                                <ExternalLink size={14} className="text-slate-400" />
                                <span>外部组件 (资源) / External</span>
                            </div>
                            <div className="flex gap-24 mt-4 w-full justify-center items-center">
                                <Node id="external" icon={ExternalLink} label="外部服务" enLabel="External Service" subLabel="三方 API" colorClass="text-amber-600" bgClass="bg-amber-50" />
                                <Node id="other-auth" icon={Lock} label="其他资源" enLabel="Other Assets" subLabel="私有部署" colorClass="text-rose-600" bgClass="bg-rose-50" />
                            </div>
                        </div>

                    </div>

                </div>

                {/* 连线与逻辑流转 */}
                <Xarrow start="user" end="frontend" color="#2563eb" strokeWidth={2} startAnchor="bottom" endAnchor="top" labels={<ConnectionLabel text="登录" enText="Login" />} headSize={4} />
                <Xarrow start="frontend" end="orchestrator" color="#0891b2" strokeWidth={2} startAnchor="right" endAnchor="left" path="smooth" labels={<ConnectionLabel text="委派" enText="Delegation" />} headSize={4} />
                <Xarrow start="orchestrator" end="sub-agent" color="#4f46e5" strokeWidth={2} startAnchor="bottom" endAnchor="top" dashness={true} headSize={4} />

                {/* 3. SDK 与身份服务交互 */}
                <Xarrow start="orchestrator" end="identityServiceContainer" color="#3b82f6" strokeWidth={2} startAnchor="top" endAnchor="bottom" path="smooth" labels={<ConnectionLabel text="SDK 核验" enText="SDK Verify" color="text-blue-500" />} headSize={4} />
                {/* sub-agent 到 identityServiceContainer 由于跨度较大，交由 auto 自主寻找最近边 */}
                <Xarrow start="sub-agent" end="identityServiceContainer" color="#3b82f6" strokeWidth={2} startAnchor="auto" endAnchor="auto" path="smooth" labels={<ConnectionLabel text="SDK 申请" enText="SDK Request" color="text-blue-500" />} headSize={4} />

                {/* 3.1 身份与 IAM 联动 (联邦映射) */}
                <Xarrow
                    start="identityServiceContainer"
                    end="iamServiceContainer"
                    color="#6366f1"
                    strokeWidth={2}
                    dashness={true}
                    startAnchor="right"
                    endAnchor="left"
                    path="smooth"
                    labels={<ConnectionLabel text="身份映射" enText="Auth Logic Link" color="text-indigo-500" borderColor="border-indigo-100" />}
                    headSize={4}
                />

                {/* 4. 智能体直接访问后端资源 */}
                <Xarrow start="orchestrator" end="llm" color="#8b5cf6" strokeWidth={2} startAnchor="right" endAnchor="left" path="smooth" dashness={{ strokeLen: 4, nonStrokeLen: 4 }} labels={<ConnectionLabel text="调用" enText="Call" color="text-purple-500" borderColor="border-purple-100" />} />
                <Xarrow start="orchestrator" end="cloud" color="#0ea5e9" strokeWidth={2} startAnchor="auto" endAnchor="auto" path="smooth" dashness={{ strokeLen: 4, nonStrokeLen: 4 }} labels={<ConnectionLabel text="接入" enText="Access" color="text-sky-500" borderColor="border-sky-100" />} />

                {/* 外部资源从下部连线 */}
                <Xarrow start="sub-agent" end="external" color="#f59e0b" strokeWidth={2} startAnchor="bottom" endAnchor="top" path="smooth" dashness={{ strokeLen: 4, nonStrokeLen: 4 }} labels={<ConnectionLabel text="映射" enText="Mapping" color="text-amber-500" borderColor="border-amber-100" />} />
                <Xarrow start="sub-agent" end="other-auth" color="#e11d48" strokeWidth={2} startAnchor="bottom" endAnchor="top" path="smooth" dashness={{ strokeLen: 4, nonStrokeLen: 4 }} labels={<ConnectionLabel text="授权" enText="AuthZ" color="text-rose-500" borderColor="border-rose-100" />} />

                {/* 5. IAM 治理与反馈回路 (闭环补全) */}
                <Xarrow
                    start="iamServiceContainer"
                    end="cloud"
                    color="#a855f7"
                    strokeWidth={1.5}
                    dashness={true}
                    startAnchor="auto"
                    endAnchor="auto"
                    path="smooth"
                    labels={<ConnectionLabel text="策略围栏" enText="Policy Guard" color="text-purple-600" borderColor="border-purple-200" />}
                />

                {/* 结果聚合 (A2A 闭环) */}
                <Xarrow
                    start="sub-agent"
                    end="orchestrator"
                    color="#10b981"
                    strokeWidth={2}
                    startAnchor="left"
                    endAnchor="left"
                    path="smooth"
                    labels={<ConnectionLabel text="结果返回" enText="Result Aggr" color="text-emerald-600" borderColor="border-emerald-100" />}
                    headSize={4}
                    curveness={0.3}
                />

                {/* 最终响应 */}
                <Xarrow
                    start="orchestrator"
                    end="frontend"
                    color="#0891b2"
                    strokeWidth={2}
                    startAnchor="auto"
                    endAnchor="auto"
                    path="smooth"
                    labels={<ConnectionLabel text="任务完成" enText="Response" color="text-cyan-600" borderColor="border-cyan-100" />}
                    headSize={4}
                />
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
            </div >
        </div >
    );
});

export default IdentityAuthView;
