/**
 * 开发架构视图 (Development View)
 * 展示代码组织、模块依赖与技术栈
 */

import React, { memo, useState } from 'react';
import { Code2, Layers, FileText, ChevronDown, ChevronUp, Download, Code } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DevStackItem } from './components/CommonComponents';

const DevelopmentView = memo(() => {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

    // Skills Description (from Universal Project Architect.md)
    const generateSkillsDescription = () => {
        return `## **name: universal-project-architect description: 通用架构执行器。能够解析“开发架构视图规范”文档，并自动构建、维护符合规范的 Monorepo 项目结构和技术栈配置。**

# **通用项目架构执行者 (Universal Project Architect)**

当你被要求初始化项目、添加新模块或重构代码时，必须首先检索并遵循项目中的“开发架构视图规范”文档（通常命名为 development\\_view\\_spec.md 或包含 Development View 标题的文档）。

## **1\\. 核心操作协议 (Core Protocol)**

### **阶段 A：架构解析 (Parsing)**

1. **定位规范**: 查找项目中的架构说明文档。  
2. **提取元数据**:  
   * **技术栈矩阵**: 识别 Frontend, Backend, AI Runtime, Security, Data 等分类下的具体技术选型。  
   * **目录拓扑**: 识别 root/, apps/, libs/, infra/ 等核心路径及其子模块定义。  
   * **依赖约束**: 识别文档中关于“单向依赖”、“禁止循环依赖”及“层级隔离”的具体描述。

### **阶段 B：结构初始化 (Scaffolding)**

1. **骨架生成**: 严格按照规范中的 Monorepo Layout 树状图创建物理目录。  
2. **配置注入**:  
   * 如果是 Python 项目，根据规范生成 pyproject.toml 或 requirements.txt。  
   * 如果是 Node/React 项目，配置 package.json 及 Workspace。  
   * 如果是 IaC 项目，初始化 terraform 或 k8s 配置模板。

### **阶段 C：规范合规性检查 (Guardrails)**

1. **依赖验证**: 在添加新包或建立模块关联前，检查是否违反规范中的“单向依赖”原则。  
2. **技术对齐**: 确保生成的代码片段使用的库与“技术栈矩阵”中定义的版本和框架完全一致。

## **2\\. 自动化执行指令 (Agent Instructions)**

### **初始化新项目**

"请阅读 development\\_view\\_spec.md，并根据其中的模块结构创建所有目录。在每个子模块中生成一个简单的 README.md 说明其职责，并按照技术栈矩阵配置根目录的依赖环境。"

### **添加功能模块**

"根据架构视图，我应该在哪里添加一个新的 \\[功能名称\\]？请在正确的位置创建它，并确保它只引用规范允许的 libs 模块。"

### **架构巡检**

"检查当前的目录结构和代码引用是否与 development\\_view\\_spec.md 的要求冲突，并给出重构建议。"

## **3\\. 约束限制 (Constraints)**

* **禁止随意创建目录**: 除非规范文档更新，否则严禁在 apps/, libs/, infra/ 之外创建顶层文件夹。  
* **强制类型检查**: 如果规范提到了 Pydantic 或 TypeScript，则所有生成的代码必须包含完整的类型定义。  
* **安全性优先**: 如果规范定义了 Security & Governance 层（如 OPA, Keycloak），所有跨模块请求必须预留或实现安全拦截逻辑。`;
    };

    // Development View Documentation (from Development View.md)
    const generateMarkdown = () => {
        return `# **开发架构视图 (Development View) 技术规范**

## **1\\. 概述**

本方案基于 Monorepo（单仓库）模式设计，旨在规范代码组织、模块依赖关系及构建流水线，确保 AI 代理系统（Agentic System）的可维护性、安全性和可扩展性。

## **2\\. 技术栈矩阵 (Technology Stack)**

### **2.1 前端层 (Frontend)**

* **核心框架**: React 18 (并发模式支持)  
* **样式方案**: Tailwind CSS (原子化 CSS)  
* **状态管理**: Zustand (轻量级响应式状态)  
* **可视化**: Xarrows (用于工作流图谱展示)

### **2.2 智能体运行时 (Agent Runtime)**

* **编排引擎**: LangGraph (支持循环状态机工作流)  
* **模型网关**: LiteLLM (统一模型 API 调用与负载均衡)  
* **数据验证**: PydanticAI (强类型 Prompt 与结果校验)

### **2.3 安全与治理 (Security & Governance)**

* **策略引擎**: OPA (Open Policy Agent \\- 实现细粒度权限管控)  
* **脱敏工具**: Presidio (PII 敏感数据识别与脱敏)  
* **身份认证**: Keycloak (标准 OAuth2/OIDC 方案)  
* **模型防护**: Model Armor (LLM 内容安全过滤)

### **2.4 数据与运维 (Data & Ops)**

* **向量数据库**: Qdrant (高性能向量索引)  
* **消息中间件**: Redis (Pub/Sub 实时消息分发)  
* **部署环境**: Google Cloud Run (Serverless 容器化)  
* **基础设施**: Terraform (IaC 自动化配置)

## **3\\. 模块结构 (Monorepo Layout)**

代码库采用层次分明的结构设计，严禁跨层级循环依赖。

root/  
├── apps/               \\# 可独立部署的业务应用  
│   ├── console/        \\# React 管理后台 UI  
│   ├── coordinator/    \\# 核心编排器服务 (Orchestrator)  
│   └── sidecar/        \\# 安全代理服务 (Security Proxy)  
├── libs/               \\# 共享逻辑与公共组件  
│   ├── agent-kit/      \\# 核心抽象层 (Tools, Chains, Memory)  
│   ├── policy/         \\# OPA Rego 权限规则定义  
│   └── mcp-client/     \\# MCP (Model Context Protocol) 连接器  
└── infra/              \\# 基础设施配置  
    └── k8s-tf/         \\# Kubernetes 资源定义与 Terraform 脚本

## **4\\. 依赖规则与构建规范**

1. **单向依赖**: apps 可以依赖 libs，但 libs 内部组件严禁相互循环依赖。  
2. **抽象隔离**: mcp-client 应保持纯净，不应包含具体的业务逻辑。  
3. **安全注入**: sidecar 模块必须作为流量的必经之路，强制执行 policy 中的 Rego 规则。  
4. **CI/CD 流程**:  
   * **Lint**: 提交前强制执行 Pydantic 类型检查与 ESLint。  
   * **Test**: 智能体工作流必须经过 LangGraph 单元测试模拟。  
   * **Build**: 采用 Docker 多阶段构建，将应用镜像推送至私有仓库后通过 Terraform 更新 Cloud Run 容器。`;
    };

    // Download Handler
    const handleDownload = (e) => {
        e.stopPropagation();
        const mdContent = generateMarkdown();
        const blob = new Blob([mdContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'AgenticSecurity_Development_View_Spec.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Download Skills Handler
    const handleDownloadSkills = (e) => {
        e.stopPropagation();
        const content = generateSkillsDescription();
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'AgenticSecurity_Universal_Project_Architect.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Custom Markdown Components
    const markdownComponents = {
        h1: ({ node, ...props }) => <h1 className="text-3xl font-black text-slate-900 border-b pb-4 mb-6 mt-2" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4 flex items-center gap-2" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-slate-700 mt-6 mb-3" {...props} />,
        p: ({ node, ...props }) => <p className="text-slate-600 leading-relaxed mb-4 text-sm" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-5 space-y-1 text-slate-600 mb-4 text-sm" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-5 space-y-1 text-slate-600 mb-4 text-sm" {...props} />,
        li: ({ node, ...props }) => <li className="pl-1" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-bold text-slate-800" {...props} />,
        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-slate-200 pl-4 py-1 my-4 italic text-slate-500 bg-slate-50 rounded-r-lg" {...props} />,
        table: ({ node, ...props }) => <div className="overflow-x-auto my-6 rounded-lg border border-slate-200"><table className="w-full text-sm text-left text-slate-600" {...props} /></div>,
        thead: ({ node, ...props }) => <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200" {...props} />,
        th: ({ node, ...props }) => <th className="px-6 py-3 font-bold" {...props} />,
        td: ({ node, ...props }) => <td className="px-6 py-4 border-b border-slate-100" {...props} />,
        code: ({ node, inline, className, children, ...props }) => {
            return inline ?
                <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 text-xs font-mono border border-slate-200" {...props}>{children}</code> :
                <code className="block p-4 rounded-lg bg-slate-800 text-slate-50 text-xs font-mono overflow-x-auto my-4" {...props}>{children}</code>;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-sm shadow-indigo-100">
                    <Code2 className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-3xl font-black text-slate-900">开发架构视图 (Development View)</h3>
                    <p className="text-slate-500 text-sm mt-1">代码组织、模块依赖与构建流水线</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50">
                    <h4 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                        <Layers className="w-6 h-6 text-indigo-500" /> 技术栈矩阵
                    </h4>
                    <div className="space-y-6">
                        <DevStackItem label="Frontend" items={['React 18', 'Tailwind', 'Zustand (State)', 'Xarrows (Viz)']} />
                        <DevStackItem label="Agent Runtime" items={['LangGraph (Orchestrator)', 'LiteLLM (Gateway)', 'PydanticAI']} />
                        <DevStackItem label="Security & Gov" items={['OPA (Policy)', 'Presidio (PII)', 'Keycloak (Auth)', 'Model Armor']} />
                        <DevStackItem label="Data & Ops" items={['Qdrant (Vector)', 'Redis (PubSub)', 'Cloud Run', 'Terraform']} />
                    </div>
                </div>
                <div className="bg-slate-900 rounded-[2.5rem] p-10 shadow-xl shadow-slate-400/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
                    <h4 className="text-2xl font-black text-white mb-8 flex items-center gap-3 relative z-10">
                        <Code2 className="w-6 h-6 text-indigo-400" /> 模块结构 (Monorepo)
                    </h4>
                    <div className="font-mono text-sm text-slate-300 bg-black/40 p-8 rounded-2xl border border-white/10 relative z-10 leading-relaxed">
                        <div className="mb-2 text-indigo-400 font-black">root/</div>
                        <div className="pl-6 border-l border-white/10 ml-1">
                            <div className="mb-1">├── <span className="text-white">apps/</span></div>
                            <div className="pl-6 border-l border-white/10 ml-1">
                                <div className="mb-1">├── <span className="text-white">console/</span> <span className="text-slate-500 ml-2">// React Admin UI</span></div>
                                <div className="mb-1">├── <span className="text-white">coordinator/</span> <span className="text-slate-500 ml-2">// Main Orchestrator</span></div>
                                <div className="mb-1">└── <span className="text-white">sidecar/</span> <span className="text-slate-500 ml-2">// Security Proxy</span></div>
                            </div>
                            <div className="mb-1 mt-2">├── <span className="text-white">libs/</span> <span className="text-slate-500 ml-2">// Shared Packages</span></div>
                            <div className="pl-6 border-l border-white/10 ml-1">
                                <div className="mb-1">├── <span className="text-white">agent-kit/</span> <span className="text-slate-500 ml-2">// Core Abstractions</span></div>
                                <div className="mb-1">├── <span className="text-white">policy/</span> <span className="text-slate-500 ml-2">// OPA Rego Rules</span></div>
                                <div className="mb-1">└── <span className="text-white">mcp-client/</span> <span className="text-slate-500 ml-2">// Tool Connectors</span></div>
                            </div>
                            <div className="mb-1 mt-2">└── <span className="text-white">infra/</span> <span className="text-slate-500 ml-2">// K8s & TF Configs</span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Documentation Section */}
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
                            <h3 className="text-2xl font-bold text-slate-800">开发架构设计文档</h3>
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
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={markdownComponents}
                            >
                                {generateMarkdown()}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

export default DevelopmentView;
