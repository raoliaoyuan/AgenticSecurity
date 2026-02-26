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
    ShieldAlert,
    Terminal,
    Plug,
    Code
} from 'lucide-react';

const IdentityAuthView = memo(() => {
    const boxStyle = "relative flex flex-col items-center justify-center p-4 bg-white border-2 border-slate-100 rounded-[28px] shadow-sm z-10 transition-all hover:border-blue-200 hover:shadow-md";
    const labelStyle = "mt-3 text-[13px] font-black text-slate-800 text-center leading-tight";
    const enLabelStyle = "text-[9px] text-slate-400 uppercase tracking-tighter font-bold mt-0.5 text-center";
    const subLabelStyle = "text-[9px] text-blue-500/70 font-bold mt-1.5 text-center bg-blue-50/50 px-2 py-0.5 rounded-full";

    const Node = ({ id, icon: Icon, label, enLabel, subLabel, colorClass = "text-slate-600", bgClass = "bg-slate-50", customWidth, hasSdk, hasIamSdk }) => (
        <div id={id} className={`${boxStyle} ${customWidth ? customWidth : 'w-48'}`}>
            {hasSdk && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg shadow-teal-500/25 ring-2 ring-white z-20 transition-transform hover:scale-110">
                    <Layers size={10} className="text-teal-100" />
                    <span className="text-[8px] font-black tracking-tighter">AGENT IDENTITY SDK</span>
                </div>
            )}
            {hasIamSdk && (
                <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg shadow-indigo-500/25 ring-2 ring-white z-20 transition-transform hover:scale-110">
                    <Key size={10} className="text-indigo-100" />
                    <span className="text-[8px] font-black tracking-tighter">IAM SDK</span>
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
                <h3 className="text-4xl font-black text-slate-900 mb-2">多维身份认证与授权架构</h3>
                <p className="text-slate-500 font-bold text-sm tracking-wide">Multi-dimensional Identity Auth & AuthZ Architecture</p>
            </div>

            <Xwrapper>
                <div className="relative flex gap-8 items-start max-w-[1400px] mx-auto py-8">

                    {/* ====== 左侧列：外部组件（客户端） ====== */}
                    <div className="w-[220px] shrink-0 flex flex-col items-center border-[3px] border-dashed border-slate-300 bg-white/40 rounded-[40px] p-6 pt-12 relative shadow-sm">
                        <div className="absolute -top-4 bg-slate-100 px-4 py-2 rounded-full text-[10px] font-black uppercase text-slate-600 border border-slate-200 shadow-sm flex items-center gap-1.5">
                            <Globe size={14} className="text-slate-400" />
                            <span>外部 (客户端)</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Node id="user" icon={User} label="终端用户" enLabel="End User" subLabel="MFA 认证" colorClass="text-blue-600" bgClass="bg-blue-50" customWidth="w-44" />
                            <div className="mt-[135px]">
                                <Node id="frontend" icon={Globe} label="前端服务" enLabel="Frontend Service" subLabel="身份代理 (Proxy)" colorClass="text-cyan-600" bgClass="bg-cyan-50" customWidth="w-44" />
                            </div>
                        </div>
                    </div>

                    {/* ====== 右侧主列：云平台内部组件大框 + 外部资源 ====== */}
                    <div className="flex-1 flex flex-col gap-12 min-w-0">

                        {/* 云平台内部组件大框 */}
                        <div className="border-[3px] border-blue-200 bg-blue-50/20 rounded-[40px] p-8 pt-12 relative shadow-md">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-100 px-8 py-2 rounded-full text-[12px] font-black uppercase text-blue-800 border-2 border-blue-200 shadow-sm flex items-center gap-2 whitespace-nowrap">
                                <Cloud size={16} className="text-blue-600" />
                                <span>云平台内部组件 / Cloud Platform Internal</span>
                            </div>

                            {/* 顶层：身份服务 + IAM */}
                            <div className="flex gap-8 items-stretch mb-10">
                                {/* 智能体身份服务 */}
                                <div id="identityServiceContainer" className="flex-1 p-5 bg-gradient-to-br from-teal-800 via-teal-900 to-emerald-950 rounded-[32px] text-white flex flex-col justify-between shadow-xl shadow-teal-900/20 relative border-4 border-teal-500/20">
                                    <div className="flex items-center gap-5 w-full mb-4 px-2 mt-1">
                                        <div className="p-2.5 rounded-2xl bg-teal-400/10 border border-teal-400/20 shrink-0">
                                            <BrainCircuit className="text-teal-300" size={30} />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg font-black leading-tight">智能体身份服务控制面</span>
                                                <div className="flex gap-1.5">
                                                    <span className="px-1.5 py-0 bg-teal-400/15 text-teal-300 text-[8px] font-bold rounded border border-teal-400/25 uppercase flex items-center">A2A</span>
                                                    <span className="px-1.5 py-0 bg-emerald-400/15 text-emerald-300 text-[8px] font-bold rounded border border-emerald-400/25 uppercase flex items-center">Zero Trust</span>
                                                </div>
                                            </div>
                                            <span className="text-[9px] text-teal-300/60 font-bold uppercase tracking-[0.2em] mt-0.5">Agent Identity Service Control Plane</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 w-full">
                                        <FeatureBox icon={BookOpen} title="智能体身份目录" enTitle="Identity Directory" activeColor="text-teal-300" />
                                        <FeatureBox icon={ShieldCheck} title="智能体令牌保险库" enTitle="Token Vault" activeColor="text-teal-300" />
                                        <FeatureBox icon={FileSearch} title="智能体策略检索" enTitle="Policy Retrieval" activeColor="text-teal-300" />
                                        <FeatureBox icon={Zap} title="智能体身份解析器" enTitle="Identity Analyzer" activeColor="text-teal-300" />
                                    </div>
                                </div>

                                {/* IAM 服务 */}
                                <div id="iamServiceContainer" className="w-[280px] shrink-0 p-5 bg-gradient-to-br from-indigo-800 via-indigo-900 to-violet-950 rounded-[32px] text-white flex flex-col justify-between shadow-xl shadow-indigo-900/20 relative border-4 border-indigo-500/20 group hover:border-indigo-400/40 transition-all">
                                    <div className="flex items-center gap-4 w-full mb-4 px-2 mt-1">
                                        <div className="p-2.5 rounded-2xl bg-indigo-400/10 border border-indigo-400/20 group-hover:bg-indigo-400/15 transition-colors shrink-0">
                                            <Key className="text-indigo-300" size={30} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-lg font-black leading-tight">IAM 服务控制面</span>
                                            <span className="text-[9px] text-indigo-300/60 font-bold uppercase tracking-[0.2em] mt-0.5 group-hover:text-indigo-200/70 transition-colors">IAM Service Control Plane</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 w-full">
                                        <div className="px-2 py-2 bg-indigo-700/30 rounded-xl border border-indigo-600/30 text-[8px] font-bold text-indigo-100 flex items-center justify-center gap-1.5 group-hover:border-indigo-500/40 transition-colors h-full">
                                            <ShieldAlert size={12} className="text-violet-300 shrink-0" />
                                            <span className="leading-tight">权限治理<br /><span className="scale-90 inline-block origin-left font-medium text-indigo-300/60">(Governance)</span></span>
                                        </div>
                                        <div className="px-2 py-2 bg-indigo-700/30 rounded-xl border border-indigo-600/30 text-[8px] font-bold text-indigo-100 flex items-center justify-center gap-1.5 group-hover:border-indigo-500/40 transition-colors h-full">
                                            <Fingerprint size={12} className="text-violet-300 shrink-0" />
                                            <span className="leading-tight">角色托管<br /><span className="scale-90 inline-block origin-left font-medium text-indigo-300/60">(Hosting)</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 下层：Agent Runtime + 后端资源 */}
                            <div className="flex gap-8 items-start">
                                {/* Agent Runtime / VPC */}
                                <div className="flex-1 flex flex-col items-center border-2 border-dashed border-indigo-200 bg-indigo-50/40 rounded-3xl p-8 pt-10 relative">
                                    <div className="absolute -top-3.5 bg-indigo-100 px-4 py-1 rounded-full text-[9px] font-black uppercase text-indigo-700 border border-indigo-200 shadow-sm flex items-center gap-1.5">
                                        <Server size={12} className="text-indigo-500" />
                                        <span>Agent Runtime / VPC</span>
                                    </div>
                                    <div className="flex gap-20 w-full justify-center items-start">
                                        <Node id="orchestrator" icon={Workflow} label="协调智能体" enLabel="Orchestrator Agent" subLabel="任务编排" colorClass="text-indigo-600" bgClass="bg-indigo-50" hasSdk={true} hasIamSdk={true} />
                                        <Node id="sub-agent" icon={Cpu} label="子智能体" enLabel="Sub-Agent" subLabel="原子化执行" colorClass="text-emerald-600" bgClass="bg-emerald-50" hasSdk={true} hasIamSdk={true} />
                                    </div>
                                </div>

                                {/* 后端资源列 */}
                                <div className="w-[200px] shrink-0 flex flex-col gap-10 items-center pt-2">
                                    <Node id="llm" icon={Box} label="基础模型" enLabel="Foundation Model" subLabel="核心推理" colorClass="text-purple-600" bgClass="bg-purple-50" customWidth="w-44" hasIamSdk={true} />
                                    <Node id="cloud" icon={Cloud} label="云服务" enLabel="Cloud Service" subLabel="资源接口" colorClass="text-sky-600" bgClass="bg-sky-50" customWidth="w-44" hasIamSdk={true} />
                                </div>
                            </div>
                        </div>

                        {/* 外部资源 */}
                        <div className="flex flex-col items-center border-[3px] border-dashed border-slate-300 bg-white/40 rounded-[40px] p-8 pt-12 relative shadow-sm">
                            <div className="absolute -top-4 bg-slate-100 px-5 py-2 rounded-full text-[10px] font-black uppercase text-slate-600 border border-slate-200 shadow-sm flex items-center gap-1.5">
                                <ExternalLink size={14} className="text-slate-400" />
                                <span>外部组件 (资源) / External</span>
                            </div>
                            <div className="flex gap-6 mt-2 w-full justify-center items-start flex-wrap">
                                {/* 外部服务 - 包含 MCP/CLI/API/其他 四种调用方式 */}
                                <div id="external" className="flex flex-col items-center gap-3">
                                    <div className="flex flex-col items-center p-4 bg-white rounded-2xl border-2 border-amber-100 shadow-lg w-[260px]">
                                        <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-100 mb-2">
                                            <ExternalLink className="text-amber-600" size={24} />
                                        </div>
                                        <span className="text-sm font-black text-slate-800">外部服务</span>
                                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">External Service</span>
                                        <div className="grid grid-cols-4 gap-1.5 mt-3 w-full">
                                            <div className="flex flex-col items-center gap-1 px-1 py-2 bg-amber-50 rounded-lg border border-amber-100">
                                                <Plug size={14} className="text-amber-600" />
                                                <span className="text-[8px] font-bold text-amber-700">MCP</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 px-1 py-2 bg-amber-50 rounded-lg border border-amber-100">
                                                <Terminal size={14} className="text-amber-600" />
                                                <span className="text-[8px] font-bold text-amber-700">CLI</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 px-1 py-2 bg-amber-50 rounded-lg border border-amber-100">
                                                <Code size={14} className="text-amber-600" />
                                                <span className="text-[8px] font-bold text-amber-700">API</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 px-1 py-2 bg-amber-50 rounded-lg border border-amber-100">
                                                <Layers size={14} className="text-amber-600" />
                                                <span className="text-[8px] font-bold text-amber-700">其他</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 其他资源 */}
                                <Node id="other-auth" icon={Lock} label="其他资源" enLabel="Other Assets" subLabel="私有部署" colorClass="text-rose-600" bgClass="bg-rose-50" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ====== 连线：重新设计的清晰排线 ====== */}

                {/* 1. 用户 → 前端服务：用户通过前端界面发起操作请求 */}
                <Xarrow start="user" end="frontend" color="#64748b" strokeWidth={1.5} startAnchor="bottom" endAnchor="top" path="smooth" labels={<ConnectionLabel text="操作请求" enText="User Request" color="text-slate-500" borderColor="border-slate-200" />} headSize={4} />

                {/* 3. 前端 → 协调智能体：前端将用户请求委派给协调智能体执行 */}
                <Xarrow start="frontend" end="orchestrator" color="#0891b2" strokeWidth={2} startAnchor={{ position: "right", offset: { y: -10 } }} endAnchor={{ position: "left", offset: { y: -10 } }} path="smooth" curveness={0.2} labels={<ConnectionLabel text="委派任务" enText="Delegation" />} headSize={4} />

                {/* 4. 协调智能体 → 前端：协调智能体完成任务后将结果返回给前端 */}
                <Xarrow start="orchestrator" end="frontend" color="#06b6d4" strokeWidth={1.5} startAnchor={{ position: "left", offset: { y: 25 } }} endAnchor={{ position: "right", offset: { y: 25 } }} path="smooth" curveness={0.6} labels={<ConnectionLabel text="结果响应" enText="Response" color="text-cyan-600" borderColor="border-cyan-100" />} headSize={4} />

                {/* 5. 协调智能体 → 子智能体：编排调度，将子任务分发给子智能体 */}
                <Xarrow start="orchestrator" end="sub-agent" color="#4f46e5" strokeWidth={2} startAnchor={{ position: "right", offset: { y: -8 } }} endAnchor={{ position: "left", offset: { y: -8 } }} path="smooth" curveness={0.15} dashness={true} labels={<ConnectionLabel text="任务分发" enText="Task Dispatch" color="text-indigo-500" borderColor="border-indigo-100" />} headSize={4} />

                {/* 6. 子智能体 → 协调智能体：子任务执行结果聚合返回 */}
                <Xarrow start="sub-agent" end="orchestrator" color="#10b981" strokeWidth={1.5} startAnchor={{ position: "left", offset: { y: 18 } }} endAnchor={{ position: "right", offset: { y: 18 } }} path="smooth" curveness={0.6} labels={<ConnectionLabel text="结果聚合" enText="Result Aggr" color="text-emerald-600" borderColor="border-emerald-100" />} headSize={4} />

                {/* 7. 协调智能体 → 身份服务：通过 SDK 进行身份核验与令牌获取 */}
                <Xarrow start="orchestrator" end="identityServiceContainer" color="#3b82f6" strokeWidth={2} startAnchor="top" endAnchor={{ position: "bottom", offset: { x: -80 } }} path="smooth" curveness={0.3} labels={<ConnectionLabel text="SDK 核验" enText="SDK Verify" color="text-blue-500" />} headSize={4} />

                {/* 8. 子智能体 → 身份服务：通过 SDK 申请运行时凭证 */}
                <Xarrow start="sub-agent" end="identityServiceContainer" color="#60a5fa" strokeWidth={2} startAnchor="top" endAnchor={{ position: "bottom", offset: { x: 80 } }} path="smooth" curveness={0.3} labels={<ConnectionLabel text="SDK 申请" enText="SDK Request" color="text-blue-400" />} headSize={4} />

                {/* 9. 身份服务 → IAM：身份联邦与策略同步 */}
                <Xarrow start="identityServiceContainer" end="iamServiceContainer" color="#6366f1" strokeWidth={2} dashness={true} startAnchor="right" endAnchor="left" path="smooth" labels={<ConnectionLabel text="身份联邦" enText="Identity Federation" color="text-indigo-500" borderColor="border-indigo-100" />} headSize={4} />

                {/* 10. 协调智能体 → 基础模型：调用 LLM 进行推理 */}
                <Xarrow start="orchestrator" end="llm" color="#8b5cf6" strokeWidth={2} startAnchor="right" endAnchor="left" path="smooth" curveness={0.2} dashness={{ strokeLen: 4, nonStrokeLen: 4 }} labels={<ConnectionLabel text="推理调用" enText="LLM Call" color="text-purple-500" borderColor="border-purple-100" />} headSize={4} />

                {/* 11. 子智能体 → 云服务：接入云端资源执行操作 */}
                <Xarrow start="sub-agent" end="cloud" color="#0ea5e9" strokeWidth={2} startAnchor="right" endAnchor="left" path="smooth" curveness={0.3} dashness={{ strokeLen: 4, nonStrokeLen: 4 }} labels={<ConnectionLabel text="资源接入" enText="Access" color="text-sky-500" borderColor="border-sky-100" />} headSize={4} />

                {/* 12. 子智能体 → 外部服务：调用三方 API */}
                <Xarrow start="sub-agent" end="external" color="#f59e0b" strokeWidth={2} startAnchor={{ position: "bottom", offset: { x: -15 } }} endAnchor="top" path="smooth" curveness={0.2} dashness={{ strokeLen: 4, nonStrokeLen: 4 }} labels={<ConnectionLabel text="API 调用" enText="API Call" color="text-amber-500" borderColor="border-amber-100" />} headSize={4} />

                {/* 13. 子智能体 → 其他资源：访问私有部署资源 */}
                <Xarrow start="sub-agent" end="other-auth" color="#e11d48" strokeWidth={2} startAnchor={{ position: "bottom", offset: { x: 15 } }} endAnchor="top" path="smooth" curveness={0.2} dashness={{ strokeLen: 4, nonStrokeLen: 4 }} labels={<ConnectionLabel text="资源授权" enText="AuthZ" color="text-rose-500" borderColor="border-rose-100" />} headSize={4} />

                {/* 14. IAM → 云服务：基础设施级策略围栏 */}
                <Xarrow start="iamServiceContainer" end="cloud" color="#a855f7" strokeWidth={1.5} dashness={true} startAnchor="bottom" endAnchor="right" path="smooth" curveness={0.4} labels={<ConnectionLabel text="策略围栏" enText="Policy Guard" color="text-purple-600" borderColor="border-purple-200" />} headSize={4} />
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
