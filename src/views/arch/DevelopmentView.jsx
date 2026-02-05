/**
 * 开发架构视图 (Development View)
 * 展示代码组织、模块依赖与技术栈
 */

import React, { memo } from 'react';
import { Code2, Layers } from 'lucide-react';
import { DevStackItem } from './components/CommonComponents';

const DevelopmentView = memo(() => (
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
                    <DevStackItem label="Frontend" items={['React 18', 'Vite', 'Tailwind CSS', 'Lucide React']} />
                    <DevStackItem label="Backend" items={['Python 3.11', 'FastAPI', 'LangChain', 'Pydantic']} />
                    <DevStackItem label="Data" items={['PostgreSQL', 'Redis', 'Qdrant', 'MinIO']} />
                    <DevStackItem label="Infra" items={['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions']} />
                </div>
            </div>
            <div className="bg-slate-900 rounded-[2.5rem] p-10 shadow-xl shadow-slate-400/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <h4 className="text-2xl font-black text-white mb-8 flex items-center gap-3 relative z-10">
                    <Code2 className="w-6 h-6 text-indigo-400" /> 模块结构
                </h4>
                <div className="font-mono text-sm text-slate-300 bg-black/40 p-8 rounded-2xl border border-white/10 relative z-10 leading-relaxed">
                    <div className="mb-2 text-indigo-400 font-black">src/</div>
                    <div className="pl-6 border-l border-white/10 ml-1">
                        <div className="mb-1">├── <span className="text-white">api/</span> <span className="text-slate-500 ml-2">// REST & GraphQL endpoints</span></div>
                        <div className="mb-1">├── <span className="text-white">agents/</span> <span className="text-slate-500 ml-2">// Intelligent agent logic</span></div>
                        <div className="mb-1">├── <span className="text-white">core/</span> <span className="text-slate-500 ml-2">// Shared utilities & config</span></div>
                        <div className="mb-1">├── <span className="text-white">db/</span> <span className="text-slate-500 ml-2">// Database models & migrations</span></div>
                        <div className="mb-1">└── <span className="text-white">web/</span> <span className="text-slate-500 ml-2">// Frontend application</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
));

export default DevelopmentView;
