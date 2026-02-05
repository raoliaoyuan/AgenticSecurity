/**
 * AgenticSecurity Blueprint - 主入口组件
 * 架构模块化重构版本 - 精简为约 200 行
 * 
 * 各视图已拆分为独立模块:
 * - LogicalView: 逻辑架构视图
 * - ProcessView: 运行架构视图
 * - DevelopmentView: 开发架构视图
 * - DataView: 数据架构视图
 * - PhysicalView: 物理架构视图
 */

import React, { useState, useMemo, useCallback, memo } from 'react';
import {
    Shield, Database, Server, Code2, Layers, CheckCircle2, Skull
} from 'lucide-react';

// 导入共享数据
import { defenseItems, getThreatSections } from './views/arch/data/archData.jsx';
import { ThreatSection } from './views/arch/components/CommonComponents';

// 导入各个视图组件
import LogicalView from './views/arch/LogicalView';
import ProcessView from './views/arch/ProcessView';
import DevelopmentView from './views/arch/DevelopmentView';
import DataView from './views/arch/DataView';
import PhysicalView from './views/arch/PhysicalView';

// =====================================================================
// 主组件
// =====================================================================
const ArchitectureViz = () => {
    const [activeStep, setActiveStep] = useState(null);
    const [showThreats, setShowThreats] = useState(true);
    const [activeTab, setActiveTab] = useState('logical');

    // 缓存威胁模型摘要数据
    const threatSections = useMemo(() => getThreatSections(), []);

    // 缓存按钮点击处理
    const handleTabChange = useCallback((tab) => setActiveTab(tab), []);
    const handleToggleThreats = useCallback(() => setShowThreats(prev => !prev), []);

    // Tab 配置
    const tabs = useMemo(() => [
        { id: 'logical', label: '逻辑架构', icon: Shield, color: 'blue' },
        { id: 'process', label: '运行架构', icon: Layers, color: 'purple' },
        { id: 'development', label: '开发架构', icon: Code2, color: 'indigo' },
        { id: 'data', label: '数据架构', icon: Database, color: 'cyan' },
        { id: 'physical', label: '物理架构', icon: Server, color: 'emerald' }
    ], []);

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900 leading-normal selection:bg-blue-200">
            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.4]" style={{
                backgroundImage: `radial-gradient(#cbd5e1 0.5px, transparent 0.5px)`,
                backgroundSize: '24px 24px'
            }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-8">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-blue-600 text-white shadow-xl shadow-blue-200 rounded-2xl">
                                <Shield className="w-10 h-10" />
                            </div>
                            <h1 className="text-5xl font-black text-slate-900 tracking-tight">
                                AgenticSecurity <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Blueprint</span>
                            </h1>
                        </div>
                        <p className="text-slate-500 text-xl font-medium ml-1">企业级 Agent 安全架构全链路解析 (V5.0)</p>
                    </div>
                </header>

                {/* Tab 导航 */}
                <div className="flex flex-wrap gap-2 mb-8 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-fit">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`px-5 py-2.5 rounded-xl text-base font-black transition-all duration-200 flex items-center gap-2 ${activeTab === tab.id ? `bg-${tab.color}-600 text-white shadow-lg shadow-${tab.color}-200` : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                        >
                            <tab.icon className="w-4 h-4" /> {tab.label}
                        </button>
                    ))}
                    <div className="w-px h-8 bg-slate-200 mx-2 self-center"></div>
                    <button
                        onClick={handleToggleThreats}
                        className={`px-5 py-2.5 rounded-xl text-base font-black transition-colors duration-200 flex items-center gap-2 border ${showThreats ? 'bg-red-50 border-red-200 text-red-600 shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Skull className="w-4 h-4" />
                        {showThreats ? '威胁透视: ON' : '威胁透视: OFF'}
                    </button>
                </div>

                {/* 视图内容区域 */}
                {activeTab === 'logical' && (
                    <LogicalView
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        showThreats={showThreats}
                    />
                )}
                {activeTab === 'process' && <ProcessView />}
                {activeTab === 'development' && <DevelopmentView />}
                {activeTab === 'data' && <DataView />}
                {activeTab === 'physical' && <PhysicalView />}

                {/* 威胁模型摘要 */}
                {showThreats && (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {threatSections.map(section => (
                            <ThreatSection key={section.title} section={section} />
                        ))}
                    </div>
                )}

                {/* 底部防御概要 */}
                <div className="mt-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 rounded-[3.5rem] flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
                    {/* 使用 CSS 替代外部纹理图片 */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
                    }}></div>
                    <div className="max-w-3xl relative z-10">
                        <h4 className="text-4xl font-black mb-8 flex items-center gap-4">
                            <div className="p-2 bg-white/20 rounded-xl">
                                <CheckCircle2 className="w-10 h-10 text-green-300" />
                            </div>
                            架构安全防御综述
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {defenseItems.map(item => (
                                <div key={item.title} className="group/summary">
                                    <div className="text-2xl font-black mb-2 flex items-center gap-2 group-hover/summary:translate-x-1 transition-transform">
                                        <span className="w-1.5 h-6 bg-white/30 rounded-full"></span>
                                        {item.title}
                                    </div>
                                    <p className="text-lg text-white/70 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hidden lg:block text-right relative z-10">
                        <div className="text-sm font-black opacity-30 mb-2 tracking-[0.5em] uppercase">Security Infrastructure</div>
                        <div className="text-7xl font-black italic tracking-tighter opacity-100">SPEC 5.0</div>
                        <div className="inline-block text-sm font-black bg-white text-blue-600 px-4 py-2 mt-6 rounded-full hover:scale-110 transition-transform cursor-pointer">
                            READY FOR PRODUCTION
                        </div>
                    </div>
                </div>

                <footer className="mt-16 text-center text-slate-600 text-sm font-black tracking-[0.3em] uppercase pb-12">
                    Antigravity Framework Infrastructure Specification • PREMIUM EDITION V5.0
                </footer>
            </div>
        </div>
    );
};

export default ArchitectureViz;