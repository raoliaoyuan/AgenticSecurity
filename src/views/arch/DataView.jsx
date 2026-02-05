/**
 * 数据架构视图 (Data View)
 * 展示核心实体关系与数据流转管道
 */

import React, { memo } from 'react';
import { Database } from 'lucide-react';
import { EntityNode } from './components/CommonComponents';

const DataView = memo(() => (
    <div className="space-y-8">
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cyan-50 text-cyan-600 rounded-2xl border border-cyan-100 shadow-sm shadow-cyan-100">
                <Database className="w-8 h-8" />
            </div>
            <div>
                <h3 className="text-3xl font-black text-slate-900">数据架构视图 (Data View)</h3>
                <p className="text-slate-500 text-sm mt-1">核心实体关系与数据流转管道</p>
            </div>
        </div>
        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-x-auto">
            <div className="min-w-[800px] flex justify-center gap-16">
                <EntityNode name="User" fields={['UUID', 'Role', 'SVID']} />
                <div className="flex items-center text-slate-300 font-black text-sm italic">── 1:N ──</div>
                <EntityNode name="Session" fields={['SessionID', 'Context', 'History']} />
                <div className="flex items-center text-slate-300 font-black text-sm italic">── 1:N ──</div>
                <EntityNode name="Memory" fields={['VectorID', 'Embedding', 'Metadata']} />
            </div>
            <div className="flex justify-center my-10">
                <div className="h-20 border-l-2 border-dashed border-slate-200"></div>
            </div>
            <div className="min-w-[800px] flex justify-center gap-16">
                <EntityNode name="Agent" fields={['AgentID', 'Tools', 'Prompt']} color="purple" />
                <div className="flex items-center text-slate-300 font-black text-sm italic">── USES ──</div>
                <EntityNode name="Tool" fields={['ToolID', 'Schema', 'ACL']} color="amber" />
            </div>
        </div>
    </div>
));

export default DataView;
