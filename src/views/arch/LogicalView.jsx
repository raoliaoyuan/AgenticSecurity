/**
 * 逻辑架构视图 (Logical View)
 * 展示系统的分层架构与各层组件
 */

import React, { memo } from 'react';
import { layers } from './data/archData.jsx';
import { LayerSection } from './components/CommonComponents';

const LogicalView = memo(({ activeStep, setActiveStep, showThreats }) => {
    return (
        <div className="space-y-6">
            {layers.map((layer, idx) => (
                <LayerSection
                    key={layer.id}
                    layer={layer}
                    isLast={idx === layers.length - 1}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    showThreats={showThreats}
                />
            ))}
        </div>
    );
});

export default LogicalView;
