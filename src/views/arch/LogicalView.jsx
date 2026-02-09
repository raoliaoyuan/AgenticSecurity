/**
 * 逻辑架构视图 (Logical View)
 * 展示系统的分层架构与各层组件
 */

import React, { useState, memo } from 'react';
import { layers, defenseItems } from './data/archData.jsx';
import { LayerSection } from './components/CommonComponents';
import { FileText, Download, ChevronDown, ChevronUp, Code, Skull, Shield, Lock } from 'lucide-react';

const LogicalView = memo(({ activeStep, setActiveStep }) => {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [localShowThreats, setLocalShowThreats] = useState(false);

    // 生成 Skills 描述文件 (通用版 - 适配任意架构文档)
    const generateSkillsDescription = () => {
        return `# Skill: Generic Logical Architecture Visualization Generator

## 角色定义
你是一位精通 React、Tailwind CSS 和企业级架构可视化的前端架构师。

## 任务目标
利用提供的《系统逻辑架构设计文档》文本内容，反向生成对应的 React 可视化页面代码。

## 设计规范 (Design System)

### 1. 动态配色系统 (Dynamic Color Palette)
请根据文档中识别出的层级顺序，依次从下表中分配颜色（循环使用）：
1.  **Blue** (主色: \`bg-blue-600\`, 辅色: \`bg-blue-50\`)
2.  **Purple** (主色: \`bg-purple-600\`, 辅色: \`bg-purple-50\`)
3.  **Indigo** (主色: \`bg-indigo-500\`, 辅色: \`bg-indigo-50\`)
4.  **Cyan** (主色: \`bg-cyan-500\`, 辅色: \`bg-cyan-50\`)
5.  **Emerald** (主色: \`bg-emerald-500\`, 辅色: \`bg-emerald-50\`)
6.  **Slate** (主色: \`bg-slate-500\`, 辅色: \`bg-slate-100\`)
7.  **Orange** (主色: \`bg-orange-500\`, 辅色: \`bg-orange-50\`)
8.  **Rose** (主色: \`bg-rose-500\`, 辅色: \`bg-rose-50\`)

### 2. 组件结构要求
请使用以下组件结构进行实现：
- **LogicalView**: 主容器，负责渲染所有层级。
- **LayerSection**: 通用层级容器，包含左侧标题 (\`LayerCard\`) 和右侧内容 (\`DetailCard\` Grid)。
- **DetailCard**: 展示具体的组件，包含名称、描述、核心能力 (Tags) 和 威胁列表 (Threats)。

### 3. 数据结构示例 (JSON Schema)
请将文档中的表格内容转换为以下 JSON 格式：
\`\`\`json
{
  "id": "unique_layer_id",
  "title": "层级标题 (从文档 3.x 标题提取)",
  "color": "blue", // 根据顺序自动分配的颜色 Key
  "components": [
    {
      "name": "组件名称",
      "desc": "组件描述",
      "features": ["能力1", "能力2"],
      "threats": ["T01", "T02"]
    }
  ]
}
\`\`\`

## 执行步骤
1.  **解析文档结构**: 扫描文档的 "3.0 详细架构设计" (或类似章节)，识别出所有的二级标题 (如 3.1, 3.2...) 作为架构层级。
2.  **提取层级数据**:
    -   **Title**: 提取章节标题。
    -   **Components**: 解析该章节下的表格，提取组件名称、描述、能力和风险。
3.  **分配颜色**: 按照层级出现的顺序，从配色系统中依次分配颜色。
4.  **编写代码**: 使用 React + Tailwind CSS 实现与 \`LogicalView\` 类似的布局。
`;
    };

    // 生成 Markdown 内容 (符合标准架构文档格式)
    const generateMarkdown = () => {
        const date = new Date().toLocaleDateString();
        let md = `# AgenticSecurity 系统逻辑架构设计文档\n`;
        md += `**版本**: 5.0 | **日期**: ${date}\n\n`;

        // 1. 系统概述
        md += `## 1.0 系统概述\n`;
        md += `AgenticSecurity 是专为多智能体系统 (Multi-Agent Systems) 设计的企业级安全架构。它通过分层架构实施纵深防御原则，确保智能体、工具和数据之间的交互安全。\n\n`;

        // 2. 安全防御原则
        md += `## 2.0 安全防御原则\n`;
        defenseItems.forEach((item, idx) => {
            md += `### 2.${idx + 1} ${item.title}\n`;
            md += `${item.desc}\n\n`;
        });

        // 3. 详细设计
        md += `## 3.0 详细架构设计\n`;

        layers.forEach((layer, lIdx) => {
            md += `### 3.${lIdx + 1} ${layer.title}\n`;
            md += `**定义**: ${layer.functionalDesc}\n\n`;

            md += `#### 组件目录\n`;
            md += `| 组件名称 | 描述 | 核心能力 | 安全风险 |\n`;
            md += `|---|---|---|---|\n`;

            layer.components.forEach(comp => {
                const features = comp.features.join(', ');
                const threats = (comp.threats && comp.threats.length > 0) ? comp.threats.join(', ') : '无';
                md += `| **${comp.name}** | ${comp.desc} | ${features} | ${threats} |\n`;
            });
            md += `\n`;
        });

        md += `---\n*文档由 AgenticSecurity Architecture Viz 生成*`;
        return md;
    };

    // 下载处理
    const handleDownload = (e) => {
        e.stopPropagation();
        const mdContent = generateMarkdown();
        const blob = new Blob([mdContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'AgenticSecurity_System_Design_Spec.md';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
    };

    // 下载 Skills 处理
    const handleDownloadSkills = (e) => {
        e.stopPropagation();
        const content = generateSkillsDescription();
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'AgenticSecurity_Generation_Skill.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            {/* 顶层威胁透视开关 - 视觉对齐 Process View 安全审计视图 */}
            <div className="flex justify-end pr-2 mb-2">
                <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-2 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">OWASP Agentic AI</div>
                        <div className="text-sm font-black text-slate-800 leading-none">威胁透视视图</div>
                    </div>
                    <button
                        onClick={() => setLocalShowThreats(!localShowThreats)}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none shadow-inner ${localShowThreats ? 'bg-red-600 shadow-red-900/20' : 'bg-slate-200'}`}
                    >
                        <span
                            className={`${localShowThreats ? 'translate-x-6' : 'translate-x-1'} inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-md flex items-center justify-center`}
                        >
                            {localShowThreats ? <Shield className="w-3 h-3 text-red-600" /> : <Lock className="w-3 h-3 text-slate-400" />}
                        </span>
                    </button>
                </div>
            </div>

            {layers.map((layer, idx) => (
                <LayerSection
                    key={layer.id}
                    layer={layer}
                    isLast={idx === layers.length - 1}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    showThreats={localShowThreats}
                />
            ))}

            {/* 逻辑架构描述板块 (SADD 格式) */}
            <div className="mt-12 pt-8 border-t border-slate-200">
                <div
                    className="flex items-center justify-between mb-6 cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors select-none"
                    onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                            <FileText className="w-6 h-6 text-slate-600" />
                        </div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-bold text-slate-800">系统逻辑架构设计文档</h3>
                            {isDescriptionOpen ?
                                <ChevronUp className="w-5 h-5 text-slate-400" /> :
                                <ChevronDown className="w-5 h-5 text-slate-400" />
                            }
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleDownloadSkills}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors shadow-sm z-10"
                            title="下载代码生成Prompt"
                        >
                            <Code className="w-4 h-4" />
                            下载 Skills
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors shadow-sm z-10"
                        >
                            <Download className="w-4 h-4" />
                            下载文档
                        </button>
                    </div>
                </div>

                {isDescriptionOpen && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="prose prose-slate max-w-none">
                            {/* 1.0 系统概述 */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-black text-slate-900 border-b border-slate-200 pb-2 mb-4">1.0 系统概述</h2>
                                <p className="text-slate-600">
                                    AgenticSecurity 是专为多智能体系统 (Multi-Agent Systems) 设计的企业级安全架构。它通过分层架构实施纵深防御原则，确保智能体、工具和数据之间的交互安全。
                                </p>
                            </section>

                            {/* 2.0 安全防御原则 */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-black text-slate-900 border-b border-slate-200 pb-2 mb-6">2.0 安全防御原则</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {defenseItems.map((item, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <h4 className="font-bold text-slate-800 mb-2">2.{idx + 1} {item.title}</h4>
                                            <p className="text-sm text-slate-600">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 3.0 详细设计 */}
                            <section>
                                <h2 className="text-2xl font-black text-slate-900 border-b border-slate-200 pb-2 mb-8">3.0 详细架构设计</h2>
                                {layers.map((layer, lIdx) => (
                                    <div key={layer.id} className="mb-10 last:mb-0">
                                        <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                                            <span className="text-blue-600">3.{lIdx + 1}</span> {layer.title}
                                        </h3>
                                        <p className="text-slate-500 italic mb-4 pl-4 border-l-2 border-slate-200">
                                            {layer.functionalDesc}
                                        </p>

                                        <div className="overflow-x-auto rounded-lg border border-slate-200">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-xs">
                                                    <tr>
                                                        <th className="px-4 py-3 border-b border-slate-200 w-1/5 whitespace-nowrap">组件名称</th>
                                                        <th className="px-4 py-3 border-b border-slate-200 w-1/4 whitespace-nowrap">描述</th>
                                                        <th className="px-4 py-3 border-b border-slate-200 w-1/4 whitespace-nowrap">核心能力</th>
                                                        <th className="px-4 py-3 border-b border-slate-200 whitespace-nowrap">安全风险</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {layer.components.map(comp => (
                                                        <tr key={comp.id} className="hover:bg-slate-50/50">
                                                            <td className="px-4 py-3 font-semibold text-slate-800">{comp.name}</td>
                                                            <td className="px-4 py-3 text-slate-600">{comp.desc}</td>
                                                            <td className="px-4 py-3 text-slate-500">
                                                                <div className="flex flex-wrap gap-1">
                                                                    {comp.features.map((f, i) => (
                                                                        <span key={i} className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs whitespace-nowrap">
                                                                            {f}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                {comp.threats && comp.threats.length > 0 ? (
                                                                    <div className="flex flex-wrap gap-1">
                                                                        {comp.threats.map((t, i) => (
                                                                            <span key={i} className="inline-block px-2 py-0.5 bg-red-50 text-red-600 rounded text-xs whitespace-nowrap font-mono">
                                                                                {t}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                ) : <span className="text-slate-400">-</span>}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

export default LogicalView;
