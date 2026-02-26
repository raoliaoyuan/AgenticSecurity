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
    Layers
} from 'lucide-react';

const IdentityAuthView = memo(() => {
    const boxStyle = "relative flex flex-col items-center justify-center p-4 bg-white border-2 border-slate-100 rounded-[28px] shadow-sm z-10 transition-all hover:border-blue-200 hover:shadow-md";
    const labelStyle = "mt-3 text-[13px] font-black text-slate-800 text-center leading-tight";
    const enLabelStyle = "text-[9px] text-slate-400 uppercase tracking-tighter font-bold mt-0.5 text-center";
    const subLabelStyle = "text-[9px] text-blue-500/70 font-bold mt-1.5 text-center bg-blue-50/50 px-2 py-0.5 rounded-full";

    const Node = ({ id, icon: Icon, label, enLabel, subLabel, colorClass = "text-slate-600", bgClass = "bg-slate-50", customWidth, hasSdk }) => (
        <div id={id} className={`${boxStyle} ${customWidth ? customWidth : 'w-48'}`}>
            {hasSdk && (
                <div className="absolute -top-3 -right-3 bg-slate-900 text-white px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg ring-2 ring-white z-20">
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

    return (
        <div className="p-10 bg-slate-50/50 rounded-[40px] border border-slate-200 overflow-hidden">
            <div className="mb-14 text-center">
                <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-200">
                    Security Architecture 可视化安全架构
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-2">多维身份认证与授权架构 (SDK 模式)</h3>
                <p className="text-slate-500 font-bold text-sm tracking-wide">Multi-dimensional Identity Auth & AuthZ Architecture (SDK Mode)</p>
            </div>

            <Xwrapper>
                <div className="relative flex flex-col gap-24 items-center max-w-6xl mx-auto py-5">

                    {/* 顶部中心：独立身份服务 */}
                    <div id="identity-service" className="w-[450px] p-8 bg-slate-900 rounded-[45px] text-white flex flex-col items-center shadow-2xl relative border-4 border-blue-500/20">
                        <div className="absolute -top-5 bg-blue-600 px-7 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl ring-4 ring-slate-900">
                            Central Trusted Authority 核心安全中心
                        </div>
                        <div className="flex items-center gap-10 w-full mb-2">
                            <Shield className="text-blue-400" size={60} />
                            <div className="flex flex-col">
                                <span className="text-2xl font-black leading-tight">智能体身份服务</span>
                                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">Agent Identity Service</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4 w-full text-center">
                            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
                                <span className="text-[11px] font-black block">动态认证与交换</span>
                                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter mt-1 block">Dynamic Auth & Token Exchange</span>
                            </div>
                            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
                                <span className="text-[11px] font-black block">多源凭证转换</span>
                                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter mt-1 block">Cross-Provider Mapping</span>
                            </div>
                        </div>
                    </div>

                    {/* 中间层：用户、前端与智能体集群 */}
                    <div className="flex gap-16 items-start">
                        {/* 左侧：入向流量 */}
                        <div className="flex flex-col gap-20">
                            <Node
                                id="user"
                                icon={User}
                                label="终端用户"
                                enLabel="End User"
                                subLabel="OIDC / 会话令牌"
                                colorClass="text-blue-600"
                                bgClass="bg-blue-50"
                            />
                            <Node
                                id="frontend"
                                icon={Globe}
                                label="前端服务"
                                enLabel="Frontend Service"
                                subLabel="Web / App 门户"
                                colorClass="text-cyan-600"
                                bgClass="bg-cyan-50"
                            />
                        </div>

                        {/* 中间：智能体集群 (SDK 集成) */}
                        <div className="flex flex-col gap-20 pt-10">
                            <div className="relative">
                                <Node
                                    id="orchestrator"
                                    icon={Workflow}
                                    label="协调智能体"
                                    enLabel="Orchestrator Agent"
                                    subLabel="任务编排引擎"
                                    colorClass="text-indigo-600"
                                    bgClass="bg-indigo-50"
                                    hasSdk={true}
                                />
                            </div>
                            <div className="relative">
                                <Node
                                    id="sub-agent"
                                    icon={Cpu}
                                    label="子智能体"
                                    enLabel="Sub-Agent"
                                    subLabel="特定职能执行"
                                    colorClass="text-emerald-600"
                                    bgClass="bg-emerald-50"
                                    hasSdk={true}
                                />
                            </div>
                        </div>

                        {/* 右侧：多元后端资源 */}
                        <div className="grid grid-cols-2 gap-6 pt-5">
                            <Node
                                id="llm"
                                icon={Box}
                                label="基础模型"
                                enLabel="Foundation Model"
                                subLabel="推理基础设施"
                                colorClass="text-purple-600"
                                bgClass="bg-purple-50"
                                customWidth="w-40"
                            />
                            <Node
                                id="cloud"
                                icon={Cloud}
                                label="云服务"
                                enLabel="Cloud Service"
                                subLabel="IAM 为中心"
                                colorClass="text-sky-600"
                                bgClass="bg-sky-50"
                                customWidth="w-40"
                            />
                            <Node
                                id="external"
                                icon={ExternalLink}
                                label="外部服务"
                                enLabel="External Service"
                                subLabel="API Key 鉴权"
                                colorClass="text-amber-600"
                                bgClass="bg-amber-50"
                                customWidth="w-40"
                            />
                            <Node
                                id="other-auth"
                                icon={Lock}
                                label="其他鉴权"
                                enLabel="Other Auth"
                                subLabel="自定义协议"
                                colorClass="text-rose-600"
                                bgClass="bg-rose-50"
                                customWidth="w-40"
                            />
                        </div>
                    </div>

                    {/* 连线与逻辑流转 */}

                    {/* 1. 用户流程 */}
                    <Xarrow
                        start="user"
                        end="frontend"
                        color="#2563eb"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="用户访问" enText="User Access" />}
                        headSize={4}
                    />
                    <Xarrow
                        start="frontend"
                        end="orchestrator"
                        color="#0891b2"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="请求委派" enText="Delegation" />}
                        headSize={4}
                    />

                    {/* 2. 智能体间编排 */}
                    <Xarrow
                        start="orchestrator"
                        end="sub-agent"
                        color="#4f46e5"
                        strokeWidth={2}
                        dashness={true}
                        labels={<ConnectionLabel text="A2A 编排" enText="A2A Orchestration" />}
                        headSize={4}
                        path="smooth"
                    />

                    {/* 3. SDK 与身份服务交互 (核心请求) */}
                    <Xarrow
                        start="orchestrator"
                        end="identity-service"
                        color="#3b82f6"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="SDK 凭证请求" enText="SDK Auth Call" color="text-blue-500" />}
                        headSize={4}
                        path="grid"
                    />
                    <Xarrow
                        start="sub-agent"
                        end="identity-service"
                        color="#3b82f6"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="SDK 凭证请求" enText="SDK Auth Call" color="text-blue-500" />}
                        headSize={4}
                        path="grid"
                    />

                    {/* 4. 身份服务转换后访问后端 */}
                    <Xarrow
                        start="identity-service"
                        end="llm"
                        color="#8b5cf6"
                        strokeWidth={2}
                        dashness={{ strokeLen: 4, nonStrokeLen: 4 }}
                    />
                    <Xarrow
                        start="identity-service"
                        end="cloud"
                        color="#0ea5e9"
                        strokeWidth={2}
                        dashness={{ strokeLen: 4, nonStrokeLen: 4 }}
                    />
                    <Xarrow
                        start="identity-service"
                        end="external"
                        color="#f59e0b"
                        strokeWidth={2}
                        dashness={{ strokeLen: 4, nonStrokeLen: 4 }}
                    />
                    <Xarrow
                        start="identity-service"
                        end="other-auth"
                        color="#e11d48"
                        strokeWidth={2}
                        dashness={{ strokeLen: 4, nonStrokeLen: 4 }}
                    />

                </div>
            </Xwrapper>

            {/* 底部架构说明 */}
            <div className="mt-24 grid grid-cols-4 gap-6 px-10">
                <div className="flex flex-col items-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                    <Layers className="text-slate-900 mb-3" size={24} />
                    <h5 className="font-black text-xs uppercase tracking-tight mb-1">SDK-Based Auth</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">智能体通过内置 SDK 无缝接入安全体系，无需处理复杂的协议细节。</p>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                    <Shield className="text-blue-600 mb-3" size={24} />
                    <h5 className="font-black text-xs uppercase tracking-tight mb-1">Central Authority</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">独立的身份服务作为全系统的信任根，负责多源身份的统一映射。</p>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                    <ArrowRightLeft className="text-indigo-600 mb-3" size={24} />
                    <h5 className="font-black text-xs uppercase tracking-tight mb-1">Token Exchange</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">身份服务实时将智能体 A2A 凭证转换为后端资源要求的原生凭证。</p>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                    <Zap className="text-emerald-500 mb-3" size={24} />
                    <h5 className="font-black text-xs uppercase tracking-tight mb-1">One Security View</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">全链路透明可审计，从用户到最终 API 调用的完整身份流转路径。</p>
                </div>
            </div>
        </div>
    );
});

export default IdentityAuthView;
