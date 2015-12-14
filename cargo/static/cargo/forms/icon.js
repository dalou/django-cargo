$(document).ready(function() {

    $(document).on('click', '.cargo-icon-widget-tabs-control', function() {
        var target = $($(this).attr('href'));
        var visible = target.is(':visible');
        $(this).parents('.cargo-icon-widget-tabs').eq(0).find('.cargo-icon-widget-tabs-content').hide();

        if(!visible) {
            $($(this).attr('href')).show();
        }
        return false;
    })

    $(document).on('click', '.cargo-icon-widget', function() {
         $('.cargo-icon-widget.active').removeClass('active')
         $(this).addClass('active');
         $($(this).data('input')).val($(this).data('value'))
    });
});