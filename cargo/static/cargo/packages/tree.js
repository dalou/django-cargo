
window.cargo_packages_tree = true;

$(document).ready(function(select)
{
    window.cargo_packages_tree_apply = function($elms)
    {
        // if(!$elms)
        // {
        //     $elms = $('[data-tree]');
        // }
        // $elms.each(function(i, self)
        // {
        //     if(self.cargo_select === true)
        //     {
        //         return;
        //     }
        //     self.cargo_select = true;
        //     var classname = $(self).attr('class');
        //     classname = classname ? classname.replace('form-control', '').replace('select2-hidden-accessible', '') : '';
        //     $(self).select2($.extend(
        //     {
        //         //tags: $(this).attr('id'),
        //         theme: 'default '+classname,
        //         placeholder: $(self).attr('placeholder'),
        //         minimumResultsForSearch: -1,
        //         language: "fr"
        //         //theme: "classic search-header"
        //     }, $(self).data('select')));
        // });
    }
    window.cargo_packages_select_apply();
});

