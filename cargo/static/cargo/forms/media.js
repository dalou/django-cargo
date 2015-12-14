$(document).ready(function() {




    $(document).on('mouseenter', '.cargo-media_input', function(self)
    {
        if(this.cargo_media_input_active === true)
        {
            return;
        }
        this.cargo_media_input_active = true;
        self = this;

        $(this).mediaDropzone().on('mediaDropzone.deposed', function(e, media, file, embed)
        {
            //console.log('media deposed', media, file, embed)
            if(file)
            {
                $(self).find('.cargo-media_input-preview').html('<img style="margin-bottom:15px;" class="img-responsive" src="'+file+'"/>').css({
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