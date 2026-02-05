# **通用架构图生成技能规范 (General Architecture Diagram Generation Skill)**

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
4. 确保数据流向逻辑自上而下或自左向右清晰。"