Plugin.register('bit', {
    title: 'BIT - Blockbench Intelligent Topology',
    author: 'yamasung7-dot',
    description: 'Utilities for cleaning unnecessary mesh geometry.',
    icon: 'dangerous',
    version: '0.4.0',
    variant: 'both',

    onload() {
        const bitTools = {
            optimize: new Action('bit_optimize_mesh', {
                name: 'BIT Optimize Mesh',
                description: 'Optimize unnecessary topology safely.',
                icon: 'upgrade',
                click() {
                    Blockbench.showQuickMessage('BIT optimization scan ready');
                }
            }),
            fitbit: new Action('bit_fitbit', {
                name: 'BIT Fitbit',
                description: 'Compact mesh cleanup utilities.',
                icon: 'fitbit',
                click() {
                    Blockbench.showQuickMessage('BIT Fitbit ready');
                }
            }),
            hive: new Action('bit_hive', {
                name: 'BIT Hive',
                description: 'Organize and analyze topology data.',
                icon: 'hive',
                click() {
                    Blockbench.showQuickMessage('BIT Hive ready');
                }
            })
        };

        MenuBar.addAction(bitTools.optimize, 'tools');
        MenuBar.addAction(bitTools.fitbit, 'tools');
        MenuBar.addAction(bitTools.hive, 'tools');
    },

    onunload() {
        MenuBar.removeAction('bit_optimize_mesh');
        MenuBar.removeAction('bit_fitbit');
        MenuBar.removeAction('bit_hive');
    }
});
