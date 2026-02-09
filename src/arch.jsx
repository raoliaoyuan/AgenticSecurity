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
        { id: 'logical', label: '逻辑架构', icon: Shield, activeClass: 'bg-blue-600 text-white shadow-lg shadow-blue-200' },
        { id: 'process', label: '运行架构', icon: Layers, activeClass: 'bg-purple-600 text-white shadow-lg shadow-purple-200' },
        { id: 'development', label: '开发架构', icon: Code2, activeClass: 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' },
        { id: 'data', label: '数据架构', icon: Database, activeClass: 'bg-cyan-600 text-white shadow-lg shadow-cyan-200' },
        { id: 'physical', label: '物理架构', icon: Server, activeClass: 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' }
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
                            className={`px-5 py-2.5 rounded-xl text-base font-black transition-all duration-200 flex items-center gap-2 ${activeTab === tab.id ? tab.activeClass : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                        >
                            <tab.icon className="w-4 h-4" /> {tab.label}
                        </button>
                    ))}
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


            </div>
        </div>
    );
};

export default ArchitectureViz;