Plugin.register('bit', {
    title: 'BIT - Blockbench Intelligent Topology',
    author: 'yamasung7-dot',
    description: 'Utilities for cleaning unnecessary mesh geometry.',
    icon: 'optimize',
    version: '0.2.0',
    variant: 'both',

    onload() {
        function analyzeMesh(mesh) {
            let vertices = 0;
            let faces = 0;

            if (mesh && mesh.vertices) {
                vertices = Object.keys(mesh.vertices).length;
            }
            if (mesh && mesh.faces) {
                faces = Object.keys(mesh.faces).length;
            }

            return { vertices, faces };
        }

        const action = new Action('bit_optimize_mesh', {
            name: 'BIT Optimize Mesh',
            description: 'Analyze mesh and prepare safe cleanup.',
            icon: 'cleaning_services',

            click() {
                let mesh = Format?.id === 'free' ? Outliner.selected[0] : null;

                if (!mesh) {
                    Blockbench.showQuickMessage('Select a mesh first');
                    return;
                }

                const stats = analyzeMesh(mesh);

                Blockbench.showMessageBox({
                    title: 'BIT Mesh Report',
                    message: `Vertices: ${stats.vertices}\nFaces: ${stats.faces}\n\nCleanup engine ready.`,
                    buttons: ['OK']
                });
            }
        });

        MenuBar.addAction(action, 'tools');
    },

    onunload() {
        MenuBar.removeAction('bit_optimize_mesh');
    }
});
