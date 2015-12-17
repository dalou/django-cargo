$(document).ready(function() {




    $(document).on('mouseenter', '.cargo-media_input', function(self)
    {
        if(this.cargo_media_input === true)
        {
            return;
        }
        this.cargo_media_input = true;
        self = this;

        $(this).on('click', '.cargo-media_input-clear', function(e)
        {
            console.log(self)
            $(self).find('input[type=checkbox]').eq(0).prop('checked', true);
            $(self).removeClass('image embed');
            $(self).addClass('empty');
            return false;
        })

        $(this).on('cargo.media_dropzone_deposed', function(e, media, file, embed)
        {
            //console.log('media deposed', media, file, embed)
            if(file)
            {
                $(self).find('.cargo-media_input-preview').html('<img class="img-responsive" src="'+file+'"/>').css({
                    backgroundImage: 'url(' + file + ')'
                });
                $(self).find('.cargo-media_input-media').addClass('active');
                $(self).find('.cargo-media_input-empty').removeClass('active');
                $(self).find('input[type=checkbox]').eq(0).prop('checked', false);
            }
            else if(embed)
            {
                $(self).find('input[type=checkbox]').eq(0).prop('checked', false);

                $(self).find('.cargo-media_input-preview').html(embed).css({
                    backgroundImage: ''
                });
                $(self).find('.cargo-media_input-media').addClass('active');
                $(self).find('.cargo-media_input-empty').removeClass('active');
            }
        });




    });



});