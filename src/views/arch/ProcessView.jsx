/**
 * 运行架构视图 (Process View)
 * 展示基于 Google Multi-Agent 架构的运行时流程
 */

import React, { memo, useMemo } from 'react';
import Xarrow, { Xwrapper } from 'react-xarrows';
import {
    Shield, User, Zap, Lock, Database, Server, Cpu, Key,
    FileSearch, CheckCircle2, Brain, Layers, Code2,
    Bot, Activity, Globe
} from 'lucide-react';
import PROCESS_VIEW_SCHEMA, { getSchemaSummary } from '../../processViewSchema';
import { CompactItem, ConnectorVertical, FlowLabel, SubagentNode, RuntimeOption, ToolNode, InfraNode } from './components/CommonComponents';

const ProcessView = memo(() => {
    const schema = PROCESS_VIEW_SCHEMA;

    // 开发模式下输出 Schema 摘要
    useMemo(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log('📐 ProcessView Schema Summary:', getSchemaSummary(schema));
        }
    }, [schema]);

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
                                        <CompactItem icon={<Lock className="w-4 h-4" />} cn="身份管理" en="Identity" />
                                        <CompactItem icon={<Brain className="w-4 h-4" />} cn="记忆管理" en="Memory" />
                                        <CompactItem icon={<Activity className="w-4 h-4" />} cn="配额管理" en="Quota" />
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
        </div>
    );
});

export default ProcessView;
