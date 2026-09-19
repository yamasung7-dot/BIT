Plugin.register('bit', {
    title: 'BIT - Blockbench Intelligent Topology',
    author: 'yamasung7-dot',
    description: 'Utilities for cleaning unnecessary mesh geometry.',
    icon: 'dangerous',
    version: '0.5.0',
    variant: 'both',

    onload() {
        const bitTools = {
            optimize: new Action('bit_optimize_mesh', {
                name: 'BIT Upgrade',
                description: 'Safely optimize unnecessary topology.',
                icon: 'upgrade',
                click() {
                    Blockbench.showMessageBox({
                        title: 'BIT Upgrade',
                        message: 'Optimization preview system ready. No changes applied.'
                    });
                }
            }),

            fitbit: new Action('bit_fitbit', {
                name: 'BIT Fitbit',
                description: 'Analyze mesh topology and report possible waste.',
                icon: 'analytics',
                click() {
                    Blockbench.showMessageBox({
                        title: 'BIT Fitbit Report',
                        message: 'Topology analysis foundation active. Vertex scanning will be added next.'
                    });
                }
            }),

            hive: new Action('bit_hive', {
                name: 'BIT Hive',
                description: 'Detect complex topology problems.',
                icon: 'account_tree',
                click() {
                    Blockbench.showMessageBox({
                        title: 'BIT Hive',
                        message: 'Advanced topology analysis foundation active.'
                    });
                }
            })
        };

        // Toolbox integration when available, fallback keeps compatibility.
        if (Toolbox && Toolbox.addAction) {
            Toolbox.addAction(bitTools.optimize);
            Toolbox.addAction(bitTools.fitbit);
            Toolbox.addAction(bitTools.hive);
        } else {
            MenuBar.addAction(bitTools.optimize, 'tools');
            MenuBar.addAction(bitTools.fitbit, 'tools');
            MenuBar.addAction(bitTools.hive, 'tools');
        }

        globalThis.BIT = bitTools;
    },

    onunload() {
        MenuBar.removeAction('bit_optimize_mesh');
        MenuBar.removeAction('bit_fitbit');
        MenuBar.removeAction('bit_hive');
        delete globalThis.BIT;
    }
});
