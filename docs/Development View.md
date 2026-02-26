# **开发架构视图 (Development View) 技术规范**

## **1\. 概述**

本方案基于 Monorepo（单仓库）模式设计，旨在规范代码组织、模块依赖关系及构建流水线，确保 AI 代理系统（Agentic System）的可维护性、安全性和可扩展性。

## **2\. 技术栈矩阵 (Technology Stack)**

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

* **策略引擎**: OPA (Open Policy Agent \- 实现细粒度权限管控)  
* **脱敏工具**: Presidio (PII 敏感数据识别与脱敏)  
* **身份认证**: Keycloak (标准 OAuth2/OIDC 方案)  
* **模型防护**: Model Armor (LLM 内容安全过滤)

### **2.4 数据与运维 (Data & Ops)**

* **向量数据库**: Qdrant (高性能向量索引)  
* **消息中间件**: Redis (Pub/Sub 实时消息分发)  
* **部署环境**: Google Cloud Run (Serverless 容器化)  
* **基础设施**: Terraform (IaC 自动化配置)

## **3\. 模块结构 (Monorepo Layout)**

代码库采用层次分明的结构设计，严禁跨层级循环依赖。

root/  
├── apps/               \# 可独立部署的业务应用  
│   ├── console/        \# React 管理后台 UI  
│   ├── coordinator/    \# 核心编排器服务 (Orchestrator)  
│   └── sidecar/        \# 安全代理服务 (Security Proxy)  
├── libs/               \# 共享逻辑与公共组件  
│   ├── agent-kit/      \# 核心抽象层 (Tools, Chains, Memory)  
│   ├── policy/         \# OPA Rego 权限规则定义  
│   └── mcp-client/     \# MCP (Model Context Protocol) 连接器  
└── infra/              \# 基础设施配置  
    └── k8s-tf/         \# Kubernetes 资源定义与 Terraform 脚本

## **4\. 依赖规则与构建规范**

1. **单向依赖**: apps 可以依赖 libs，但 libs 内部组件严禁相互循环依赖。  
2. **抽象隔离**: mcp-client 应保持纯净，不应包含具体的业务逻辑。  
3. **安全注入**: sidecar 模块必须作为流量的必经之路，强制执行 policy 中的 Rego 规则。  
4. **CI/CD 流程**:  
   * **Lint**: 提交前强制执行 Pydantic 类型检查与 ESLint。  
   * **Test**: 智能体工作流必须经过 LangGraph 单元测试模拟。  
   * **Build**: 采用 Docker 多阶段构建，将应用镜像推送至私有仓库后通过 Terraform 更新 Cloud Run 容器。