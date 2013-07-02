urilObject = {
    createGrowl: function (persistent) {
        var self = this;
        var target = $('.qtip.jgrowl:visible:last');
        $(document.body).qtip({
            content: {
                text: commonLabel.messageBoxTest,
                title: {
                    text: commonLabel.messageBoxTestHeader,
                    button: true
                }
            },
            position: {
                my: 'top right',
                at: (target.length ? 'bottom' : 'top') + ' right',
                target: target.length ? target : $(window),
                adjust: { y: 5 },
                effect: function (api, newPos) {
                    $(this).animate(newPos, {
                        duration: 50,
                        queue: false
                    });
                    api.cache.finalPos = newPos;
                }
            },
            show: {
                event: false,
                ready: true,
                effect: function () {
                    $(this).stop(0, 1).fadeIn(400);
                },
                persistent: persistent
            },
            hide: {
                event: false,
                effect: function (api) {
                    $(this).stop(0, 1).fadeOut(400).queue(function () {
                        api.destroy();
                        self._updateGrowls();
                    })
                }
            },
            style: {
                classes: 'jgrowl qtip-dark',
                tip: false
            },
            events: {
                render: function (event, api) {
                    self.timer.call(api.elements.tooltip, event);
                }
            }
        }).removeData('qtip');
        self._delegation()
    },

    _updateGrowls: function () {
        var each = $('.qtip.jgrowl'),
            width = each.outerWidth(),
            height = each.outerHeight(),
            gap = each.eq(0).qtip('option', 'position.adjust.y'),
            pos;

        each.each(function (i) {
            var api = $(this).data('qtip');

            api.options.position.target = !i ? $(window) : [
                pos.left + width, pos.top + (height * i) + Math.abs(gap * (i - 1))
            ];
            api.set('position.at', 'top right');
            if (!i) {
                pos = api.cache.finalPos;
            }
        });
    },

    timer: function (event) {
        var api = $(this).data('qtip'),
            lifespan = 5000;
        if (api.get('show.persistent') === true) {
            return;
        }
        clearTimeout(api.timer);
        if (event.type !== 'mouseover') {
            api.timer = setTimeout(api.hide, lifespan);
        }
    },
    _delegation: function () {
        $(document).delegate('.qtip.jgrowl', 'mouseout', this.timer);
    }
};
