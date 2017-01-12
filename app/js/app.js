$(function() {

    var $btnGet = $('.app-get');
    var $btnGetAll = $('.app-get-all');
    var $btnPost = $('.app-post');
    var $btnPut = $('.app-put');
    var $btnDelete = $('.app-delete');
    var $showForm = $('.app-add-form');

    var $inputArtist = $('.app-artist-input');
    var $inputTrack = $('.app-track-input');
    var $inputYear = $('.app-year-input');
    var $inputVideoMusic = $('.app-music-input');
    var $inputAlbum = $('.app-album-input');
    var $inputPoster = $('.app-poster-input');
    var $inputAlbumPoster = $('.app-album-poster-input');
    var $selGenres = $('.app-genres-select');
    var $selCountries = $('.app-countries');
    var $selComposers = $('.app-composers');
    var $list = $('.app-list');
    var $trackDetails = $('.app-track-details');
    var $form = $('.app-form');
    var $trackPlay = $('.track-play');


    var $cardTrack = $('.app-card-track');

    $.ajax({
        url: 'http://localhost:5555/songs',
        method: 'GET',
        dataType: 'JSON',
        success: function(res) {
            console.log('success: ', res);

            var songs = res;
            songs.forEach(function(song) {

                // var theTemplateScript = $('#list-item-template').html();
                // var theTemplateItem = Handlebars.compile(theTemplateScript);

                // var context = {
                //     "idSong": song._id,
                //     "artist": song.artist,
                //     "title": song.track
                // };

                var theTemplateScript = $('#cardTrack-template').html();
                var theTemplateCard = Handlebars.compile(theTemplateScript);

                var context = {
                    "poster": song.poster,
                    "artist": song.artist,
                    "title": song.track,
                    "album": song.album,
                    "albumPoster": song.album_poster,
                    "composer": song.composer.join(', '),
                    "genres": song.genre.join(', ')
                };

                var $colCard = $('<div class="col s3"></div>');
                $colCard.attr('song-id', song._id);
                $colCard.html(theTemplateCard(context));
                $cardTrack.append($colCard);

                // var $li = $('<li/>');
                // $li.attr('song-id', song._id);
                // $li.html(theTemplateItem(context));
                // $li.append(' <button class="app-put btn btn-default">PUT</button>');
                // $list.append($li);



            });
        },
        error: function(err) {
            console.log('error: ', err);
        }
    });

    $list.on('click', '.app-get-details', function() {

        var $this = $(this);
        var id = $this.closest('li').attr('song-id');

        $this.addClass('disabled');

        $.ajax({
            url: 'http://localhost:5555/songs/' + id,
            method: 'GET',
            dataType: 'JSON',
            success: function(res) {
                console.log('success: ', res);

                $this.removeClass('disabled');
                $trackDetails.empty();
                $form.addClass('hide');
                $trackDetails.removeClass('hide');

                var song = res;

                var dateAt = song.created_at;
                var dateCreated = new Date(dateAt);
                var dayAdded = dateCreated.getDate();
                var monthAdded = dateCreated.getMonth() + 1;
                var yearAdded = dateCreated.getFullYear();
                var hourAdded = dateCreated.getHours();
                var minuteAdded = dateCreated.getMinutes();

                if (hourAdded < 10) hourAdded = "0" + hourAdded;

                if (minuteAdded < 10) minuteAdded = "0" + minuteAdded;

                var dateAdded = dayAdded + "/" + monthAdded + "/" + yearAdded + " | " + hourAdded + ":" + minuteAdded;

                var dateUp = song.created_at;
                var dateUpdated = new Date(dateAt);
                var dayEdited = dateUpdated.getDate();
                var monthEdited = dateUpdated.getMonth() + 1;
                var yearEdited = dateUpdated.getFullYear();
                var hourEdited = dateUpdated.getHours();
                var minuteEdited = dateUpdated.getMinutes();

                if (hourEdited < 10) hourEdited = "0" + hourEdited;

                if (minuteEdited < 10) minuteEdited = "0" + minuteEdited;

                var dateEdited = dayEdited + "/" + monthEdited + "/" + yearEdited + " | " + hourEdited + ":" + minuteEdited;

                var $details = $('<div/>');
                $trackDetails.attr('song-id', song._id);

                var theTemplateScript = $('#details-track-template').html();
                var theTemplateDetails = Handlebars.compile(theTemplateScript);

                var context = {
                    "artist": song.artist,
                    "title": song.track,
                    "album": song.album,
                    "albumPoster": song.album_poster,
                    "composer": song.composer.join(', '),
                    "genres": song.genre.join(', '),
                    "year": song.year,
                    "country": song.country,
                    "officialVideo": song.officialVideo,
                    "added": dateAdded,
                    "edited": dateEdited
                };

                $details.html(theTemplateDetails(context));
                $trackDetails.append($details);

                $trackDetails.css('background-image', 'url("' + song.poster + '")');
                $details.css({'background': 'linear-gradient(to right, #212121 30%, rgba(0,0,0,.0) 80%)', 'padding': '0', 'height': '100%'});
            },
            error: function(err) {
                console.log('error: ', err);
                $this.removeClass('disabled');
            }
        });
    });

    $btnPost.on('click', function() {

        var $this = $(this);

        $this.addClass('disabled');

        var artist = $inputArtist.val();
        var trackName = $inputTrack.val();
        var year = $inputYear.val();
        var musicVideo = $inputVideoMusic.val();
        var albumName = $inputAlbum.val();
        var poster = $inputPoster.val();
        var album_poster = $inputAlbumPoster.val();

        var genres = [];
        var countries = [];
        var composers = [];

        $selGenres.find('option:selected').each(function(){
            genres.push($(this).text());
        });

        $selCountries.find('.chip').each(function(){
            $(this).find('i').remove();
            countries.push($(this).text());
        });

        $selComposers.find('.chip').each(function(){
            $(this).find('i').remove();
            composers.push($(this).text());
        });

        $.ajax({
            url: 'http://localhost:5555/songs',
            method: 'POST',
            dataType: 'JSON',
            data: {
                'artist': artist,
                'track': trackName,
                'composer': composers,
                'album': albumName,
                'genre': genres,
                'poster': poster,
                'album_poster': album_poster,
                'officialVideo': musicVideo,
                'country': countries,
                'year': year
            },
            success: function(res) {
                console.log('success: ', res);
                $this.removeClass('disabled');

                var song = res;

                var theTemplateScript = $('#list-item-template').html();
                var theTemplateItem = Handlebars.compile(theTemplateScript);

                var context = {
                    "idSong": song._id,
                    "artist": song.artist,
                    "title": song.track
                };

                var $li = $('<li/>');
                $li.attr('song-id', song._id);
                $li.html(theTemplateItem(context));
                $list.append($li);

                $inputArtist.val('');
                $inputTrack.val('');
                $inputYear.val('');
                $inputVideoMusic.val('');
                $inputAlbum.val('');
                $inputPoster.val('');
                $inputAlbumPoster.val('');

                $selCountries.find('.chip').each(function(){
                    $(this).remove();
                });

                $selComposers.find('.chip').each(function(){
                    $(this).remove();
                });
            },
            error: function(err) {
                console.log('error: ', err);
                $this.removeClass('disabled');
            }
        });
    });

    $list.on('click', '.app-put', function() {

        var $this = $(this);

        $this.addClass('disabled');

        var id = $this.closest('li').attr('song-id');

        $.ajax({
            url: 'http://localhost:5555/songs/' + id,
            method: 'PUT',
            dataType: 'JSON',
            data: {
                'artist': 'hejka'
            },
            success: function(res) {
                console.log('success: ', res);
                $this.removeClass('disabled');

                var song = res;

                $this.closest('li').find('span').text(song.artist);
            },
            error: function(err) {
                console.log('error: ', err);
                $this.removeClass('disabled');
            }
        });
    });

    $trackDetails.on('click', '.app-delete', function() {

        var $this = $(this);

        var id = $trackDetails.attr('song-id');
        var $elList;

        $list.children().each(function(){

            if (id == $(this).attr('song-id')) {
                $elList = $(this);
            }

        });

        $.ajax({
            url: 'http://localhost:5555/songs/' + id,
            method: 'DELETE',
            dataType: 'JSON',
            success: function(res) {
                console.log('success: ', res);

                $this.parents().filter(".app-track-details").children().first().remove();
                $this.parents().filter(".app-track-details").addClass('hide');
                $form.removeClass('hide')
                $elList.remove();
            },
            error: function(err) {
                console.log('error: ', err);
            }
        });
    });

    $trackDetails.on('click', '.app-close', function() {

        $trackDetails.addClass('hide');
        $trackDetails.children().first().remove();
        // $form.removeClass('hide');

    });

    $trackPlay.on('click', '.app-close', function() {

        $trackPlay.addClass('hide');
        $trackPlay.children().first().remove();

    });

    $form.on('click', '.app-close', function() {

        $form.addClass('hide');

    });

    $list.on('click', '.app-play', function() {

        var $this = $(this);
        var id = $this.closest('li').attr('song-id');

        $.ajax({
            url: 'http://localhost:5555/songs/' + id,
            method: 'GET',
            dataType: 'JSON',
            success: function(res) {
                console.log('success: ', res);

                $trackPlay.empty();
                $form.addClass('hide');
                // $trackDetails.addClass('hide');
                $trackPlay.removeClass('hide');

                var song = res;

                var $play = $('<div class="row"></div>');
                $play.attr('song-id', song._id);

                var theTemplateScript = $('#play-template').html();
                var theTemplatePlay = Handlebars.compile(theTemplateScript);

                var context = {
                    "artist": song.artist,
                    "title": song.track,
                    "officialVideo": song.officialVideo,
                };

                $play.html(theTemplatePlay(context));
                $trackPlay.append($play);
            },
            error: function(err) {
                console.log('error: ', err);
            }
        });
    });

    $showForm.on('click', function(){
        $form.removeClass('hide');
        $trackDetails.addClass('hide');
        $trackPlay.addClass('hide');
    });

    $('select').material_select();

    $('.chips-placeholder').material_chip({
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Composer',
    });

    $('.chips-placeholder-country').material_chip({
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Country',
    });

    $('.slider').slider({full_width: true});

});