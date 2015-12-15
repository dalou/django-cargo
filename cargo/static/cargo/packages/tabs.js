window.cargo_packages_tabs = true;


$(document).ready(function()
{
    $tabs = $('[data-tabs]').each(function($self)
    {
        $self = $(this);

        $self.find('.tabs-tab').click(function(e) {
            var href = $(this).attr('href');
            var target = $(href)
            target.parent().find('.tabs-content.active').removeClass('active');
            $self.find('.tabs-tab.active').removeClass('active');
            $(this).addClass('active');
            target.addClass('active');
            return false;
        });
    });

    $(window).resize(function()
    {
        $tabs.each(function($self, maxHeight) {
            $self = $(this);
            maxHeight = 0;
            $self.find('.tab').height('auto').each(function() {
                maxHeight = Math.max(maxHeight, $(this).height());
            }).height(maxHeight);
        })
    });
    $(window).resize();

});