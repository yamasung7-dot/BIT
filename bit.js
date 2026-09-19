Plugin.register('bit', {
    title: 'BIT - Blockbench Intelligent Topology',
    author: 'yamasung7-dot',
    description: 'Utilities for cleaning unnecessary mesh geometry.',
    icon: 'optimize',
    version: '0.1.0',
    variant: 'both',
    onload() {
        const action = new Action('bit_optimize_mesh', {
            name: 'Optimize Mesh',
            description: 'Analyze and clean unnecessary vertices safely.',
            icon: 'cleaning_services',
            click() {
                const selection = Cube.selected;
                if (!selection) {
                    Blockbench.showQuickMessage('Select a mesh first');
                    return;
                }
                Blockbench.showQuickMessage('BIT: Mesh optimizer foundation loaded');
            }
        });

        MenuBar.addAction(action, 'tools');
    },
    onunload() {
        MenuBar.removeAction('bit_optimize_mesh');
    }
});
