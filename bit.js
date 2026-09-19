Plugin.register('bit', {
    title: 'BIT - Blockbench Intelligent Topology',
    author: 'yamasung7-dot',
    description: 'Utilities for cleaning unnecessary mesh geometry.',
    icon: 'optimize',
    version: '0.3.0',
    variant: 'both',

    onload() {
        function analyzeMesh(mesh) {
            return {
                vertices: mesh?.vertices ? Object.keys(mesh.vertices).length : 0,
                faces: mesh?.faces ? Object.keys(mesh.faces).length : 0
            };
        }

        function distance(a, b) {
            return Math.sqrt(
                Math.pow(a[0] - b[0], 2) +
                Math.pow(a[1] - b[1], 2) +
                Math.pow(a[2] - b[2], 2)
            );
        }

        function findNearbyVertices(mesh, threshold = 0.001) {
            let found = [];
            let ids = Object.keys(mesh.vertices || {});

            for (let i = 0; i < ids.length; i++) {
                for (let j = i + 1; j < ids.length; j++) {
                    let a = mesh.vertices[ids[i]];
                    let b = mesh.vertices[ids[j]];

                    if (a && b && distance(a, b) <= threshold) {
                        found.push([ids[i], ids[j]]);
                    }
                }
            }

            return found;
        }

        const action = new Action('bit_optimize_mesh', {
            name: 'BIT Optimize Mesh',
            description: 'Find unnecessary nearby vertices safely.',
            icon: 'cleaning_services',

            click() {
                let mesh = Format?.id === 'free' ? Outliner.selected[0] : null;

                if (!mesh) {
                    Blockbench.showQuickMessage('Select a mesh first');
                    return;
                }

                const stats = analyzeMesh(mesh);
                const possible = findNearbyVertices(mesh);

                Blockbench.showMessageBox({
                    title: 'BIT Cleanup Scan',
                    message: `Vertices: ${stats.vertices}\nFaces: ${stats.faces}\n\nPossible merges: ${possible.length}\n\nNo changes made yet.`,
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
