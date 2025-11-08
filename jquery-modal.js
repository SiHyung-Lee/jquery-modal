(function (window, $) {
    'use strict';

    class Modal {
        constructor(elem, width, height) {
            this.elem = elem;
            this.$elem = $(elem);
            this.target = this.$elem.data('modal-trigger');
            this.targetName = '[data-modal-target]';
            this.width = width;
            this.height = height;
            this.metaWidth = this.$elem.data('modal-width');
            this.metaHeight = this.$elem.data('modal-height');
        }

        get defaults() {
            return {
                display: 'none',
                width: 100,
                height: 100
            };
        }

        init() {
            const options = {
                display: 'block',
                width: this.width,
                height: this.height
            };

            const metadata = {
                width: this.metaWidth,
                height: this.metaHeight
            };

            this.config = $.extend({}, this.defaults, options, metadata);

            this.clearLayer();
            this.displayLayer();

            return this;
        }

        clearLayer() {
            $(this.targetName).css(this.defaults);
        }

        displayLayer() {
            this.targetName = `[data-modal-target=${this.target}]`;
            $(this.targetName).css(this.config);
        }
    }

    // jQuery plugin
    $.fn.modal = function (width, height) {
        return this.each(function () {
            new Modal(this, width, height).init();
        });
    };

    window.Modal = Modal;

})(window, jQuery);


$(document).on('click', 'button', function () {
    $(this).modal(200, 100);
});
