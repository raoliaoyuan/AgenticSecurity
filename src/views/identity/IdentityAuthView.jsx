import React, { memo } from 'react';
import Xarrow, { Xwrapper } from 'react-xarrows';
import {
    User,
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
    Code,
    Brain,
    Activity,
    Network,
    HardDrive,
    Users,
    UserCheck
} from 'lucide-react';

const IdentityAuthView = memo(() => {

    const baseBoxStyle = "relative bg-white border-2 border-slate-100 shadow-sm z-10 transition-all hover:border-blue-200 hover:shadow-md";
    const boxStyle = `${baseBoxStyle} flex flex-col items-center justify-center p-4 rounded-[28px]`;
    const rowBoxStyle = `${baseBoxStyle} flex flex-row items-center justify-start py-2 px-3 gap-3 rounded-[16px] h-14`;
    const labelStyle = "text-[13px] font-black text-slate-800 text-center leading-tight";
    const enLabelStyle = "text-[9px] text-slate-400 uppercase tracking-tighter font-bold mt-0.5 text-center";
    const subLabelStyle = "text-[9px] text-blue-500/70 font-bold mt-1.5 text-center bg-blue-50/50 px-2 py-0.5 rounded-full";

    const Node = ({ id, icon: Icon, label, enLabel, subLabel, colorClass = "text-slate-600", bgClass = "bg-slate-50", customWidth, hasSdk, hasIamSdk, isRow = false }) => (
        <div id={id} className={`${isRow ? rowBoxStyle : boxStyle} ${customWidth ? customWidth : (isRow ? 'w-full' : 'w-48')}`}>
            {hasSdk && (
                <div className={`absolute ${isRow ? '-top-1.5 -right-1.5 px-1.5 py-0.5' : '-top-3 -right-3 px-2 py-1'} bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg flex items-center gap-1 shadow-md shadow-teal-500/25 ring-2 ring-white z-20`}>
                    <Layers size={isRow ? 8 : 10} className="text-teal-100" />
                    <span className={`${isRow ? 'text-[7px]' : 'text-[8px]'} font-black tracking-tighter`}>AGENT SDK</span>
                </div>
            )}
            {hasIamSdk && (
                <div className={`absolute ${isRow ? '-bottom-1.5 -right-1.5 px-1.5 py-0.5' : '-bottom-3 -right-3 px-2 py-1'} bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg flex items-center gap-1 shadow-md shadow-indigo-500/25 ring-2 ring-white z-20`}>
                    <Key size={isRow ? 8 : 10} className="text-indigo-100" />
                    <span className={`${isRow ? 'text-[7px]' : 'text-[8px]'} font-black tracking-tighter`}>IAM SDK</span>
                </div>
            )}
            <div className={`${isRow ? 'p-1.5 rounded-xl' : 'p-3 rounded-2xl mt-3'} ${bgClass} ${colorClass} shrink-0`}>
                <Icon size={isRow ? 18 : 24} />
            </div>
            <div className={`flex flex-col ${isRow ? 'items-start justify-center' : 'items-center'} min-w-0`}>
                <span className={`${labelStyle} ${isRow ? 'mt-0 text-[12px]' : 'mt-3 text-[13px]'}`}>{label}</span>
                <span className={`${enLabelStyle} ${isRow ? 'text-left mt-0 text-[8px]' : 'text-center'}`}>{enLabel}</span>
                {subLabel && <span className={`${subLabelStyle} ${isRow ? 'mt-0.5' : 'mt-1.5'}`}>{subLabel}</span>}
            </div>
        </div>
    );

    const ConnectionLabel = ({ text, enText, color = "text-blue-600", borderColor = "border-blue-100" }) => (
        <div className={`bg-white/95 backdrop-blur-sm px-2 py-1 rounded-xl border ${borderColor} shadow-sm flex flex-col items-center`}>
            <span className={`text-[9px] font-black leading-none ${color}`}>{text}</span>
            <span className="text-[7px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">{enText}</span>
        </div>
    );

    const FeatureBox = ({ icon: Icon, title, enTitle, activeColor = "text-teal-300" }) => (
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
                <h3 className="text-4xl font-black text-slate-900 mb-2">Agent 身份认证与授权架构</h3>
                <p className="text-slate-500 font-bold text-sm tracking-wide">Agent Identity Auth & AuthZ Architecture</p>
            </div>

            <Xwrapper>
                <div className="relative flex gap-6 items-start max-w-[1400px] mx-auto py-8">
                    {/* ====== 左列：外部（客户端） ====== */}
                    <div className="w-[200px] shrink-0 flex flex-col items-center border-[3px] border-dashed border-slate-300 bg-white/40 rounded-[40px] p-5 pt-12 relative shadow-sm">
                        <div className="absolute -top-4 bg-slate-100 px-4 py-2 rounded-full text-[10px] font-black uppercase text-slate-600 border border-slate-200 shadow-sm flex items-center gap-1.5">
                            <Globe size={14} className="text-slate-400" />
                            <span>外部 (客户端)</span>
                        </div>
                        <div className="flex flex-col items-center gap-0">
                            <Node id="user" icon={User} label="终端用户" enLabel="End User" subLabel="MFA 认证" colorClass="text-blue-600" bgClass="bg-blue-50" customWidth="w-40" />
                            <div className="h-[128px]" />
                            <Node id="frontend" icon={Globe} label="前端服务" enLabel="Frontend Service" subLabel="身份代理 (Proxy)" colorClass="text-cyan-600" bgClass="bg-cyan-50" customWidth="w-40" />
                        </div>
                    </div>

                    {/* ====== 右侧主列 ====== */}
                    <div className="flex-1 flex flex-col gap-10 min-w-0">
                        {/* 云平台内部大框 */}
                        <div className="border-[3px] border-blue-200 bg-blue-50/20 rounded-[40px] p-8 pt-12 relative shadow-md">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-100 px-8 py-2 rounded-full text-[12px] font-black uppercase text-blue-800 border-2 border-blue-200 shadow-sm flex items-center gap-2 whitespace-nowrap">
                                <Cloud size={16} className="text-blue-600" />
                                <span>云平台内部组件 / Cloud Platform Internal</span>
                            </div>

                            {/* 第一行：身份服务 + IAM */}
                            <div className="flex gap-6 items-stretch mb-8">
                                <div id="identityServiceContainer" className="flex-1 p-5 bg-gradient-to-br from-teal-800 via-teal-900 to-emerald-950 rounded-[32px] text-white flex flex-col justify-between shadow-xl shadow-teal-900/20 border-4 border-teal-500/20">
                                    <div className="flex items-center gap-4 mb-4 px-1">
                                        <div className="p-2.5 rounded-2xl bg-teal-400/10 border border-teal-400/20 shrink-0">
                                            <BrainCircuit className="text-teal-300" size={28} />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="text-base font-black leading-tight">智能体身份服务控制面</span>
                                                <span className="px-1.5 bg-teal-400/15 text-teal-300 text-[8px] font-bold rounded border border-teal-400/25 uppercase">A2A</span>
                                            </div>
                                            <span className="text-[8px] text-teal-300/60 font-bold uppercase tracking-[0.2em] mt-0.5">Control Plane</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        <FeatureBox icon={BookOpen} title="身份目录" enTitle="Identity Directory" />
                                        <FeatureBox icon={ShieldCheck} title="令牌保险库" enTitle="Token Vault" />
                                        <FeatureBox icon={FileSearch} title="策略检索" enTitle="Policy Retrieval" />
                                        <FeatureBox icon={Zap} title="身份解析器" enTitle="Identity Analyzer" />
                                    </div>
                                </div>

                                <div id="iamServiceContainer" className="w-[260px] shrink-0 p-5 bg-gradient-to-br from-indigo-800 via-indigo-900 to-violet-950 rounded-[32px] text-white flex flex-col justify-between shadow-xl shadow-indigo-900/20 border-4 border-indigo-500/20 group">
                                    <div className="flex items-center gap-3 mb-4 px-1">
                                        <div className="p-2.5 rounded-2xl bg-indigo-400/10 border border-indigo-400/20 shrink-0">
                                            <Key className="text-indigo-300" size={28} />
                                        </div>
                                        <div className="text-base font-black block">IAM 服务控制面</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="px-2 py-3 bg-indigo-700/30 rounded-xl border border-indigo-600/30 text-[8px] font-bold text-indigo-100 flex items-center justify-center gap-1.5">
                                            <ShieldAlert size={12} className="text-violet-300 shrink-0" />
                                            <span>权限治理</span>
                                        </div>
                                        <div className="px-2 py-3 bg-indigo-700/30 rounded-xl border border-indigo-600/30 text-[8px] font-bold text-indigo-100 flex items-center justify-center gap-1.5">
                                            <Fingerprint size={12} className="text-violet-300 shrink-0" />
                                            <span>角色托管</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 第二行：Agent Runtime + 后端资源 */}
                            <div className="flex gap-6 items-start">
                                <div id="agentRuntime" className="flex-1 flex flex-col items-center justify-center gap-16 border-2 border-dashed border-indigo-200 bg-indigo-50/40 rounded-3xl p-8 pt-12 pb-12 relative min-h-[380px]">
                                    <div className="absolute -top-3.5 bg-indigo-100 px-4 py-1 rounded-full text-[9px] font-black uppercase text-indigo-700 border border-indigo-200 shadow-sm flex items-center gap-1.5">
                                        <Server size={12} className="text-indigo-500" />
                                        <span>Agent Runtime / VPC</span>
                                    </div>
                                    <Node id="orchestrator" icon={Workflow} label="协调智能体" enLabel="Orchestrator Agent" hasSdk={true} hasIamSdk={true} customWidth="w-56" />
                                    <Node id="sub-agent" icon={Cpu} label="子智能体" enLabel="Sub-Agent" hasSdk={true} hasIamSdk={true} customWidth="w-56" />
                                </div>

                                <div className="w-[240px] shrink-0 pt-[38px] pb-6 flex flex-col gap-4">
                                    <Node id="llm" icon={Box} label="基础模型" enLabel="Foundation Model" hasIamSdk={true} colorClass="text-purple-600" bgClass="bg-purple-50" isRow={true} />
                                    <Node id="memory" icon={Brain} label="记忆服务" enLabel="Memory Service" hasIamSdk={true} colorClass="text-pink-600" bgClass="bg-pink-50" isRow={true} />
                                    <Node id="cloud" icon={Cloud} label="云服务" enLabel="Cloud Service" hasIamSdk={true} colorClass="text-sky-600" bgClass="bg-sky-50" isRow={true} />
                                    <Node id="knowledge-base" icon={Database} label="知识库" enLabel="Knowledge Base" hasIamSdk={true} colorClass="text-green-600" bgClass="bg-green-50" isRow={true} />
                                </div>
                            </div>

                            {/* 第三行：Agent Gateway */}
                            <div className="mt-6 flex justify-start">
                                <div id="gateway" className="w-[calc(100%-320px)] px-5 py-4 bg-gradient-to-r from-orange-900 via-amber-900 to-orange-900 rounded-[20px] text-white flex items-center justify-between shadow-lg border-2 border-amber-600/20">
                                    <div className="flex items-center gap-3">
                                        <Network className="text-amber-300" size={24} />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-black">Agent Gateway</span>
                                                <span className="px-1.5 bg-amber-400/15 text-amber-300 text-[7px] font-bold rounded border border-amber-400/25 uppercase">MCP</span>
                                            </div>
                                            <span className="text-[8px] text-amber-300/50 font-bold uppercase">Credential Gateway</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 ml-4">
                                        <div className="bg-amber-950/60 px-3 py-2 rounded-lg border border-amber-600/20 text-[9px] font-black">入站授权</div>
                                        <div className="bg-amber-950/60 px-3 py-2 rounded-lg border border-amber-600/20 text-[9px] font-black">凭证注入</div>
                                        <div className="bg-amber-950/60 px-3 py-2 rounded-lg border border-amber-600/20 text-[9px] font-black">协议转换</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 外部资源 */}
                        <div className="border-[3px] border-dashed border-slate-300 bg-white/40 rounded-[40px] px-8 py-8 pt-12 relative shadow-sm">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-100 px-5 py-2 rounded-full text-[10px] font-black uppercase text-slate-600 border border-slate-200 shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                                <ExternalLink size={14} className="text-slate-400" />
                                <span>外部组件 (资源) / External Resources</span>
                            </div>
                            <div className="flex gap-4 w-full justify-between items-start flex-nowrap">
                                <div className="flex gap-4 flex-wrap justify-start items-start">
                                    <Node id="oauth-provider" icon={UserCheck} label="OAuth / IdP" customWidth="w-36" colorClass="text-violet-600" bgClass="bg-violet-50" />
                                    <Node id="saas-apps" icon={Users} label="SaaS 应用" customWidth="w-36" colorClass="text-blue-600" bgClass="bg-blue-50" />
                                    <div id="external" className="flex flex-col items-center">
                                        <div className="flex flex-col items-center p-3 bg-white rounded-2xl border-2 border-amber-100 shadow-lg w-[190px]">
                                            <ExternalLink className="text-amber-600 mb-2" size={20} />
                                            <span className="text-sm font-black">外部服务</span>
                                            <div className="grid grid-cols-4 gap-1 w-full mt-2">
                                                <div className="bg-amber-50 p-1 text-[7px] text-center rounded">MCP</div>
                                                <div className="bg-amber-50 p-1 text-[7px] text-center rounded">CLI</div>
                                                <div className="bg-amber-50 p-1 text-[7px] text-center rounded">API</div>
                                                <div className="bg-amber-50 p-1 text-[7px] text-center rounded">其他</div>
                                            </div>
                                        </div>
                                    </div>
                                    <Node id="other-auth" icon={Lock} label="其他资源" customWidth="w-36" colorClass="text-rose-600" bgClass="bg-rose-50" />
                                </div>
                                <div className="flex shrink-0">
                                    <Node id="vector-db" icon={HardDrive} label="向量数据库" customWidth="w-40" colorClass="text-emerald-600" bgClass="bg-emerald-50" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── 连线 ── */}
                    {/* 1. 用户 → 前端 */}
                    <Xarrow start="user" end="frontend" color="#94a3b8" strokeWidth={1.5} startAnchor="bottom" endAnchor="top" labels={<ConnectionLabel text="操作请求" enText="Request" />} headSize={4} />

                    {/* 2. 前端 ↔ 协调 */}
                    <Xarrow start="frontend" end="orchestrator" color="#0891b2" strokeWidth={2} startAnchor="right" endAnchor="left" path="smooth" labels={<ConnectionLabel text="委派任务" enText="Delegation" />} headSize={4} />
                    <Xarrow start="orchestrator" end="frontend" color="#06b6d4" strokeWidth={1.5} startAnchor={{ position: "left", offset: { y: 20 } }} endAnchor={{ position: "right", offset: { y: 20 } }} path="smooth" curveness={0.5} labels={<ConnectionLabel text="结果响应" enText="Response" />} headSize={4} />

                    {/* 3. 协调 ↔ 子智能体 */}
                    <Xarrow start="orchestrator" end="sub-agent" color="#4f46e5" strokeWidth={2} startAnchor="bottom" endAnchor="top" dashness={true} labels={<ConnectionLabel text="任务分发" enText="Dispatch" />} headSize={4} />
                    <Xarrow start="sub-agent" end="orchestrator" color="#10b981" strokeWidth={1.5} startAnchor={{ position: "top", offset: { x: 45 } }} endAnchor={{ position: "bottom", offset: { x: 45 } }} labels={<ConnectionLabel text="结果聚合" enText="Aggr" />} headSize={4} />

                    {/* 4. 身份核验 */}
                    <Xarrow start="orchestrator" end="identityServiceContainer" color="#3b82f6" strokeWidth={2} startAnchor="top" endAnchor="bottom" path="smooth" labels={<ConnectionLabel text="SDK 核验" enText="Verify" />} headSize={4} />
                    <Xarrow start="identityServiceContainer" end="iamServiceContainer" color="#6366f1" strokeWidth={2} dashness={true} startAnchor="right" endAnchor="left" labels={<ConnectionLabel text="联邦同步" enText="Federation" />} headSize={4} />

                    {/* 5. 平台资源调用 */}
                    <Xarrow start="orchestrator" end="llm" color="#8b5cf6" strokeWidth={2} startAnchor="right" endAnchor="left" dashness={true} labels={<ConnectionLabel text="推理" enText="LLM" />} headSize={4} />
                    <Xarrow start="orchestrator" end="memory" color="#ec4899" strokeWidth={2} startAnchor="right" endAnchor="left" dashness={true} labels={<ConnectionLabel text="记忆" enText="Memory" />} headSize={4} />
                    <Xarrow start="sub-agent" end="cloud" color="#0ea5e9" strokeWidth={2} startAnchor="right" endAnchor="left" dashness={true} labels={<ConnectionLabel text="资源" enText="Access" />} headSize={4} />
                    <Xarrow start="sub-agent" end="knowledge-base" color="#16a34a" strokeWidth={2} startAnchor="right" endAnchor="left" dashness={true} labels={<ConnectionLabel text="检索" enText="RAG" />} headSize={4} />

                    {/* 6. Gateway & 外部链路 */}
                    <Xarrow start="sub-agent" end="gateway" color="#f59e0b" strokeWidth={2} startAnchor="bottom" endAnchor="top" labels={<ConnectionLabel text="工具调用" enText="Tools" />} headSize={4} />
                    <Xarrow start="gateway" end="oauth-provider" color="#7c3aed" strokeWidth={1.5} startAnchor="bottom" endAnchor="top" dashness={true} headSize={4} />
                    <Xarrow start="gateway" end="saas-apps" color="#3b82f6" strokeWidth={2} startAnchor="bottom" endAnchor="top" headSize={4} />
                    <Xarrow start="gateway" end="external" color="#f59e0b" strokeWidth={2} startAnchor="bottom" endAnchor="top" headSize={4} />
                    <Xarrow start="gateway" end="other-auth" color="#e11d48" strokeWidth={1.5} startAnchor="bottom" endAnchor="top" headSize={4} />
                    <Xarrow
                        start="knowledge-base"
                        end="vector-db"
                        color="#10b981"
                        strokeWidth={1.5}
                        startAnchor="right"
                        endAnchor="right"
                        path="grid"
                        gridBreak="100%"
                        headSize={4}
                    />
                </div>
            </Xwrapper>
        </div>
    );
});

export default IdentityAuthView;
