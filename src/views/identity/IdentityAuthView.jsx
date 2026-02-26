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
    Zap
} from 'lucide-react';

const IdentityAuthView = memo(() => {
    const boxStyle = "relative flex flex-col items-center justify-center p-5 bg-white border-2 border-slate-100 rounded-[28px] shadow-sm z-10 w-44 transition-all hover:border-blue-200 hover:shadow-md";
    const labelStyle = "mt-3 text-xs font-bold text-slate-700 text-center";
    const subLabelStyle = "text-[9px] text-slate-400 uppercase tracking-widest font-bold mt-1 text-center";

    const Node = ({ id, icon: Icon, label, subLabel, colorClass = "text-slate-600", bgClass = "bg-slate-50", customWidth }) => (
        <div id={id} className={`${boxStyle} ${customWidth ? customWidth : 'w-44'}`}>
            <div className={`p-3.5 rounded-2xl ${bgClass} ${colorClass}`}>
                <Icon size={28} />
            </div>
            <span className={labelStyle}>{label}</span>
            <span className={subLabelStyle}>{subLabel}</span>
        </div>
    );

    const ConnectionLabel = ({ text, subtext, color = "text-blue-600", borderColor = "border-blue-100" }) => (
        <div className={`bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg border ${borderColor} shadow-sm flex flex-col items-center`}>
            <span className={`text-[9px] font-black uppercase leading-none ${color}`}>{text}</span>
            {subtext && <span className="text-[8px] text-slate-400 font-medium mt-0.5">{subtext}</span>}
        </div>
    );

    return (
        <div className="p-8 bg-slate-50/50 rounded-[40px] border border-slate-200 overflow-hidden">
            <div className="mb-12 text-center">
                <h3 className="text-3xl font-black text-slate-900 mb-2">多维身份认证与授权架构</h3>
                <p className="text-slate-500 font-medium italic">端到端智能体安全访问链路可视化</p>
            </div>

            <Xwrapper>
                <div className="relative flex flex-col gap-24 items-center max-w-6xl mx-auto py-5">

                    {/* 第一层：用户与接入 */}
                    <div className="flex gap-32 items-center">
                        <Node
                            id="user"
                            icon={User}
                            label="End User"
                            subLabel="OIDC / Biometric"
                            colorClass="text-blue-600"
                            bgClass="bg-blue-50"
                        />

                        <Node
                            id="frontend"
                            icon={Globe}
                            label="Frontend Service"
                            subLabel="Web / App Portal"
                            colorClass="text-cyan-600"
                            bgClass="bg-cyan-50"
                        />

                        <Node
                            id="orchestrator"
                            icon={Workflow}
                            label="Orchestrator Agent"
                            subLabel="Central Logic"
                            colorClass="text-indigo-600"
                            bgClass="bg-indigo-50"
                        />
                    </div>

                    {/* 第二层：中继、身份服务与子智能体 */}
                    <div className="flex gap-16 items-center justify-center w-full">

                        <div className="flex flex-col gap-12">
                            <Node
                                id="sub-agent"
                                icon={Cpu}
                                label="Sub-Agent"
                                subLabel="Task Execution"
                                colorClass="text-emerald-600"
                                bgClass="bg-emerald-50"
                            />
                        </div>

                        {/* 核心身份转换器 */}
                        <div id="identity-service" className="w-72 p-8 bg-slate-900 rounded-[35px] text-white flex flex-col items-center shadow-2xl relative border-4 border-blue-500/20">
                            <div className="absolute -top-4 bg-blue-600 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Security Bridge</div>
                            <Shield className="text-blue-400 mb-4" size={54} />
                            <span className="text-xl font-black leading-tight text-center">Agent Identity Service</span>
                            <span className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest text-center px-4">Trusted Identity Exchange & Token Broker</span>

                            <div className="mt-8 w-full space-y-2.5">
                                <div className="bg-slate-800/80 p-2.5 rounded-xl flex items-center gap-2.5 border border-slate-700">
                                    <Fingerprint size={16} className="text-blue-400" />
                                    <span className="text-[10px] font-bold">Dynamic Auth Chains</span>
                                </div>
                                <div className="bg-slate-800/80 p-2.5 rounded-xl flex items-center gap-2.5 border border-slate-700">
                                    <Key size={16} className="text-blue-400" />
                                    <span className="text-[10px] font-bold">Multi-Provider Mapping</span>
                                </div>
                            </div>
                        </div>

                        {/* 第三层：多元化后端资源 */}
                        <div className="grid grid-cols-2 gap-8">
                            <Node
                                id="llm"
                                icon={Box}
                                label="Foundation Model"
                                subLabel="LLM Engine"
                                colorClass="text-purple-600"
                                bgClass="bg-purple-50"
                            />
                            <Node
                                id="cloud"
                                icon={Cloud}
                                label="Cloud Service"
                                subLabel="via IAM Role"
                                colorClass="text-sky-600"
                                bgClass="bg-sky-50"
                            />
                            <Node
                                id="external"
                                icon={ExternalLink}
                                label="External Service"
                                subLabel="via API Key"
                                colorClass="text-amber-600"
                                bgClass="bg-amber-50"
                            />
                            <Node
                                id="other-auth"
                                icon={Lock}
                                label="Other Auth Service"
                                subLabel="OAuth / Custom"
                                colorClass="text-rose-600"
                                bgClass="bg-rose-50"
                            />
                        </div>
                    </div>

                    {/* 复杂的连线定义 */}

                    {/* 1. User -> Frontend -> Orchestrator */}
                    <Xarrow
                        start="user"
                        end="frontend"
                        color="#2563eb"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="User Auth" subtext="OIDC / Session" />}
                        headSize={4}
                    />
                    <Xarrow
                        start="frontend"
                        end="orchestrator"
                        color="#0891b2"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="Identity Flow" subtext="Delegated Token" color="text-cyan-600" borderColor="border-cyan-100" />}
                        headSize={4}
                    />

                    {/* 2. Orchestrator <-> Sub-Agent */}
                    <Xarrow
                        start="orchestrator"
                        end="sub-agent"
                        color="#4f46e5"
                        strokeWidth={2}
                        dashness={true}
                        labels={<ConnectionLabel text="A2A Orchestration" subtext="Task Context" color="text-indigo-600" borderColor="border-indigo-100" />}
                        headSize={4}
                        path="smooth"
                    />

                    {/* 3. Agents to Identity Service */}
                    <Xarrow
                        start="orchestrator"
                        end="identity-service"
                        color="#64748b"
                        strokeWidth={1.5}
                        dashness={{ strokeLen: 4, nonStrokeLen: 4 }}
                        headSize={3}
                        path="grid"
                    />
                    <Xarrow
                        start="sub-agent"
                        end="identity-service"
                        color="#64748b"
                        strokeWidth={1.5}
                        dashness={{ strokeLen: 4, nonStrokeLen: 4 }}
                        headSize={3}
                        path="grid"
                    />

                    {/* 4. Identity Service to Backend Cluster */}
                    <Xarrow
                        start="identity-service"
                        end="llm"
                        color="#8b5cf6"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="AuthZ" subtext="Token / Prompt" color="text-purple-600" borderColor="border-purple-100" />}
                        headSize={4}
                    />
                    <Xarrow
                        start="identity-service"
                        end="cloud"
                        color="#0ea5e9"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="AuthZ" subtext="IAM Policy" color="text-sky-600" borderColor="border-sky-100" />}
                        headSize={4}
                    />
                    <Xarrow
                        start="identity-service"
                        end="external"
                        color="#f59e0b"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="AuthZ" subtext="API Key" color="text-amber-600" borderColor="border-amber-100" />}
                        headSize={4}
                    />
                    <Xarrow
                        start="identity-service"
                        end="other-auth"
                        color="#e11d48"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="AuthZ" subtext="Custom Provider" color="text-rose-600" borderColor="border-rose-100" />}
                        headSize={4}
                    />

                </div>
            </Xwrapper>

            {/* 底部架构说明 */}
            <div className="mt-16 grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                    <Zap className="text-blue-500 mb-2" size={20} />
                    <h5 className="font-bold text-[11px] mb-1">Identity Propagation</h5>
                    <p className="text-[10px] text-slate-500 leading-tight">用户身份穿透接入层和编排层，确保执行路径全链路可审计。</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                    <Workflow className="text-indigo-500 mb-2" size={20} />
                    <h5 className="font-bold text-[11px] mb-1">A2A Delegation</h5>
                    <p className="text-[10px] text-slate-500 leading-tight">通过受限的 Bearer Token 实现协调智能体对子智能体的精确授权。</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                    <Shield className="text-slate-700 mb-2" size={20} />
                    <h5 className="font-bold text-[11px] mb-1">Identity Broker</h5>
                    <p className="text-[10px] text-slate-500 leading-tight">中立化身份服务负责将通用智能体凭证转换为特定的后端鉴权方式。</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                    <Lock className="text-emerald-500 mb-2" size={20} />
                    <h5 className="font-bold text-[11px] mb-1">Multi-Backend Auth</h5>
                    <p className="text-[10px] text-slate-500 leading-tight">统一管理 IAM、API Key、OAuth 等异构认证，提供一致的安全边界。</p>
                </div>
            </div>
        </div>
    );
});

export default IdentityAuthView;
