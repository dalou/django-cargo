

jQuery(function($tree, tree_by_pk ) {

    // // Initialize filter fields to select2 fields
    // // $('select[data-name=category]').select2();
    // // $('select[data-name=category_canaille]').select2();
    // $('select[data-name=city]').select2({width:'200px'});
    // $('select[data-name=zipcode]').select2({width:'200px'});
    // // $('select[data-name=indicative_categories]').select2({width:'200px'});

    // $('#opening_periods-group').appendTo('.suit-tab-prices');

    // $('.sortable').nestedSortable({
    //         handle: 'div',
    //         items: 'li',
    //         toleranceElement: '> div'
    //     });

    $('#result_list thead .column-parent').hide()
    tree_by_pk = {}
    $('#result_list tbody tr').each(function() {
        var pk = $(this).find('.action-checkbox input').val();
        var parent_pk = $(this).find('.field-parent').hide().find('input').val();
        tree_by_pk[pk] =
        {
            pk: pk,
            parent_pk: parent_pk,
            $tr: $(this)
        };
    });

    // $('#result_list tbody').sortable();


    for(var pk in tree_by_pk)
    {
        var elm = tree_by_pk[pk];
        if(elm.parent_pk)
        {
            elm.parent = tree_by_pk[elm.parent_pk];
            elm.parent.$tr.after(elm.$tr);
            elm.$tr.attr('data-parent', elm.parent_pk)
            elm.$tr.attr('data-pk', elm.pk)

            // var opener = $('<td><a>open</a></td>').on('click', function()
            // {
            //     $('[data-parent='+this.element.pk+']').toggle()

            // });
            // opener[0].element = elm.parent;

            // elm.parent.$tr.find('td').eq(0).append(opener)
            // elm.$tr.hide();
        }
    }
    for(var pk in tree_by_pk)
    {
        var padding = 0;
        var elm = tree_by_pk[pk];
        var parent = elm.parent;
        while(parent) {
            padding += 50
            parent = parent.parent;
            var $a = elm.$tr.find('.field-name a')
            $a.html( '| ............. ' + $a.text() )
        }
        //elm.$tr.find('.field-title').css({ paddingLeft: padding })

    }

    // $tree = $('<ol class="sortable" id="tree_parent_"></ol>');

    // $('#result_list').before($tree).hide();

    // if($('#result_list').length) {

    //     //$tree[0].pk = '';
    //     $tree.parent()[0].pk = '';

    //     $('#result_list tbody tr').each(function($item) {

    //         var pk = $(this).find('th a').eq(0).text();
    //         var ppk = $.trim($(this).find('td').eq(1).text());
    //         var parent_id = "#tree_parent_"+ ppk;
    //         var title_field  = $(this).find('input').eq(1);

    //         // console.log(pk, ppk, title)
    //         $item = $('<li class="mjs-nestedSortable-branch mjs-nestedSortable-collapsed">\
    //             <div>\
    //                 <a class="disclose up"><img src="'+window.__admin_media_static__+'img/dropdown-arrow-up.png" /></a>\
    //                 <a class="disclose down"><img src="'+window.__admin_media_static__+'img/dropdown-arrow.png" /></a>\
    //                 <span>'+title_field.val()+'</span>\
    //                 <a href="'+$(this).find('th a').eq(0).attr('href')+'" class="pull-right btn btn-info ">editer</a>\
    //                 <span class="pull-right" style="margin: 0px 20px;">Publié : <input type="checkbox" /></span>\
    //                 <span class="pull-right" style="margin: 0px 20px;">Menu principal : <input type="checkbox" /></span>\
    //             </div>\
    //             <ol id="tree_parent_'+pk+'"></ol>\
    //         </li>');

    //         //var $fdiv = $item.find('> div');
    //         //$(this).find('.action-select').prependTo($fdiv)

    //         //$fdiv.append($(this).find('input').removeClass('vTextField').show().width('auto'));
    //         $item.find('.disclose').on('click', function() {
    //             $(this).closest('li').toggleClass('mjs-nestedSortable-collapsed').toggleClass('mjs-nestedSortable-expanded');
    //         })
    //         $item.appendTo($(parent_id));
    //         $item[0].pk = pk;
    //         // $item[0].ppk = ppk;
    //         $item[0].title_field = title_field;
    //         $item[0].parent_field = $(this).find('input').eq(2);
    //         $item[0].order_field = $(this).find('input').eq(3);
    //         $item[0].published_field = $(this).find('input').eq(4);
    //         $item[0].is_main_menu_field = $(this).find('input').eq(5);

    //         $item.find('span').eq(1).find('input').prop('checked', $item[0].published_field.prop('checked')).change(function() {
    //             $item[0].published_field.prop('checked', $(this).prop('checked'));
    //         }).css({ position: 'relative', top: -2 });

    //         $item.find('span').eq(2).find('input').prop('checked', $item[0].is_main_menu_field.prop('checked')).change(function() {
    //             $item[0].is_main_menu_field.prop('checked', $(this).prop('checked'));
    //         }).css({ position: 'relative', top: -2 });

    //         // if($item[0].color_field.val()) {
    //         //     $item.find('>div').prepend($('<i></i>').css({
    //         //         padding: '10px 17px', background: $item[0].color_field.val(), borderRadius: '50%'
    //         //     }))

    //         // }

    //     });

    //     //$('#result_list').show()

    //     $tree.nestedSortable({

    //         forcePlaceholderSize: true,
    //         handle: 'div',
    //         helper: 'clone',
    //         items: 'li',
    //         opacity: .6,
    //         placeholder: 'placeholder',
    //         revert: 250,
    //         tabSize: 25,
    //         tolerance: 'pointer',
    //         toleranceElement: '> div',
    //         change: function(e, d) {},
    //         //maxLevels: 3,
    //         //isTree: true,
    //         startCollapsed: true,
    //         expandOnHover: false
    //     });

    //     $('input[name=_save]').click(function() {
    //         console.log('relocate')
    //         $tree.find('ol').andSelf().each(function(i, ol, ppk) {

    //             ppk = $(ol).parent()[0].pk
    //             //ppk = ppk ? ppk : '';


    //             $(ol).find('> li').each(function(i, li) {

    //                 $(li.parent_field).val(ppk)
    //                 $(li.order_field).val(i)
    //                 //$(li).find('>div span').eq(0).text(li.pk+' - '+ppk+' - '+li.title_field.val())

    //             })

    //         })
    //         //return false;
    //     });


    //     $tree.find('li').each(function() {
    //         if(!$(this).find('>ol >li').length) {
    //             $(this).find('.disclose').remove();
    //             $(this).find('>div span').eq(0).css({ marginLeft: 30 })
    //         }
    //     });
    // }



//     <ol class="sortable">
//     <li><div>Some content</div></li>
//     <li>
//         <div>Some content</div>
//         <ol>
//             <li><div>Some sub-item content</div></li>
//             <li><div>Some sub-item content</div></li>
//         </ol>
//     </li>
//     <li><div>Some content</div></li>
// </ol>
});