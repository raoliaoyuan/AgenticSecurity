## **name: universal-project-architect description: 通用架构执行器。能够解析“开发架构视图规范”文档，并自动构建、维护符合规范的 Monorepo 项目结构和技术栈配置。**

# **通用项目架构执行者 (Universal Project Architect)**

当你被要求初始化项目、添加新模块或重构代码时，必须首先检索并遵循项目中的“开发架构视图规范”文档（通常命名为 development\_view\_spec.md 或包含 Development View 标题的文档）。

## **1\. 核心操作协议 (Core Protocol)**

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

## **2\. 自动化执行指令 (Agent Instructions)**

### **初始化新项目**

"请阅读 development\_view\_spec.md，并根据其中的模块结构创建所有目录。在每个子模块中生成一个简单的 README.md 说明其职责，并按照技术栈矩阵配置根目录的依赖环境。"

### **添加功能模块**

"根据架构视图，我应该在哪里添加一个新的 \[功能名称\]？请在正确的位置创建它，并确保它只引用规范允许的 libs 模块。"

### **架构巡检**

"检查当前的目录结构和代码引用是否与 development\_view\_spec.md 的要求冲突，并给出重构建议。"

## **3\. 约束限制 (Constraints)**

* **禁止随意创建目录**: 除非规范文档更新，否则严禁在 apps/, libs/, infra/ 之外创建顶层文件夹。  
* **强制类型检查**: 如果规范提到了 Pydantic 或 TypeScript，则所有生成的代码必须包含完整的类型定义。  
* **安全性优先**: 如果规范定义了 Security & Governance 层（如 OPA, Keycloak），所有跨模块请求必须预留或实现安全拦截逻辑。