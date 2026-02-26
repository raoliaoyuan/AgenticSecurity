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
    Box
} from 'lucide-react';

const IdentityAuthView = memo(() => {
    const boxStyle = "relative flex flex-col items-center justify-center p-6 bg-white border-2 border-slate-100 rounded-3xl shadow-sm z-10 w-48 transition-all hover:border-blue-200 hover:shadow-md";
    const labelStyle = "mt-3 text-sm font-bold text-slate-700";
    const subLabelStyle = "text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1";

    const Node = ({ id, icon: Icon, label, subLabel, colorClass = "text-slate-600", bgClass = "bg-slate-50" }) => (
        <div id={id} className={boxStyle}>
            <div className={`p-4 rounded-2xl ${bgClass} ${colorClass}`}>
                <Icon size={32} />
            </div>
            <span className={labelStyle}>{label}</span>
            <span className={subLabelStyle}>{subLabel}</span>
        </div>
    );

    const ConnectionLabel = ({ text, subtext }) => (
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-blue-100 shadow-sm flex flex-col items-center">
            <span className="text-[10px] font-black text-blue-600 uppercase leading-none">{text}</span>
            {subtext && <span className="text-[9px] text-slate-400 font-medium mt-0.5">{subtext}</span>}
        </div>
    );

    return (
        <div className="p-10 bg-slate-50/50 rounded-[40px] border border-slate-200 overflow-hidden">
            <div className="mb-10 text-center">
                <h3 className="text-3xl font-black text-slate-900 mb-2">架构级身份认证链路</h3>
                <p className="text-slate-500 font-medium">基于中立架构的智能体身份识别与 A2A 授权模型</p>
            </div>

            <Xwrapper>
                <div className="relative flex flex-col gap-24 items-center max-w-5xl mx-auto py-10">

                    {/* 第一层：入口 */}
                    <div className="flex gap-40 items-start">
                        <Node
                            id="user"
                            icon={User}
                            label="End User"
                            subLabel="OIDC / IAM Identity"
                            colorClass="text-blue-600"
                            bgClass="bg-blue-50"
                        />

                        <div className="p-2 border-2 border-dashed border-slate-200 rounded-[32px] bg-white/30">
                            <Node
                                id="orchestrator"
                                icon={Workflow}
                                label="Orchestrator Agent"
                                subLabel="Agent Execution Engine"
                                colorClass="text-indigo-600"
                                bgClass="bg-indigo-50"
                            />
                        </div>
                    </div>

                    {/* 第二层：中继与执行 */}
                    <div className="flex gap-20 items-center justify-center w-full">
                        <div className="flex flex-col gap-10">
                            <Node
                                id="agent-docs"
                                icon={Cpu}
                                label="Documentation Agent"
                                subLabel="A2A Server Container"
                                colorClass="text-emerald-600"
                                bgClass="bg-emerald-50"
                            />
                            <Node
                                id="agent-blogs"
                                icon={Cpu}
                                label="Knowledge Base Agent"
                                subLabel="A2A Server Container"
                                colorClass="text-emerald-600"
                                bgClass="bg-emerald-50"
                            />
                        </div>

                        {/* 安全边界组件 */}
                        <div id="identity-service" className="w-64 p-8 bg-slate-900 rounded-[32px] text-white flex flex-col items-center shadow-2xl relative">
                            <div className="absolute -top-4 bg-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Trust Boundary</div>
                            <Shield className="text-blue-400 mb-4" size={48} />
                            <span className="text-lg font-black leading-tight">Agent Identity Service</span>
                            <span className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest text-center">Identity Bridge & Token Exchange</span>

                            <div className="mt-6 w-full space-y-2">
                                <div className="bg-slate-800 p-2 rounded-xl flex items-center gap-2 border border-slate-700">
                                    <Fingerprint size={14} className="text-blue-400" />
                                    <span className="text-[10px] font-bold">Agent Cards Verification</span>
                                </div>
                                <div className="bg-slate-800 p-2 rounded-xl flex items-center gap-2 border border-slate-700">
                                    <Key size={14} className="text-blue-400" />
                                    <span className="text-[10px] font-bold">Platform Credential Translation</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-10">
                            <Node
                                id="llm"
                                icon={Box}
                                label="Foundation Model"
                                subLabel="LLM Infrastructure"
                                colorClass="text-purple-600"
                                bgClass="bg-purple-50"
                            />
                            <Node
                                id="tools"
                                icon={Database}
                                label="External Tools"
                                subLabel="MCP / Lambda / API"
                                colorClass="text-amber-600"
                                bgClass="bg-amber-50"
                            />
                        </div>
                    </div>

                    {/* 连接线定义 */}

                    {/* 1. User to Orchestrator */}
                    <Xarrow
                        start="user"
                        end="orchestrator"
                        color="#2563eb"
                        strokeWidth={2}
                        path="smooth"
                        labels={<ConnectionLabel text="AuthN" subtext="JWT / Session ID" />}
                        headSize={4}
                    />

                    {/* 2. Orchestrator to Agents (A2A) */}
                    <Xarrow
                        start="orchestrator"
                        end="agent-docs"
                        color="#4f46e5"
                        strokeWidth={2}
                        dashness={true}
                        labels={<ConnectionLabel text="A2A Call" subtext="Bearer Token" />}
                        headSize={4}
                    />
                    <Xarrow
                        start="orchestrator"
                        end="agent-blogs"
                        color="#4f46e5"
                        strokeWidth={2}
                        dashness={true}
                        headSize={4}
                    />

                    {/* 3. Agents to Identity Service */}
                    <Xarrow
                        start="agent-docs"
                        end="identity-service"
                        color="#94a3b8"
                        strokeWidth={1.5}
                        path="grid"
                        headSize={0}
                    />
                    <Xarrow
                        start="agent-blogs"
                        end="identity-service"
                        color="#94a3b8"
                        strokeWidth={1.5}
                        path="grid"
                        headSize={0}
                    />

                    {/* 4. Identity Service to Backend */}
                    <Xarrow
                        start="identity-service"
                        end="llm"
                        color="#10b981"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="Access" subtext="Credential Entitlement" />}
                        headSize={4}
                    />
                    <Xarrow
                        start="identity-service"
                        end="tools"
                        color="#f59e0b"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="Access" subtext="MCP / Hook" />}
                        headSize={4}
                    />

                </div>
            </Xwrapper>

            {/* 底部技术标注 */}
            <div className="mt-16 grid grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <ArrowRightLeft className="text-blue-500 w-5 h-5" />
                        <h4 className="font-black text-sm uppercase tracking-tight">A2A Protocol</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">基于 Bearer Token 的 Agent 间通信标准，承载身份上下文与执行权限。</p>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Fingerprint className="text-indigo-500 w-5 h-5" />
                        <h4 className="font-black text-sm uppercase tracking-tight">Agent Cards</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">JSON 声明式身份文档，定义 Agent 能力、所属权及安全终结点。</p>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Lock className="text-emerald-500 w-5 h-5" />
                        <h4 className="font-black text-sm uppercase tracking-tight">Trust Bridge</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">身份交换服务负责将 A2A Token 转换为目标资源的本地凭证（如 Platform API Key / IAM）。</p>
                </div>
            </div>
        </div>
    );
});

export default IdentityAuthView;
