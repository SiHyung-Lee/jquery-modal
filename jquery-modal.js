(function (window, $) {
    'use strict';

    /**
     * Modal 생성자
     * @param {HTMLElement} elem - 트리거 요소
     * @param {Object} options - 설정 옵션
     */
    var Modal = function (elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.target = this.$elem.data('modal-trigger');
        this.options = options || {};
        this.$modal = null;
        this.$overlay = $('#modalOverlay');
        this.isOpen = false;
        this.previousFocus = null;
    };

    Modal.prototype = {

        defaults: {
            width: 300,
            height: 200,
            closeOnOverlay: true,
            closeOnEsc: true,
            animationDuration: 300
        },

        /**
         * 초기화
         */
        init: function () {
            var self = this;

            // 설정 병합 (data 속성이 최우선)
            var metaWidth = this.$elem.data('modal-width');
            var metaHeight = this.$elem.data('modal-height');

            this.config = $.extend({}, this.defaults, this.options, {
                width: metaWidth || this.options.width || this.defaults.width,
                height: metaHeight || this.options.height || this.defaults.height
            });

            // 모달 요소 찾기
            this.$modal = $('[data-modal-target="' + this.target + '"]');

            if (this.$modal.length === 0) {
                console.error('모달을 찾을 수 없습니다: ' + this.target);
                return this;
            }

            // 모달 열기
            this.open();

            return this;
        },

        /**
         * 모달 열기
         */
        open: function () {
            var self = this;

            if (this.isOpen) return;

            // 이전 포커스 저장
            this.previousFocus = document.activeElement;

            // 다른 모든 모달 닫기
            this.closeAll();

            // 모달 크기 설정
            this.$modal.css({
                width: this.config.width + 'px',
                height: this.config.height + 'px'
            });

            // 오버레이 표시
            this.$overlay.show();
            setTimeout(function() {
                self.$overlay.addClass('active');
            }, 10);

            // 모달 표시 (애니메이션)
            this.$modal.show();
            setTimeout(function() {
                self.$modal.addClass('active');
            }, 10);

            this.isOpen = true;

            // 접근성: aria-hidden 업데이트
            this.$overlay.attr('aria-hidden', 'false');
            this.$modal.attr('aria-hidden', 'false');

            // 모달에 포커스
            setTimeout(function() {
                self.$modal.find('.modal-close').focus();
            }, this.config.animationDuration);

            // 이벤트 바인딩
            this.bindEvents();

            return this;
        },

        /**
         * 모달 닫기
         */
        close: function () {
            var self = this;

            if (!this.isOpen) return;

            // 애니메이션 제거
            this.$modal.removeClass('active');
            this.$overlay.removeClass('active');

            // 애니메이션 후 숨기기
            setTimeout(function() {
                self.$modal.hide().css({ width: '', height: '' });
                self.$overlay.hide();
            }, this.config.animationDuration);

            this.isOpen = false;

            // 접근성: aria-hidden 업데이트
            this.$overlay.attr('aria-hidden', 'true');
            this.$modal.attr('aria-hidden', 'true');

            // 이전 포커스로 복귀
            if (this.previousFocus) {
                this.previousFocus.focus();
            }

            // 이벤트 언바인딩
            this.unbindEvents();

            return this;
        },

        /**
         * 모든 모달 닫기
         */
        closeAll: function () {
            $('.modal').removeClass('active').hide();
            this.$overlay.removeClass('active').hide().attr('aria-hidden', 'true');
        },

        /**
         * 이벤트 바인딩
         */
        bindEvents: function () {
            var self = this;

            // 닫기 버튼 클릭
            this.$modal.find('.modal-close').on('click.modal', function(e) {
                e.preventDefault();
                self.close();
            });

            // 오버레이 클릭
            if (this.config.closeOnOverlay) {
                this.$overlay.on('click.modal', function(e) {
                    self.close();
                });
            }

            // ESC 키
            if (this.config.closeOnEsc) {
                $(document).on('keydown.modal', function(e) {
                    if (e.keyCode === 27) { // ESC
                        self.close();
                    }
                });
            }

            // 키보드 트랩 (Tab 키)
            this.$modal.on('keydown.modal', function(e) {
                if (e.keyCode === 9) { // Tab
                    self.trapFocus(e);
                }
            });
        },

        /**
         * 이벤트 언바인딩
         */
        unbindEvents: function () {
            this.$modal.find('.modal-close').off('click.modal');
            this.$overlay.off('click.modal');
            $(document).off('keydown.modal');
            this.$modal.off('keydown.modal');
        },

        /**
         * 포커스 트랩 (모달 내부에서만 Tab 이동)
         */
        trapFocus: function (e) {
            var focusableElements = this.$modal.find(
                'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
            ).filter(':visible');

            var firstElement = focusableElements.first();
            var lastElement = focusableElements.last();

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement[0]) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement[0]) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }

    };

    Modal.defaults = Modal.prototype.defaults;

    /**
     * jQuery 플러그인
     */
    $.fn.modal = function (options) {
        return this.each(function () {
            new Modal(this, options).init();
        });
    };

    /**
     * 전역에 노출
     */
    window.Modal = Modal;

})(window, jQuery);


/**
 * 이벤트 위임: .modal-trigger 클래스가 있는 버튼만 처리
 */
$(document).on('click', '.modal-trigger', function (e) {
    e.preventDefault();
    $(this).modal();
});