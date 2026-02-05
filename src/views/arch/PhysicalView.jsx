/**
 * 物理架构视图 (Physical View)
 * 展示云原生部署拓扑与网络边界
 */

import React, { memo } from 'react';
import { Server, Globe, Database, Zap, Link, Bot } from 'lucide-react';
import { ZoneBox, InfraComponent } from './components/CommonComponents';

const PhysicalView = memo(() => (
    <div className="space-y-8">
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 shadow-sm shadow-emerald-100">
                <Server className="w-8 h-8" />
            </div>
            <div>
                <h3 className="text-3xl font-black text-slate-900">物理架构视图 (Physical View)</h3>
                <p className="text-slate-500 text-sm mt-1">云原生部署拓扑与网络边界</p>
            </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-[3.5rem] p-12 relative overflow-hidden shadow-xl">
            <div className="absolute top-6 left-10 bg-emerald-600 text-white px-5 py-2 rounded-full text-xs font-black border border-emerald-400 shadow-lg shadow-emerald-200 tracking-widest uppercase">
                Global Region Context
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
                <ZoneBox name="Public Subnet (DMZ)" color="slate">
                    <InfraComponent name="Load Balancer (WAF)" icon={<Globe />} />
                    <InfraComponent name="API Gateway" icon={<Link />} />
                </ZoneBox>
                <ZoneBox name="Private App Subnet" color="blue">
                    <InfraComponent name="K8s Cluster (EKS/GKE)" icon={<Server />} count={3} />
                    <InfraComponent name="Agent Replicas" icon={<Bot />} count={12} />
                </ZoneBox>
                <ZoneBox name="Private Data Subnet" color="emerald">
                    <InfraComponent name="Vector DB Cluster" icon={<Database />} />
                    <InfraComponent name="PostgreSQL Primary" icon={<Database />} />
                    <InfraComponent name="Redis High Availability" icon={<Zap />} />
                </ZoneBox>
            </div>
        </div>
    </div>
));

export default PhysicalView;
