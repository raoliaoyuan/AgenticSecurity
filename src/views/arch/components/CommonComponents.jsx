/**
 * 架构视图共享 UI 组件
 * 提取自 arch.jsx，供各视图组件复用
 */

import React, { memo } from 'react';
import {
    Shield, User, Zap, Lock, Database, Server, Cpu, Key,
    FileSearch, CheckCircle2, AlertTriangle, Brain, Layers, Code2, TableProperties,
    Save, RotateCw, Bot, Activity, Globe
} from 'lucide-react';
import { getIcon } from '../data/archData.jsx';

// =====================================================================
// 逻辑架构相关组件
// =====================================================================

// Memoized 组件卡片
export const ComponentCard = memo(({ comp, isActive, onMouseEnter, onMouseLeave, showThreats }) => (
    <div
        className={`group/card relative bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 ${isActive ? 'ring-2 ring-blue-500 shadow-xl shadow-blue-100' : 'hover:shadow-lg hover:border-blue-200 shadow-sm'}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
                {getIcon(comp.icon, 'w-6 h-6')}
            </div>
            <span className="font-black text-xl text-slate-900">{comp.name}</span>
        </div>
        <p className="text-base text-slate-500 leading-relaxed mb-6 font-medium">{comp.desc}</p>

        {/* 关键特性 */}
        <div className="space-y-3 mb-6">
            <div className="text-xs font-black text-slate-300 uppercase tracking-widest">关键特性</div>
            <div className="flex flex-wrap gap-2">
                {comp.features.map(f => (
                    <span key={f} className="text-xs bg-slate-50 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 group-hover/card:border-blue-500/30 transition-colors">
                        • {f}
                    </span>
                ))}
            </div>
        </div>

        {showThreats && comp.threats && (
            <div className="flex flex-wrap gap-2 mt-4 pt-5 border-t border-slate-100">
                {comp.threats.map(t => (
                    <span key={t} className="text-sm font-black px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-200 flex items-center gap-1.5 hover:bg-red-100 transition-colors">
                        <AlertTriangle className="w-4 h-4" /> {t}
                    </span>
                ))}
            </div>
        )}
    </div>
));

// Memoized Layer 组件
export const LayerSection = memo(({ layer, isLast, activeStep, setActiveStep, showThreats }) => {
    const handleMouseEnter = (compId) => setActiveStep(compId);
    const handleMouseLeave = () => setActiveStep(null);

    return (
        <div className="group relative">
            <div className={`border ${layer.borderColor} ${layer.color} rounded-[2.5rem] p-8 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200 hover:bg-white`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <div className={`p-4 bg-white rounded-2xl border ${layer.borderColor} shadow-sm`}>
                            {getIcon(layer.icon, `w-8 h-8 text-${layer.iconColor}-600`)}
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mb-1">{layer.title}</h2>
                            <p className="text-xl text-slate-800 font-black tracking-tight">{layer.functionalDesc}</p>
                        </div>
                    </div>
                    {showThreats && (
                        <div className="hidden lg:flex items-center gap-3 text-sm text-red-600 font-black bg-white px-4 py-2 rounded-xl border border-red-100 shadow-sm shadow-red-50">
                            <Activity className="w-5 h-5" />
                            覆盖威胁节点: {layer.threatCount} 个
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {layer.components.map((comp) => (
                        <ComponentCard
                            key={comp.id}
                            comp={comp}
                            isActive={activeStep === comp.id}
                            onMouseEnter={() => handleMouseEnter(comp.id)}
                            onMouseLeave={handleMouseLeave}
                            showThreats={showThreats}
                        />
                    ))}
                </div>
            </div>
            {!isLast && (
                <div className="flex justify-center py-4 relative">
                    <div className="w-0.5 h-10 bg-gradient-to-b from-blue-500/50 to-transparent"></div>
                </div>
            )}
        </div>
    );
});

// Memoized 威胁列表项
export const ThreatItem = memo(({ threat, color }) => (
    <div className="group/threat flex gap-4 transition-transform hover:translate-x-1">
        <span className={`text-base font-black text-${color}-600 bg-${color}-50 px-2 py-1 rounded-lg h-fit border border-${color}-200`}>{threat.id}</span>
        <div>
            <div className="text-lg font-black text-slate-700 group-hover/threat:text-slate-900 transition-colors">{threat.name}</div>
            <p className="text-sm text-slate-500 font-medium">{threat.desc}</p>
        </div>
    </div>
));

// Memoized 威胁模型摘要
export const ThreatSection = memo(({ section }) => (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
            {React.cloneElement(section.icon, { className: 'w-6 h-6' })} {section.title}
        </h3>
        <div className="space-y-5">
            {section.list.map(t => (
                <ThreatItem key={t.id} threat={t} color={section.color} />
            ))}
        </div>
    </div>
));

// =====================================================================
// 运行架构相关组件
// =====================================================================

// 紧凑型控制平面项组件
export const CompactItem = memo(({ icon, cn, en }) => (
    <div className="flex items-center gap-1.5 bg-white rounded-lg px-2 py-1 border border-purple-100">
        <div className="text-purple-500">{icon}</div>
        <div>
            <div className="text-[11px] font-bold text-purple-700 leading-tight">{cn}</div>
            <div className="text-[10px] text-purple-400 leading-tight">{en}</div>
        </div>
    </div>
));

// 垂直连接器
export const ConnectorVertical = memo(({ height = 30, color = 'slate', arrow = false }) => {
    const colorMap = {
        slate: 'bg-slate-200',
        emerald: 'bg-emerald-300',
        blue: 'bg-blue-300',
        purple: 'bg-purple-300',
    };
    const arrowColorMap = {
        slate: 'border-t-slate-300',
        emerald: 'border-t-emerald-400',
        blue: 'border-t-blue-400',
        purple: 'border-t-purple-400',
    };
    return (
        <div className="flex flex-col items-center">
            <div className={`w-0.5 ${colorMap[color]}`} style={{ height: `${height}px` }}></div>
            {arrow && (
                <div className={`w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] ${arrowColorMap[color]}`}></div>
            )}
        </div>
    );
});

// 步进标注
export const FlowLabel = memo(({ label, step, centered }) => (
    <div className={`flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
        {step && <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-black rounded-full shadow-lg shadow-blue-200">{step}</span>}
        <span className="text-sm font-black text-blue-600/80 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">{label}</span>
    </div>
));

// 子代理节点
export const SubagentNode = memo(({ title, subtitle, color, small, highlight }) => {
    const colors = {
        emerald: 'border-emerald-200 bg-emerald-50 text-emerald-900 shadow-emerald-50',
        orange: 'border-orange-200 bg-orange-50 text-orange-900 shadow-orange-50',
        purple: 'border-purple-200 bg-purple-50 text-purple-900 shadow-purple-50',
        blue: 'border-blue-200 bg-blue-50 text-blue-900 shadow-blue-50',
    };
    return (
        <div className={`border-2 ${colors[color]} rounded-2xl p-4 transition-all hover:shadow-lg ${small ? 'text-xs' : ''} ${highlight ? 'ring-2 ring-blue-400 ring-offset-2' : ''} bg-white`}>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                    <div className="font-black text-slate-900 text-sm leading-none mb-1">{title}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{subtitle}</div>
                </div>
            </div>
        </div>
    );
});

// 控制平面项
export const ControlPlaneItem = memo(({ icon, title, desc }) => (
    <div className="flex items-center gap-3 group/cp cursor-default">
        <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center border border-purple-200 shadow-sm group-hover/cp:bg-purple-600 transition-colors">
            {React.cloneElement(icon, { className: 'w-4 h-4 text-purple-600 group-hover/cp:text-white transition-colors' })}
        </div>
        <div>
            <div className="text-sm text-slate-700 font-black transition-colors group-hover/cp:text-slate-900">{title}</div>
            {desc && <div className="text-[10px] text-slate-400">{desc}</div>}
        </div>
    </div>
));

// 运行时选项
export const RuntimeOption = memo(({ label, highlight }) => (
    <div className={`flex items-center gap-3 text-sm font-bold transition-colors cursor-default ${highlight ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'}`}>
        <div className={`w-5 h-5 rounded flex items-center justify-center shadow-sm ${highlight ? 'bg-blue-100 border border-blue-200' : 'bg-slate-100'}`}>
            <Server className="w-3 h-3" />
        </div>
        <span>{label}</span>
        {highlight && <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">推荐</span>}
    </div>
));

// 工具节点
export const ToolNode = memo(({ icon, title, external }) => (
    <div className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all cursor-default ${external ? 'bg-slate-50 border border-slate-200 shadow-sm hover:translate-y-1' : 'bg-amber-50 border border-amber-200 shadow-md hover:-translate-y-1'}`}>
        {React.cloneElement(icon, { className: `w-8 h-8 ${external ? 'text-slate-400' : 'text-amber-600'}` })}
        <span className={`text-xs mt-2 font-black uppercase tracking-tighter ${external ? 'text-slate-400' : 'text-amber-700'}`}>{title}</span>
    </div>
));

// 基础设施节点
export const InfraNode = memo(({ icon, title, items, compact }) => {
    if (compact) {
        return (
            <div className="bg-white border border-slate-100 rounded-xl p-3 text-center hover:shadow-md transition-all">
                {React.cloneElement(icon, { className: 'w-5 h-5 text-slate-500 mx-auto mb-1' })}
                <div className="text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1">{title}</div>
                <div className="flex flex-wrap gap-0.5 justify-center">
                    {items.map(item => (
                        <span key={item} className="text-[8px] text-slate-400">{item}</span>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="bg-white border border-slate-200 rounded-[1.5rem] p-5 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    {React.cloneElement(icon, { className: 'w-5 h-5 text-slate-600' })}
                </div>
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{title}</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {items.map(item => (
                    <span key={item} className="text-[10px] font-black bg-slate-50 px-2 py-1 rounded-lg text-slate-500 border border-slate-100">{item}</span>
                ))}
            </div>
        </div>
    );
});

// =====================================================================
// 开发架构相关组件
// =====================================================================

export const DevStackItem = ({ label, items }) => (
    <div className="flex flex-col gap-3">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</span>
        <div className="flex flex-wrap gap-2">
            {items.map(i => <span key={i} className="text-xs font-black text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-colors cursor-default">{i}</span>)}
        </div>
    </div>
);

// =====================================================================
// 数据架构相关组件
// =====================================================================

export const EntityNode = ({ name, fields, color = 'cyan' }) => (
    <div className={`bg-${color}-50 border border-${color}-200 p-6 rounded-[2rem] min-w-[200px] shadow-sm hover:shadow-xl transition-all`}>
        <div className={`text-${color}-600 font-black mb-4 border-b border-${color}-100 pb-3 text-center text-lg tracking-widest uppercase`}>{name}</div>
        <div className="space-y-2">
            {fields.map(f => <div key={f} className="text-sm text-slate-600 font-bold flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full bg-${color}-400`}></div>
                {f}
            </div>)}
        </div>
    </div>
);

