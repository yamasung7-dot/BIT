Plugin.register('bit', {
    title: 'BIT - Blockbench Intelligent Topology',
    author: 'yamasung7-dot',
    description: 'Utilities for cleaning unnecessary mesh geometry.',
    icon: 'dangerous',
    version: '0.6.0',
    variant: 'both',

    onload() {
        function getMeshStats() {
            let vertices = 0;
            let faces = 0;
            let meshes = 0;

            if (typeof Outliner !== 'undefined' && Outliner.elements) {
                Outliner.elements.forEach(element => {
                    if (element.mesh) {
                        meshes++;
                        vertices += element.mesh.vertices ? Object.keys(element.mesh.vertices).length : 0;
                        faces += element.mesh.faces ? Object.keys(element.mesh.faces).length : 0;
                    }
                });
            }

            return {meshes, vertices, faces};
        }

        function showFitbitReport() {
            const stats = getMeshStats();
            Blockbench.showMessageBox({
                title: 'BIT Fitbit Report',
                message:
                    'Meshes: ' + stats.meshes + '\n' +
                    'Vertices: ' + stats.vertices + '\n' +
                    'Faces: ' + stats.faces + '\n\n' +
                    'Duplicate detection and topology cleanup will be added next.'
            });
        }

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
                    showFitbitReport();
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

        if (typeof Toolbox !== 'undefined' && Toolbox.addAction) {
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
