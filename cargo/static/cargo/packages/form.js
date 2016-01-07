window.cargo_packages_form = true;

/* EVENTS

    cargo.form_after_insert [data, inserted] --> Just after an ajax insert
    cargo.form_data_received [data] --> Just after data ajax received

    cargo.form_remove_success'  [data, removed] -->
    cargo.form_remove_done'  [data, removed] ->

*/

(function($)
{
    $.unserialize = function(serializedString)
    {
        serializedString = serializedString.split("?");
        if(serializedString.length > 1)
        {
            serializedString = serializedString[1]
        }
        else {
            serializedString = serializedString[0]
        }
        var str = decodeURI(serializedString);
        var pairs = str.split('&');
        var obj = {}, p, idx, val;
        for (var i=0, n=pairs.length; i < n; i++) {
            p = pairs[i].split('=');
            idx = p[0];

            if (idx.indexOf("[]") == (idx.length - 2)) {
                // Eh um vetor
                var ind = idx.substring(0, idx.length-2)
                if (obj[ind] === undefined) {
                    obj[ind] = [];
                }
                obj[ind].push(p[1]);
            }
            else {
                obj[idx] = p[1];
            }
        }
        return obj;
    };
})(jQuery);

$(document).ready(function()
{
    window.cargo_packages_form_apply_packages_on_insert = function(inserted)
    {
        if(window.cargo_packages_slick === true)
        {
            $('[data-slick]').trigger('mouseenter');
        }
        if(window.cargo_packages_modal === true)
        {
            $('[data-modal]').css({ cursor: 'pointer' });
        }
        if(window.cargo_packages_isotope === true)
        {
            window.cargo_packages_isotope_apply();
        }
        if(window.cargo_packages_select === true)
        {
            window.cargo_packages_select_apply();
        }
        $(document).trigger('cargo.form_after_insert', [inserted]);
    }

    window.cargo_packages_form_auto_fill_data = function(data)
    {
        //console.log(data, typeof data)
        if(typeof data === "object")
        {
            console.log(data)
            if(data.replace)
            {
                if(typeof data.replace !== 'array' && typeof data.replace !== 'object')
                {
                    var replaces = [data.replace]
                }
                else
                {
                    var replaces =  data.replace
                }
                for(var i in replaces)
                {
                    var html = $(replaces[i]);
                    var id = html.attr('id');
                    console.log('id',id)
                    if(id)
                    {
                        var repl = $('#'+id);
                        if(repl.length)
                        {
                            $('#'+id).replaceWith(html);
                            window.cargo_packages_form_apply_packages_on_insert(html);
                            //new Switchery($('.view-publish input')[0]);
                        }
                        else
                        {
                            var id = html.attr('data-insert');
                            if(id)
                            {
                                $('#'+id).after(html);
                                window.cargo_packages_form_apply_packages_on_insert(html);
                                //new Switchery($('.view-publish input')[0]);
                            }
                        }

                        var isotopes = html.parents('[data-isotopes]').eq(0);
                        if(isotopes.length)
                        {
                            var first = isotopes.find('[data-isotope]').eq(0);
                            isotopes.isotope( 'prepended', html )
                            isotopes.isotope('layout', 'packery');
                            isotopes.isotope( 'prepended', first )
                            isotopes.isotope('layout', 'packery');
                            // isotopes.isotope({
                            //   getSortData: {
                            //     order: '[data-order]',
                            //   },
                            //   sortBy: [ 'order' ]
                            // });

                        }

                    }
                }
            }
            if(window.cargo_packages_notification && data.notifications)
            {
                PNotify.removeAll();
                for(var i in data.notifications) {
                    new PNotify({
                        title:  data.notifications[i][0],
                        text: data.notifications[i][1]
                    });
                }

            }
            if(data.remove)
            {
                if(data.remove[0] == "#")
                {
                    if($(data.remove[0]).length)
                    {
                        $(data.remove[0]).remove();
                    }
                }
            }
        }
        else if(typeof data === "string")
        {


        }
        if(window.cargo_packages_loading == true)
        {
            $('body').removeLoading();
        }
        $(document).trigger('cargo.form_data_received', [data]);
    }

    if(window.cargo_packages_modal == true)
    {
        $(document).on('cargo.modal_loaded', '[data-modal]', function(self, content)
        {

        });
    }

    $(document).on('submit', '[data-form-ajax]', function(self, id)
    {
        self = $(this);
        id = self.attr('id');
        var data = self.serializeArray();
        if(window.cargo_packages_loading == true)
        {
            $('body').addLoading();
        }
        $.post(self.attr('action'), data, function(data)
        {
            window.cargo_packages_form_auto_fill_data(data);
            $(self).trigger('cargo.form_ajax_success', [data]);
            $(self).trigger('cargo.form_ajax_done', [data]);
        })
        return false;
    });

    if(window.cargo_packages_modal == true)
    {

        $(document).on('submit', '[data-form-modal]', function(self, id)
        {
            self = $(this);
            id = self.attr('id');
            var data = self.serializeArray();
            if(window.cargo_packages_loading == true)
            {
                $('body').addLoading();
            }
            $.post(self.attr('action'), data, function(data)
            {
                if($(data).find('[data-form-modal]').length)
                {
                    var form = $(data).find('[data-form-modal]')
                    self.replaceWith(form);
                    window.cargo_packages_form_apply_packages_on_insert(form);
                    self.trigger('cargo.form_modal_failed', [data]);
                    self.trigger('cargo.form_ajax_failed', [data]);
                    if(window.cargo_packages_loading == true)
                    {
                        $('body').removeLoading();
                    }
                }
                else
                {
                    window.cargo_packages_form_auto_fill_data(data);
                    $.magnificPopup.close();
                    self.trigger('cargo.form_modal_success', [data]);
                    self.trigger('cargo.form_ajax_success', [data]);
                }
                self.trigger('cargo.form_modal_done', [data]);
                self.trigger('cargo.form_ajax_done', [data]);

            })
            return false;
        });
    }

    $(document).on('click', '[data-form-update]', function(e, self, pk)
    {
        self = $(this);
        if(window.cargo_packages_loading == true)
        {
            $('body').addLoading();
        }
        $.post($(this).data('form-update'), $.unserialize($(this).data('form-update')), function(data)
        {
            window.cargo_packages_form_auto_fill_data(data);
            self.trigger('cargo.form_update_success', [data]);
            self.trigger('cargo.form_update_done', [data]);
        });
        return false;
    });

    $(document).on('click', '[data-form-remove]', function(e, self)
    {
        self = $(this);
        if(window.cargo_packages_loading == true)
        {
            $('body').addLoading();
        }
        $.get($(this).data('form-remove'), null, function(data)
        {
            window.cargo_packages_form_auto_fill_data(data);
            var removed = self.parents('[id]').eq(0)
            self.trigger('cargo.form_remove_success', [data, removed]);
            self.trigger('cargo.form_remove_done', [data, removed]);
            removed.remove();
        });
    });
});