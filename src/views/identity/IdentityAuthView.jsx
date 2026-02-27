import React, { memo, useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import Xarrow, { Xwrapper, useXarrow } from 'react-xarrows';
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
    const [showAuthView, setShowAuthView] = useState(false);
    const [renderTick, setRenderTick] = useState(0);
    const { width, height } = useWindowSize(); // Listen to window resize to fix offset lines

    // Force re-render of arrows when auth view toggles or window resizes because node sizes change
    useEffect(() => {
        // Pulse multiple times to ensure layout is settled
        const timers = [
            setTimeout(() => setRenderTick(prev => prev + 1), 0),
            setTimeout(() => setRenderTick(prev => prev + 1), 50),
            setTimeout(() => setRenderTick(prev => prev + 1), 150),
            setTimeout(() => setRenderTick(prev => prev + 1), 300)
        ];
        return () => timers.forEach(clearTimeout);
    }, [showAuthView, width, height]);

    const baseBoxStyle = "relative bg-white border-2 border-slate-100 shadow-sm z-10 transition-[border-color,box-shadow,transform] duration-300 hover:border-blue-200 hover:shadow-md";
    const boxStyle = `${baseBoxStyle} flex flex-col items-center justify-center pt-2 pb-4 px-4 rounded-[28px]`;
    const rowBoxStyle = `${baseBoxStyle} flex flex-row items-center justify-start py-2 px-3 gap-3 rounded-[16px] h-14`;
    const labelStyle = "text-[13px] font-black text-slate-800 text-center leading-tight";
    const enLabelStyle = "text-[9px] text-slate-400 uppercase tracking-tighter font-bold mt-0.5 text-center";
    const subLabelStyle = "text-[9px] text-blue-500/70 font-bold mt-1.5 text-center bg-blue-50/50 px-2 py-0.5 rounded-full";

    const Node = ({ id, icon: Icon, label, enLabel, subLabel, colorClass = "text-slate-600", bgClass = "bg-slate-50", customWidth, hasSdk, hasIamSdk, isRow = false, showAuthView, idpName, idpTooltip }) => {
        const updateXarrow = useXarrow();
        useEffect(() => {
            updateXarrow();
        }, [showAuthView, updateXarrow]);

        return (
            <div id={id} className={`${isRow ? rowBoxStyle : boxStyle} ${customWidth ? customWidth : (isRow ? 'w-full' : 'w-48')} relative`}>
                {showAuthView && idpName && (
                    <div className={`absolute ${isRow ? '-top-2 -left-2' : '-top-3 -left-3'} bg-orange-500 text-white px-2 py-0.5 rounded-lg text-[8px] font-black shadow-md z-30 flex items-center gap-1 cursor-help`} title={idpTooltip}>
                        <ShieldCheck size={10} />
                        {idpName}
                    </div>
                )}
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
                <div className={`${isRow ? 'p-1.5 rounded-xl' : 'p-2 rounded-2xl mt-1'} ${bgClass} ${colorClass} shrink-0`}>
                    <Icon size={isRow ? 18 : 24} />
                </div>
                <div className={`flex flex-col ${isRow ? 'items-start justify-center' : 'items-center'} min-w-0`}>
                    <span className={`${labelStyle} ${isRow ? 'mt-0 text-[12px]' : 'mt-1.5 text-[13px]'}`}>{label}</span>
                    <span className={`${enLabelStyle} ${isRow ? 'text-left mt-0 text-[8px]' : 'text-center'}`}>{enLabel}</span>
                    {subLabel && <span className={`${subLabelStyle} ${isRow ? 'mt-0.5' : 'mt-1.5'}`}>{subLabel}</span>}
                </div>
            </div>
        );
    };

    const ConnectionLabel = ({ text, enText, color = "text-blue-600", borderColor = "border-blue-100", seq, authMethod, showAuthView, authTooltip }) => {
        const updateXarrow = useXarrow();
        useEffect(() => {
            updateXarrow();
        }, [showAuthView, updateXarrow]);

        return (
            <div className={`bg-white/95 backdrop-blur-sm px-2 py-1 rounded-xl border ${showAuthView && authMethod ? 'border-orange-300' : borderColor} shadow-sm flex flex-col items-center relative`}>
                {showAuthView && seq && (
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-orange-500 text-white rounded-full flex items-center justify-center text-[9px] font-black shadow-md z-10">
                        {seq}
                    </div>
                )}
                <span className={`text-[9px] font-black leading-none ${showAuthView && authMethod ? 'text-orange-600' : color}`}>{text}</span>
                <span className="text-[7px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">{enText}</span>
                {showAuthView && authMethod && (
                    <span className="text-[7px] bg-orange-100 text-orange-700 px-1 py-0.5 rounded mt-0.5 font-bold cursor-help" title={authTooltip}>{authMethod}</span>
                )}
            </div>
        );
    };

    const FeatureBox = ({ icon: Icon, title, enTitle, activeColor = "text-teal-300" }) => (
        <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-colors flex flex-col gap-1 items-start group">
            <div className="flex items-center gap-2">
                <Icon size={14} className={`${activeColor} group-hover:scale-110 transition-transform`} />
                <span className="text-[10px] font-black text-white">{title}</span>
            </div>
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter ml-5 group-hover:text-slate-400 transition-colors">{enTitle}</span>
        </div>
    );

    const SubComponent = ({ icon: Icon, label, enLabel, tooltip }) => (
        <div className={`flex-1 bg-slate-900/40 rounded-xl p-3 flex flex-col items-center justify-center gap-2 border border-slate-700/50 hover:bg-slate-800/60 transition-colors ${tooltip ? 'cursor-help' : ''}`} title={tooltip}>
            <div className="flex items-center gap-2">
                <Icon size={16} className="text-emerald-400" />
                <span className="text-sm font-bold text-slate-200">{label}</span>
            </div>
            <span className="text-[10px] font-black text-slate-500">{enLabel}</span>
        </div>
    );

    const RuntimeContainer = ({ children }) => (
        <div className="p-1.5 bg-indigo-50/50 rounded-[36px] border border-indigo-200/50 shadow-inner flex flex-col items-center relative group overflow-visible">
            <div className="absolute -bottom-2.5 right-6 flex items-center gap-1.5 opacity-40 group-hover:opacity-80 transition-opacity bg-white/80 px-2 py-0.5 rounded-full border border-indigo-100 shadow-sm">
                <Terminal size={10} className="text-indigo-600" />
                <span className="text-[8px] font-black text-indigo-700 uppercase tracking-widest">Runtime Instance</span>
            </div>
            {children}
        </div>
    );

    return (
        <div className="p-10 bg-slate-50/50 rounded-[40px] border border-slate-200 overflow-hidden">
            <div className="mb-14 text-center relative">
                <div className="absolute right-0 top-0 flex items-center gap-3">
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Access Flow</div>
                        <div className="text-sm font-black text-slate-800 leading-none">身份认证授权视图</div>
                    </div>
                    <button
                        onClick={() => setShowAuthView(!showAuthView)}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none shadow-inner ${showAuthView ? 'bg-orange-500 shadow-orange-900/20' : 'bg-slate-200'}`}
                    >
                        <span className={`${showAuthView ? 'translate-x-6' : 'translate-x-1'} inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-md flex items-center justify-center`}>
                            {showAuthView ? <ShieldCheck className="w-3 h-3 text-orange-600" /> : <Lock className="w-3 h-3 text-slate-400" />}
                        </span>
                    </button>
                </div>
                <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                    Security Architecture 可视化安全架构
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-2">Agent 身份认证与授权架构</h3>
                <p className="text-slate-500 font-bold text-sm tracking-wide">Agent Identity Auth & AuthZ Architecture</p>
            </div>

            <Xwrapper key={renderTick}>
                <div className="relative flex gap-6 items-start max-w-[1400px] mx-auto py-8">
                    {/* ====== 左列：外部（客户端） ====== */}
                    <div className="w-[200px] shrink-0 flex flex-col items-center border-[3px] border-dashed border-slate-300 bg-white/40 rounded-[40px] p-5 pt-12 relative shadow-sm">
                        <div className="absolute -top-4 bg-slate-100 px-4 py-2 rounded-full text-[10px] font-black uppercase text-slate-600 border border-slate-200 shadow-sm flex items-center gap-1.5">
                            <Globe size={14} className="text-slate-400" />
                            <span>外部 (客户端)</span>
                        </div>
                        <div className="flex flex-col items-center gap-0">
                            <Node id="user" icon={User} label="终端用户" enLabel="End User" subLabel="MFA 认证" colorClass="text-blue-600" bgClass="bg-blue-50" customWidth="w-40" showAuthView={showAuthView} idpName="组织 IdP (OIDC)" idpTooltip="持有企业 IdP 颁发的标准 OAuth 2.0 / OIDC 身份令牌 (ID Token & Access Token)，用以建立初始访问会话。" />
                            <div className="h-[128px]" />
                            <Node id="frontend" icon={Globe} label="前端服务" enLabel="Frontend Service" subLabel="身份代理 (Proxy)" colorClass="text-cyan-600" bgClass="bg-cyan-50" customWidth="w-40" showAuthView={showAuthView} idpName="Identity Proxy" idpTooltip="利用 Token Exchange 协议，作为身份代理验证前端 User Token，并转换为适用于后端的运行时上下文 (Context Token)。" />
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
                                <div id="identityServiceContainer" className="relative flex-1 p-5 bg-gradient-to-br from-teal-800 via-teal-900 to-emerald-950 rounded-[32px] text-white flex flex-col justify-between shadow-xl shadow-teal-900/20 border-4 border-teal-500/20">
                                    {showAuthView && (
                                        <div className="absolute -top-3 -left-3 bg-orange-500 text-white px-2 py-1 rounded-lg text-[9px] font-black shadow-md z-30 flex items-center gap-1 cursor-help" title="内部控制面核心。基于 SPIFFE/SPIRE等协议，校验工作负载并签发 SVID 或特定内部 JWT 格式的短期机器身份凭证。">
                                            <ShieldCheck size={12} />
                                            Agent IdP (身份提供方)
                                        </div>
                                    )}
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
                                    {/* 内部模块 */}
                                    <div className="grid grid-cols-4 gap-2">
                                        <SubComponent icon={BookOpen} label="身份目录" enLabel="IDENTITY DIRECTORY" tooltip="统一维护系统内所有 Agent 实例与集成工具的身份注册元数据，包括名称、别名与关联的授权凭据记录映射中心。" />
                                        <SubComponent icon={ShieldCheck} label="令牌保险库" enLabel="TOKEN VAULT" tooltip="高度隔离的安全存储服务。负责加密封装保存用于外部 API 调用的高价值密钥、第三方凭证与工具连接令牌。" />
                                        <SubComponent icon={FileSearch} label="策略检索" enLabel="POLICY RETRIEVAL" tooltip="对接策略存储层，根据请求上下文动态提取对应的访问控制规则 (Policies)，为 Agent 调用资源提供细化到动作级别的策略判决依据。" />
                                        <SubComponent icon={Zap} label="身份解析器" enLabel="IDENTITY ANALYZER" tooltip="深度解码每次交互请求携带的会话上下文及任务令牌，核实验证来访 Agent 凭证的业务合法性与生命周期连续性。" />
                                    </div>
                                </div>

                                <div id="iamServiceContainer" className="relative w-[260px] shrink-0 p-5 bg-gradient-to-br from-indigo-800 via-indigo-900 to-violet-950 rounded-[32px] text-white flex flex-col justify-between shadow-xl shadow-indigo-900/20 border-4 border-indigo-500/20 group">
                                    {showAuthView && (
                                        <div className="absolute -top-3 -right-3 bg-orange-500 text-white px-2 py-1 rounded-lg text-[9px] font-black shadow-md z-30 flex items-center gap-1 cursor-help" title="基于云原生底座 (如 AWS STS/卷挂载) 签发临时云端凭证 (Temporary Security Credentials)，实施基于 IAM Policy 的原子级控制。">
                                            <ShieldCheck size={12} />
                                            Cloud IAM (凭证签发)
                                        </div>
                                    )}
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
                            <div className="flex gap-6 items-stretch">
                                <div id="agentRuntime" className="flex-1 flex flex-col items-center justify-between gap-16 border-2 border-dashed border-indigo-200 bg-indigo-50/10 rounded-3xl p-8 pt-12 pb-12 relative min-h-[440px]">
                                    <div className="absolute -top-3.5 bg-indigo-100 px-4 py-1 rounded-full text-[9px] font-black uppercase text-indigo-700 border border-indigo-200 shadow-sm flex items-center gap-1.5">
                                        <Server size={12} className="text-indigo-500" />
                                        <span>Agent Runtime Environment</span>
                                    </div>
                                    <RuntimeContainer>
                                        <Node id="orchestrator" icon={Workflow} label="协调智能体" enLabel="Orchestrator Agent" hasSdk={true} hasIamSdk={true} customWidth="w-56" showAuthView={showAuthView} idpName="执行身份注入" idpTooltip="平台挂载的全局基线执行角色 (Execution Role Payload)，携带用户上下文的 JWT 声明，用于跨域访问内部核心管控服务。" />
                                    </RuntimeContainer>
                                    <RuntimeContainer>
                                        <Node id="sub-agent" icon={Cpu} label="子智能体" enLabel="Sub-Agent" hasSdk={true} hasIamSdk={true} customWidth="w-56" showAuthView={showAuthView} idpName="短效任务委派" idpTooltip="由协调智能体动态生成的任务级 JWT (Task-scoped Token)，与 mTLS 证书绑定，具备强制降权边界和极短有效期。" />
                                    </RuntimeContainer>
                                </div>

                                <div className="w-[240px] shrink-0 pt-12 pb-12 flex flex-col justify-between">
                                    <Node id="llm" icon={Box} label="基础模型" enLabel="Foundation Model" hasIamSdk={true} colorClass="text-purple-600" bgClass="bg-purple-50" isRow={true} showAuthView={showAuthView} idpName="服务托管身份" idpTooltip="依赖底层 IAM 策略控制。通过校验请求头中附带的 SigV4 签名或平台级受控 Bearer JWT 实现被动资源鉴权。" />
                                    <Node id="memory" icon={Brain} label="记忆服务" enLabel="Memory Service" hasIamSdk={true} colorClass="text-pink-600" bgClass="bg-pink-50" isRow={true} showAuthView={showAuthView} idpName="服务托管身份" idpTooltip="依赖底层 IAM 策略控制。通过校验请求头中附带的 SigV4 签名或平台级受控 Bearer JWT 实现被动资源鉴权。" />
                                    <Node id="cloud" icon={Cloud} label="云服务" enLabel="Cloud Service" hasIamSdk={true} colorClass="text-sky-600" bgClass="bg-sky-50" isRow={true} showAuthView={showAuthView} idpName="服务托管身份" idpTooltip="依赖底层 IAM 策略控制。通过校验请求头中附带的 SigV4 签名或平台级受控 Bearer JWT 实现被动资源鉴权。" />
                                    <Node id="knowledge-base" icon={Database} label="知识库" enLabel="Knowledge Base" hasIamSdk={true} colorClass="text-green-600" bgClass="bg-green-50" isRow={true} showAuthView={showAuthView} idpName="服务托管身份" idpTooltip="依赖底层 IAM 策略控制。通过校验请求头中附带的 SigV4 签名或平台级受控 Bearer JWT 实现被动资源鉴权。" />
                                </div>
                            </div>

                            {/* 第三行：Agent Gateway */}
                            <div className="mt-6 flex justify-start">
                                <div id="gateway" className="w-[calc(100%-320px)] px-5 py-4 bg-gradient-to-r from-orange-900 via-amber-900 to-orange-900 rounded-[20px] text-white flex items-center justify-between shadow-lg border-2 border-amber-600/20 relative">
                                    {showAuthView && (
                                        <div className="absolute -top-3 -left-3 bg-orange-500 text-white px-2 py-0.5 rounded-lg text-[8px] font-black shadow-md z-30 flex items-center gap-1 cursor-help" title="拥有读取后端凭证保险库的最高基线权限 (High Privilege IAM Role) 和 HTTP 头拦截修改能力，专属接管凭据出站注入逻辑。">
                                            <ShieldCheck size={10} />
                                            特权代理身份
                                        </div>
                                    )}
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
                                    <Node id="oauth-provider" icon={UserCheck} label="OAuth / IdP" customWidth="w-36" colorClass="text-violet-600" bgClass="bg-violet-50" showAuthView={showAuthView} idpName="外部 SaaS IdP" idpTooltip="处理标准的外部 OpenID Connect / OAuth 2.0 Client Credentials 许可下发机制。" />
                                    <Node id="saas-apps" icon={Users} label="SaaS 应用" customWidth="w-36" colorClass="text-blue-600" bgClass="bg-blue-50" showAuthView={showAuthView} idpName="SaaS 凭证 / API Key" idpTooltip="不信任平台内部身份。依赖 HTTP Header 必须包含合法的长效/临时外部 API Key 或 OAuth Bearer Token 才能响应。" />
                                    <div id="external" className="flex flex-col items-center">
                                        <div className="flex flex-col items-center p-3 bg-white rounded-2xl border-2 border-amber-100 shadow-lg w-[190px] relative">
                                            {showAuthView && (
                                                <div className="absolute -top-3 -left-3 bg-orange-500 text-white px-2 py-0.5 rounded-lg text-[8px] font-black shadow-md z-30 flex items-center gap-1 cursor-help" title="需借助 Gateway 出站时隐式映射绑定的自有协议 (API Key, CLI Token 等) 方可驱动。">
                                                    <ShieldCheck size={10} />
                                                    外部集成凭证
                                                </div>
                                            )}
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
                                    <Node id="other-auth" icon={Lock} label="其他资源" customWidth="w-36" colorClass="text-rose-600" bgClass="bg-rose-50" showAuthView={showAuthView} idpName="自定义凭证" idpTooltip="需借助 Gateway 出站时隐式映射绑定的自有协议 (API Key, Basic Auth 等) 方可驱动。" />
                                </div>
                                <div className="flex shrink-0">
                                    <Node id="vector-db" icon={HardDrive} label="向量数据库" customWidth="w-40" colorClass="text-emerald-600" bgClass="bg-emerald-50" showAuthView={showAuthView} idpName="数据库凭证" idpTooltip="需注入标准的数据库连接串凭证 (DB Connection String Token) 或专用检索 API Key 方可访问靶库集。" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── 连线 ── */}
                    {/* 1. 用户 → 前端 */}
                    <Xarrow start="user" end="frontend" color="#94a3b8" strokeWidth={1.5} startAnchor="bottom" endAnchor="top" labels={<ConnectionLabel text="操作请求" enText="Request" showAuthView={showAuthView} seq={1} authMethod="Session / JWT" authTooltip="基于 OAuth 2.0 / OIDC 协议。前端拦截并验证签发的 JWT (ID Token & Access Token) 或安全 Session Cookie，建立初始信任态。" />} headSize={4} />

                    {/* 2. 前端 ↔ 协调 */}
                    <Xarrow start="frontend" end="orchestrator" color="#0891b2" strokeWidth={2} startAnchor={{ position: "right", offset: { y: -20 } }} endAnchor={{ position: "left", offset: { y: -20 } }} path="smooth" labels={<ConnectionLabel text="会话承载" enText="Invoking" showAuthView={showAuthView} seq={2} authMethod="Session / Context" authTooltip="基于 Token Exchange 协议（如 RFC 8693）。将外部 User JWT 转换为平台内部专用的运行时上下文凭证 (Execution Context Token)。" />} headSize={4} />
                    <Xarrow start="orchestrator" end="frontend" color="#06b6d4" strokeWidth={1.5} startAnchor={{ position: "left", offset: { y: 20 } }} endAnchor={{ position: "right", offset: { y: 20 } }} path="smooth" curveness={0.5} labels={<ConnectionLabel text="结果响应" enText="Response" />} headSize={4} />

                    {/* 3. 协调 ↔ 子智能体 */}
                    <Xarrow start="orchestrator" end="sub-agent" color="#4f46e5" strokeWidth={2} startAnchor={{ position: "bottom", offset: { x: -45 } }} endAnchor={{ position: "top", offset: { x: -45 } }} dashness={true} labels={<ConnectionLabel text="任务委派" enText="Delegate" showAuthView={showAuthView} seq={5} authMethod="Task-scoped Token" authTooltip="基于 mTLS 协议进行双向证书认证。配合短期签发的 JWT 任务令牌 (Task-scoped Token)，限定子智能体只能在当前指定任务生命周期内活动。" />} headSize={4} />
                    <Xarrow start="sub-agent" end="orchestrator" color="#10b981" strokeWidth={1.5} startAnchor={{ position: "top", offset: { x: 45 } }} endAnchor={{ position: "bottom", offset: { x: 45 } }} labels={<ConnectionLabel text="结果聚合" enText="Aggr" />} headSize={4} />

                    {/* 4. 身份核验 */}
                    <Xarrow start="orchestrator" end="identityServiceContainer" color="#3b82f6" strokeWidth={2} startAnchor="top" endAnchor="bottom" path="smooth" labels={<ConnectionLabel text="换取执行凭证" enText="Exchange" showAuthView={showAuthView} seq={3} authMethod="Agent Token Issuance" authTooltip="基于 SPIFFE/SPIRE 协议体系。Agent SDK 向控制面提交环境特征（如 K8s SAToken 或 PID），签发具备密码学特征的 SVID (SPIFFE ID) 或内部强校验 JWT。" />} headSize={4} labelPos={0.25} />
                    <Xarrow start="identityServiceContainer" end="iamServiceContainer" color="#6366f1" strokeWidth={2} dashness={true} startAnchor="right" endAnchor="left" labels={<ConnectionLabel text="联邦同步" enText="Federation" showAuthView={showAuthView} seq={4} authMethod="Token Federation" authTooltip="基于 OpenID Connect (OIDC) 联邦身份协议。Agent 控制面作为身份源与底层 IAM 互信，将 Agent Token 置换为真实的云端 IAM Role Session Credentials (如 STS 临时凭证)。" />} headSize={4} />

                    {/* 5. 平台资源调用 */}
                    <Xarrow start="orchestrator" end="llm" color="#8b5cf6" strokeWidth={2} startAnchor={{ position: "right", offset: { y: -20 } }} endAnchor="left" dashness={true} labels={<ConnectionLabel text="推理" enText="LLM" showAuthView={showAuthView} seq={6} authMethod="Execution Role" authTooltip="基于 Signature Version 4 (SigV4) 或 Bearer JWT 协议。向云端模型 API 发起请求时，利用绑定的 Execution Role 凭证进行请求头签名验证授权。" />} headSize={4} />
                    <Xarrow start="orchestrator" end="memory" color="#ec4899" strokeWidth={2} startAnchor={{ position: "right", offset: { y: 20 } }} endAnchor="left" dashness={true} labels={<ConnectionLabel text="记忆" enText="Memory" showAuthView={showAuthView} authMethod="Execution Role" authTooltip="基于 Signature Version 4 (SigV4) 或 Bearer JWT 协议。对记忆库读写时，IAM 服务对请求中携带的 Execution Role 凭证进行细粒度策略 (Policy) 匹配校验。" />} headSize={4} />
                    <Xarrow start="sub-agent" end="cloud" color="#0ea5e9" strokeWidth={2} startAnchor={{ position: "right", offset: { y: -20 } }} endAnchor="left" dashness={true} labels={<ConnectionLabel text="资源" enText="Access" showAuthView={showAuthView} authMethod="Execution Role" authTooltip="基于各云服务原生 SDK/API 协议。子智能体使用继承的 Execution Role 与目标服务直接发生鉴权。" />} headSize={4} />
                    <Xarrow start="sub-agent" end="knowledge-base" color="#16a34a" strokeWidth={2} startAnchor={{ position: "right", offset: { y: 20 } }} endAnchor="left" dashness={true} labels={<ConnectionLabel text="检索" enText="RAG" showAuthView={showAuthView} authMethod="Execution Role" authTooltip="基于云内网 HTTPS。调用知识库时通过 IAM Role 凭证签名，获取特定文档空间的只读检索权限。" />} headSize={4} />

                    {/* 6. Gateway & 外部链路 */}
                    <Xarrow start="sub-agent" end="gateway" color="#f59e0b" strokeWidth={2} startAnchor={{ position: "bottom", offset: { x: -30 } }} endAnchor="top" labels={<ConnectionLabel text="工具调用" enText="Tools" showAuthView={showAuthView} seq={7} authMethod="Task Token" authTooltip="基于 HTTP Bearer Token 协议。子智能体向网关出示包含作用域 (Scope) 的内部 JWT (Task Token)，主张对其所需的外部 API 代理调用权限。" />} headSize={4} />
                    <Xarrow start="gateway" end="oauth-provider" color="#7c3aed" strokeWidth={1.5} startAnchor={{ position: "bottom", offset: { x: -140 } }} endAnchor="top" dashness={true} labels={<ConnectionLabel text="联合授权" enText="Authorization" showAuthView={showAuthView} authMethod="OAuth 2.0 Flow" authTooltip="基于 OAuth 2.0 / OIDC。网关与外部 IdP 交互，换取适用于第三方 SaaS 的 Access Token。" />} headSize={4} />
                    <Xarrow start="gateway" end="saas-apps" color="#3b82f6" strokeWidth={2} startAnchor={{ position: "bottom", offset: { x: -40 } }} endAnchor="top" labels={<ConnectionLabel text="出站访问" enText="Outbound" showAuthView={showAuthView} seq={8} authMethod="Credential Injection" authTooltip="基于 Authorization Header 或专有 API 协议。网关在内存中提取第三方凭据后，拼接至出站 HTTP 头中完成无感秘钥投递。" />} headSize={4} />
                    <Xarrow start="gateway" end="external" color="#f59e0b" strokeWidth={2} startAnchor={{ position: "bottom", offset: { x: 60 } }} endAnchor="top" labels={<ConnectionLabel text="协议转换" enText="Protocol Tran" showAuthView={showAuthView} authMethod="MCP Protocol" authTooltip="针对 MCP 等上下文服务协议，网关将代理指令与访问凭证深度封装转换，满足跨协议标准身份传递。" />} headSize={4} />
                    <Xarrow start="gateway" end="other-auth" color="#e11d48" strokeWidth={1.5} startAnchor={{ position: "bottom", offset: { x: 160 } }} endAnchor="top" labels={<ConnectionLabel text="私有调用" enText="Custom Auth" showAuthView={showAuthView} authMethod="API Key / Basic" authTooltip="处理长效固定密钥认证。请求出站时动态附载 HTTP Basic Header 或在请求参数中注入静态 Access Key。" />} headSize={4} />
                    <Xarrow
                        start="knowledge-base"
                        end="vector-db"
                        color="#10b981"
                        strokeWidth={2}
                        startAnchor={{ position: "bottom", offset: { x: 60 } }}
                        endAnchor="top"
                        dashness={true}
                        labels={<ConnectionLabel text="向量直连" enText="DB Connection" showAuthView={showAuthView} authMethod="TLS / DB Credential" authTooltip="通过基于 TLS 的强加密通道，安全传递受生命周期管理的只读数据库连接串或专属引擎密匙进行靶向读写验证。" />}
                        headSize={4}
                    />
                </div>
            </Xwrapper>
        </div>
    );
});

export default IdentityAuthView;
