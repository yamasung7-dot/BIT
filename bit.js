Plugin.register('bit', {
    title: 'BIT - Blockbench Intelligent Topology',
    author: 'yamasung7-dot',
    description: 'Utilities for cleaning unnecessary mesh geometry.',
    icon: 'dangerous',
    version: '0.7.0',
    variant: 'both',

    onload() {
        function analyzeTopology() {
            let report = {meshes:0, vertices:0, faces:0, duplicates:0};
            let positions = {};

            if (typeof Outliner !== 'undefined' && Outliner.elements) {
                Outliner.elements.forEach(element => {
                    if (!element.mesh) return;
                    report.meshes++;
                    let verts = element.mesh.vertices || {};
                    report.vertices += Object.keys(verts).length;
                    report.faces += element.mesh.faces ? Object.keys(element.mesh.faces).length : 0;
                    Object.values(verts).forEach(v => {
                        let key = v.join ? v.join(',') : JSON.stringify(v);
                        if (positions[key]) report.duplicates++;
                        positions[key] = true;
                    });
                });
            }
            return report;
        }

        const bitTools = {
            optimize: new Action('bit_optimize_mesh', {name:'BIT Upgrade', icon:'upgrade', click(){
                Blockbench.showMessageBox({title:'BIT Upgrade', message:'Preview mode only. No changes applied.'});
            }}),
            fitbit: new Action('bit_fitbit', {name:'BIT Fitbit', icon:'analytics', click(){
                let r = analyzeTopology();
                Blockbench.showMessageBox({title:'BIT Fitbit Report', message:
                    'Meshes: '+r.meshes+'\nVertices: '+r.vertices+'\nFaces: '+r.faces+'\nDuplicate vertices: '+r.duplicates});
            }}),
            hive: new Action('bit_hive', {name:'BIT Hive', icon:'account_tree', click(){
                Blockbench.showMessageBox({title:'BIT Hive', message:'Topology analysis foundation active.'});
            }})
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
