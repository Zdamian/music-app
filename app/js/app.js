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

    var $backToGrid = $('.app-back-grid');
    var $cardTrack = $('.app-card-track');
    var $loader = $('.app-loader');

    var $masonry;

    function showGrid() {

        $loader.removeClass('hide');
        $cardTrack.removeClass('hide');
        $cardTrack.addClass('invisible');
        $cardTrack.html('');

        $.ajax({
            url: 'http://localhost:5555/songs',
            method: 'GET',
            dataType: 'JSON',
            success: function(res) {
                console.log('success: ', res);

                var songs = res;
                songs.forEach(function(song) {

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

                    var $colCard = $('<div class="card-item app-single-track"></div>');
                    $colCard.attr('song-id', song._id);
                    $colCard.html(theTemplateCard(context));
                    $cardTrack.append($colCard);

                });

                if ($masonry !== undefined) {
                    $masonry.masonry('destroy');
                }

                // init Masonry
                $masonry = $cardTrack.masonry({
                    // options
                    itemSelector: '.card-item',
                    columnWidth: 300,
                    gutter: 20,
                    transitionDuration: '0.4s',
                    isFitWidth: true
                });

                // layout Masonry after each image loads
                $masonry.imagesLoaded().progress(function() {
                    $masonry.masonry('layout');
                });

                $loader.addClass('hide');
                $cardTrack.removeClass('invisible');
            },
            error: function(err) {
                console.log('error: ', err);
                $loader.addClass('hide');
            }
        });
    }

    showGrid()

    $cardTrack.on('click', '.app-get-details', function() {

        var $this = $(this);
        var id = $this.parents().filter('.app-single-track').attr('song-id');
        $cardTrack.addClass('hide');
        $loader.removeClass('hide');

        $.ajax({
            url: 'http://localhost:5555/songs/' + id,
            method: 'GET',
            dataType: 'JSON',
            success: function(res) {
                console.log('success: ', res);

                $form.addClass('hide');
                $cardTrack.addClass('hide');
                $trackDetails.empty();
                $trackDetails.removeClass('hide');

                var song = res;

                var dateAt = song.created_at;
                var dateUp = song.created_at;
                var dateAdded = moment(dateAt).format('LLL');
                var dateEdited = moment(dateUp).format('LLL');

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
                $details.css({
                    'background': 'linear-gradient(to right, #212121 30%, rgba(0,0,0,.0) 80%)',
                    'padding': '0',
                    'height': '100%'
                });
                $loader.addClass('hide');
            },
            error: function(err) {
                console.log('error: ', err);
                $loader.addClass('hide');
            }
        });
    });

    $btnPost.on('click', function() {

        var $this = $(this);

        $this.addClass('disabled');
        $form.addClass('hide');
        $loader.removeClass('hide');

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

        $selGenres.find('option:selected').each(function() {
            genres.push($(this).text());
        });

        $selCountries.find('.chip').each(function() {
            $(this).find('i').remove();
            countries.push($(this).text());
        });

        $selComposers.find('.chip').each(function() {
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

                var $colCard = $('<div class="card-item app-single-track"></div>');
                $colCard.attr('song-id', song._id);
                $colCard.html(theTemplateCard(context));
                $cardTrack.append($colCard);

                $inputArtist.val('');
                $inputTrack.val('');
                $inputYear.val('');
                $inputVideoMusic.val('');
                $inputAlbum.val('');
                $inputPoster.val('');
                $inputAlbumPoster.val('');

                $selCountries.find('.chip').each(function() {
                    $(this).remove();
                });

                $selComposers.find('.chip').each(function() {
                    $(this).remove();
                });
                $loader.addClass('hide');
                $cardTrack.removeClass('hide');

            },
            error: function(err) {
                console.log('error: ', err);
                $this.removeClass('disabled');
                $loader.addClass('hide');
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
        var $track;

        $list.children().each(function() {

            if (id == $(this).attr('song-id')) {
                $track = $(this);
            }

        });
        $trackDetails.addClass('hide');
        $loader.removeClass('hide');

        $.ajax({
            url: 'http://localhost:5555/songs/' + id,
            method: 'DELETE',
            dataType: 'JSON',
            success: function(res) {
                console.log('success: ', res);

                $this.parents().filter(".app-track-details").children().first().remove();
                $this.parents().filter(".app-track-details").addClass('hide');
                $form.removeClass('hide');
                $loader.addClass('hide');
                $track.remove();
            },
            error: function(err) {
                console.log('error: ', err);
                $loader.addClass('hide');
            }
        });
    });

    $trackDetails.on('click', '.app-close', function() {

        $trackDetails.addClass('hide');
        $trackDetails.children().first().remove();
        $cardTrack.removeClass('hide');
        $cardTrack.empty();
        $loader.removeClass('hide');

        showGrid()

    });

    $trackDetails.on('click', '.app-play', function() {

        var $this = $(this);

        var id = $trackDetails.attr('song-id');
        var $track;

        $list.children().each(function() {

            if (id == $(this).attr('song-id')) {
                $track = $(this);
            }

        });
        $trackDetails.addClass('hide');
        $loader.removeClass('hide');

        $.ajax({
            url: 'http://localhost:5555/songs/' + id,
            method: 'GET',
            dataType: 'JSON',
            success: function(res) {
                console.log('success: ', res);

                $trackDetails.addClass('hide');
                $trackDetails.children().first().remove();
                $trackPlay.empty();
                $form.addClass('hide');
                $cardTrack.addClass('hide');
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
                $loader.addClass('hide');
            },
            error: function(err) {
                console.log('error: ', err);
                $loader.addClass('hide');
            }
        });

    });

    $trackPlay.on('click', '.app-close', function() {

        $trackPlay.addClass('hide');
        $trackPlay.children().first().remove();
        $cardTrack.removeClass('hide');
        $cardTrack.empty();
        $loader.removeClass('hide');

        showGrid()

    });

    $form.on('click', '.app-close', function() {

        $form.addClass('hide');
        $cardTrack.removeClass('hide');
        $cardTrack.empty();
        $loader.removeClass('hide');

        showGrid()

    });

    $cardTrack.on('click', '.app-play', function() {

        var $this = $(this);
        var id = $this.parents().filter('.app-single-track').attr('song-id');
        $cardTrack.addClass('hide');
        $loader.removeClass('hide');

        $.ajax({
            url: 'http://localhost:5555/songs/' + id,
            method: 'GET',
            dataType: 'JSON',
            success: function(res) {
                console.log('success: ', res);

                $trackPlay.empty();
                $form.addClass('hide');
                $cardTrack.addClass('hide');
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
                $loader.addClass('hide');
            },
            error: function(err) {
                console.log('error: ', err);
                $loader.addClass('hide');
            }
        });
    });

    $showForm.on('click', function() {
        $form.removeClass('hide');
        $trackDetails.addClass('hide');
        $trackPlay.addClass('hide');
        $cardTrack.addClass('hide');
    });

    $backToGrid.on('click', function() {
        $form.addClass('hide');
        $trackDetails.addClass('hide');
        $trackPlay.addClass('hide');
        //$cardTrack.removeClass('hide');
        //$cardTrack.empty();
        console.log('back');

        showGrid()
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

    $('.slider').slider({
        full_width: true
    });

});