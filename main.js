import plugin from '../plugin.json';

class SDLANGPlugin {
    async init() {
        // 1. Daftarkan mode bahasa ke Ace Editor (mesin utama Acode)
        const { editor } = editorManager;

        // Mendefinisikan aturan warna secara langsung
        define("ace/mode/sdlang_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports, module) {
            var oop = require("ace/lib/oop");
            var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

            var SDLANGHighlightRules = function() {
                this.$rules = {
                    "start": [
                        { token: "constant.language", regex: "BEL MASUK|ISTIRAHAT" },
                        { token: "keyword.control", regex: "IMPORT|UMUMKAN" },
                        { token: "support.function", regex: "TULIS|SOAL|KUNCI" },
                        { token: "string", regex: '".*?"' },
                        { token: "comment", regex: "//.*$" }
                    ]
                };
            };
            oop.inherits(SDLANGHighlightRules, TextHighlightRules);
            exports.SDLANGHighlightRules = SDLANGHighlightRules;
        });

        define("ace/mode/sdlang", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/sdlang_highlight_rules"], function(require, exports, module) {
            var oop = require("ace/lib/oop");
            var TextMode = require("ace/mode/text").Mode;
            var SDLANGHighlightRules = require("ace/mode/sdlang_highlight_rules").SDLANGHighlightRules;

            var Mode = function() {
                this.HighlightRules = SDLANGHighlightRules;
            };
            oop.inherits(Mode, TextMode);
            exports.Mode = Mode;
        });

        // 2. Kaitkan ekstensi file .sd dengan mode sdlang
        editorManager.setModeConfig('sdlang', {
            extensions: ['sd']
        });

        window.toast('SDLANG Support Loaded!', 3000);
    }

    async destroy() {
        // Cleanup jika plugin dihapus
    }
}

if (window.acode) {
    const acodePlugin = new SDLANGPlugin();
    acode.setPluginInit(plugin.id, (async () => {
        await acodePlugin.init();
    }).bind(acodePlugin));
    acode.setPluginUnmount(plugin.id, () => {
        acodePlugin.destroy();
    });
}
