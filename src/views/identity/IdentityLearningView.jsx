import React, { memo } from 'react';
import {
    Fingerprint,
    ShieldCheck,
    Activity,
    UserCheck,
    Key,
    Lock,
    RefreshCw,
    LogOut,
    AlertTriangle,
    Zap
} from 'lucide-react';
import IdentityAuthView from './IdentityAuthView';

const IdentityLearningView = memo(() => {
    const conceptCards = [
        {
            title: "核心定义 (Core Identity)",
            icon: Fingerprint,
            color: "bg-blue-600",
            lightColor: "bg-blue-50 text-blue-700",
            description: "Agent 不仅仅是一个服务账号，它需要一个独立的、可验证的数字身份。这包括加密证据、特权描述和上下文意识。",
            details: [
                "唯一可验证标识 (DID)",
                "绑定的合规性凭证",
                "行为基准画像"
            ]
        },
        {
            title: "生命周期管理 (Lifecycle)",
            icon: RefreshCw,
            color: "bg-purple-600",
            lightColor: "bg-purple-50 text-purple-700",
            description: "不同于人类账户，Agent 身份可能在几秒内创建并消失，也可能被静默遗弃。需要从创建、赋能、运行到退役的全程治理。",
            details: [
                "即时零信任配置",
                "动态证书更新",
                "自动化身份退役"
            ]
        },
        {
            title: "动态授权 (Authorization)",
            icon: Key,
            color: "bg-indigo-600",
            lightColor: "bg-indigo-50 text-indigo-700",
            description: "传统静态权限不足以应对 Agent 的动态行为。需要基于任务上下文、数据敏感度和环境条件的即时评估。",
            details: [
                "JIT (Just-in-Time) 访问",
                "基于属性的控制 (ABAC)",
                "行为边界验证"
            ]
        },
        {
            title: "代理问责 (Delegation)",
            icon: UserCheck,
            color: "bg-emerald-600",
            lightColor: "bg-emerald-50 text-emerald-700",
            description: "Agent 往往代表人类或组织行事。身份必须支持可证明的授权链，确保所有行为都可追溯到最终责任人。",
            details: [
                "授权委托证明",
                "透明的审计日志",
                "责任归属界定"
            ]
        }
    ];

    const risks = [
        { title: "身份冒用", desc: "攻击者模仿受信任的 Agent 获取敏感数据控制权。", icon: AlertTriangle },
        { title: "权限溢出", desc: "Agent 随着任务积累了超过其实际需要的长期权限。", icon: Zap },
        { title: "影子 Agent", desc: "未经批准即兴创建的 Agent 绕过了企业的安全治理体系。", icon: Lock }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* 顶标题 */}
            <div className="relative overflow-hidden bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                    <Fingerprint size={200} />
                </div>
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-4xl font-black text-slate-900 mb-4 flex items-center gap-3">
                        <Fingerprint className="text-blue-600 w-10 h-10" />
                        Agentic Identity <span className="text-blue-600 font-extrabold">核心研究</span>
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        在 AI 时代，"身份" 的边界正在重构。Agentic Identity 是连接自主 Agent 与安全契约的桥梁，
                        确保每一个自主决策都发生在一个可控、可验证的信任框架之内。
                    </p>
                </div>
            </div>

            {/* 架构关系视图 */}
            <IdentityAuthView />

            {/* 核心板块 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {conceptCards.map((card, idx) => (
                    <div key={idx} className="group bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                        <div className="flex items-start gap-5">
                            <div className={`p-4 rounded-2xl ${card.color} text-white shadow-lg shadow-${card.color.split('-')[1]}-200 group-hover:scale-110 transition-transform`}>
                                <card.icon className="w-8 h-8" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{card.title}</h3>
                                <p className="text-slate-500 mb-4 leading-relaxed">{card.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {card.details.map((detail, dIdx) => (
                                        <span key={dIdx} className={`px-3 py-1 rounded-full text-sm font-semibold ${card.lightColor}`}>
                                            {detail}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 风险挑战 */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
                <div className="flex items-center gap-3 mb-8">
                    <ShieldCheck className="text-blue-400 w-8 h-8" />
                    <h3 className="text-2xl font-black">身份治理的关键挑战</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {risks.map((risk, idx) => (
                        <div key={idx} className="border-l-2 border-slate-700 pl-6 py-2">
                            <div className="flex items-center gap-2 mb-2">
                                <risk.icon className="text-blue-400 w-5 h-5" />
                                <h4 className="text-lg font-bold">{risk.title}</h4>
                            </div>
                            <p className="text-slate-400 leading-relaxed font-medium">{risk.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 学习路径提示 */}
            <div className="text-center p-12 bg-blue-50/50 border border-blue-100 rounded-3xl">
                <Activity className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">持续演进的研究领域</h3>
                <p className="text-slate-500 max-w-xl mx-auto font-medium">
                    目前的 Agent 身份正从单纯的 API Key 授权转向更加复杂的非人类身份管理 (NHI)。
                    在我们的架构可视化中，您可以查看 Logical View 里的 "身份管理器" 来了解其工程实现。
                </p>
            </div>
        </div>
    );
});

export default IdentityLearningView;