// =====================================================================
// 物理架构相关组件
// =====================================================================

export const ZoneBox = ({ name, children, color = 'slate' }) => (
    <div className="border border-slate-200 rounded-[2.5rem] p-8 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="text-[10px] font-black text-slate-400 uppercase mb-6 tracking-[0.2em] flex items-center gap-2">
            <span className="w-4 h-0.5 bg-slate-200"></span>
            {name}
        </div>
        <div className="space-y-4">{children}</div>
    </div>
);

export const InfraComponent = ({ name, icon, count }) => (
    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:border-blue-300 transition-colors">
        <div className="text-slate-400 group-hover:text-blue-600 transition-colors">{icon}</div>
        <div className="text-sm font-black text-slate-700 leading-none">{name}</div>
        {count && <div className="ml-auto text-[10px] font-black bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{count} NODES</div>}
    </div>
);

// =====================================================================
// 辅助箭头组件
// =====================================================================

export const ArrowDown = memo(() => (
    <div className="flex flex-col items-center">
        <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500/50 to-purple-500/50"></div>
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-purple-500/50"></div>
    </div>
));

export const ArrowDownSimple = memo(() => (
    <div className="flex flex-col items-center">
        <div className="w-0.5 h-6 bg-slate-100"></div>
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-200"></div>
    </div>
));
