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
    const boxStyle = "relative flex flex-col items-center justify-center p-4 bg-white border-2 border-slate-100 rounded-[28px] shadow-sm z-10 w-48 transition-all hover:border-blue-200 hover:shadow-md";
    const labelStyle = "mt-3 text-[13px] font-black text-slate-800 text-center leading-tight";
    const enLabelStyle = "text-[9px] text-slate-400 uppercase tracking-tighter font-bold mt-0.5 text-center";
    const subLabelStyle = "text-[9px] text-blue-500/70 font-bold mt-1.5 text-center bg-blue-50/50 px-2 py-0.5 rounded-full";

    const Node = ({ id, icon: Icon, label, enLabel, subLabel, colorClass = "text-slate-600", bgClass = "bg-slate-50", customWidth }) => (
        <div id={id} className={`${boxStyle} ${customWidth ? customWidth : 'w-48'}`}>
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
                <h3 className="text-4xl font-black text-slate-900 mb-2">多维身份认证与授权架构</h3>
                <p className="text-slate-500 font-bold text-sm tracking-wide">Multi-dimensional Identity Authentication & Authorization Architecture</p>
            </div>

            <Xwrapper>
                <div className="relative flex flex-col gap-28 items-center max-w-6xl mx-auto py-5">

                    {/* 第一层：用户与接入 */}
                    <div className="flex gap-24 items-center">
                        <Node
                            id="user"
                            icon={User}
                            label="终端用户"
                            enLabel="End User"
                            subLabel="OIDC / 生物识别"
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

                        <Node
                            id="orchestrator"
                            icon={Workflow}
                            label="协调智能体"
                            enLabel="Orchestrator Agent"
                            subLabel="核心逻辑引擎"
                            colorClass="text-indigo-600"
                            bgClass="bg-indigo-50"
                        />
                    </div>

                    {/* 第二层：中转、身份服务与子智能体 */}
                    <div className="flex gap-12 items-center justify-center w-full">

                        <div className="flex flex-col gap-12">
                            <Node
                                id="sub-agent"
                                icon={Cpu}
                                label="子智能体"
                                enLabel="Sub-Agent"
                                subLabel="特定任务执行"
                                colorClass="text-emerald-600"
                                bgClass="bg-emerald-50"
                            />
                        </div>

                        {/* 核心身份转换器 */}
                        <div id="identity-service" className="w-[320px] p-8 bg-slate-900 rounded-[40px] text-white flex flex-col items-center shadow-2xl relative border-4 border-blue-500/20">
                            <div className="absolute -top-5 bg-blue-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl ring-4 ring-slate-900">
                                Security Bridge 安全信任桥梁
                            </div>
                            <Shield className="text-blue-400 mb-5" size={64} />
                            <span className="text-2xl font-black leading-tight text-center">智能体身份服务</span>
                            <span className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Agent Identity Service</span>

                            <div className="mt-8 w-full space-y-3">
                                <div className="bg-slate-800/80 p-3 rounded-2xl flex flex-col gap-1 border border-slate-700">
                                    <div className="flex items-center gap-2.5">
                                        <Fingerprint size={16} className="text-blue-400" />
                                        <span className="text-[11px] font-black">动态认证链</span>
                                    </div>
                                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter ml-6">Dynamic Auth Chains</span>
                                </div>
                                <div className="bg-slate-800/80 p-3 rounded-2xl flex flex-col gap-1 border border-slate-700">
                                    <div className="flex items-center gap-2.5">
                                        <Key size={16} className="text-blue-400" />
                                        <span className="text-[11px] font-black">多提供商映射</span>
                                    </div>
                                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter ml-6">Multi-Provider Mapping</span>
                                </div>
                            </div>
                        </div>

                        {/* 第三层：多元化后端资源 */}
                        <div className="grid grid-cols-2 gap-6">
                            <Node
                                id="llm"
                                icon={Box}
                                label="基础模型"
                                enLabel="Foundation Model"
                                subLabel="LLM 推理基础设施"
                                colorClass="text-purple-600"
                                bgClass="bg-purple-50"
                            />
                            <Node
                                id="cloud"
                                icon={Cloud}
                                label="云服务"
                                enLabel="Cloud Service"
                                subLabel="通过 IAM 角色调用"
                                colorClass="text-sky-600"
                                bgClass="bg-sky-50"
                            />
                            <Node
                                id="external"
                                icon={ExternalLink}
                                label="外部服务"
                                enLabel="External Service"
                                subLabel="通过 API Key 调用"
                                colorClass="text-amber-600"
                                bgClass="bg-amber-50"
                            />
                            <Node
                                id="other-auth"
                                icon={Lock}
                                label="其他鉴权服务"
                                enLabel="Other Auth Service"
                                subLabel="OAuth / 自定义协议"
                                colorClass="text-rose-600"
                                bgClass="bg-rose-50"
                            />
                        </div>
                    </div>

                    {/* 连线定义 */}

                    {/* 1. User -> Frontend -> Orchestrator */}
                    <Xarrow
                        start="user"
                        end="frontend"
                        color="#2563eb"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="用户认证" enText="User Auth" subtext="OIDC / 会话令牌" />}
                        headSize={4}
                    />
                    <Xarrow
                        start="frontend"
                        end="orchestrator"
                        color="#0891b2"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="身份流转" enText="Identity Flow" subtext="委派令牌 (Delegated Token)" color="text-cyan-600" borderColor="border-cyan-100" />}
                        headSize={4}
                    />

                    {/* 2. Orchestrator <-> Sub-Agent */}
                    <Xarrow
                        start="orchestrator"
                        end="sub-agent"
                        color="#4f46e5"
                        strokeWidth={2}
                        dashness={true}
                        labels={<ConnectionLabel text="A2A 编排" enText="A2A Orchestration" subtext="任务上下文传递" color="text-indigo-600" borderColor="border-indigo-100" />}
                        headSize={4}
                        path="smooth"
                    />

                    {/* 3. Agents to Identity Service */}
                    <Xarrow
                        start="orchestrator"
                        end="identity-service"
                        color="#94a3b8"
                        strokeWidth={1.5}
                        dashness={{ strokeLen: 5, nonStrokeLen: 5 }}
                        headSize={3}
                        path="grid"
                    />
                    <Xarrow
                        start="sub-agent"
                        end="identity-service"
                        color="#94a3b8"
                        strokeWidth={1.5}
                        dashness={{ strokeLen: 5, nonStrokeLen: 5 }}
                        headSize={3}
                        path="grid"
                    />

                    {/* 4. Identity Service to Backend Cluster */}
                    <Xarrow
                        start="identity-service"
                        end="llm"
                        color="#8b5cf6"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="授权访问" enText="Authorization" subtext="Token / Prompt" color="text-purple-600" borderColor="border-purple-100" />}
                        headSize={4}
                    />
                    <Xarrow
                        start="identity-service"
                        end="cloud"
                        color="#0ea5e9"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="授权访问" enText="Authorization" subtext="IAM 策略转换" color="text-sky-600" borderColor="border-sky-100" />}
                        headSize={4}
                    />
                    <Xarrow
                        start="identity-service"
                        end="external"
                        color="#f59e0b"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="授权访问" enText="Authorization" subtext="API Key 注入" color="text-amber-600" borderColor="border-amber-100" />}
                        headSize={4}
                    />
                    <Xarrow
                        start="identity-service"
                        end="other-auth"
                        color="#e11d48"
                        strokeWidth={2}
                        labels={<ConnectionLabel text="授权访问" enText="Authorization" subtext="自定义插件验证" color="text-rose-600" borderColor="border-rose-100" />}
                        headSize={4}
                    />

                </div>
            </Xwrapper>

            {/* 底部架构说明 */}
            <div className="mt-20 grid grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-blue-200 transition-colors">
                    <Zap className="text-blue-500 mb-3 group-hover:scale-110 transition-transform" size={24} />
                    <h5 className="font-black text-xs mb-1 uppercase tracking-tight">身份穿透 (Propagation)</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">用户身份穿透接入层和编排层，确保执行路径全链路可审计。</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-indigo-200 transition-colors">
                    <Workflow className="text-indigo-500 mb-3 group-hover:scale-110 transition-transform" size={24} />
                    <h5 className="font-black text-xs mb-1 uppercase tracking-tight">智能体委派 (Delegation)</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">通过受限的 Bearer Token 实现协调智能体对子智能体的精确授权。</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-slate-300 transition-colors">
                    <Shield className="text-slate-700 mb-3 group-hover:scale-110 transition-transform" size={24} />
                    <h5 className="font-black text-xs mb-1 uppercase tracking-tight">身份中继 (Broker)</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">中立化身份服务负责将通用智能体凭证转换为特定的后端鉴权方式。</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-emerald-200 transition-colors">
                    <Lock className="text-emerald-500 mb-3 group-hover:scale-110 transition-transform" size={24} />
                    <h5 className="font-black text-xs mb-1 uppercase tracking-tight">统一边界 (One Boundary)</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">统一管理 IAM、API Key、OAuth 等异构认证，提供一致的安全边界。</p>
                </div>
            </div>
        </div>
    );
});

export default IdentityAuthView;
