/**
 * 运行架构视图 (Process View)
 * 展示基于 Google Multi-Agent 架构的运行时流程
 */

import React, { memo, useMemo } from 'react';
import Xarrow, { Xwrapper } from 'react-xarrows';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    Shield, User, Zap, Lock, Database, Server, Cpu, Key,
    FileSearch, CheckCircle2, Brain, Layers, Code2,
    Bot, Activity, Globe,
    FileText, Download, ChevronDown, ChevronUp, Code
} from 'lucide-react';
import PROCESS_VIEW_SCHEMA, { getSchemaSummary } from '../../processViewSchema';
import { CompactItem, ConnectorVertical, FlowLabel, SubagentNode, RuntimeOption, ToolNode, InfraNode } from './components/CommonComponents';

const ProcessView = memo(() => {
    const schema = PROCESS_VIEW_SCHEMA;
    const [isDescriptionOpen, setIsDescriptionOpen] = React.useState(false);

    // 生成 Skills 描述文件
    const generateSkillsDescription = () => {
        return `# 通用架构图生成技能规范 (General Architecture Diagram Generation Skill)

**输入**: 系统运行架构说明书 (System Architecture Description)

**输出**: 符合业界标准的 Mermaid.js 架构图代码 & 视觉拓扑描述

## **1\. 技能核心目标 (Core Objective)**

作为一个**系统架构可视化专家**，你的任务是阅读给定的“架构描述文档”，提取关键的组件、边界和数据流，并将其转化为结构清晰、配色专业、逻辑严密的 **Mermaid.js** 流程图。

## **2\. 处理思维链 (Processing Chain of Thought)**

在生成图表前，必须执行以下分析步骤：

1. **实体提取 (Entity Extraction)**:  
   * 识别 **角色 (Actors)**: 用户、开发者、管理员。  
   * 识别 **核心服务 (Core Services)**: 网关、微服务、控制器、计算引擎。  
   * 识别 **基础设施 (Infra)**: 数据库、缓存、外部 API、文件系统。  
2. **边界识别 (Boundary Identification)**:  
   * 确定 **信任边界**: 哪些在公网 (User Layer)，哪些在内网 (Enterprise Env)。  
   * 确定 **逻辑分组**: 如“控制平面 vs 数据平面”、“编排层 vs 执行层”。  
   * *动作*: 使用 Mermaid subgraph 来体现这些边界。  
3. **流向定义 (Flow Definition)**:  
   * 识别 **主流程**: 用户请求 \-\> 处理 \-\> 响应 (通常使用实线 \--\>)。  
   * 识别 **辅助流程**: 策略下发、配置更新、异步通知 (通常使用虚线 \-.-\>)。  
   * *动作*: 决定图表方向（TD 适合层级架构，LR 适合管道流）。  
4. **样式映射 (Style Mapping)**:  
   * 根据组件的功能属性，应用下文定义的“标准配色方案”。

## **3\. 标准配色与样式系统 (Standard Style System)**

为了保证输出图表的美观和一致性，**必须**在 Mermaid 代码顶部包含以下样式定义。

### **3.1 颜色语义**

* **白色/无色**: 通用节点，避免视觉干扰。  
* **企业蓝 (\#E8F0FE / Stroke \#4285F4)**:用于 **边界容器**、**网关** 或 **基础设施**。  
* **执行绿 (\#E6F4EA / Stroke \#34A853)**: 用于 **核心业务逻辑**、**成功路径**、**生成器**。  
* **治理紫 (\#F3E5F5 / Stroke \#9334E6)**: 用于 **控制平面**、**策略**、**身份认证**。  
* **警告/迭代橙 (\#FEF7E0 / Stroke \#FBBC04)**: 用于 **循环**、**评估** 或 **高亮逻辑**。

### **3.2 必需的 Mermaid 初始化代码**

%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '\#ffffff', 'edgeLabelBackground':'\#ffffff', 'tertiaryColor': '\#F3E5F5'}}}%%  
graph TD  
    %% \--- 标准样式类定义 (Standard ClassDefs) \---  
    classDef userNode fill:\#ffffff,stroke:\#333,stroke-width:1px,rx:5,ry:5;  
    classDef serviceNode fill:\#ffffff,stroke:\#333,stroke-width:1px,rx:10,ry:10;  
    classDef greenBox fill:\#E6F4EA,stroke:\#34A853,stroke-width:2px,rx:10,ry:10;  
    classDef purpleBox fill:\#F3E5F5,stroke:\#9334E6,stroke-width:1px,rx:5,ry:5;  
    classDef blueBox fill:\#E8F0FE,stroke:\#4285F4,stroke-width:2px,rx:10,ry:10;  
    classDef controlNode fill:\#ffffff,stroke:\#9334E6,stroke-width:1px;  
    classDef agentNode fill:\#ffffff,stroke:\#34A853,stroke-width:2px,rx:5,ry:5;  
    classDef dbNode fill:\#F8F9FA,stroke:\#B0BEC5,stroke-dasharray: 5 5;

## **4\. 拓扑结构构建规范 (Topology Construction Rules)**

### **4.1 嵌套规则 (Nesting)**

* **最大深度**: 建议不超过 3 层嵌套，以免渲染混乱。  
* **Subgraph 命名**: 每个 subgraph 必须有明确的 ID 和可读的 Label (如 subgraph ControlPlane \[控制平面\])。  
* **Direction**: 在复杂的 subgraph 内部，如果主图是 TD，内部子图可以使用 direction LR 来优化横向空间。

### **4.2 连接规则 (Connections)**

* **避免交叉**: 尽量按照数据流动的自然顺序定义节点。  
* **标签清晰**: 连接线上必须有简短的动词或名词（如 |1 请求|, |保存|, |策略注入|）。  
* **ID 规范**: 使用英文 CamelCase 作为节点 ID，中文作为 Label (如 User(用户)), 方便代码维护。

## **5\. 参考范例 (Reference Example)**

**输入场景**: 一个典型的“多智能体协作系统”，包含用户端、前端、控制平面（策略/身份）、编排层（协调器/子智能体）和模型层。

**期望输出 (Mermaid 代码片段)**:

graph TD  
    %% 引用标准样式类...  
    classDef userNode fill:\#ffffff,stroke:\#333,stroke-width:1px;  
    classDef greenBox fill:\#E6F4EA,stroke:\#34A853,stroke-width:2px;  
    classDef purpleBox fill:\#F3E5F5,stroke:\#9334E6,stroke-width:1px;  
    classDef blueBox fill:\#E8F0FE,stroke:\#4285F4,stroke-width:2px;

    %% 1\. 定义外部层  
    subgraph UserLayer \[用户接入\]  
        User(👤 用户) ::: userNode  
    end

    %% 2\. 定义核心边界  
    subgraph Enterprise \[企业环境\]  
        direction TB  
          
        %% 2.1 控制平面 (Governance)  
        subgraph ControlPlane \[控制平面\]  
            Policy(📜 策略管理) ::: purpleBox  
        end

        %% 2.2 执行平面 (Execution)  
        subgraph Orchestrator \[编排层\]  
            Coord(🤖 协调器) ::: greenBox  
            Worker(🔨 子智能体) ::: greenBox  
        end  
          
        %% 2.3 基础设施  
        Model(🧠 LLM 模型)  
    end

    %% 3\. 定义关系  
    User \--\>|请求| Coord  
    Policy \-.-\>|规则注入| Coord  
    Coord \--\>|分发任务| Worker  
    Worker \--\>|推理| Model  
      
    %% 4\. 应用样式容器  
    class Enterprise blueBox  
    class ControlPlane purpleBox  
    class Orchestrator greenBox

## **6\. 生成提示词模板 (Prompt Template for Agent)**

当作为 Agent 使用本 Skill 时，请遵循以下 Prompt 结构向 LLM 提问：

"请基于提供的【系统架构说明文档】，遵循【架构图生成技能规范】，生成一份 Mermaid.js 架构图代码。

要求：

1. 使用规范中定义的 classDef 样式。  
2. 准确识别文档中的‘控制平面’与‘数据平面’并用 Subgraph 区分。  
3. 使用不同颜色区分‘治理组件’(紫色)和‘业务执行组件’(绿色)。  
4. 确保数据流向逻辑自上而下或自左向右清晰。"`;
    };

    // 生成 Markdown 内容
    const generateMarkdown = () => {
        return `# **多智能体系统 (Multi-Agent System) 运行架构视图描述文档**

## **1\. 简介 (Introduction)**

### **1.1 目的**

本文档旨在详细描述企业级多智能体（Multi-Agent）系统的逻辑与运行架构。该架构采用分层设计，通过严格分离**控制平面（Control Plane）与数据/执行平面**，结合智能编排与模型安全机制，实现了从用户意图识别、任务拆解、多模型推理到外部工具调用的端到端自动化处理能力。

### **1.2 范围**

本文档完整覆盖了架构图中的所有层次，包括：

* **用户接入层**: 应用用户与开发者入口。  
* **企业环境 (Enterprise Environment)**: 核心业务逻辑边界。  
* **控制平面**: 策略、身份与配额管理。  
* **智能体编排层**: 协调器、子智能体与响应生成。  
* **模型运行时**: 模型护甲与推理引擎。  
* **MCP 客户端与工具层**: 内部与外部扩展能力。  
* **基础设施与观测性**: 底层支撑服务。

## **2\. 系统上下文与角色 (System Context & Actors)**

系统主要涉及两类核心角色与一个主要服务入口，位于企业环境边界之外：

* **应用用户 (App Users)**: 系统的最终使用者。  
  * *交互方式*: 发送 **提示 (Prompt)**。  
  * *接收内容*: 获取 **响应 (Response)**。  
* **AI 开发者 (AI Developers)**: 负责系统的配置与优化。  
  * *交互方式*: 提交 **配置 (Config)**，定义智能体行为与参数。  
* **前端服务 (Frontend Service)**:  
  * 作为系统的统一网关（Gateway）。  
  * 处理 **请求 (Request)** 与 **结果 (Result)** 的转发。  
  * 负责用户与企业环境之间的通信协议转换。

## **3\. 运行架构组件详解 (Component View)**

系统核心逻辑运行在 **企业环境 (Enterprise Environment)** 内部，由以下核心子系统组成：

### **3.1 控制平面 (Control Plane / Governance)**

*位于架构图左侧紫色区域*

控制平面不直接处理业务数据，而是负责制定规则、管理状态并监督系统运行。

* **治理 (GOVERNANCE)**:  
  * **审计 (Audit)**: 记录关键操作日志，满足合规性要求。  
  * **策略 (Policy)**: 定义智能体的行为边界与规则，并将策略动态注入到编排层的协调器中（通过虚线箭头连接）。  
* **控制模块**:  
  * **意图编排 (Orchestrator)**: 处理高层级的任务路由规则。  
  * **身份管理 (Identity)**: 负责用户认证与服务间鉴权。  
  * **记忆管理 (Memory)**: 维护多轮对话的上下文状态（Context）与知识库检索。  
  * **配额管理 (Quota)**: 实施速率限制（Rate Limiting）与成本控制。

### **3.2 智能体编排层 (Agent Orchestration)**

*位于架构图中间绿色区域，运行于 Cloud Run | Agent Engine*

这是系统的“大脑”与“四肢”，负责具体的任务执行。

* **协调器代理 (COORDINATOR AGENT)**:  
  * **核心职责**: 接收请求，解析意图。  
  * **策略执行**: 接收来自控制平面的 **策略 (Policy)**，确保执行符合规范。  
  * **分发 (Dispatch)**: 根据任务类型，将任务分发给具体的子代理。  
  * **推理请求**: 向右侧的模型运行时发起 **推理请求 (Inference)**。  
* **子代理调用 (Subagent Execution)** (步骤 3):  
  系统支持两种并行的任务执行模式：  
  * **顺序执行 (Sequential)**:  
    * 适用于确定性工作流。  
    * 示例流程: *Task-A* \-\> *Task-A.1* (线性依赖)。  
  * **迭代执行 (Iterative)**:  
    * 适用于需要自我修正的复杂任务。  
    * 示例流程: *Task-B* \-\> *评估 (Eval)* \-\> *增强 (Enhance)* \-\> *循环* (直到满足条件)。  
* **响应生成器 (Response Generator)**:  
  * **汇聚 (Collective)**: 收集所有子代理的执行结果。  
  * **结果处理**: 负责 **结果整合 (Result Aggregation)** (步骤 4)。  
  * **文本返回**: 接收来自模型的 **文本返回 (Text Result)**，生成最终回复。

### **3.3 模型运行时 (MODEL RUNTIME)**

*位于架构图右侧，运行于 Vertex AI / Cloud Run / GKE*

负责提供安全的模型推理能力。

* **模型护甲 (Model Armor)**:  
  * **安全审计 (Security)**: 作为模型前的防火墙。  
  * 对输入提示词进行过滤（防注入）。  
  * 对输出内容进行合规性审查。  
* **AI 模型 (AI Model)**:  
  * 托管的核心大模型（如 Gemini）。  
  * 负责实际的 **推理 (Inference)** 计算。

### **3.4 MCP 客户端 (MCP Clients) & 工具层**

*位于架构图底部 (步骤 5\)*

系统通过 **MCP (Model Context Protocol)** 扩展能力边界。

* **内部调用 (MCP)** \-\> **内部工具 (INTERNAL TOOLS)**:  
  * **数据库 (Database)**: 访问企业私有数据。  
  * **API**: 调用内部微服务。  
* **外部扩展 (External Call)** \-\> **外部工具 (EXTERNAL TOOLS)**:  
  * **Web 服务**: 访问互联网 API。  
  * **文件**: 读取或处理外部文档。

### **3.5 可观测性 (Observability)**

*位于架构图最底部*

* **全链路监控**: 横跨所有层级，收集指标、日志与链路追踪数据，确保系统运行状态透明可见。

## **4\. 端到端数据流视图 (Data Flow View)**

基于架构图中的绿色编号标识，系统运行流程如下：

1. **交互阶段 (① 提示/Prompt)**:  
   用户通过 App 发送提示，或开发者提交 Config。请求到达 **前端服务**。  
2. **请求路由 (② 请求/Request)**:  
   前端服务将请求转发至 **协调器代理 (Coordinator Agent)**。此时，控制平面介入，加载身份信息与 **策略 (Policy)**。  
3. **编排与执行 (③ 子代理调用/Subagent)**:  
   * **分发 (Dispatch)**: 协调器根据意图，将任务分发给 **顺序 (Sequential)** 或 **迭代 (Iterative)** 子系统。  
   * **推理循环**:  
     * 子代理向 **模型运行时** 发送请求。  
     * 请求经过 **模型护甲** 扫描。  
     * **AI 模型** 执行推理。  
     * **安全审计** 后，**文本返回 (Text Result)** 回传给编排层。  
4. **结果处理 (④ 结果整合/Result Aggregation)**:  
   * 各子代理的输出流向 **汇聚 (Collective)** 节点。  
   * **响应生成器** 组装最终内容。  
5. **扩展能力 (⑤ MCP 客户端)**:  
   * 在执行过程中，若需外部数据，协调器通过 **MCP 客户端** 发起调用。  
   * **内部调用**: 访问数据库/API。  
   * **外部扩展**: 访问 Web 服务/文件。

## **5\. 关键特性总结**

* **策略驱动 (Policy-Driven)**: 协调器行为受控于控制平面策略，而非硬编码。  
* **双模式执行 (Dual-Mode Execution)**: 同时支持确定性的顺序工作流与探索性的迭代优化工作流。  
* **安全优先 (Security-First)**: 独立的 **模型护甲 (Model Armor)** 层确保输入输出安全。  
* **协议标准化**: 使用 **MCP** 统一工具调用接口，解耦工具实现与代理逻辑。`;
    };

    // 下载文档
    const handleDownload = (e) => {
        e.stopPropagation();
        const mdContent = generateMarkdown();
        const blob = new Blob([mdContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'AgenticSecurity_Process_Design_Spec.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // 下载 Skills
    const handleDownloadSkills = (e) => {
        e.stopPropagation();
        const content = generateSkillsDescription();
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'AgenticSecurity_Process_Generation_Skill.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // 自定义 Markdown 渲染组件
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
        <div className="max-w-5xl mx-auto space-y-10 pb-12">
            {/* 标题 */}
            <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
                    <Layers className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-3xl font-black text-slate-900">{schema.metadata.title}</h3>
                    <p className="text-slate-500 text-sm">{schema.metadata.subtitle}</p>
                </div>
            </div>

            {/* 主架构图 */}
            <div className="relative bg-white rounded-3xl border border-slate-200 p-6 shadow-xl">
                <Xwrapper>
                    {/* ========== 顶部：用户入口 ========== */}
                    <div className="flex justify-center gap-20 mb-4">
                        <div id="user-app" className="flex flex-col items-center gap-2">
                            <div className="w-14 h-14 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center shadow-md">
                                <User className="w-7 h-7 text-slate-600" />
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-bold text-slate-700">应用用户</div>
                                <div className="text-xs text-slate-400">App Users</div>
                            </div>
                        </div>
                        <div id="user-dev" className="flex flex-col items-center gap-2">
                            <div className="w-14 h-14 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center shadow-md">
                                <Code2 className="w-7 h-7 text-slate-600" />
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-bold text-slate-700">AI 开发者</div>
                                <div className="text-xs text-slate-400">AI Developers</div>
                            </div>
                        </div>
                    </div>

                    {/* 空白间距代替静态步骤标识，为连线留出垂直空间 */}
                    <div className="h-16"></div>

                    {/* ========== Frontend ========== */}
                    <div className="flex justify-center mb-10">
                        <div id="node-frontend" className="bg-white border-2 border-slate-300 rounded-xl px-6 py-2.5 shadow-md flex items-center gap-3">
                            <Globe className="w-6 h-6 text-slate-600" />
                            <div>
                                <div className="font-bold text-slate-800 text-lg">前端服务</div>
                                <div className="text-xs text-slate-500">Frontend Service</div>
                            </div>
                        </div>
                    </div>

                    <div className="h-16"></div>

                    {/* ========== 企业环境大框 ========== */}
                    <div className="bg-gradient-to-br from-blue-50/60 to-slate-50/40 border-2 border-blue-200 rounded-2xl p-5 relative">
                        <div className="absolute -top-3.5 left-8 bg-blue-600 px-4 py-1.5 rounded-full text-sm font-black text-white shadow-lg flex items-center gap-2">
                            <Shield className="w-4 h-4" /> 企业环境 Enterprise Environment
                        </div>

                        {/* 三栏布局 */}
                        <div className="grid grid-cols-12 gap-10 mt-4">

                            {/* === 左列：控制平面 === */}
                            <div className="col-span-2">
                                <div id="node-control-plane" className="bg-purple-50/70 border border-purple-200 rounded-2xl p-2.5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Cpu className="w-5 h-5 text-purple-600" />
                                        <div>
                                            <div className="text-sm font-black text-purple-700">控制平面</div>
                                            <div className="text-xs text-purple-400 uppercase">Control Plane</div>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div id="node-cp-orchestrator">
                                            <CompactItem icon={<Cpu className="w-4 h-4" />} cn="意图编排" en="Orchestrator" />
                                        </div>
                                        <div id="node-identity">
                                            <CompactItem icon={<Lock className="w-4 h-4" />} cn="身份管理" en="Identity" />
                                        </div>
                                        <div id="node-memory">
                                            <CompactItem icon={<Brain className="w-4 h-4" />} cn="记忆管理" en="Memory" />
                                        </div>
                                        <div id="node-quota">
                                            <CompactItem icon={<Activity className="w-4 h-4" />} cn="配额管理" en="Quota" />
                                        </div>
                                    </div>
                                    <div className="mt-2 pt-1.5 border-t border-purple-100">
                                        <div className="text-xs text-purple-400 uppercase mb-1.5">治理 Governance</div>
                                        <div className="flex flex-wrap gap-1">
                                            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded">审计</span>
                                            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded">策略</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* === 中列：Agent 编排层 === */}
                            <div className="col-span-6">
                                <div id="orchestration-layer" className="bg-emerald-50/50 border-2 border-emerald-300 rounded-2xl p-3 relative h-full">
                                    <div className="absolute -top-3 left-4 bg-emerald-600 px-3 py-1 rounded-full text-xs font-black text-white shadow">
                                        智能体编排层 Agent Orchestration
                                    </div>

                                    {/* Coordinator */}
                                    <div id="node-coordinator" className="bg-white border-2 border-emerald-400 rounded-xl p-3 mt-4 mb-6 shadow-sm w-fit mx-auto px-6">
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                                <Cpu className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 text-base">协调器代理</div>
                                                <div className="text-xs text-emerald-600 font-bold uppercase">Coordinator Agent</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex items-center gap-2 mb-4 mt-12">
                                        <span className="flex items-center justify-center w-5 h-5 bg-emerald-600 text-white text-xs font-black rounded-full">3</span>
                                        <span className="text-xs font-bold text-slate-500">子代理调用 Subagent</span>
                                    </div>

                                    {/* 子代理模式 */}
                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                        <div id="pattern-seq" className="bg-white border border-blue-200 rounded-lg p-2">
                                            <div className="text-xs text-blue-500 font-bold mb-1.5">顺序 Sequential</div>
                                            <div className="space-y-1.5">
                                                <div className="bg-blue-50 rounded px-2 py-1 text-xs text-center font-medium">Task-A</div>
                                                <div className="bg-blue-50 rounded px-2 py-1 text-xs text-center font-medium">Task-A.1</div>
                                            </div>
                                        </div>
                                        <div id="pattern-iter" className="bg-white border border-orange-200 rounded-lg p-2">
                                            <div className="text-xs text-orange-500 font-bold mb-1.5">迭代 Iterative ↺</div>
                                            <div className="space-y-1.5">
                                                <div className="bg-orange-50 rounded px-2 py-1 text-xs text-center font-medium">Task-B</div>
                                                <div className="flex gap-1">
                                                    <div className="bg-orange-50 rounded px-1.5 py-1 text-xs flex-1 text-center">Eval</div>
                                                    <div className="bg-orange-50 rounded px-1.5 py-1 text-xs flex-1 text-center">Enhance</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 4 + Response Generator */}
                                    <div className="flex items-center gap-2 mb-4 mt-12">
                                        <span className="flex items-center justify-center w-5 h-5 bg-emerald-600 text-white text-xs font-black rounded-full">4</span>
                                        <span className="text-xs font-bold text-slate-500">结果整合 Result Aggregation</span>
                                    </div>
                                    <div id="node-response-gen" className="bg-emerald-100 border border-emerald-300 rounded-lg p-3 flex items-center justify-center gap-2 shadow-sm w-fit mx-auto px-6">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                        <div>
                                            <div className="font-bold text-slate-800 text-sm">响应生成器</div>
                                            <div className="text-xs text-emerald-600">Response Generator</div>
                                        </div>
                                    </div>

                                    {/* 运行时 */}
                                    <div className="mt-2 pt-2 border-t border-emerald-200 flex items-center justify-center gap-2 text-xs text-slate-500">
                                        <Globe className="w-3 h-3" /> Cloud Run
                                        <span className="text-slate-300">|</span>
                                        <Bot className="w-3 h-3" /> Agent Engine
                                    </div>
                                </div>
                            </div>

                            {/* === 右列：模型运行时 === */}
                            <div className="col-span-4">
                                <div id="model-runtime" className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
                                    <div className="text-xs font-bold text-slate-500 mb-2 uppercase">模型运行时 Model Runtime</div>

                                    {/* Model Armor */}
                                    <div id="node-model-armor" className="bg-white border-2 border-emerald-300 rounded-xl p-3 mb-3 flex items-center gap-3 shadow-sm">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                            <Shield className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-700 text-sm">模型护甲</div>
                                            <div className="text-xs text-slate-500">Model Armor</div>
                                        </div>
                                    </div>

                                    <div className="h-56"></div>

                                    {/* AI Model */}
                                    <div id="node-ai-model" className="bg-white border border-slate-200 rounded-xl p-3">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <Brain className="w-5 h-5 text-blue-500" />
                                            <div>
                                                <div className="font-bold text-slate-700 text-sm">AI 模型</div>
                                                <div className="text-xs text-slate-400">AI Model (Gemini)</div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-500 ml-7">
                                            Vertex AI / Cloud Run / GKE
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ========== MCP 区域 ========== */}
                        <div className="mt-10 pt-6 border-t-2 border-dashed border-slate-200">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-black rounded-full">5</span>
                                <span className="text-sm font-bold text-slate-600">MCP 客户端 MCP Clients</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* 内部工具 */}
                                <div id="tools-internal" className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                                    <div className="text-xs font-bold text-blue-600 mb-2 uppercase">内部工具 Internal Tools</div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <Database className="w-5 h-5 text-blue-500" />
                                            <span className="text-xs text-slate-600">数据库</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <Code2 className="w-5 h-5 text-blue-500" />
                                            <span className="text-xs text-slate-600">APIs</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 外部工具 */}
                                <div id="tools-external" className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-3">
                                    <div className="text-xs font-bold text-slate-500 mb-2 uppercase">外部工具 External Tools</div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <Globe className="w-5 h-5 text-slate-500" />
                                            <span className="text-xs text-slate-500">服务</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <FileSearch className="w-5 h-5 text-slate-500" />
                                            <span className="text-xs text-slate-500">文件</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 可观测性 */}
                        <div className="mt-3 flex justify-center">
                            <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
                                <Activity className="w-4 h-4 text-slate-500" />
                                <span className="text-sm text-slate-600">可观测性 Observability</span>
                            </div>
                        </div>
                    </div>

                    {/* ========== 底部角色 ========== */}
                    <div className="flex justify-center gap-12 mt-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <User className="w-4 h-4" />
                            <span>平台管理员 Admins</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Server className="w-4 h-4" />
                            <span>运维工程师 DevOps</span>
                        </div>
                    </div>

                    {/* ========== 连接线 - 全部使用 grid 路径 ========== */}

                    {/* User -> Frontend: 请求路径 (向下) */}
                    <Xarrow
                        start="user-app"
                        end="node-frontend"
                        color="#10b981"
                        strokeWidth={2}
                        path="grid"
                        startAnchor={{ position: "bottom", offset: { x: -10 } }}
                        endAnchor={{ position: "top", offset: { x: -60 } }}
                        showHead={true}
                        headSize={5}
                        labels={{ middle: <div className="flex items-center gap-1 bg-white border border-emerald-200 px-2 py-0.5 rounded shadow-sm text-[10px] font-bold text-emerald-600"><span className="w-4 h-4 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[8px]">1</span> 提示/Prompt</div> }}
                    />
                    {/* User Developer -> Frontend: 配置路径 */}
                    <Xarrow
                        start="user-dev"
                        end="node-frontend"
                        color="#64748b"
                        strokeWidth={2}
                        path="grid"
                        startAnchor={{ position: "bottom", offset: { x: 10 } }}
                        endAnchor={{ position: "top", offset: { x: 60 } }}
                        showHead={true}
                        headSize={5}
                        labels={{ middle: <div className="bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm text-[10px] font-bold text-slate-500">配置 Config</div> }}
                    />

                    {/* Frontend -> User: 响应路径 (向上) */}
                    <Xarrow
                        start="node-frontend"
                        end="user-app"
                        color="#94a3b8"
                        strokeWidth={1.5}
                        path="grid"
                        startAnchor={{ position: "top", offset: { x: 0 } }}
                        endAnchor={{ position: "bottom", offset: { x: 30 } }}
                        showHead={true}
                        headSize={4}
                        dashness={{ strokeLen: 4, nonStrokeLen: 4 }}
                        labels={{ middle: <div className="bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm text-[10px] font-bold text-slate-500">响应/Response</div> }}
                    />

                    {/* 控制平面 -> Coordinator (策略) */}
                    <Xarrow
                        start="node-cp-orchestrator"
                        end="node-coordinator"
                        color="#9333ea"
                        strokeWidth={2}
                        path="straight"
                        startAnchor={{ position: "right", offset: { y: 0 } }}
                        endAnchor={{ position: "left", offset: { y: 0 } }}
                        showHead={true}
                        headSize={5}
                        dashness={{ strokeLen: 4, nonStrokeLen: 4 }}
                        labels={{ middle: <div className="text-xs text-purple-500 bg-white px-2 py-0.5 rounded border border-purple-200 shadow-sm font-bold">策略 Policy</div> }}
                    />

                    {/* Frontend -> Orchestration: 请求路径 (向下) */}
                    <Xarrow
                        start="node-frontend"
                        end="orchestration-layer"
                        color="#10b981"
                        strokeWidth={2}
                        path="grid"
                        startAnchor={{ position: "bottom", offset: { x: -50 } }}
                        endAnchor={{ position: "top", offset: { x: -50 } }}
                        showHead={true}
                        headSize={5}
                        gridBreak="50%"
                        labels={{ middle: <div className="flex items-center gap-1 bg-white border border-emerald-200 px-2 py-0.5 rounded shadow-sm text-[10px] font-bold text-emerald-600"><span className="w-4 h-4 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[8px]">2</span> 请求/Request</div> }}
                    />

                    {/* Orchestration -> Frontend: 响应路径 (向上) */}
                    <Xarrow
                        start="orchestration-layer"
                        end="node-frontend"
                        color="#94a3b8"
                        strokeWidth={1.5}
                        path="grid"
                        startAnchor={{ position: "top", offset: { x: 50 } }}
                        endAnchor={{ position: "bottom", offset: { x: 50 } }}
                        showHead={true}
                        headSize={4}
                        dashness={{ strokeLen: 4, nonStrokeLen: 4 }}
                        gridBreak="50%"
                        labels={{ middle: <div className="bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm text-[10px] font-bold text-slate-500">结果/Result</div> }}
                    />

                    {/* Coordinator -> Model Armor (推理请求) */}
                    <Xarrow
                        start="node-coordinator"
                        end="node-model-armor"
                        color="#64748b"
                        strokeWidth={2}
                        path="grid"
                        startAnchor={{ position: "right", offset: { y: 0 } }}
                        endAnchor={{ position: "left", offset: { y: 0 } }}
                        showHead={true}
                        headSize={5}
                        gridBreak="50%"
                        labels={{ middle: <div className="text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded shadow-sm">推理请求 Inference</div> }}
                    />

                    {/* Model Armor -> AI Model */}
                    <Xarrow
                        start="node-model-armor"
                        end="node-ai-model"
                        color="#64748b"
                        strokeWidth={2}
                        path="grid"
                        startAnchor="bottom"
                        endAnchor="top"
                        showHead={true}
                        headSize={5}
                        gridBreak="50%"
                        labels={{ middle: <div className="text-[9px] text-slate-500 bg-white px-1 rounded">安全审查 Security</div> }}
                    />

                    {/* AI Model -> Response Generator (推理响应) */}
                    <Xarrow
                        start="node-ai-model"
                        end="node-response-gen"
                        color="#10b981"
                        strokeWidth={2}
                        path="grid"
                        startAnchor={{ position: "left", offset: { y: 10 } }}
                        endAnchor={{ position: "right", offset: { y: 0 } }}
                        showHead={true}
                        headSize={5}
                        dashness={{ strokeLen: 4, nonStrokeLen: 4 }}
                        gridBreak="70%"
                        labels={{ middle: <div className="text-[10px] text-emerald-500 bg-white px-2 py-0.5 rounded border border-emerald-100 shadow-sm">文本返回 Text Result</div> }}
                    />

                    {/* Coordinator -> Subagents (任务分发) */}
                    <Xarrow
                        start="node-coordinator"
                        end="pattern-seq"
                        color="#10b981"
                        strokeWidth={2}
                        path="grid"
                        startAnchor="bottom"
                        endAnchor="top"
                        showHead={true}
                        headSize={4}
                        gridBreak="30%"
                    />
                    <Xarrow
                        start="node-coordinator"
                        end="pattern-iter"
                        color="#10b981"
                        strokeWidth={2}
                        path="grid"
                        startAnchor="bottom"
                        endAnchor="top"
                        showHead={true}
                        headSize={4}
                        gridBreak="30%"
                        labels={{ middle: <div className="text-[9px] text-emerald-600 bg-white px-1 rounded border border-emerald-100 shadow-xs">分发 Dispatch</div> }}
                    />

                    {/* Subagents -> Response Generator (汇总) */}
                    <Xarrow
                        start="pattern-seq"
                        end="node-response-gen"
                        color="#10b981"
                        strokeWidth={2}
                        path="grid"
                        startAnchor="bottom"
                        endAnchor="top"
                        showHead={true}
                        headSize={4}
                    />
                    <Xarrow
                        start="pattern-iter"
                        end="node-response-gen"
                        color="#10b981"
                        strokeWidth={2}
                        path="grid"
                        startAnchor="bottom"
                        endAnchor="top"
                        showHead={true}
                        headSize={4}
                        labels={{ middle: <div className="text-[9px] text-emerald-600 bg-white px-1 rounded border border-emerald-100 shadow-xs">汇总 Collective</div> }}
                    />

                    {/* Orchestration -> Internal Tools (MCP) */}
                    <Xarrow
                        start="orchestration-layer"
                        end="tools-internal"
                        color="#3b82f6"
                        strokeWidth={2}
                        path="grid"
                        startAnchor={{ position: "bottom", offset: { x: -60 } }}
                        endAnchor="top"
                        showHead={true}
                        headSize={5}
                        gridBreak="50%"
                        labels={{ middle: <div className="text-xs text-blue-500 bg-white px-2 py-0.5 rounded border border-blue-200 shadow-sm font-bold">内部调用 MCP</div> }}
                    />

                    {/* Orchestration -> External Tools (MCP) */}
                    <Xarrow
                        start="orchestration-layer"
                        end="tools-external"
                        color="#94a3b8"
                        strokeWidth={2}
                        path="grid"
                        startAnchor={{ position: "bottom", offset: { x: 60 } }}
                        endAnchor="top"
                        showHead={true}
                        headSize={5}
                        dashness={{ strokeLen: 4, nonStrokeLen: 4 }}
                        gridBreak="50%"
                        labels={{ middle: <div className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm font-bold">外部扩展 External Call</div> }}
                    />

                </Xwrapper>
            </div>
            {/* 运行架构描述板块 */}
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
                            <h3 className="text-2xl font-bold text-slate-800">系统运行架构设计文档</h3>
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
                        <div className="p-2">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={markdownComponents}
                            >
                                {generateMarkdown()}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}

            </div >
        </div >
    );
});

export default ProcessView;
